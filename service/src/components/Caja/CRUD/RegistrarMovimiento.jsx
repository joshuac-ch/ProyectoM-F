import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FuncionAlmacenes from '../../hooks/Almacenes'
import FunctionUsuario from '../../hooks/Usuario'

import FuncionEmpleados from '../../hooks/Empleados'
import { axiosInstance } from '../../lib/axios'

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
    
   
    const onSumibtMovimiento=async(e)=>{
        e.preventDefault()
        //console.log("Datos a enviar:", DataRegistrarMovimiento); // Agregar esto para depuración
        try{
            await axiosInstance.post("/caja/movimiento",DataRegistrarMovimiento)
            alert("Se registro el movimiento")
            navegar("/caja")
        }catch(err){
            alert(err.response?.data?.message)
           
        }
        
    }
    const {empleado,FectUsuarios}=FuncionEmpleados()
    useEffect(()=>{
        if(empleado){
            setDataRegistrarMovimiento((e)=>({
                ...e,
                usuario_id:empleado.id,
                tienda_id:empleado.almacen_id
            }))
        }
    },[empleado])
    useEffect(()=>{
        FectAlmacen_id(),FectUsuarios()
    },[])
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
                {(()=>{
                    const dataAlmacen=almacen_id.find((a)=>a.id===empleado.almacen_id)
                    return dataAlmacen&&(
                        <input type="text" onChange={handleText} className='form-control' readOnly value={dataAlmacen.nombre} />
                    )
                })()}               
            </div>
            <div className="datos">
                <label htmlFor="">Usuario ID</label>
                <input type="text" value={empleado.nombre} onChange={handleText} className='form-control' readOnly />
               
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
