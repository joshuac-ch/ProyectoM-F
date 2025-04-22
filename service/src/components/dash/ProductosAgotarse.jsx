import React, { useEffect, useState } from 'react'
import FunctionProducto from '../hooks/Producto';
import FunctionInventarrio from '../hooks/Inventarrio';
import axios from 'axios';
import FuncionEmpleados from '../hooks/Empleados';

export default function ProductosAgotarse() {
    
      //Traer Inventario
      //const {producto,FectProdcutos}=FunctionProducto()
      const {inventario,FectchInventario}=FunctionInventarrio()
      const {producto,FectProdcutos}=FunctionProducto()
      const {FectUsuarios,empleado}=FuncionEmpleados()
      useEffect(()=>{
        FectUsuarios()
      },[])
      const [mostratProductos, setmostratProductos] = useState([])
      const idList=producto.map((p)=>p.id)
      const MostartProductos=async()=>{
          try{
            
            const response=await Promise.all(
              idList.map((id)=>
              axios.get(`http://localhost:4000/api/users/producto/s/${id}`) 
            ))
          const datos=response.map((res)=> res.data)          
          setmostratProductos(datos)
          
          }catch(err){
            console.error("Hubo un error",err)
          }
        
      }

      useEffect(()=>{
       FectchInventario(),FectProdcutos()
      },[])
      useEffect(()=>{
        if(producto.length>0){
          MostartProductos()
        }
      },[producto])
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-danger">⚠️ Productos por Agotarse</h2>

      <div className="row">
        {inventario.length===0?
        (
          <p className='text-center'>✅ No hay productos próximos a agotarse.</p>
        ):
        //esto ultimo se agrego-----------------------------------hasta aqui
        inventario.filter(i=>i.almacen_id===empleado.almacen_id && i.cantidad_actual<20). //esto mostrara los de bajo stock
        
          map((producto) => {
            
            const porcentaje=(producto.cantidad_actual/producto.stock_maximo)*100
            const mostarDatos=mostratProductos.find((m)=>m.id===producto.producto_id)
            
            return (
              <div key={producto.id} className="col-md-6 mb-3">
                <div className="card tarjeta p-3 shadow-sm">
                  <h5 className="mb-2">{mostarDatos?mostarDatos.nombre:"No hay datos"}</h5>{/*Va el nombre */}
                  <div className="progress mb-2">
                    <div
                      className={`progress-bar ${porcentaje < 20 ? "bg-danger" : "bg-warning"} `}
                      role="progressbar"
                      style={{ width: `${porcentaje}%` }}
                      aria-valuenow={producto.cantidad_actual}
                      aria-valuemin="0"
                      aria-valuemax={producto.stock_maximo}
                    ></div>
                  </div>
                  <p className="text-muted">
                    Stock: <strong>{producto.cantidad_actual}</strong> / {producto.stock_maximo}
                  </p>
                </div>
              </div>
            );
          })
        }
        
      </div>

      <style>
        {`
          .tarjeta{
            border-left:5px solid red;
            transition: transform 0.3s ease-in-out;
            }
          .tarjeta:hover {
            transform: scale(1.03);
          }
          .progress {
            height: 10px;
          }
        `}
      </style>
    </div>
  );
}
