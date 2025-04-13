import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FunctionProducto from '../../hooks/Producto'
import FunctionVentas from '../../hooks/Ventas'
import "../hojaventas.css"
import FuncionCajas from '../../hooks/Cajas'

export default function DetalleEspecifico() {
    
    const navegar=useNavigate()
    
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
                                    <p >{data_producto.nombre}</p> 
                                    <p> S/.{parseFloat(de.precio_unitario)}.00</p>
                                    </div>                                    
                                    <p>Cantidad: {de.cantidad}</p>
                                    <hr />                          
                                </div>
                            </div>

                            )
                        })}                        
                        <div className="mt-4 text-start">
                            <label htmlFor="">Metodo de pago: Efectivo</label>
                            <p>Descripcion: <label htmlFor="">...</label></p>
                            
                        </div>
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
                            <img src="https://media.istockphoto.com/id/828088276/es/vector/c%C3%B3digo-qr-ilustraci%C3%B3n.jpg?s=612x612&w=0&k=20&c=WaiK400NIuEZRzYHXXSy5_nIoYMCKUr-rc38_qnEYys=" alt="" />
                            <label htmlFor="">Representacion impresa de nota de pedido electronica revisarla en www.tiendasmer.com.pe</label>
                            <div className="codigo-barras">
                              
                               <hr />
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
