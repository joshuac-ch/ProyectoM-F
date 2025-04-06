import React, { useEffect, useState } from 'react'
import "../ventas/hojaventas.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Ventas() {
    const [ventas, setventas] = useState([])
    const FectchVentas=async()=>{
        try{
            const {data}=await axios.get("http://localhost:4000/api/users/venta/g")
            setventas(data)
        }catch(err){
            console.log("Hubo un error",err)
        }
    }
    useEffect(()=>{
        FectchVentas()   
    },[])
    const navegar=useNavigate()
    const onUpdate=(id)=>{
        navegar(`/update-ventas/${id}`)
       }
    const onDelete=async(id)=>{
        const mensaje=window.confirm("Esta seguro de eliminar esta venta?")
        if(mensaje){
            try{
                await axios.delete(`http://localhost:4000/api/users/venta/d/${id}`)
                alert("Se elimino la venta")
                setventas(ventas.filter((v)=>v.id!==id))
            }catch(err){
                alert("Hubo un error al eliminar esta venta",err)
            }
        }
    }
    //Funcion de Detalle Venta
    const [detallv, setdetallv] = useState([])
    const FechtDetalle=async()=>{
        try{
            const {data}=await axios.get("http://localhost:4000/api/users/detalle/g")
            setdetallv(data)
        }catch(err){
            console.error("Hubo un error",err)
        }
    }   
    useEffect(()=>{
        FechtDetalle()
    },[])
  return (
    <>
    <div className="container mt-4">
        <div className="header-ventas">
            <h2>Ventas</h2>
            <div className="header-btn">
            <button type="button" onClick={()=>navegar("/create-ventas")}>Crear venta</button>
            <button type="button" onClick={()=>navegar("/crear-detalle-venta")}>Crear Detalle de Venta</button>
            <button type="button" onClick={()=>navegar("/create-ventas")}>Generar Nota</button>
            <button type="button" onClick={()=>navegar("/create-ventas")}>Generar Boleta</button>
            <button type="button" onClick={()=>navegar("/create-ventas")}>Generar Factura</button>
        </div>
        </div>
        <hr />
        <div className="body-ventas p-3">
            <div className="contenedor-venta">
                {ventas.map((v)=>{
                    return(
                        <div className="venta">
                            <div className="header-venta">
                                <label htmlFor="">Venta Numero:{v.id}</label> 
                                <div className="btn-icon">
                                    <button type="button" onClick={()=>onUpdate(v.id)}><i class='bx bx-edit-alt'></i></button>
                                    <button type="button" onClick={()=>onDelete(v.id)}><i class='bx bx-trash' ></i></button>
                                </div>
                            </div>
                            <div className="body-venta">
                                <label htmlFor="">Total de ventas: {v.total_venta}</label> <br />
                                <label htmlFor="">Fecha: {v.fecha_venta? new Date(v.fecha_venta).toISOString().replace("T"," ").replace(/:\d{2}\.\d{3}Z/,"") :"" }</label> <br />
                                <label htmlFor="">Cliente ID {v.cliente_id}</label><br />
                                <label htmlFor="">Usuario ID {v.usuario_id}</label><br />
                                <label htmlFor="">Almacen ID: {v.almacen_id}</label>
                            </div>   
                        </div>
                    )
                })}
            </div>
        
        </div>
        <hr />
        <h2>Detalle de Venta</h2>
        <div className="contenedor">
            <div className="detalles">
                {detallv.map((d)=>{
                    return(
                        <div className="detalle">
                            <div className="header-detalle">
                                <label htmlFor="">Detalle Numero: {d.id}</label>
                            </div>
                            <div className="body-detalle">
                                <label htmlFor="">Cantidad: {d.cantidad}</label><br />
                                <label htmlFor="">Precio Unitario: {d.precio_unitario}</label><br />
                                <label htmlFor="">Subtotal: {d.subtotal}</label><br />
                                <label htmlFor="">Producto ID: {d.producto_id}</label><br />
                                <label htmlFor="">Venta ID: {d.venta_id}</label><br />
                              

                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
    </>
  )
}
