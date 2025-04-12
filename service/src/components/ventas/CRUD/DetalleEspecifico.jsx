import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FunctionProducto from '../../hooks/Producto'
import FunctionVentas from '../../hooks/Ventas'
import "../hojaventas.css"
import FuncionCajas from '../../hooks/Cajas'

export default function DetalleEspecifico() {
    
    const navegar=useNavigate()
    const [FormDataDetalle, setFormDataDetalle] = useState({        
            id:"",
            cantidad:"",
            precio_unitario:"",
            subtotal:"",
            producto_id:"",
            venta_id:""
       
    })
    const {id}=useParams()
    const [detalle, setdetalle] = useState([])
    const {producto,FectProdcutos} =FunctionProducto()
    const {venta,FecthVenta}=FunctionVentas()
    
   const TotalCalculadoSubtotal =detalle.reduce((acc,d)=>{
    return acc+parseFloat(d.subtotal)
   },0) 
   
   useEffect(()=>{
        FectProdcutos(),FecthVenta()
    },[])
   
    useEffect(()=>{
        const MostrarDetalleEspecifico=async()=>{
            try{
                
                const {data} =await axios.get(`http://localhost:4000/api/users/detalle-especifico/${id}`)
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
        return ventaEncontrada ? ventaEncontrada.fecha_venta.replace("T", " ").replace(/.\d{3}Z/, "") : null;
      })();
  return (
   <>
   <div className="container mt-4">
    <div className="header-detalle">
        <h2>Imprimir</h2>
        <button type="button" onClick={()=>navegar("/ventas")}>Regresar</button>
        
    </div>
    <div className="body-detalle-venta1">
            <div className="detalles-venta">     
                        <h2>Nota de pedido</h2>
                        <hr />

                        {detalle.map((de)=>{
                            const data_producto=producto.find((p)=>p.id===de.producto_id)                  

                            return(
                                <div key={de.id} className="detalle-venta">                               
                                <div className="body-detalle-venta">
                                    <div className="nombre-producto">
                                    <p >{data_producto.nombre}</p> 
                                    <p> ${parseFloat(de.precio_unitario)}.00</p>
                                    </div>                                    
                                    <p>Cantidad: {de.cantidad}</p>
                                    <hr />                          
                                </div>
                            </div>

                            )
                        })}                        
                        <div className="mt-4 text-end">
                            {(() => {
                            const subtotal = detalle.reduce((acc, item) => acc + parseFloat(item.subtotal), 0);
                            const igv = subtotal * 0.18;
                            const total = subtotal + igv;

                            return (
                                <>
                                <p>Subtotal: <strong>${subtotal.toFixed(2)}</strong></p>
                                <p>IGV (18%): <strong>${igv.toFixed(2)}</strong></p>
                                <p>Total a pagar: <strong>${total.toFixed(2)}</strong></p>
                                </>
                            );
                            })()}
                        </div>
                        <div className="foot-detalle">
                            <img src="https://media.istockphoto.com/id/828088276/es/vector/c%C3%B3digo-qr-ilustraci%C3%B3n.jpg?s=612x612&w=0&k=20&c=WaiK400NIuEZRzYHXXSy5_nIoYMCKUr-rc38_qnEYys=" alt="" />
                            <label htmlFor="">Representacion impresa de nota de pedido electronica revisarla en www.tiendasmer.com.pe</label>
                            <div className="codigo-barras">
                                <img src="https://img.freepik.com/psd-gratis/ilustracion-codigo-barras-aislado_23-2150584086.jpg" alt="" />
                            </div>
                            <div className="fecha-fin">
                                {FechaVenta&&
                                            (
                                               <div className='fecha-emitida'>
                                                <p>Fecha de emision: </p>
                                                <p><strong>{FechaVenta}</strong></p>
                                               </div>

                                            )                                   
                                }                            
                                
                       
                               
                            </div>
                        </div>                        
                            
                            
                        
                    
            </div>
    </div>
   </div>
   </>
  )
}
