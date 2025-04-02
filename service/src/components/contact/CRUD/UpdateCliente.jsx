import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function UpdateCliente() {
    const {id}=useParams()
    const navegar=useNavigate() 
    
    const [ClienteData, setClienteData] = useState({
        nombre:"",
        apellido:"",
        telefono:"",
        correo:"",
        dirrecion:"",
        tipo_cliente:""
    })    
    useEffect(()=>{
        const UpdateUser=async()=>{
            try{
                const { data }=await axios.get(`http://localhost:4000/api/users/cliente/s/${id}`)
                setClienteData(data)
                
            }catch(err){
                alert("Hubo un error AQUI",err)
            }
        }
        UpdateUser();
    },[id])
    const HandleText=(e)=>{
        setClienteData({...ClienteData,[e.target.name]:e.target.value})
    }
    const SutmitUpdate=async(e)=>{
        e.preventDefault()
        try{
            await axios.put(`http://localhost:4000/api/users/cliente/u/${id}`,ClienteData)
            alert("Se actualizo el contacto")
            navegar("/contact")
        }catch(err){
            alert("hubo un error",err.message)
        }
    }
  return (
   <>
   <div className="container mt-4">
    <div className="header-contact">
        <h2>Editar Contacto</h2>
        <button type="button" onClick={()=>navegar("/contact")}>Regresar</button>
    </div>
    <hr />
    <div className="body-contact">
    <form onSubmit={SutmitUpdate}>
        
        <div class="w-100 p-3">
            <label  class="form-label">Nombre</label>
            <input type="text" placeholder='Ingrese su nombre' value={ClienteData.nombre} onChange={HandleText} name='nombre' class="form-control" />    
        </div>
        <div class="w-100 p-3">
            <label  class="form-label">Apellido</label>
            <input type="text" placeholder='Ingrese su apellido' value={ClienteData.apellido} onChange={HandleText} name='apellido' class="form-control" />    
        </div> 
        <div class="w-100 p-3">
            <label  class="form-label">Correo</label>
            <input type="email" placeholder='Ingrese su correo' value={ClienteData.correo}  onChange={HandleText} name='correo' class="form-control" />    
        </div> 
        <div class="w-100 p-3">
            <label  class="form-label">Tipo de cliente</label>
            <input type="text" placeholder='Ingrese su tipo'  value={ClienteData.tipo_cliente} onChange={HandleText} name='tipo_cliente' class="form-control" />    
        </div> 
        
        <div class="w-100 p-3">
            <label  class="form-label">Dirrecion</label>
            <input type="text" placeholder='Ingrese su dirrecion'  value={ClienteData.dirrecion} onChange={HandleText} name='dirrecion' class="form-control" />    
        </div> 
        <div class="w-100 p-3">
            <label  class="form-label">Telefono</label>
            <input type="number" placeholder='Ingrese su telefono' value={ClienteData.telefono} onChange={HandleText} name='telefono' class="form-control" />    
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
