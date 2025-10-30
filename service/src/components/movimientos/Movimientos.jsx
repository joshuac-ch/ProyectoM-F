import React, { useEffect, useState } from 'react'
import "../movimientos/hojamo.css"

import { useNavigate } from 'react-router-dom'
import FuncionDelimitar from '../hooks/Delimitar'
import FuncionEmpleados from '../hooks/Empleados'
import { axiosInstance } from '../lib/axios'
export default function Movimientos() {
  
  const navegar=useNavigate()
  const [movimiento, setmovimiento] = useState([])
  const FectchMovimientos=async()=>{
    try{
      const {data}=await axiosInstance.get("/movimiento/g/")
      setmovimiento(data)
    }catch(err){
      console.log("Hubo un error",err)
    }
  }
  useEffect(()=>{
    FectchMovimientos()
  },[])
  const onUpdate=(id)=>{
    if(FuncionDelimitar("editar")){
    navegar(`/movimientos/update-movimiento/${id}`)
    }else{
      alert("Solo personal autorizado")
    }
} 
const onCreate=()=>{
  if(FuncionDelimitar("editar")){
    navegar("/movimientos/create-movimiento")
  }else{
    alert("Solo personal autorizado")
  }
  
}

const onDelete=async(id)=>{
    if(FuncionDelimitar("eliminar")){
    const mensaje=window.confirm("Esta seguro de querer eliminar este movimiento de producto?")
    if(mensaje){
      try{
        await axiosInstance.delete(`/movimiento/d/${id}`)
        alert("Se elimino el movimiento de producto")
        setmovimiento(movimiento.filter((m)=>m.id!==id))
      }catch(err){
        alert("Hubo un error al eliminar este movimiento de producto",err)
      }
    }}
    else{
      alert("Solo personal autorizado")
    }
  }
  const FechaFormateada=(fecha)=>{
    const FechaFormateada=new Date(fecha).toLocaleString('es-PE',{
      timeZone:'America/Lima',
      hour12:true,
      year:'numeric',
      month:'2-digit',
      day:'2-digit',
      hour:'2-digit',
      minute:'2-digit',
      second:'2-digit'
    })
    return FechaFormateada
  }
  const {FectUsuarios,empleado}=FuncionEmpleados()
  useEffect(()=>{
    FectUsuarios()  
  },[])
  return (
    <>
    <div className="movi container mt-4">
      <div className="header-movimiento">
      <h1>Movimientos del productos</h1>
      <button type="button" onClick={onCreate} >Crear Movimiento</button> 
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
          {movimiento.length===0?(
            <div id="not-found-movimientos">
              <p>No se encontraron movimientos de productos</p>
            </div>
          ):           
              (
                movimiento.sort((a,b)=>b.id-a.id).filter((m)=> m.almacen_id===empleado.almacen_id).map((mo)=>{
                  
                    return (
                      <div key={mo.id} className="content" >
                      
                      <div className="content-1">
                        <div className="accion">
                          <div className="ac">
                            <h4>{mo.id}</h4>
                          </div>
                                       
                        <div className="datos">
                          <label htmlFor="">Usuario ID:{mo.usuario_id} || Producto ID: {mo.producto_id} || Almacen ID: {mo.almacen_id}</label><br />
                          
                          <label>Razon:</label>
                          <p>{mo.razon}</p>
                          <p>Tipo Movimiento: {mo.tipo_movimiento}</p>
                        </div> 
                        </div>
                       </div>
                        <div className="fecha">
                          <div className="cantidad">
                          <label htmlFor="">Cantidad: {mo.cantidad}</label>
                          <div className="btn">
                          <button type="button" onClick={()=>onUpdate(mo.id)} ><i className='bx bxs-show'></i></button>
                          <button type="button" onClick={()=>onDelete(mo.id)} ><i className='bx bx-trash' ></i></button>
                          </div>
                          </div>
                          
                          <div className="bus">
                              <label htmlFor="">Fecha Movimiento:</label>
                              <label htmlFor=""> {FechaFormateada(mo.fecha_movimiento)}</label>
                          
                          </div>
                          
                        </div>
                      </div>
                    )
                      
                   
                })
                
                )
              
          }         
              
              
          
        </div>
      </div>
    </div>
    </div>
    </>
  )
}
