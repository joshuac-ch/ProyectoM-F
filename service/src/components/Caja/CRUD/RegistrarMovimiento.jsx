import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FuncionAlmacenes from '../../hooks/Almacenes'
import FunctionUsuario from '../../hooks/Usuario'
import axios from 'axios'

export default function RegistrarMovimiento() {
    const navegar=useNavigate()
    const [DataRegistrarMovimiento, setDataRegistrarMovimiento] = useState({
        tienda_id:"",
        usuario_id:"",
        monto:0,
        tipo:"",
        descripcion:""
    })
    const handleText=(e)=>{
        setDataRegistrarMovimiento({...DataRegistrarMovimiento,[e.target.name]:e.target.value})
    }
    const {almacen_id,FectAlmacen_id}=FuncionAlmacenes()
    const {usuario,FectUsuario}=FunctionUsuario()
    useEffect(()=>{
        FectAlmacen_id(),FectUsuario()
    },[])
    const onSumibtMovimiento=async(e)=>{
        e.preventDefault()
        console.log("Datos a enviar:", DataRegistrarMovimiento); // Agregar esto para depuración
        try{
            await axios.post("http://localhost:4000/api/users/caja/movimiento",DataRegistrarMovimiento)
            alert("Se registro el movimiento")
            navegar("/caja")
        }catch(err){
            alert(`No hay una caja abierta en esta tienda ID: ${DataRegistrarMovimiento.tienda_id}`)
            console.error("Hubo un error",err)
        }
        
    }
  return (
   <>
   <div className="container mt-4">
    <div className="header-movimiento">
        <h2>Registrar Movimiento</h2>
        <button type="button" onClick={()=>navegar("/caja")}>Regresar</button>
    </div>
    <hr />
    <div className="body-movimiento">
    <form action="" onSubmit={onSumibtMovimiento}>
        <div className="p-3">
            <div className="datos">
                <label htmlFor="">Tienda ID</label>
                <select name="tienda_id" onChange={handleText} className='form-control' id="">
                    <option value=""  selected disabled>escoja la tienda id</option>
                    {almacen_id.map((a)=>{
                        return(
                            <option value={a.id} >ID: {a.id} || Nombre: {a.nombre}</option>
                        )
                    })}
                </select>
            </div>
            <div className="datos">
                <label htmlFor="">Usuario ID</label>
                <select name="usuario_id" onChange={handleText} className='form-control' id="">
                    <option value="" selected disabled>escoja el usuario id</option>
                    {usuario.map((u)=>{
                        return(
                            <option value={u.id}>ID: {u.id} || Nombre: {u.nombre}</option>
                        )
                    })}
                </select>
            </div>
            <div className="datos">
                <label htmlFor="">Monto</label>
                <input type="number" step={0.01} className='form-control' onChange={handleText} name='monto' placeholder='ingrese monto'/>
            </div>
            <div className="datos">
                <label htmlFor="">Tipo</label>
                <select name="tipo" onChange={handleText} className='form-control' id="">
                <option value="" selected disabled>escoja el tipo</option>
                    <option value="ingreso">Ingreso</option>
                    <option value="egreso">Egreso</option>
                </select>
            </div>
            <div className="datos">
                <label htmlFor="">Descripcion</label>
                <textarea name="descripcion" className='form-control' onChange={handleText} id=""></textarea>               
            </div>
            <div className="datos p-3">
                <button type="submit" className='btn btn-primary'>Agregar movimiento </button>
            </div>
        </div>
    </form>
    </div>
   </div>
   </>
  )
}
