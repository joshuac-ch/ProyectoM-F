import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../InventarioProductos/hojain.css"
import FunctionInventarrio from '../hooks/Inventarrio'
import FunctionProducto from '../hooks/Producto'
import axios from 'axios'
export default function Iproductos() {
    const navegar=useNavigate()
    const {inventario,FectchInventario}=FunctionInventarrio()
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
        console.log(productosData);
      } catch (err) {
        console.error("Hubo un error", err);
      }
    };
    useEffect(()=>{
      if(producto.length>=0){
        dataShowProductos()
      }
    },[producto])
   
    return (
   <>
   <div className="container mt-4">
        <div className="header-inventario">
            <h1>Inventario de productos</h1>
            <button type="button" onClick={()=>navegar("/inventario-producto-create")}>Gestionar Inventario</button>
            <button type='button' onClick={()=>navegar("/inventario-update")}>Actualizar inventario</button>
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
    </tr>
  </thead>
  <tbody>
  {inventario.map((i)=>{
     const relacionprodcuto=mostarProductos.find((r)=>r.id===i.producto_id)  
                    return(                      
                             <tr key={i.id}>
                              <th scope="row">{i.id}</th>
                              <td>{i.cantidad_actual}</td>
                              <td>                               
                                  {relacionprodcuto ? (
                                  <div className="conteiner-producto">
                                    <div className="conteainer">
                                      <div className="productoi">
                                        <img src={relacionprodcuto.image} alt="" />
                                        <label>{relacionprodcuto.nombre}</label>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <span>Sin producto</span>
                                )}                          
                              </td>
                              <td>{i.almacen_id}</td>
                             {/*<td>{i.stock_minimo}</td>NO MOSTRAR HASTA HACER LA FUNCION DE STOCK MINIMO MUESTRE ALERTAS CUANDO HAYA ESCAZES*/}
                              <td>{i.stock_maximo}</td>
                              <td>{i.ultimo_movimiento.split(".")[0].replace("T"," ")}</td>
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
