import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../CRUD/create.css"
import axios from 'axios'
import FuncionAlmacenes from '../../hooks/Almacenes'
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
        try{
            await axios.post("http://localhost:4000/api/users/usuario/c",formData)
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
            <form method='get' enctype='multipart/form-data' onSubmit={handleSubmit}>
            <div class="input-group ">
                
            <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Nombre</label>
                        <input type="text" onChange={handleChange} name="nombre" class="form-control" placeholder='ingrese nombre'/> 
                    </div>
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Apellido</label>
                        <input type="text" onChange={handleChange} name="apellido" class="form-control" placeholder='ingrese nombre'/> 
                    </div>      
            </div>
            <div className="input-group">
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Username</label>
                        <input type="text" onChange={handleChange} name='username' class="form-control" placeholder='ingrese nombre'/> 
                    </div> 
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Password</label>
                        <input type="text" onChange={handleChange} name='password' class="form-control" placeholder='ingrese username'/> 
                    </div> 
            </div>    
           
           <div className="input-group ">
           <div class="w-50 p-3">
                <label for="" class="form-label">Rol</label>
                <select name="rol" onChange={handleChange}  className='form-control' id="">
                    <option value="">Seleccionar un rol</option>
                    <option value="administrador">administrador</option>
                    <option value="vendedor">vendedor</option>
                </select>                
            </div>
           <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Correo</label>
                        <input type="text" onChange={handleChange} name='correo' class="form-control" placeholder='ingrese username'/> 
                    </div> 
           </div>
           
           <div className="input-group ">
           <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Telefono</label>
                        <input type="text" onChange={handleChange} name='telefono' class="form-control" placeholder='ingrese su telefono'/> 
                    </div> 
           
           <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Dirrecion</label>
                        <input type="text" onChange={handleChange} name='direccion' class="form-control" placeholder='ingrese dirrecion'/> 
                    </div> 
           </div>
           <div className="input-group ">
                     
           <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Almacen ID</label>
                        <select  onChange={handleChange} name='almacen_id' class="form-control"  id="">
                            {almacen_id.map((a)=>{
                                return(
                                    <option value={a.id}>ID: {a.id} || Nombre: {a.nombre}</option>
                                )
                            })}
                        </select>
                    </div> 
           </div>
          
            <div className="d-flex justify-content-center">  
                
                <button type="submit" class="btn btn-primary w-25 p-10">Submit</button> 
                
            
            </div>        
            </form>
        </div>
    </div>
   </>
  )
}
