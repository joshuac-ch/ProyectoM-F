
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FunctionUsuario from '../../hooks/Usuario'
import FuncionClientes from '../../hooks/Clientes'
import FuncionAlmacenes from '../../hooks/Almacenes'
import { axiosInstance } from '../../lib/axios'

export default function CreateVentas() {
   const navegar=useNavigate() 
   const [ventaData, setventaData] = useState({
    total_venta:"",
    cliente_id:"",
    usuario_id:"",
    almacen_id:""
   })
   const SubmitCreateVenta=async(e)=>{
    e.preventDefault()
    //console.log(ventaData)
    try{
        await axiosInstance.post("/venta/c",ventaData)
        alert("Se creo la venta")
        navegar("/ventas")
    }catch(err){
        alert("Hubo un erro al crear el user",err)
    }
   }
   const handleText=(e)=>{
    setventaData({...ventaData,[e.target.name]:e.target.value})
   }
   const {usuario,FectUsuario}=FunctionUsuario()
   const {cliente,FecthCliente}=FuncionClientes()
   const {almacen_id,FectAlmacen_id}=FuncionAlmacenes()
   useEffect(()=>{
    FectUsuario(),FecthCliente(),FectAlmacen_id()
   },[])
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
                    {/*<div className="w-50 p-3">
                        <label htmlFor="">Fecha de la venta</label>
                        <input className='form-control' onChange={handleText} type="datetime-local" name='fecha_venta' />  
                    </div>*/}
                </div>
                <div className="input-group">
                    <div className="w-50 p-3">
                        <label htmlFor="">Cliente ID</label>
                        <select className='form-control' onChange={handleText} name='cliente_id' id="">
                            <option value="" selected disabled>Seleccion el cliente ID</option>
                            {cliente.map((c)=>{
                              return(
                                <option key={c.id} value={c.id}>ID: {c.id} || Nombre: {c.nombre} {c.apellido}</option>
                              )
                            })}
                        </select>
                    </div>
                    <div className="w-50 p-3">
                        <label htmlFor="">Usuario ID</label>
                        
                        <select className='form-control' onChange={handleText} name='usuario_id' id="">
                            <option value="" selected disabled>Seleccion el empleado ID</option>
                            {usuario.map((u)=>{
                              return(
                                <option key={u.id} value={u.id}>ID: {u.id} || Nombre: {u.nombre} {u.apellido}</option>
                              )
                            })}
                        </select>
                    </div>
                    <div className="w-50 p-3">
                        <label htmlFor="">Almacen ID</label>
                        
                        <select className='form-control' onChange={handleText} name='almacen_id' id="">
                            <option value="" selected disabled>Seleccion el almacen ID</option>
                            {almacen_id.map((a)=>{
                              return(
                                <option key={a.id} value={a.id}>ID: {a.id} || Nombre: {a.nombre} </option>
                              )
                            })}
                        </select>
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
