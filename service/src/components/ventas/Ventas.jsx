import React, { useEffect, useState } from 'react'
import "../ventas/hojaventas.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import FuncionDelimitar from '../hooks/Delimitar'
import FuncionFecha from '../hooks/FuncionFecha'
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
        if(FuncionDelimitar("editar")){
            navegar(`/update-ventas/${id}`)
        }else{
            alert("Solo personal autorizado")
        }        
       }
    const onDelete=async(id)=>{
        if(FuncionDelimitar("eliminar")){
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
        }else{
            alert("Solo personal autorizado")
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
    const redirigirDetalle=(id)=>{
        navegar(`/detalle-especifico/${id}`)
    }
    const ProximoAVANCE=()=>{
        alert("Sigue en desarrollo")
    }
    const Reportes=()=>{
        if(ventas.length==0){
            alert("No hay suficientes datos para mostrar el reporte")
        }else{
            navegar("/reporte-mensual")
        }
       
    }
    const {FechaFormateada}=FuncionFecha()   
  return (
    <>
    <div className="container mt-4">
        <div className="header-ventas">
            <h2>Ventas</h2>
            <div className="header-btn">
            
            <button type="button" onClick={()=>navegar("/crear-detalle-venta")}>Crear Detalle de Venta</button>
            <button type='button' onClick={Reportes}>Reportes</button>
            <button type="button" onClick={ProximoAVANCE}>Generar Boleta</button>
            <button type="button" onClick={ProximoAVANCE}>Generar Factura</button>
            
        </div>
        </div>
        <hr />
        <div className="body-ventas p-3">
            <div className="contenedor-venta">
                {ventas.length===0?(
                    <div className="not-found-ventas">
                        <p >No se encontro ninguna venta</p>
                    </div>
                ):ventas.sort((a,b)=>b.id-a.id)
                .map((v)=>{
                    return(
                        <div className="venta container mt-4">
                            <div className="header-venta">
                                <label htmlFor="">Venta Numero:{v.id}</label> 
                                <div className="btn-icon">
                                    <button type="button" onClick={()=>onUpdate(v.id)}><i className='bx bx-edit-alt'></i></button>
                                    <button type="button" onClick={()=>onDelete(v.id)}><i className='bx bx-trash' ></i></button>
                                    <button type="button" onClick={()=>redirigirDetalle(v.id)}><i className='bx bx-notepad'></i></button>
                                </div>
                            </div>
                            <div className="body-venta">
                                <label htmlFor="">Total de ventas: S/.{v.total_venta.toFixed(2)}</label> <br />
                                <label htmlFor="">Fecha: {FechaFormateada(v.fecha_venta)}</label> <br />
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
        {/*
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
        */}
    </div>
    </>
  )
}
