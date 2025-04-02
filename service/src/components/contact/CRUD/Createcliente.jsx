import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Createcliente() {
    const navegar=useNavigate()
    const redirigirCliente=()=>{
         navegar("/contact")
    }
    const [FormData, setFormData] = useState({
        nombre:"",
        apellido:"",
        telefono:"",
        correo:"",
        dirrecion:"",
        tipo_cliente:""
    })
    
    const HandleText=(e)=>{
        setFormData({...FormData,[e.target.name]: e.target.value})
    }
    const SubmitForm=async(e)=>{
        e.preventDefault()
        try{            
           await axios.post("http://localhost:4000/api/users/cliente/c",FormData)
           alert("Se creo el usuario") 
           navegar("/contact")
        }catch(error){
            console.error("Hubo un error", error);
            alert("hubo un error")
        }
    }
    
  return (
   <>
   <div className="contenedor-proveedor container mt-4">
    <div className="header">
        <h2>Nuevo Cliente</h2>
        <div className="header-productos-create"> {/*ESTA CLASE LE PERTENECE A PRODUCTOS */}
            <button type="button" onClick={redirigirCliente} className='btn-crear'>Regresar</button>
        </div>        
    </div>
    <hr />
    <div className="second">
    <form onSubmit={SubmitForm}>
        
        <div class="w-100 p-3">
            <label  class="form-label">Nombre</label>
            <input type="text" placeholder='Ingrese su nombre' onChange={HandleText} name='nombre' class="form-control" />    
        </div>
        <div class="w-100 p-3">
            <label  class="form-label">Apellido</label>
            <input type="test" placeholder='Ingrese su apellido'  onChange={HandleText} name='apellido' class="form-control" />    
        </div> 
        <div class="w-100 p-3">
            <label  class="form-label">Correo</label>
            <input type="email" placeholder='Ingrese su correo'   onChange={HandleText} name='correo' class="form-control" />    
        </div> 
        <div class="w-100 p-3">
            <label  class="form-label">Tipo de cliente</label>
            <input type="text" placeholder='Ingrese su tipo'   onChange={HandleText} name='tipo_cliente' class="form-control" />    
        </div> 
        
        <div class="w-100 p-3">
            <label  class="form-label">Dirrecion</label>
            <input type="text" placeholder='Ingrese su dirrecion'   onChange={HandleText} name='dirrecion' class="form-control" />    
        </div> 
        <div class="w-100 p-3">
            <label  class="form-label">Telefono</label>
            <input type="number" placeholder='Ingrese su telefono'  onChange={HandleText} name='telefono' class="form-control" />    
        </div> 
        
        <div className="d-flex justify-content-center p-3">
            <button type="submit" class="btn btn-primary w-25 p-10">Submit</button>
        </div>
        
    </form>
    </div>
   </div>
   </>
  )
}
