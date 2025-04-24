import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateCategoria() {
    const navegar=useNavigate()
    const [Formdata, setFormdata] = useState({
        nombre:"",
        descripcion:""
    })
    const handleText=(e)=>{
        setFormdata({...Formdata,[e.target.name]:e.target.value})
    }
    const SubmitForm=async(e)=>{
        e.preventDefault()
        const datosFormateados={
            ...Formdata,
            nombre:Formdata.nombre.toLowerCase()            
        }
        try{
            await axios.post("http://localhost:4000/api/users/categoria/c",datosFormateados)
            alert("Se creo correctamente la categoria")
            navegar("/cate")
        }catch(e){
            alert("LLenar todos los campos",e)
            //console.error(e.error?.message)
        }
    }
    

  return (
   <>
   <div className="container mt-4">
    <div className="header-categorias">
    <h2>Crear Categoria</h2>
    <button type='button'  onClick={()=>navegar("/cate")}>Regresar</button>
    </div>
    <hr />
    <div className="body-categoria">
    <form onSubmit={SubmitForm}>
        <div className="p-3">
            <label htmlFor="" className=''>Nombre</label> <br />
            <input type="text" className='form-control' onChange={handleText} placeholder='ingrese su nombre' name='nombre'/>            
        </div>
        
        <div className="p-3">
            <label className='' htmlFor="">Descripcion</label> <br />
            <textarea name="descripcion" className='form-control' onChange={handleText} rows={2} id=""></textarea>
            
        </div>
        <div className="w-100 p-3">
            <button type="submit" className='btn btn-primary'>Crear categoria</button>
        </div>
        
    </form>
    </div>
    
   </div>
   </>
  )
}
