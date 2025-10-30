
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FuncionAlmacenes from '../../hooks/Almacenes'
import FunctionProducto from '../../hooks/Producto'
import FunctionUsuario from '../../hooks/Usuario'
import { axiosInstance } from '../../lib/axios'

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
        await axiosInstance.post("/movimiento/c/",Formmovimiento)
        alert("Se creo el movimiento exitosamente")
        navegar("/movimientos")
    }catch(err){
        alert("No se pudo crear el movimiento",err)
    }
   }
   const {almacen_id,FectAlmacen_id}=FuncionAlmacenes()
   const {producto, FectProdcutos}=FunctionProducto()
   const {usuario,FectUsuario}= FunctionUsuario()
   useEffect(()=>{
    FectAlmacen_id(),
    FectProdcutos(),FectUsuario()
   },[])
  return (
    <>
    <div className="container mt-4">
     <div className="header-movimiento">
         <h2>Crear movimiento</h2>
         <button type="button" onClick={()=>navegar("/movimientos")}>Regresar</button>   
     </div>
     <hr />
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
                <select className='form-control' onChange={handleText} name='almacen_id' id="">
                    <option value="" selected disabled>Selecione un Almacen</option>
                    {almacen_id.map((a)=>{
                        return(
                            <option key={a.id} value={a.id}>ID: {a.id} || Nombre: {a.nombre}</option>
                        )
                    })}
                </select>
            </div>
            <div className="w-50 p-3">
                <label htmlFor="">Producto ID</label>
                <select className='form-control' onChange={handleText} name='producto_id' id="">
                    <option value="" selected disabled>Selecione un Producto</option>
                    {producto.map((p)=>{
                        return(
                            <option key={p.id} value={p.id}>ID: {p.id} || Nombre: {p.nombre}</option>
                        )
                    })}
                </select>
            </div>
           
            </div>
            <div className="w-50 p-3">
            <label htmlFor="">Usuario ID</label>
            <select className='form-control' onChange={handleText} name='usuario_id' id="">
                    <option value="" selected disabled>Selecione un Usuario</option>
                    {usuario.map((u)=>{
                        return(
                            <option key={u.id} value={u.id}>ID: {u.id} || Nombre: {u.nombre}</option>
                        )
                    })}
                </select>
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
