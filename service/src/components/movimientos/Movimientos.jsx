import React, { useEffect, useState } from 'react'
import "../movimientos/hojamo.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Movimientos() {
  
  const navegar=useNavigate()
  const [movimiento, setmovimiento] = useState([])
  const FectchMovimientos=async()=>{
    try{
      const {data}=await axios.get("http://localhost:4000/api/users/movimiento/g/")
      setmovimiento(data)
    }catch(err){
      console.log("Hubo un error",err)
    }
  }
  useEffect(()=>{
    FectchMovimientos()
  },[])
  const onUpdate=(id)=>{
    navegar(`/update-movimiento/${id}`)
  }
  const onDelete=async(id)=>{
    const mensaje=window.confirm("Esta seguro de querer eliminar este movimiento de producto?")
    if(mensaje){
      try{
        await axios.delete(`http://localhost:4000/api/users/movimiento/d/${id}`)
        alert("Se elimino el movimiento de producto")
        setmovimiento(movimiento.filter((m)=>m.id!==id))
      }catch(err){
        alert("Hubo un error al eliminar este movimiento de producto",err)
      }
    }
  }
  return (
    <>
    <div className="movi container mt-4">
      <div className="header-movimiento">
      <h1>Movimientos del productos</h1>
      <button type="button" onClick={()=>navegar("/create-movimiento")} >Crear Movimiento</button> 
      </div>
    
    <div className="historial">
      <div className="lista-historial">
        <div className="header-list">
          <ul>
            
            <li>Accion</li>
            <li>Fecha</li>
            
          </ul>
          <hr />
        </div>
        <div className="box"> 
          {movimiento.map((m)=>{
            return(
            <div className="content" >
              <div className="content-1">
                <div className="accion">
                  <div className="ac">
                    <h4>{m.id}</h4>
                  </div>
                               
                <div className="datos">
                  <label htmlFor="">Usuario ID:{m.usuario_id} || Producto ID: {m.producto_id} || Almacen ID: {m.almacen_id}</label><br />
                  <label>Razon:</label>
                  <p>{m.razon}</p>
                  <p>Tipo Movimiento: {m.tipo_movimiento}</p>
                </div> 
                </div>
               </div>
                <div className="fecha">
                  <div className="cantidad">
                  <label htmlFor="">Cantidad: {m.cantidad}</label>
                  <div className="btn">
                  <button type="button" onClick={()=>onUpdate(m.id)} ><i class='bx bxs-show'></i></button>
                  <button type="button" onClick={()=>onDelete(m.id)} ><i class='bx bx-trash' ></i></button>
                  </div>
                  </div>
                  
                  <div className="bus">
                      <label htmlFor="">Fecha Movimiento:</label>
                      <label htmlFor=""> {m.fecha_movimiento?new Date(m.fecha_movimiento).toISOString().replace(/T/," ").replace(/:\d{2}\.\d{3}Z/," "):""}</label>
                  
                  </div>
                  
                </div>
              </div>
            )
          })}         
              
              
          
        </div>
      </div>
    </div>
    </div>
    </>
  )
}
