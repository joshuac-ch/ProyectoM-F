import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FuncionAlmacenes from '../../hooks/Almacenes'
import FunctionProducto from '../../hooks/Producto'
import FunctionUsuario from '../../hooks/Usuario'

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
    const {almacen_id,FectAlmacen_id}=FuncionAlmacenes()
    const {producto,FectProdcutos}=FunctionProducto()
    const {FectUsuario,usuario}=FunctionUsuario()
    useEffect(()=>{
        FectAlmacen_id(),
        FectProdcutos(),
        FectUsuario()
    },[])
    const FechaFormateada=(fecha)=>{
        const FechaFormateada=new Date(fecha).toLocaleString('es-PE',{
          timeZone:'America/Lima',
          hour12:true,
          year:'numeric',
          month:'2-digit',
          day:'2-digit',
          hour:'2-digit',
          minute:'2-digit',
          second:'2-digit'
          
        })
        return FechaFormateada
    }
  return (
    <>
    <div className="container mt-4">
        <div className="header-movimiento">
            <h2>Actualizar Movimiento</h2>
            <button type="button" onClick={()=>navegar("/movimientos")}>Regresar</button>
        </div>
        <hr />
        <div className="body-movimiento">
        <form onSubmit={SumbitUpdateMovimiento}  >
            <div className="input-group ">
            <div className="w-50 p-3">
                <label htmlFor="">Cantidad</label>
                <input type="text" className='form-control' value={movimiento.cantidad} onChange={handleText} placeholder='Ingrese cantidad' name='cantidad'/>
            </div>
            <div className="w-50 p-3">
                <label htmlFor="">Fecha Movimiento Actual: {FechaFormateada(movimiento.fecha_movimiento)}</label>
                <input type="datetime-local" className='form-control'  onChange={handleText}  name='fecha_movimiento'/>
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
                <select className='form-control' onChange={handleText} name='almacen_id' id="">
                    <option value={movimiento.almacen_id}>ID: {movimiento.almacen_id} </option>
                    <option value=""  disabled>Cambiar de Almacen</option>
                    {almacen_id.map((a)=>{
                        return(
                            <option value={a.id}>ID: {a.id} || Nombre: {a.nombre}</option>
                        )
                    })}
                </select>
            </div>
            <div className="w-50 p-3">
                <label htmlFor="">Producto ID</label>
                <select className='form-control' onChange={handleText} name='producto_id' id="">
                    <option value={movimiento.producto_id}>ID: {movimiento.producto_id}</option>
                    <option value=""  disabled>Cambiar de Producto</option>
                    {producto.map((p)=>{
                        return(
                            <option value={p.id}>ID: {p.id} || Nombre: {p.nombre}</option>
                        )
                    })}
                </select>    
            </div>
           
            </div>
            <div className="w-50 p-3">
            <label htmlFor="">Usuario ID</label>
            <select className='form-control' onChange={handleText} name='usuario_id' id="">
                    <option value={movimiento.usuario_id}>ID: {movimiento.usuario_id}</option>
                    <option value="" disabled>Cambiar de empleado</option>
                    {usuario.map((u)=>{
                        return(
                            <option value={u.id}>ID: {u.id} || Nombre: {u.nombre}</option>
                        )
                    })}
                </select>
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
