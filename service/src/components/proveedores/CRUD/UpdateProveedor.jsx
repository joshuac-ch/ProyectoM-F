import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "../CRUD//estilos/create.css"
import axios from 'axios'
export default function UpdateProveedor() {
    const navegar=useNavigate()
    const {id}=useParams()
    const [proveedor, setproveedor] = useState({
        nombre:"",apellido:"",correo:"",direccion:"",telefono:"",ruc:"",empresa:""
    })
    const handleText=(e)=>{
        setproveedor({...proveedor,[e.target.name]:e.target.value})
    }
    useEffect(()=>{
        const ShowProveedores=async()=>{
            try{
                const {data}=await axios.get(`http://localhost:4000/api/users/proveedor/s/${id}`)
                setproveedor(data)
            }catch(e){
                alert("Hubo un error la mostrar el proveedor",e)
            }
        }
        ShowProveedores()
    },[id])
    const SubmitUpdateProveedores=async(e)=>{
        e.preventDefault()
        try{
            await axios.put(`http://localhost:4000/api/users/proveedor/u/${id}`,proveedor)
            alert("Se actualizo el proveedor exitosamente")
            navegar("/proveedores")
        }catch(err){
            alert("Hubo un error: ",err)
        }

    }
  return (
    <>
    <div className="container mt-4">
        <div className="header-proveedor">
            <h1>Actualizar Proveedor</h1>
            <button type="button" onClick={()=>navegar("/proveedores")}>Regresar</button>
        </div>
        <hr />
        <div className="body-proveedor">
        <form onSubmit={SubmitUpdateProveedores}>
        <div className="input-group">
        <div className="w-50 p-3">
            <label  className="form-label">Nombre</label>
            <input type="text" name='nombre' value={proveedor.nombre} onChange={handleText} className="form-control" />    
        </div> 
        <div className="w-50 p-3">
            <label  className="form-label">Apellido</label>
            <input type="text" name='apellido' value={proveedor.apellido} onChange={handleText} className="form-control" />    
        </div> 
        </div>
        <div className="input-group">
        <div className="w-50 p-3">
            <label  className="form-label">Correo</label>
            <input type="email" name='correo' value={proveedor.correo} onChange={handleText} className="form-control" />    
        </div> 
        <div className="w-50 p-3">
            <label  className="form-label">Direccion</label>
            <input type="text" name='direccion' value={proveedor.direccion} onChange={handleText} className="form-control" />    
        </div> 
        </div>
        <div className="input-group">
        <div className="w-50 p-3">
            <label  className="form-label">Compañia</label>
            <input type="text" name='empresa' value={proveedor.empresa} onChange={handleText} className="form-control" />    
        </div> 
        <div className="w-50 p-3">
            <label  className="form-label">Telefono</label>
            <input type="number" name='telefono' value={proveedor.telefono} onChange={handleText} className="form-control" />    
        </div> 
        </div>
        <div className="p-3">
            <label  className="form-label">RUC</label>
            <input type="text" name='ruc' value={proveedor.ruc} onChange={handleText} className="form-control" />    
        </div>
        <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary w-25 p-10">Actualizar proveedor</button>
        </div>
        
    </form>
        </div>
    </div>
    </>
  )
}
