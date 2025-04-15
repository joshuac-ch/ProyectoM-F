import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../category/CRUD/ESTILOS/hoacate.css"
import { useNavigate } from 'react-router-dom'
import FuncionDelimitar from '../hooks/Delimitar'
export default function Category() {
  const [categoria, setcategoria] = useState([])
  const GetCategoria=async()=>{
    try{
      const {data}=await axios.get("http://localhost:4000/api/users/categoria/s")
      setcategoria(data)
    }catch(e){
      console.log("hubo un error",e.message)
    }
  }
  useEffect(()=>{
    GetCategoria()
  },[]) 
  const navegar=useNavigate() 
  const RedirigirUpdate=(id)=>{
    if(FuncionDelimitar("editar")){
     navegar(`/update-cate/${id}`) 
    }else{
      alert("Solo personal autorizado")
    }
}
  const OndeleteCategoria=async(id)=>{
    if(FuncionDelimitar("eliminar")){        
    const mensaje=window.confirm("Estas seguro que quieres eliminar esta categoria")
    if(mensaje){
      try{
        await axios.delete(`http://localhost:4000/api/users/categoria/d/${id}`)
        alert("Se elimino correctamente a la categoria")
        setcategoria(categoria.filter((e)=>e.id!==id))
        
      }catch(e){  
        alert("Hubo un error al eliminar esta categoria",e)
      }
    }
    }else{
      alert("Solo personal autorizado")
    }
  }
  
  return (
    <>
    <div className="container mt-4">
      <div className="header-categorias">
        <h1>Categorias</h1>
        <button type="button" onClick={()=>navegar("/create-cate")}>Nueva Categoria</button>
      </div>
      <hr />
      <div className="body-categorias">
             <div className="tarjeta-cate">
              {categoria.length===0?(
                <div className='not-found-categoria'>
                  <p>No se encontro ninguna categoria</p>
                </div>
              ):
              categoria.map((c)=>{
                return(
                  <div id='c.id' className="categoria1">
                    <div className="first-cate">
                   <h4 className='identificador'>{c.id}</h4>
                      <div className="cont">
                        <div className="titulo">
                        <label htmlFor="">Categoria:</label>
                        <p>{c.nombre}</p>
                        </div>
                        <div className="contenido">
                        <label htmlFor="">Descripcion:</label>
                        <p>{c.descripcion.length>20?c.descripcion.slice(0,20)+'....':c.descripcion}</p>
                        </div>                      
                      </div>
                    </div>
                    
                      <div className="tools">
                      <button onClick={()=>RedirigirUpdate(c.id)} className="btn btn-warning btn-sm me-2">
                        <i class='bx bxs-edit-alt' ></i>
                      </button>
                     <button onClick={()=>OndeleteCategoria(c.id)} className="btn btn-danger btn-sm me">
                        <i class='bx bxs-trash' ></i>
                      </button>
                      </div>
                  </div>
                  
                )
              })
              }
             </div>
      </div>
    </div>
    </>
  )
}
