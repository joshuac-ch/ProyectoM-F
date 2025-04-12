import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import FunctionUsuario from '../../hooks/Usuario'
import FuncionAlmacenes from '../../hooks/Almacenes'
import FuncionEmpleados from '../../hooks/Empleados'

export default function Createcaja() {
    const navegar=useNavigate()
    const [FormCajaData, setFormCajaData] = useState({
    saldo_final:0, 
    saldo_inicial:0, 
    total_ingresos:0,
    total_egresos:0, 
    fecha_apertura:"",
    fecha_cierre:"",
    usuario_id:"",
    tienda_id:""
    })
    const handleText=(e)=>{
        setFormCajaData({...FormCajaData,[e.target.name]:e.target.value})
    }
    const FormCrearCaja=async(e)=>{
        e.preventDefault()
        console.log(FormCajaData)
        try{
            await axios.post("http://localhost:4000/api/users/caja/c",FormCajaData)
            alert("Se creo la caja")
            navegar("/caja")
        }catch(err){
            alert(err.response?.data?.message || err.message)
        }
    }
    const {usuario,FectUsuario}=FunctionUsuario()
    const {almacen_id,FectAlmacen_id}=FuncionAlmacenes()
    useEffect(()=>{
        FectUsuario(),FectAlmacen_id()
    },[])    
    const {empleado,FectUsuarios}=FuncionEmpleados()
        useEffect(()=>{
            FectUsuarios()
        },[])
        useEffect(()=>{
            if(empleado){
                setFormCajaData((p)=>({
                    ...p,
                    usuario_id:empleado.id,
                    tienda_id:empleado.almacen_id,
                }))
            }
        },[empleado])    
        return (
    <>
    <div className="container mt-4">
        <div className="header-caja">
            <h2>Abrir Nueva caja</h2>
            <button type="button" onClick={()=>navegar("/caja")}>Regresar</button>
        </div>
        <hr />
        <div className="body-caja">
            <form onSubmit={FormCrearCaja}>
                <div className="input-group">
                    <div className="w-100 p-3">
                        <label htmlFor="" className='form-label'>Saldo Inicial Campo Requerido*</label>
                        <input type="number" step={0.01} className='form-control' onChange={handleText} name='saldo_inicial' placeholder='ingrese el saldo incial'/>
                    </div>
                   {/*
                    <div className="w-50 p-3" >
                        <label htmlFor=""  className='form-label'>Saldo Final</label>
                        <input type="number" step={0.01} className='form-control' onChange={handleText} name='saldo_final' placeholder='ingrese el saldo final'/>
                    </div>
                   */}
                </div>
                <div className="input-group">
                    {/*
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Total de Ingresos</label>
                        <input type="number" step={0.01}  className='form-control' onChange={handleText} name='total_ingresos' placeholder='ingrese el total de ingresos'/>
                    </div>
                    <div className="w-50 p-3" >
                        <label htmlFor=""  className='form-label'>Total de Egresos</label>
                        <input type="number" step={0.01}  className='form-control' onChange={handleText} name='total_egresos' placeholder='ingrese el total de egresos'/>
                    </div>
                    */}
                </div>
                <div className="input-group">
                   {/*
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Fecha de Apertura</label>
                        <input type="datetime-local" className='form-control' onChange={handleText} name='fecha_apertura' placeholder='ingrese la fecha de apertura'/>
                    </div>
                    <div className="w-50 p-3" >
                        <label htmlFor=""  className='form-label'>Fecha de Cierre</label>
                        <input type="datetime-local" className='form-control' onChange={handleText} name='fecha_cierre' placeholder='ingrese la fecha de cierre'/>
                        
                    </div>
                   */}
                </div>
                <div className="w-100 p-3">
                        <label htmlFor=""  className='form-label'>Usuario ID Campo Requerido*</label>
                        <input type="text" className='form-control' readOnly value={empleado.nombre}/>
                       
                </div>
                <div className="w-100 p-3">
                        <label htmlFor=""  className='form-label'>Tienda ID Campo Requerido*</label>                         
                        {(()=>{
                                const empleadoAlmacen=almacen_id.find((a)=>a.id===empleado.almacen_id)
                                return(
                                    empleadoAlmacen&&(
                                        <input type="text" className='form-control' readOnly value={empleadoAlmacen.nombre} />
                                        
                                    )
                                )
                            })()}
                </div>
                <div className="w-100 p-3">
                    <button type="submit" className='btn btn-primary'>Crear Caja</button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}
