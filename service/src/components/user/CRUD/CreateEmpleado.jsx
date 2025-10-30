import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../CRUD/create.css"

import FuncionAlmacenes from '../../hooks/Almacenes'
import { axiosInstance } from '../../lib/axios'
export default function CreateEmpleado() {
    const redirigir=useNavigate()
    const RegresarUser=()=>{
        redirigir("/user")
    }
    const [formData, setFormData] = useState({
        username:"",
        password:"",
        nombre:"",
        apellido:"",
        correo:"",
        telefono:"",
        direccion:"",
        rol:"",
        almacen_id:""
    })  
    const handleChange=(e)=>{
        setFormData({ ...formData ,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log(formData)
        try{
            await axiosInstance.post("/usuario/c",formData)
            alert("Se creo el usuario")
            redirigir("/user")
        }catch(error){
            console.log("hubo un error",error)
            alert("Hubo un error"+error.response.data.message)
        }
    }
    const {almacen_id,FectAlmacen_id}=FuncionAlmacenes() 
     useEffect(()=>{
        FectAlmacen_id()
     },[])
  return (
   <>
   <div className="container mt-5">
       <div className="header-emple-create">
        <h2>Nuevo empleado</h2>
        <button type="button" onClick={RegresarUser} className='btn-crear'>Regresar</button>        
        </div>
        <hr />
        <div className="content-emple-create">
            <form method='get'  onSubmit={handleSubmit}>
            <div className="input-group ">
                
            <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Nombre</label>
                        <input type="text" onChange={handleChange} name="nombre" className="form-control" placeholder='ingrese nombre'/> 
                    </div>
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Apellido</label>
                        <input type="text" onChange={handleChange} name="apellido" className="form-control" placeholder='ingrese nombre'/> 
                    </div>      
            </div>
            <div className="input-group">
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Username</label>
                        <input type="text" onChange={handleChange} name='username' className="form-control" placeholder='ingrese nombre'/> 
                    </div> 
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Password</label>
                        <input type="text" onChange={handleChange} name='password' className="form-control" placeholder='ingrese username'/> 
                    </div> 
            </div>    
           
           <div className="input-group ">
           <div className="w-50 p-3">
                <label for="" className="form-label">Rol</label>
                <select name="rol" onChange={handleChange}  className='form-control' >
                   <option value="" selected disabled>Seleccionar un rol</option>
                    <option value="administrador">Administrador</option>
                    <option value="vendedor">Vendedor</option>
                </select>                
            </div>
           <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Correo</label>
                        <input type="text" onChange={handleChange} name='correo' className="form-control" placeholder='ingrese username'/> 
                    </div> 
           </div>
           
           <div className="input-group ">
           <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Telefono</label>
                        <input type="text" onChange={handleChange} name='telefono' className="form-control" placeholder='ingrese su telefono'/> 
                    </div> 
           
           <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Dirrecion</label>
                        <input type="text" onChange={handleChange} name='direccion' className="form-control" placeholder='ingrese dirrecion'/> 
                    </div> 
           </div>
           <div className="input-group ">
                     
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Almacen ID</label>
                        
                        <select  onChange={handleChange} name='almacen_id' className="form-control" >
                        <option value="" selected disabled>Seleccionar un Almacen</option>
                            {almacen_id.map((a)=>{
                                return(
                                    <option key={a.id} value={a.id}>ID: {a.id} || Nombre: {a.nombre}</option>
                                )
                            })}
                        </select>
                    </div> 
           </div>
          
            <div className="d-flex justify-content-center">  
                
                <button type="submit" className="btn btn-primary w-25 p-10">Submit</button> 
                
            
            </div>        
            </form>
        </div>
    </div>
   </>
  )
}
