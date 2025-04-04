import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../CRUD/ESTILOS/detalle.css"
import FunctionVentas from '../../hooks/Ventas'
import FunctionProducto from '../../hooks/Producto'
import axios from 'axios'
export default function CreateDetalleVenta() {
    const navegar=useNavigate()
    const {FecthVenta,venta}=FunctionVentas()
    const {FectProdcutos,producto}=FunctionProducto()
    useEffect(()=>{
        FecthVenta(),FectProdcutos()
    },[]) 
    const [dataDetalle, setdataDetalle] = useState({
        cantidad:"",precio_unitario:"",subtotal:"",producto_id:0,venta_id:0
    })
    const OnsumitDetalleCreate=async(e)=>{
        e.preventDefault()
       
        try{
            await axios.post("http://localhost:4000/api/users/detalle/c",dataDetalle)
            alert("Se creo el detalle de venta")
            navegar("/ventas")
        }catch(err){
            console.error("Hubo un error",err)
        }
    }
    const handleText=(e)=>{
        setdataDetalle({...dataDetalle,[e.target.name]:e.target.value})
    }
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
                    <div className="w-50 p-3">
                        <label htmlFor="">Subtotal</label>
                        <input type="text" className='form-control'  onChange={handleText} placeholder='subtotal' name='subtotal'/>
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
                        <div className='w-100 p-3'>
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
