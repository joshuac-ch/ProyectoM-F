import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function UpdateMovimiento() {
    const navegar=useNavigate()
    const {id}=useParams()
    const [movimiento, setmovimiento] = useState({
            cantidad:"",
            fecha_movimiento:"",
            razon:"",
            tipo_movimiento:"",
            almacen_id:"",
            producto_id:"",
            usuario_id:""
    })
    const handleText=(e)=>{
        setmovimiento({...movimiento,[e.target.name]:e.target.value})
    }  
    useEffect(()=>{
        const FectMovimientos=async()=>{
            try{
                const {data}=await axios.get(`http://localhost:4000/api/users/movimiento/s/${id}`)
                setmovimiento(data)
            }catch(err){
                alert("Hubo un error para mostrar el movimiento",err)
            }
        }     
        FectMovimientos()
    },[id])
    const SumbitUpdateMovimiento=async(e)=>{
        e.preventDefault()
        try{
            await axios.put(`http://localhost:4000/api/users/movimiento/u/${id}`,movimiento)
            alert("Se actualizo el movimiento")
            navegar("/movimientos")
        }catch(err){
            alert("Hubo un error",err)
        }
    }
  return (
    <>
    <div className="container mt-4">
        <div className="header-movimiento">
            <h2>Actualizar Movimiento</h2>
            <button type="button" onClick={()=>navegar("/movimientos")}>Regresar</button>
        </div>
        <div className="body-movimiento">
        <form onSubmit={SumbitUpdateMovimiento}  >
            <div className="input-group ">
            <div className="w-50 p-3">
                <label htmlFor="">Cantidad</label>
                <input type="text" className='form-control' value={movimiento.cantidad} onChange={handleText} placeholder='Ingrese cantidad' name='cantidad'/>
            </div>
            <div className="w-50 p-3">
                <label htmlFor="">Fecha Movimiento</label>
                <input type="datetime-local" className='form-control' value={movimiento.fecha_movimiento? movimiento.fecha_movimiento.split("Z")[0]:""} onChange={handleText}  name='fecha_movimiento'/>
            </div>
            </div>
            <div className="input-group ">
            <div className="w-50 p-3">
                <label htmlFor="">Razon</label>
                <input type="text" className='form-control' value={movimiento.razon} onChange={handleText} placeholder='Ingrese razon' name='razon'/>
            </div>
            <div className="w-50 p-3">
                <label htmlFor="">Tipo de Movimiento</label>
                <input type="text" className='form-control' value={movimiento.tipo_movimiento} onChange={handleText} placeholder='Ingrese el tipo de movimiento' name='tipo_movimiento'/>
            </div>
            </div>
            <div className="input-group ">
            <div className="w-50 p-3">
                <label htmlFor="">Almacen ID</label>
                <input type="text" className='form-control' value={movimiento.almacen_id} onChange={handleText} placeholder='Ingrese el almacen id' name='almacen_id'/>
            </div>
            <div className="w-50 p-3">
                <label htmlFor="">Producto ID</label>
                <input type="text" className='form-control' value={movimiento.producto_id} onChange={handleText} placeholder='Ingrese el producto id' name='producto_id'/>
            </div>
           
            </div>
            <div className="w-50 p-3">
            <label htmlFor="">Usuario ID</label>
            <input type="text" className='form-control' value={movimiento.usuario_id} onChange={handleText} placeholder='Ingrese el usuario id' name='usuario_id'/>
            </div>
            <div className="w-50 p-3">           
            <button type="submit" className='btn btn-primary'>Actualizar Movimiento</button>
            </div>    
        </form>
        </div>
    </div>
    </>
  )
}
