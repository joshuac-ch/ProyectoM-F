import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../InventarioProductos/hojain.css"
import FunctionInventarrio from '../hooks/Inventarrio'
import FunctionProducto from '../hooks/Producto'
import axios from 'axios'
import FuncionDelimitar from '../hooks/Delimitar'
import FuncionAlmacenes from '../hooks/Almacenes'
import FuncionEmpleados from '../hooks/Empleados'

export default function Iproductos() {
    const navegar=useNavigate()
    const {inventario,setinventario,FectchInventario}=FunctionInventarrio()
    const {FectProdcutos,producto}=FunctionProducto()
    useEffect(()=>{
        FectchInventario(),FectProdcutos()
    },[])
    const [mostarProductos, setmostarProductos] = useState([])
        // Array de ID const idList = producto.map((p) => p.id); // array de IDs
    const dataShowProductos = async () => {
      try {
        const idList = producto.map((p) => p.id);
    
        // Hacer múltiples llamadas a /producto/:id
        const responses = await Promise.all(
          idList.map((id) =>
            axios.get(`http://localhost:4000/api/users/producto/s/${id}`)
          )
        );
    
        const productosData = responses.map((res) => res.data);
        setmostarProductos(productosData);
        //console.log(productosData);
      } catch (err) {
        console.error("Hubo un error", err);
      }
    };
    useEffect(()=>{
      if(producto.length>=0){
        dataShowProductos()
      }
    },[producto])
    const PermitirIngreso=()=>{
      if(FuncionDelimitar("editar")){
        navegar("/invetario-producto/inventario-producto-create")
      }else{
        alert("No tiene permiso para el inventario de productos")
      }
    }
    const OnUpdate=(id)=>{
      if(FuncionDelimitar("editar")){
      navegar(`/invetario-producto/inventario-update/${id}`)
    }else{
      alert("No tiene permiso para editar el inventario de productos")

    }
  }
  const OnDelete=async(id)=>{
    if(FuncionDelimitar("eliminar")){
      const mensage=window.confirm("Estas seguro de querer este producto del inventario")
    if(mensage){
      try{
        await axios.delete(`http://localhost:4000/api/users/inven/d/${id}`)
        alert("Se elimino el producto exitosamente")
        setinventario(inventario.filter((i)=>i.id!==id))
      
      }catch(err){
        alert(err?.response?.data?.message)
      }
    }
    }else{
      alert("No tiene permiso para eliminar productos del inventario")
    }
  }
  const FuncionFecha=(fecha)=> {
    const fechaLima=new Date(fecha).toLocaleString("es-PE",{
      timeZone:"America/Lima",
      hour12: true,
      year:'numeric',
      month:'2-digit',
      day:'2-digit',
      hour:'2-digit',
      minute:'2-digit',
      second:'2-digit'    
  })
      return fechaLima
  }
  const {almacen_id,FectAlmacen_id}=FuncionAlmacenes()
  const {empleado,FectUsuarios}=FuncionEmpleados()
  useEffect(()=>{
    FectAlmacen_id(),FectUsuarios()
  },[])
  const [tiendaInventario, settiendaInventario] = useState(0)
  const DataInventario=tiendaInventario==0?
  inventario:inventario.filter((i)=>i.almacen_id==parseInt(tiendaInventario))
  const handleSelectInvenatrio=(e)=>{
    settiendaInventario(e)
  }
  return (
   <>
   <div className="container mt-4">
        <div className="header-inventario">
            <h1>Inventario de productos</h1>
            <div className='herramientas-inventario'>
            <button type="button" onClick={()=>PermitirIngreso()}>Gestionar Inventario</button>
            {/*<button type='button' onClick={()=>PermitirIngreso("/inventario-update/:id")}>Actualizar inventario</button> */}
            
            <div>
            <select onChange={(e)=>handleSelectInvenatrio(e.target.value)} className='form-control' name="" id="">
              <option value="" disabled>Buscar por almacen</option>
              <option value={0} >Todos</option>
              {almacen_id.map((a)=>
                <option key={a.id} value={a.id}>{a.nombre}</option>
              )}
            </select>
            </div>
            </div>
        </div>
        <div className="body-inventario">
        <table className="table table-inventario">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Cantidad Actual</th>
      <th scope="col">Producto ID</th>
      <th scope="col">Almacen ID</th>
      {/*<th scope="col">Stock Minimo</th>*/}
      <th scope="col">Stock Maximo</th>
      <th scope="col">Ultimo Movimiento</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
  {inventario.length===0?(
    <tr id="not-found-inventario">
      <td>No se agregado ningun producto a inventario</td>
    </tr>
  ):DataInventario.map((i)=>{
    const relacionprodcuto=mostarProductos.find((r)=>r.id===i.producto_id)  
                   return(                      
                            <tr key={i.producto_id}>
                             <th scope="row">{i.id}</th>
                             <td>{i.cantidad_actual}</td>
                             <td>                               
                                 {relacionprodcuto ? (
                                 <div className="conteiner-producto">
                                   <div className="conteainer">
                                     <div className="productoi">
                                     <div className="detalle-producto">
                                       <img src={relacionprodcuto.image} alt="" />
                                      
                                       </div>
                                    <div className="productoi-header">
                                    <label>Nombre: {relacionprodcuto.nombre}</label>
                                    <p>Vence: <strong>{relacionprodcuto.fecha_vencimiento.split("T")[0]}</strong> </p>
                                    </div>                                        
                                       
                                     </div>
                                   </div>
                                 </div>
                               ) : (
                                 <span>Sin producto</span>
                               )}                          
                             </td>
                             <td>{i.almacen_id}</td>
                            {/*<td>{i.stock_minimo} .split(".")[0].replace("T"," ")</td>NO MOSTRAR HASTA HACER LA FUNCION DE STOCK MINIMO MUESTRE ALERTAS CUANDO HAYA ESCAZES*/}
                             <td>{i.stock_maximo}</td>
                             <td>{ FuncionFecha(i.ultimo_movimiento)}</td>
                             <td className='agregar'>
                               <button onClick={()=>OnUpdate(i.id)} type="button"><i className='bx bx-plus-circle'></i></button>
                               <button onClick={()=>OnDelete(i.id)} type='button'><i className='bx bx-trash'></i></button>
                             </td>
                           </tr>
                      
                   )
               })}

  
  </tbody>
</table>               
        </div>
   </div>
   </>
  )
}
