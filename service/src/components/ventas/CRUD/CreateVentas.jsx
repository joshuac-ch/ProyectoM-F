import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateVentas() {
   const navegar=useNavigate() 
   const [ventaData, setventaData] = useState({
    total_venta:"",
    fecha_venta:"",
    cliente_id:"",
    usuario_id:"",
   })
   const SubmitCreateVenta=async(e)=>{
    e.preventDefault()
    try{
        await axios.post("http://localhost:4000/api/users/venta/c",ventaData)
        alert("Se creo la venta")
        navegar("/ventas")
    }catch(err){
        alert("Hubo un erro al crear el user",err)
    }
   }
   const handleText=(e)=>{
    setventaData({...ventaData,[e.target.name]:e.target.value})
   }
   
   return (
    <>
    <div className="container mt-4">
        <div className="header-ventas">
            <h2>Crear nueva Venta</h2>
            <button type='button' onClick={()=>navegar("/ventas")}>Regresar</button>
        </div>
        <hr />
        <div className="body-ventas">
            <form action="" onSubmit={SubmitCreateVenta}>
                <div className="input-group">
                    <div className="w-50 p-3">
                        <label htmlFor="">Total de la venta</label>
                        <input type="text" className='form-control' onChange={handleText} name='total_venta' placeholder='ingrese total de la venta' />  
                    </div>
                    <div className="w-50 p-3">
                        <label htmlFor="">Fecha de la venta</label>
                        <input className='form-control' onChange={handleText} type="datetime-local" name='fecha_venta' />  
                    </div>
                </div>
                <div className="input-group">
                    <div className="w-50 p-3">
                        <label htmlFor="">Cliente ID</label>
                        <input type="number" className='form-control' onChange={handleText} name='cliente_id' placeholder='ingrese cliente ID' />  
                    </div>
                    <div className="w-50 p-3">
                        <label htmlFor="">Usuario ID</label>
                        <input className='form-control' type='number' onChange={handleText} placeholder='ingrese usuario ID' name='usuario_id' />  
                    </div>
                </div>
                <div className="input-group">
                    <div className="w-100 p-3">
                        <button type="submit" className='btn btn-primary'>Crear Venta</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}
