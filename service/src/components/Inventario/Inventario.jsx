import React, { useEffect, useState } from 'react';
import "../Inventario/hojainven.css";

import { useNavigate } from 'react-router-dom';
import FuncionDelimitar from '../hooks/Delimitar';
import FuncionAlmacenes from '../hooks/Almacenes';
import { axiosInstance } from '../lib/axios';
export default function Inventario() {
  
  const [almacen, setalmacen] = useState([])
  const navegar=useNavigate()
  const FecthAlmacen=async()=>{
    try{
      const {data}=await axiosInstance.get("/almacen/g")
      setalmacen(data)
    }catch(e){
      alert("Hubo un error",e)
    }
  }
  useEffect(()=>{
    FecthAlmacen()
  },[])
  const onUpdate=(id)=>{
    if(FuncionDelimitar("editar")){
    navegar(`/inventario/update-almacen/${id}`)
    }else{
      alert("Solo personal autorizado")
    }
}
  const onDelete=async(id)=>{
    if(FuncionDelimitar("eliminar")){
      const mensaje=window.confirm("Estas seguro de eliminar este inventario?")
    if(mensaje){
      try{
        await axiosInstance.delete(`/almacen/d/${id}`)
        alert("Se elimino correctamente el almacen")
        setalmacen(almacen.filter((a)=>a.id!==id))
      }catch(e){  
        alert("hubo un error al eliminar el almacen",e.message)
      }
    }
    }else{
      alert("Solo personal autorizado")
    }
  } 
  const [almacenFilter, setalmacenFilter] = useState("") 
  const datosFilterAlmacen=almacen.filter((a)=>{
    return(
    a.nombre.toLowerCase().includes(almacenFilter.toLowerCase())
  )})
  const onChangeAlmacenFilter=(e)=>{
    setalmacenFilter(e.target.value)
  }
  return (
    <>
    <div className="container mt-4">
      <div className="header-inven">
        <h1>Almacen</h1>
        <div className="tools">
          <div className="add-warehouse">
            <button type='button' onClick={()=>navegar("/inventario/crear-almacen")}> Agregar Almacen </button>
                        
         </div>
         
          <div className="search ">
            <input type="text" onChange={onChangeAlmacenFilter} value={almacenFilter} placeholder='buscar...'/>
            <button type="button" ><i className='bx bx-search-alt-2'></i></button>
          </div>
        </div>
      </div>
      <hr />
      <div className="body-categorias">
             <div className="tarjeta-almacen">
              {datosFilterAlmacen.map((c)=>{
                return(
                  <div key={c.id} className="almacen">
                    <div className="first-cate">
                   <h4 className='identificador'>{c.id}</h4>
                      <div className="cont">
                        <div className="titulo">
                        <label htmlFor="">Almacen:</label>
                        <label>{c.nombre.length>15?c.nombre.slice(0,15)+'...':c.nombre}</label>
                        </div>
                        <div className="contenido">
                        <label htmlFor="">Descripcion:</label>
                        <p>{c.descripcion.length>20?c.descripcion.slice(0,20)+"...":c.descripcion}</p>
                        </div>                      
                      </div>
                    </div>
                    
                      <div className="tools">
                      <button onClick={()=>onUpdate(c.id)} className="btn btn-warning btn-sm me-2">
                        <i className='bx bxs-edit-alt' ></i>
                      </button>
                     <button onClick={()=>onDelete(c.id)} className="btn btn-danger btn-sm me">
                        <i className='bx bxs-trash' ></i>
                      </button>
                      </div>
                  </div>
                  
                )
              })}
             </div>
      </div>
      
    </div>
    </>    
  )
}
