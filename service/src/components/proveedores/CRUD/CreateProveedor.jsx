import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateProveedor() {
    const navegar=useNavigate()
    const regresarPrincipal=()=>{
            navegar("/proveedores")
    }
    const [FormProveedor, setFormProveedor] = useState({
        telefono:"",
        nombre:"",
        apellido:"",
        ruc:"",
        empresa:"",
        direccion:"",
        correo:""
    })
    const handleText=(e)=>{
        setFormProveedor({...FormProveedor,[e.target.name]:e.target.value})
    }
    const SubmitProveedor=async(e)=>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:4000/api/users/proveedor/c",FormProveedor)
            alert("Se creo correctamente el proveedor")
            navegar("/proveedores")
        }catch(err){
            alert("hubo un error",err)
        }
    }
  return (
   <>
   <div className="contenedor-proveedor container mt-4">
    <div className="header">
        <h2>Nuevo proveedor</h2>
        <div className="header-productos-create"> {/*ESTA CLASE LE PERTENECE A PRODUCTOS */}
            <button type="button" onClick={regresarPrincipal} className='btn-crear'>Regresar</button>
        </div>        
    </div>
    <hr />
    <div className="second">
    <form onSubmit={SubmitProveedor}>
        <div className="input-group">
        <div class="w-50 p-3">
            <label  class="form-label">Nombre</label>
            <input type="text" name='nombre' onChange={handleText} class="form-control" />    
        </div> 
        <div class="w-50 p-3">
            <label  class="form-label">Apellido</label>
            <input type="text" name='apellido' onChange={handleText} class="form-control" />    
        </div> 
        </div>
        <div className="input-group">
        <div class="w-50 p-3">
            <label  class="form-label">Correo</label>
            <input type="email" name='correo' onChange={handleText} class="form-control" />    
        </div> 
        <div class="w-50 p-3">
            <label  class="form-label">Direccion</label>
            <input type="text" name='direccion' onChange={handleText} class="form-control" />    
        </div> 
        </div>
        <div className="input-group">
        <div class="w-50 p-3">
            <label  class="form-label">Compañia</label>
            <input type="text" name='empresa' onChange={handleText} class="form-control" />    
        </div> 
        <div class="w-50 p-3">
            <label  class="form-label">Telefono</label>
            <input type="number" name='telefono' onChange={handleText} class="form-control" />    
        </div> 
        </div>
        <div className="p-3">
            <label  class="form-label">RUC</label>
            <input type="text" name='ruc' onChange={handleText} class="form-control" />    
        </div>
        <div className="d-flex justify-content-center">
            <button type="submit" class="btn btn-primary w-25 p-10">Crear proveedor</button>
        </div>
        
    </form>
    </div>
   </div>
   </>
  )
}
