import React, { useEffect, useState } from 'react'
import FuncionAlmacenes from '../hooks/Almacenes'
import FunctionUsuario from '../hooks/Usuario'
import FunctionVentas from '../hooks/Ventas'
import FuncitonDetalle from '../hooks/Detalle'
import FunctionProducto from '../hooks/Producto'
import { LineChart, Line, Legend } from 'recharts';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
  } from 'recharts';
import "./hojareporte.css"
import { useNavigate } from 'react-router-dom'
  export default function ReporteMensual() {
    const [dataReporteMensual, setdataReporteMensual] = useState([])
    const {FectAlmacen_id,almacen_id}=FuncionAlmacenes()
    const {FectUsuario,usuario}=FunctionUsuario()
    const {FecthVenta,venta}=FunctionVentas()
    const {FectProdcutos,producto}=FunctionProducto()
    const {FuncitonDetalleectDetalle,detalle}=FuncitonDetalle()
    const [almacenSeleccionado, setalmacenSeleccionado] = useState(0)
    const [topProducto, settopProducto] = useState(null)
    const [PeorProducto, setPeorProducto] = useState(null)
    useEffect(()=>{
        FectAlmacen_id(),FectUsuario(),FecthVenta(),FuncitonDetalleectDetalle(),FectProdcutos()
    },[])
 
    useEffect(() => {
        if (venta.length && detalle.length) {
          const reportePorMes = {};
          
          detalle.forEach((item) => {
            const ventaEncontrada = venta.find((v) => v.id === item.venta_id);
           
            if (ventaEncontrada && (!almacenSeleccionado || ventaEncontrada.almacen_id === parseInt(almacenSeleccionado))) {
              const fecha = new Date(ventaEncontrada.fecha_venta);
              const mes = fecha.toLocaleString('default', { month: 'long' });
              const anio = fecha.getFullYear();
              const clave = `${mes} ${anio}`;
      
              if (!reportePorMes[clave]) {
                reportePorMes[clave] = {
                  total: 0,
                  cantidadTotal:0,
                  items: []
                };
              }
              reportePorMes[clave].total +=ventaEncontrada.total_venta //item.subtotal;
              reportePorMes[clave].cantidadTotal+=item.cantidad
              reportePorMes[clave].items.push({
                producto: producto.find((p) => p.id === item.producto_id),
                cantidad: item.cantidad,
                precio:  item.precio_unitario,//producto.find((p)=>p.id===ventaEncontrada.producto_id),
                usuario: usuario.find((u) => u.id === ventaEncontrada.usuario_id),
                tienda: almacen_id.find((a) => a.id === ventaEncontrada.almacen_id)

              });
            }
            
          });
      
          const arrayReporte = Object.entries(reportePorMes).map(([mes, datos]) => ({
            mes,
            total: datos.total,
            cantidadTotal:datos.cantidadTotal,
            items: datos.items
          }));
      
          setdataReporteMensual(arrayReporte);
      
          // Producto más vendido
         const contadorProductos = {};
          detalle.forEach((item) => {
            const ventaEncontrada = venta.find((v) => v.id === item.venta_id);
            if (
              ventaEncontrada &&
              (!almacenSeleccionado || ventaEncontrada.almacen_id === parseInt(almacenSeleccionado))
            ) {
              if (!contadorProductos[item.producto_id]) {
                contadorProductos[item.producto_id] = 0;
              }
              contadorProductos[item.producto_id] += item.cantidad;
            }
          });
      
          let maxProducto = null;
          let maxCantidad = 0;
      
          for (const prodId in contadorProductos) {
            if (contadorProductos[prodId] > maxCantidad) {
              maxCantidad = contadorProductos[prodId];
              maxProducto = producto.find((p) => p.id === parseInt(prodId));
            }
          }
      
          settopProducto(maxProducto ? { ...maxProducto, cantidad: maxCantidad } : "No hay datos de este mes");
          let minProducto=null
          let minCantidad=Infinity
          for (const prodID in contadorProductos) {
              if (contadorProductos[prodID] < minCantidad) {
                minCantidad = contadorProductos[prodID];
                minProducto = producto.find((p) => p.id === parseInt(prodID));
              }
            }
          setPeorProducto(minProducto?{...minProducto,cantidad:minCantidad}:"No hay datos de este mes")
        }
        
        
        
      }, [venta, detalle, almacenSeleccionado]);
      
    
     const navegar=useNavigate()
      
    return (
        <>
        <div className="container mt-4">
            <div className="reporte-header">
                 <h2 className="text-xl font-bold mb-4">Reporte de ventas</h2>
                 
                 <div className='header-reporte'>
                 <select name="" value={almacenSeleccionado??""} onChange={(e)=>setalmacenSeleccionado(e.target.value)} className='form-control' id="">
                    <option value="" selected>Todas las tiendas</option>
                    {almacen_id.map((a)=>
                    <option value={a.id}>{a.nombre}</option>
                    )}
                </select>
                <button type="button" onClick={()=>navegar("/ventas")}>Regresar</button>
                 </div>
            </div>   
       
        <div className="tarjeta-prodcuto">
            <div>
            {topProducto && (
            <div className="bg-green-100 p-4 rounded shadow mb-6">
                <h3 className="font-semibold text-lg mb-1">📌 Producto más vendido</h3>
                <p>
                <strong>{topProducto.nombre}</strong> con <strong>{topProducto.cantidad}</strong> unidades vendidas.
                </p>
            </div>
            )}
            </div>
            <div>
            {PeorProducto&&(                
                    <div className="bg-red-100 p-4 rounded shadow mb-6">
                      <h3 className="font-semibold text-lg mb-1">📉 Producto menos vendido</h3>
                      <p>
                        <strong>{PeorProducto.nombre}</strong> con <strong>{PeorProducto.cantidad}</strong> unidades vendidas.
                      </p>
                    </div>
                  
            )}
            </div>
        </div>
       
    <div className='grafico' >
        <div  style={{ width: '40%', height: 350 }}>
            <ResponsiveContainer>
            <BarChart data={dataReporteMensual}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip  />
                <Bar dataKey="total" fill="#82ca9d" style={{borderRadius:"10px"}} />
            </BarChart>
            </ResponsiveContainer>
        </div>
    <div>
 
        <LineChart width={400} height={400} data={dataReporteMensual} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip />
        <Legend />
        
        <Line type="monotone" dataKey="total" name="Total de Ventas (S/)" stroke="#8884d8" />
        <Line type="monotone" dataKey="cantidadTotal" name="Cantidad de Productos" stroke="#82ca9d" />
        </LineChart>
  

    </div>
  </div>
  <h2 className="text-xl font-bold mt-6">Detalle de Ventas</h2>
  <hr />

  {dataReporteMensual.map((reporte, index) => (
    <div key={index} className="border p-4 mb-4 rounded shadow">
      <h3 className="text-lg font-semibold">{reporte.mes}</h3>
      <p>Total: S/ {reporte.total.toFixed(2)}</p>
      <div className="targetas">
      <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Precio</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Usuario</th>
                <th scope="col">Tienda</th>
               
                </tr>
            </thead>
            <tbody>    
            {reporte.items?reporte.items.map((item,i)=>(
                        <>
                        <tr key={i+1}>
                            <th scope="row">{i+1}</th>
                            <td>{item.producto?.nombre}</td>
                            <td>S/.{item.precio}</td>
                            <td>{item.cantidad} unidad(es)</td>
                            <td>{item.usuario?.nombre}</td>
                            <td>{item.tienda?.nombre}</td>
                        </tr>
                        </>
                    )):<h2>No hay datos sobre este mes</h2>}
            </tbody>
      </table>
        
      </div>
      
    </div>
  ))}
   </div>
</>
  )
}
