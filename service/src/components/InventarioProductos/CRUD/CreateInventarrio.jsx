import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FunctionProducto from '../../hooks/Producto'
import FuncionAlmacenes from '../../hooks/Almacenes'

export default function CreateInventarrio() {
  const navegar=useNavigate()
  const [FormDataInventario, setFormDataInventario] = useState({
    cantidad_actual:"",
    producto_id:"",
    almacen_id:"",
    //stock_minimo:"",
    //stock_maximo:"",
    //ultimo_movimiento:new Date()   
       
  })
  const handleText=(e)=>{
    setFormDataInventario({...FormDataInventario,[e.target.name]:e.target.value})
  }
  const onSumbitInventarioCreate=async(e)=>{
    console.log(FormDataInventario)
    e.preventDefault()
    try{
        await axios.post("http://localhost:4000/api/users/inven/c",FormDataInventario)
        alert("Se registro en el inventario")
        navegar("/invetario-producto")
    }catch(err){
        console.error("Hubo un error",err)
    }
  }
  const {producto,FectProdcutos}=FunctionProducto()
  const {almacen_id,FectAlmacen_id}=FuncionAlmacenes()
  useEffect(()=>{
    FectProdcutos(),FectAlmacen_id()
  },[])  
  return (
    <>
    <div className="container mt-4">
    <div className="header-inventario">
        <h1>Crear Inventario</h1>
        <button type="button" onClick={()=>navegar("/invetario-producto")}>Regresar</button>
    </div>
    <div className="body-inventario">
        <form action="" onSubmit={onSumbitInventarioCreate}>
            <div className="p-3">
                <label htmlFor="">Cantidad Actual</label>
                <input type="number" className='form-control' onChange={handleText} placeholder='ingrese cantidad actual' name='cantidad_actual'/>
            </div>
            <div className="p-3">
                <label htmlFor="">Producto ID</label>
                <select name="producto_id" onChange={handleText} className='form-control' id="">
                    <option value="" selected disabled>Seleccion el producto ID</option>
                    {producto.map((p)=>{
                        return(
                            <option value={p.id}> ID: {p.id} || Nombre: {p.nombre}</option>
                        )
                    })}
                </select>
               
            </div>
            <div className="p-3">
                <label htmlFor="">Almacen ID</label>
                <select name="almacen_id" onChange={handleText} className='form-control' id="">
                    <option value="" selected disabled>Seleccion el Alamcen ID</option>
                    {almacen_id.map((a)=>{
                        return(
                            <option value={a.id}> ID: {a.id} || Nombre: {a.nombre}</option>
                        )
                    })}
                </select>
               
            </div>
            {/*<div className="p-3">
                <label htmlFor="">Stock Mininmo</label>
                <input type="number" onChange={handleText} className='form-control' name='stock_minimo'/>
            </div>
            <div className="p-3">
                <label htmlFor="">Stock Maximo</label>
                <input type="number" onChange={handleText} className='form-control' name='stock_maximo'/>
            </div>  
            <div className="p-3">
                <label htmlFor="">Ultimo Movimiento</label>
                <input type="datetime-local" onChange={handleText} name="ultimo_movimiento" className='form-control' id="" />
               
            </div>*/}
            <div className="p-3">
                <button type="submit" className='btn btn-primary'>Registrar Datos</button>
            </div>
        </form>
    </div>
    </div>    
    </>
  )
}
