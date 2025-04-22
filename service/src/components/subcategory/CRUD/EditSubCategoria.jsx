import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FunctionCategoria from '../../hooks/Categoria'

export default function EditSubCategoria() {
    const regresa=useNavigate()
    const {id}=useParams()
    const [subcategoria, setsubcategoria] = useState({
        descripcion:"",
        nombre:"",
        categoria_id:""
    })
    
    useEffect(()=>{
        const FectchSubcategorias=async()=>{
            try{
                const {data}=await axios.get(`http://localhost:4000/api/users/subcategoria/s/${id}`)
                setsubcategoria(data)
            }catch(e){
                alert("hubo un error",e)
            }
        }
        FectchSubcategorias()
    },[id])
    const SumibtSubcate=async(e)=>{
        e.preventDefault()
        try{
            await axios.put(`http://localhost:4000/api/users/subcategoria/u/${id}`,subcategoria)
            alert("Se actualizo la subcategoria")
            regresa("/sub")
        }catch(e){
            alert("Hubo un error no se puede actualizar",e)
        }
    }
    const handleText=(e)=>{
        setsubcategoria({...subcategoria,[e.target.name]:e.target.value})
    }
    const {categoria,FecthCategoria}=FunctionCategoria()
    useEffect(()=>{
      FecthCategoria()
    },[])
  return (
    <>
    <div className="container mt-4">
        <div className="header-subcategoria">
            <h2>Editar Subcategoria</h2>

            <div className="tools-sub">
                <button type="button" onClick={()=>regresa("/sub")} >Regresar</button>
            </div>    
        </div>
        <hr />
        <div className="body-subcate">
        <form onSubmit={SumibtSubcate} >
            <div className="w-100 p-3">
              <label htmlFor="" >Nombre:</label>
              <input type="text" className='form-control' value={subcategoria.nombre} name='nombre' onChange={handleText} placeholder='ingrese su nombre'/> 
            </div>
            <div className=" w-100 p-3">
              <label htmlFor=""  >Descripcion:</label>
              <textarea className='form-control' value={subcategoria.descripcion} name="descripcion" onChange={handleText}  id=""></textarea>
              
            </div>
            <div className=" w-100 p-3">
              <label htmlFor=""  >Categoria ID:</label>
              <select name="categoria_id" onChange={handleText} className='form-control' id="">
                <option value={subcategoria.categoria_id}>ID: {subcategoria.categoria_id}</option>
                <option value="" disabled>Cambiar de categoria</option>
                {categoria.map((c)=>{
                  return(
                    <option key={c.id} value={c.id}>ID: {c.id} || Nombre: {c.nombre}</option>
                  )
                })}
              </select>
              
            </div>
            <div className="input-group p-3">
              <button
                type="submit"
                className="btn btn-primary" >
                Crear Subcategoria
              </button>
              
            </div>
          </form>
        </div>
    </div>
    </>
  )
}
