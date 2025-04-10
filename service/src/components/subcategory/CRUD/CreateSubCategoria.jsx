import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FunctionCategoria from '../../hooks/Categoria'

export default function CreateSubCategoria() {
  const back=useNavigate()
  const [formData, setformData] = useState({
    descripcion:"",
    nombre:"",
    categoria_id:""
  })
  const handleText=(e)=>{
    setformData({...formData,[e.target.name]:e.target.value})
  }
  const SubmitData=async(e)=>{
    e.preventDefault()
    try{
      await axios.post("http://localhost:4000/api/users/subcategoria/c/",formData)
      alert("Se creo correctamente la subcategoria")
      back("/sub")
    }catch(e){
      alert("Llenar todas las columnas",e)
    }
  }
  const {categoria,FecthCategoria}=FunctionCategoria()
  useEffect(()=>{
    FecthCategoria()
  },[])
  return (
    <>
      <div className="container mt-4">
        <div className="header-subcategoria">
          <h2>Crear Subcategoria</h2>
          <div className="tools-sub">
            <button onClick={()=>back("/sub")}>Regresar</button>
          </div>
        </div>
        <hr />
        <div className="body-subcategoria">
          <form onSubmit={SubmitData}>
            <div className="w-100 p-3">
              <label htmlFor="" >Nombre:</label>
              <input type="text" className='form-control' name='nombre' onChange={handleText} placeholder='ingrese su nombre'/> 
            </div>
            <div className=" w-100 p-3">
              <label htmlFor=""   >Descripcion:</label>
              <textarea  name="descripcion" className='form-control' onChange={handleText} id=""></textarea>
              
            </div>
            <div className=" w-100 p-3">
              <label htmlFor=""  >Categoria ID:</label>
              <select name="categoria_id" onChange={handleText} className='form-control' id="">
                <option value="" disabled selected>Seleecionar una categoria</option>
                {categoria.map((c)=>{
                  return(
                    <option value={c.id}>ID: {c.id} || Nombre: {c.nombre}</option>
                  )
                })}
              </select>
             
            </div>
            <div className="input-group p-3">
              <button
                type="submit"
                class="btn btn-primary" >
                Crear Subcategoria
              </button>
              
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
