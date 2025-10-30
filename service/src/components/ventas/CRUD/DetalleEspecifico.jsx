
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FunctionProducto from '../../hooks/Producto'
import FunctionVentas from '../../hooks/Ventas'
import "../hojaventas.css"
import FuncionCajas from '../../hooks/Cajas'
import { QRCodeCanvas } from 'qrcode.react';
import FuncionFecha from '../../hooks/FuncionFecha'
import { axiosInstance } from '../../lib/axios'
export default function DetalleEspecifico() {
    
    const navegar=useNavigate()
    
    const {id}=useParams()
    const [detalle, setdetalle] = useState([])
    const {producto,FectProdcutos} =FunctionProducto()
    const {venta,FecthVenta}=FunctionVentas()
    //const [numeroVenta, setnumeroVenta] = useState(123456)
    const {FechaFormateada}=FuncionFecha()
   const TotalCalculadoSubtotal =detalle.reduce((acc,d)=>{
    return acc+parseFloat(d.subtotal)
   },0) 
   
   useEffect(()=>{
        FectProdcutos(),FecthVenta()
    },[])
   
    useEffect(()=>{
        const MostrarDetalleEspecifico=async()=>{
            try{                
                const {data} =await axiosInstance.get(`/detalle-especifico/${id}`)
                setdetalle(data)
            }catch(err){
                console.error("Hubo un error",err)
            }
        }    
        MostrarDetalleEspecifico()
    },[id])
    const TotalCalculadoVenta=venta.reduce((acc,v)=>{
        return acc + parseFloat(v.total_venta)
    },0)
    const FechaVenta = (() => {
        if (detalle.length === 0) return null;
        const ventaEncontrada = venta.find(v => v.id === detalle[0].venta_id);
        return ventaEncontrada ? ventaEncontrada.fecha_venta : null;
      })();
    const Metodo_Pago=(()=>{
        if(detalle.length===0) return null
        const dataMetodoPago=venta.find((v)=>v.id===detalle[0].venta_id)
        return dataMetodoPago 
    })()  
  return (
   <>
   <div className="container mt-4">
    <div className="header-detalle">
        <button type="button" onClick={()=>window.print()}>🖨️ Inprimir boleta</button>
        <button type="button" onClick={()=>navegar("/ventas")}>Regresar</button>
        
    </div>
   <div id="imprimir-boleta">
   <div className="body-detalle-venta1">
            <div className="detalles-venta">     
                        <h3>Nota de pedido</h3>
                        <label htmlFor="">Tienda de licores santa anita</label> <br />
                        <label htmlFor=""> RUC: 123456789-9</label>
                        <hr />

                        {detalle.map((de)=>{
                            const data_producto=producto.find((p)=>p.id===de.producto_id)                  

                            return(
                                <div key={de.id} className="detalle-venta">                               
                                <div className="body-detalle-venta">
                                    <div className="nombre-producto">
                                    <label >{data_producto.nombre}</label> 
                                    <p> S/. {parseFloat(de.precio_unitario).toFixed(2)}</p>
                                    </div>                                    
                                    <div className='cantidad-producto'>
                                        <label htmlFor="">Cantidad:</label>
                                        <p> {de.cantidad}</p>
                                    </div>
                                    <hr />                          
                                </div>
                                
                            </div>

                            )
                        })}                     
                       
                          
                           
                           {Metodo_Pago && (
                                <div className="mt-4 text-start metodo">
                                   <div className='tipo_pago'>
                                    <label>Metodo de pago: </label><p>{Metodo_Pago.metodo_pago}</p>
                                   </div>
                                   <div>
                                    <label htmlFor="">Descripcion: </label>
                                    <p>{Metodo_Pago.descripcion_pago?Metodo_Pago.descripcion_pago:"..."}</p>              
                                    </div>            
                                </div>)}                                           
                        
                        <hr />
                        <div className="mt-4 text-end">
                            {(() => {
                            const subtotal = detalle.reduce((acc, item) => acc + parseFloat(item.subtotal), 0);
                            //const igv = subtotal * 0.18;
                            const igvactual=0
                            const total = subtotal + igvactual;

                            return (
                                <>
                                <p>Subtotal: <strong>S/.{subtotal.toFixed(2)}</strong></p>
                                <p>IGV (18%): <strong>S/.{igvactual.toFixed(2)}</strong></p>
                                <p>Total a pagar: <strong>S/.{total.toFixed(2)}</strong></p>
                                </>
                            );
                            })()}
                        </div>
                        
                        <div className="foot-detalle">
                            <QRCodeCanvas value={`Venta N° ${FechaVenta}:V${id}`} size={128} />
                            <br />
                            <label htmlFor="">Representacion impresa de nota de pedido electronica de NK</label>
                            <div className="codigo-barras">
                              
                               <hr />
                            </div>
                            <div className="fecha-fin">
                                {FechaVenta&&
                                            (
                                               <div className='fecha-emitida'>
                                                <p><strong>Fecha emision:</strong> </p>
                                                <p><strong>{FechaFormateada(FechaVenta)}</strong></p>
                                               </div>

                                            )                                   
                                }                            
                                
                       
                               
                            </div>
                        </div>                        
                            
                            
                        
                    
            </div>
    </div>
   </div>
   </div>
   </>
  )
}
