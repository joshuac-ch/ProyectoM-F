import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FuncionAlmacenes from '../../hooks/Almacenes'
import FunctionProducto from '../../hooks/Producto'
import FunctionUsuario from '../../hooks/Usuario'
import axios from 'axios'
import FuncionEmpleados from '../../hooks/Empleados'

export default function ActualizarInventario() {
    const {id}=useParams()
    const navegar=useNavigate()
    const {almacen_id,FectAlmacen_id}=FuncionAlmacenes()
    const {producto,FectProdcutos}=FunctionProducto()
    const [inventarioProducto, setinventarioProducto] = useState([])
    const {usuario,FectUsuario}=FunctionUsuario()
    const {FectUsuarios,empleado}=FuncionEmpleados()
    const [FormDataActualizar, setFormDataActualizar] = useState({
        cantidad:0,tipo_movimiento:"",almacen_id:"",producto_id:"",usuario_id:""
    })
      useEffect(()=>{
          const ShowInventario=async()=>{
            try{
              const {data}=await axios.get(`http://localhost:4000/api/users/inven/s/${id}`)
              setinventarioProducto(data)
              
            }catch(err){
              console.error("Error al mostrar inventario:", err.response?.data?.message || err.message);
      
            }
    
          }
          ShowInventario()
        },[id])
    const handleText=(e)=>{
        setFormDataActualizar({...FormDataActualizar,[e.target.name]:e.target.value})
    }
    useEffect(()=>{
        FectAlmacen_id(),FectProdcutos(),FectUsuario(),FectUsuarios()
    },[])
    
    useEffect(() => {
            if (empleado && empleado.id) {
                setFormDataActualizar((p) => ({
                    ...p,
                    tipo_movimiento:"compra",
                    
                    producto_id: inventarioProducto.producto_id,
                    almacen_id: inventarioProducto.almacen_id,      
                                                        
                    usuario_id: empleado.id,
                   
                }));
            }
        }, [empleado]);
   
    const onSubmitUpdate=async(e)=>{
        e.preventDefault()
        console.log(FormDataActualizar)
       if(inventarioProducto.almacen_id===empleado.almacen_id){
            try{
                console.log('Datos enviados al backend:', FormDataActualizar); // Agrega esta línea para ver los dato
                await axios.put(`http://localhost:4000/api/users/inven/u/`,FormDataActualizar)
                alert("Se actualizo el inventario ")
                navegar("/invetario-producto")
            }catch(err){
                console.error("Error al actualizar inventario:", err.response?.data?.message || err.message);
            } 
        
        }else{
            alert("No es usted de esta tienda")
        }
        
    }
    
    
     
        
    return (
    <>
    <div className="container mt-4">
        <div className="header-inventario">
            <h2>Actualizar Inventario</h2>
            <button type="button" onClick={()=>navegar("/invetario-producto")}>regresar</button>
        </div>
        <div className="body-inventario">
            <div className="dinamico">
                <form onSubmit={onSubmitUpdate} action="">
                    <div className="p-3">
                    <label htmlFor="">Cantidad Actual: {inventarioProducto.cantidad_actual}</label><br />                   
                    <input type="number" className='form-control' name='cantidad' placeholder='cambiar a' onChange={handleText}  value={FormDataActualizar.cantidad} />
                    
                    </div>
                    
                    <div className="p-3">
                    <label htmlFor="">Tipo de Movmiento</label>
                    
                    <select name="tipo_movimiento" onChange={handleText}  className='form-control' id="">
                        {/*
                            <option value="" selected disabled>Seleccion el tipo de movimiento</option>
                            <option value="venta">venta</option>
                        */}
                        <option value="compra">Aumetar Productos</option>                      
                    </select>
                    </div>
                    <div className="p-3">
                    <label htmlFor="">Almacen ID</label>      
                    {/*<input type="text" className="form-control" readOnly value={inventarioProducto.almacen_id} />     */}
                               
                                {(()=>{
                                    const almacen_user=almacen_id.find((e)=>e.id===inventarioProducto.almacen_id)
                                    
                                    
                                    return(
                                        almacen_user&&(
                                                <input type="text" className="form-control" readOnly value={almacen_user.nombre} />
                                        )
                                    );
                                })()} 
                                                    
                        
                    
                        
                   
                    </div>
                    <div className="p-3">
                    <label htmlFor="">Producto ID</label>
                    <input type="text" className='form-control' value={inventarioProducto.producto_id} readOnly />                  
                    </div>
                    <div className="p-3">                                         
                        <label>Usuario</label>
                        <input type="text" className="form-control" value={empleado.nombre} readOnly />               
                    </div>                   
                    
                    <div className='p-3'>
                        <button type="submit" className='btn btn-primary'>Actualizar Inventario</button>
                    </div>                    
                    

                </form>
            </div>
        </div>
    </div>
    </>
  )
}
