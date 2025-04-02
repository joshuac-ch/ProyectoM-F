import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function UpdateCategoria() {
    const navegar=useNavigate()
    const [categoria, setcategoria] = useState({
        nombre:"",
        descripcion:""
    })
    const handleText=(e)=>{
        setcategoria({...categoria,[e.target.name]:e.target.value})
    }
    
    const {id}=useParams()
    useEffect(()=>{       
        const fectchCategoria=async()=>{
        try{
            const {data}=await axios.get(`http://localhost:4000/api/users/categoria/u/${id}`)
            setcategoria(data)            
        }catch(e){
            alert("Hubo un error",e)
        }
    }
    fectchCategoria()
    },[id])
    const FormUpdate=async(e)=>{
          e.preventDefault()
          try{
            await axios.put(`http://localhost:4000/api/users/categoria/up/${id}`,categoria)
            alert("Se actualizo la categoria")
            navegar("/cate")
          }
          catch(e){
            alert("Hubo un error",e)
          } 
    }
  return (
    <>
    <div className="container mt-4">
        <div className="header-categorias">
            <h2>Actualizar Categoria</h2>
            <button type='button'  onClick={()=>navegar("/cate")}>Regresar</button>
        </div>
        <hr />
        <div className="body-categorias">
        <form onSubmit={FormUpdate}>
            <div className="p-3">
                <label htmlFor="" className=''>Nombre</label> <br />
                <input type="text" className='form-control' value={categoria.nombre} onChange={handleText} placeholder='ingrese su nombre' name='nombre'/>            
            </div>
        
            <div className="p-3">
                <label className='' htmlFor="">Descripcion</label> <br />
                <textarea name="descripcion" className='form-control' value={categoria.descripcion} onChange={handleText} rows={2} id=""></textarea>
            </div>
            <div className="input-group p-3">
                <button type="submit" className='btn btn-primary'>Actualizar datos</button>
            </div>        
        </form>
        </div>
       
    </div>
    </>
  )
}
