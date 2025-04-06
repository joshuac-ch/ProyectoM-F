import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FuncionAlmacenes from '../../hooks/Almacenes'
import FunctionProducto from '../../hooks/Producto'
import FunctionUsuario from '../../hooks/Usuario'
import axios from 'axios'

export default function ActualizarInventario() {
    const navegar=useNavigate()
    const {almacen_id,FectAlmacen_id}=FuncionAlmacenes()
    const {producto,FectProdcutos}=FunctionProducto()
    const {usuario,FectUsuario}=FunctionUsuario()
    const [FormDataActualizar, setFormDataActualizar] = useState({
        cantidad:0,tipo_movimiento:"",almacen_id:"",producto_id:"",usuario_id:""
    })
    const handleText=(e)=>{
        setFormDataActualizar({...FormDataActualizar,[e.target.name]:e.target.value})
    }
    useEffect(()=>{
        FectAlmacen_id(),FectProdcutos(),FectUsuario()
    },[])
    const onSubmitUpdate=async(e)=>{
        e.preventDefault()
        try{
            console.log('Datos enviados al backend:', FormDataActualizar); // Agrega esta línea para ver los dato
            await axios.put("http://localhost:4000/api/users/inven/u",FormDataActualizar)
            alert("Se actualizo el inventario ")
            navegar("/invetario-producto")
        }catch(err){
            console.error("Error al actualizar inventario:", err.response?.data?.message || err.message);
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
                    <label htmlFor="">Cantidad</label>
                    <input type="number" name='cantidad' onChange={handleText} className='form-control' placeholder='ingrese la cantidad' />
                    </div>
                    <div className="p-3">
                    <label htmlFor="">Tipo de Movmiento</label>
                    <select name="tipo_movimiento" onChange={handleText}  className='form-control' id="">
                        <option value="" selected disabled>Seleccion el tipo de movimiento</option>
                        <option value="venta">venta</option>
                        <option value="compra">compra</option>
                    </select>
                    </div>
                    <div className="p-3">
                    <label htmlFor="">Almacen ID</label>
                    <select className='form-control'  onChange={handleText}  name="almacen_id" id="">
                        <option value="" selected disabled>Seleccione el almacen</option>
                        {almacen_id.map((a)=>{
                            return(
                                <option value={a.id}>ID: {a.id} || Nombre: {a.nombre}</option>
                            )
                        })}
                    </select>
                    </div>
                    <div className="p-3">
                    <label htmlFor="">Producto ID</label>
                    <select className='form-control'  onChange={handleText}  name="producto_id" id="">
                        <option value="" selected disabled>Seleccione el almacen</option>
                        {producto.map((p)=>{
                            return(
                                <option value={p.id}>ID: {p.id} || Nombre: {p.nombre}</option>
                            )
                        })}
                    </select>
                    </div>
                    <div className="p-3">
                    <label htmlFor="">Usuario ID</label>
                    <select className='form-control'  onChange={handleText}  name="usuario_id" id="">
                        <option value="" selected disabled>Seleccione el almacen</option>
                        {usuario.map((u)=>{
                            return(
                                <option value={u.id}>ID: {u.id} || Nombre: {u.nombre}</option>
                            )
                        })}
                    </select>
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
