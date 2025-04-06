import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../CRUD/ESTILOS/detalle.css"
import FunctionVentas from '../../hooks/Ventas'
import FunctionProducto from '../../hooks/Producto'
import axios from 'axios'
import FuncionAlmacenes from '../../hooks/Almacenes'
import FunctionUsuario from '../../hooks/Usuario'
import FuncionClientes from '../../hooks/Clientes'
export default function CreateDetalleVenta() {
    const navegar=useNavigate()
    const {FecthVenta,venta}=FunctionVentas()
    const {FectProdcutos,producto}=FunctionProducto()
    useEffect(()=>{
        FecthVenta(),FectProdcutos()
    },[]) 
    const [dataDetalle, setdataDetalle] = useState({
        cantidad:"",precio_unitario:"",producto_id:0,almacen_id:0,usuario_id:0,cliente_id:0,total_venta:0
    })
    const {almacen_id,FectAlmacen_id}=FuncionAlmacenes()
    const {usuario,FectUsuario}=FunctionUsuario()
    const {cliente,FecthCliente}=FuncionClientes()
    useEffect(()=>{
        FectAlmacen_id(),FectUsuario(),FecthCliente()
    },[])
    const OnsumitDetalleCreate=async(e)=>{
        e.preventDefault()
        console.log(dataDetalle)     
        try{
            await axios.post("http://localhost:4000/api/users/detalle-venta-completo/",dataDetalle)
            alert("Se creo el detalle de venta")
            navegar("/ventas")
        }catch(err){
            console.error("Hubo un error",err.response?.data || err.message)
        }
    }
    const handleText=(e)=>{
        setdataDetalle({...dataDetalle,[e.target.name]:e.target.value})
    }
    //const valorSubtotal=dataDetalle.cantidad* dataDetalle.precio_unitario 
  return (
    <>
    <div className="container mt-4">
        <div className="header-detalle">
            <h2>Detalle de Venta</h2>
            <button type="button" onClick={()=>navegar("/ventas")}>Regresar</button>
        </div>
        <div className="body-detaller">
            <form onSubmit={OnsumitDetalleCreate}>
                <div className='input-group p-3' >
                    <div className="w-50 p-3">
                        <label htmlFor="">Cantidad</label>
                        <input type="number" className='form-control' onChange={handleText} placeholder='Ingrese Cantidad' name='cantidad'/>
                    </div>
                    <div className="w-50 p-3">
                        <label htmlFor="">Precio Unitario</label>
                        <input type="number" className='form-control'  onChange={handleText} placeholder='Ingrese precio unitario' step={0.01} name='precio_unitario'/>
                    </div>
                </div>
                <div className='input-group p-3'>
                    {<div className="w-50 p-3">
                        <label htmlFor="">Subtotal</label>
                        <input type="text" className='form-control' value={dataDetalle.precio_unitario*dataDetalle.cantidad} onChange={handleText} placeholder='subtotal' name='subtotal'/>
                    </div>}
                      <div className="w-50 p-3">
                        <label htmlFor="">Total de la venta</label>
                        <input type="text" className='form-control' onChange={handleText} name='total_venta' placeholder='ingrese total de la venta' />  
                    </div>
                     <div className="w-50 p-3">
                        <label htmlFor="">Cliente ID</label>
                        <select name="cliente_id"  onChange={handleText} className='form-control' id="">
                            <option value="" selected disabled>Seleccion del cliente ID</option>
                            {cliente.map((c)=>{
                                return(
                                    <option value={c.id}>ID: {c.id} || Nombre: {c.nombre}</option>
                                )
                            })}
                        </select>
                       
                    </div>
                    <div className="w-50 p-3">
                        <label htmlFor="">Producto ID</label>
                        <select name="producto_id"  onChange={handleText} className='form-control' id="">
                            <option value="" selected disabled>Seleccion el producto ID</option>
                            {producto.map((p)=>{
                                return(
                                    <option value={p.id}>ID: {p.id} || Nombre: {p.nombre}</option>
                                )
                            })}
                        </select>
                       
                    </div>
                </div>
                <div className="input-group p-3">
                        {/*
                        <div className='w-50 p-3'>
                        <label htmlFor="">Venta ID</label>
                        <select name="venta_id"  onChange={handleText} className='form-control' id="">
                            <option value="" selected disabled>Seleccion la venta ID</option>
                            {venta.map((v)=>{
                                return(
                                    <option value={v.id}>Venta Numero: {v.id} </option>
                                )
                            })}
                        </select>
                        </div>
                        */}
                        <div className='w-50 p-3'>
                        <label htmlFor="">Almacen ID</label>
                        <select name="almacen_id"  onChange={handleText} className='form-control' id="">
                            <option value="" selected disabled>Seleccion la tienda ID</option>
                            {almacen_id.map((a)=>{
                                return(
                                    <option value={a.id}>ID: {a.id} || Nombre: {a.nombre} </option>
                                )
                            })}
                        </select>
                        </div>                          
                    </div>
                    <div className="input-group p-3">
                    <div className='w-50 p-3'>
                        <label htmlFor="">Usuario ID</label>
                        <select name="usuario_id"  onChange={handleText} className='form-control' id="">
                            <option value="" selected disabled>Seleccion del Empleado ID</option>
                            {usuario.map((u)=>{
                                return(
                                    <option value={u.id}>ID: {u.id} || Nombre: {u.nombre} </option>
                                )
                            })}
                        </select>
                        </div>      

                    </div>
                    <div className="input-group p-3">
                        <div className="p-3">
                        <button type="submit" className='btn btn-primary'> Enviar</button>
                    </div>
                    </div>
                
            </form>
        </div>
    </div>
    </>
  )
}
