import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateMovimiento() {
  const [Formmovimiento, setFormmovimiento] = useState({
    cantidad:"",
    fecha_movimiento:"",
    razon:"",
    tipo_movimiento:"",
    almacen_id:"",
    producto_id:"",
    usuario_id:""
  })
   const navegar=useNavigate()
   const handleText=(e)=>{
    setFormmovimiento({...Formmovimiento,[e.target.name]:e.target.value})
   }
   const SubmitCreateMovimiento=async(e)=>{
    e.preventDefault()
    try{
        await axios.post("http://localhost:4000/api/users/movimiento/c/",Formmovimiento)
        alert("Se creo el movimiento exitosamente")
        navegar("/movimientos")
    }catch(err){
        alert("No se pudo crear el movimiento",err)
    }
   }
  return (
    <>
    <div className="container mt-4">
     <div className="header-movimiento">
         <h2>Crear movimiento</h2>
         <button type="button" onClick={()=>navegar("/movimientos")}>Regresar</button>   
     </div>
     <div className="body-movimiento">
        <form onSubmit={SubmitCreateMovimiento} >
            <div className="input-group ">
            <div className="w-50 p-3">
                <label htmlFor="">Cantidad</label>
                <input type="text" className='form-control' onChange={handleText} placeholder='Ingrese cantidad' name='cantidad'/>
            </div>
            <div className="w-50 p-3">
                <label htmlFor="">Fecha Movimiento</label>
                <input type="datetime-local" className='form-control' onChange={handleText} placeholder='Ingrese cantidad' name='fecha_movimiento'/>
            </div>
            </div>
            <div className="input-group ">
            <div className="w-50 p-3">
                <label htmlFor="">Razon</label>
                <input type="text" className='form-control' onChange={handleText} placeholder='Ingrese razon' name='razon'/>
            </div>
            <div className="w-50 p-3">
                <label htmlFor="">Tipo de Movimiento</label>
                <input type="text" className='form-control' onChange={handleText} placeholder='Ingrese el tipo de movimiento' name='tipo_movimiento'/>
            </div>
            </div>
            <div className="input-group ">
            <div className="w-50 p-3">
                <label htmlFor="">Almacen ID</label>
                <input type="text" className='form-control' onChange={handleText} placeholder='Ingrese el almacen id' name='almacen_id'/>
            </div>
            <div className="w-50 p-3">
                <label htmlFor="">Producto ID</label>
                <input type="text" className='form-control' onChange={handleText} placeholder='Ingrese el producto id' name='producto_id'/>
            </div>
           
            </div>
            <div className="w-50 p-3">
            <label htmlFor="">Usuario ID</label>
            <input type="text" className='form-control' onChange={handleText} placeholder='Ingrese el usuario id' name='usuario_id'/>
            </div>
            <div className="w-50 p-3">           
            <button type="submit" className='btn btn-primary'>Crear Movimiento</button>
            </div>    
        </form>
     </div>
     </div>
    </>
  )
}
