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
        producto_id:0,almacen_id:0,usuario_id:0,cliente_id:0,total_venta:0
    })
    const [productos, setproductos] = useState([
        {producto_id:"",cantidad:"",precio_unitario:""}
    ])
    const AgregarNuevoProducto=()=>{
        setproductos([...productos,{producto_id:"",cantidad:1,precio_unitario:0}])
    }
    const CalcularSubtotal=(cantidad,precio)=>{
        return parseFloat(cantidad) * parseFloat(precio)
    }
    const CalcularVentaTotal=()=>{
        return productos.reduce((acc,p)=>{
            const subtotal=parseFloat(p.cantidad||0) * parseFloat(p.precio_unitario||0)
            return acc + subtotal 
        },0).toFixed(2)
    }
    useEffect(()=>{
        const total=CalcularVentaTotal()
        setdataDetalle(prev=>({
            ...prev,
            total_venta:total
        }))
    },[productos])
    const EliminarNuevoProducto=(index)=>{
        const eleminiarProducto=[...productos]
        
        eleminiarProducto.splice(index,1)
        
        setproductos(eleminiarProducto)    
    }
    const handleChangeproducto=(i,f,v)=>{
        const nuevosProducots=[...productos]
        nuevosProducots[i][f]=v
        setproductos(nuevosProducots)
    }
    const {almacen_id,FectAlmacen_id}=FuncionAlmacenes()
    const {usuario,FectUsuario}=FunctionUsuario()
    const {cliente,FecthCliente}=FuncionClientes()
    useEffect(()=>{
        FectAlmacen_id(),FectUsuario(),FecthCliente()
    },[])
    const dataCompleta={
        ...dataDetalle,
        productos:productos.map((p)=>({
            ...p,
            cantidad:parseInt(p.cantidad),
            precio_unitario:parseFloat(p.precio_unitario)
        }))
    }    
    const OnsumitDetalleCreate=async(e)=>{
        e.preventDefault()
        console.log(dataCompleta)       
        try{
            await axios.post("http://localhost:4000/api/users/detalle-venta-completo/",dataCompleta)
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
                    </div>
                    <div className="w-100 p-3">                        
                        <h3>Productos</h3>
                            {productos.map((prod, index) => (
                            <div className='input-group lista-productos' key={index}>
                               <div  className="">
                               <label htmlFor="">Lista de productos:</label>
                               <select
                                name="producto_id" className='form-control'
                                value={prod.producto_id}
                                onChange={(e) => handleChangeproducto(index, 'producto_id', e.target.value)}
                                >
                                <option value="">Seleccionar producto</option>
                                {producto.map((p) => (
                                    <option key={p.id} value={p.id}>
                                    {p.nombre}
                                    </option>
                                ))}
                                </select>
                               </div>
                                <div className=" ">
                                <label htmlFor="">Cantidad:</label>
                                <input className='form-control'
                                type="number"
                                name='cantidad'
                                placeholder="Cantidad"
                                value={prod.cantidad}
                                onChange={(e) => handleChangeproducto(index, 'cantidad', e.target.value)}
                                />
                                </div>
                                <div className=" ">
                                    <label htmlFor="">Precio Unitario:</label>
                                <input className='form-control'
                                type="number" step={0.01}
                                placeholder="Precio Unitario"
                                name='precio_unitario'
                                value={prod.precio_unitario}
                                onChange={(e) => handleChangeproducto(index, 'precio_unitario', e.target.value)}
                                />
                                </div>
                                <div className="boton-agregar">
                                <label htmlFor="">Accion:</label><br />
                                <button type="button" className='btn btn-danger' onClick={()=>EliminarNuevoProducto(index)}>Eliminar</button>
                                </div>
                             

                                
                            </div>
                            ))}
                            
                            <button type="button" className='button-agregar' onClick={AgregarNuevoProducto}>+ Producto</button>
                           
                          
                
                    </div>
                   
                    <div className='input-group p-3'>
                            <div className="w-50 p-3">
                                <label htmlFor="">Total de la venta</label>
                                <input type="text" className='form-control' name='venta_total' value={dataDetalle.total_venta}/>
                            </div>
                            {productos.map((p,i)=>{
                                return(
                                 <div key={i} className="w-50 p-3">
                                     <label htmlFor="">Subtotal</label>
                                     <input type="number" readOnly className='form-control'value={CalcularSubtotal(p.cantidad,p.precio_unitario)} name='subtotal' placeholder='ingrese total de la venta' />  
                                </div>
                             )
                            })}
                            
                    
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
                                             
                    </div>
                    
                    <div className="input-group p-3">
                        <div className="p-3">
                        <button type="submit" className='btn btn-primary'>Crear Venta</button>
                    </div>
                    </div>
                
            </form>
        </div>
    </div>
    </>
  )
}
