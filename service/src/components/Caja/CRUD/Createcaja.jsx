import axios from 'axios'
import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

export default function Createcaja() {
    const navegar=useNavigate()
    const [FormCajaData, setFormCajaData] = useState({
    saldo_final:"", 
    saldo_inicial:"", 
    total_ingresos:"",
    total_egresos:"", 
    fecha_apertura:"",
    fecha_cierre:"",
    usuario_id:""
    })
    const handleText=(e)=>{
        setFormCajaData({...FormCajaData,[e.target.name]:e.target.value})
    }
    const FormCrearCaja=async(e)=>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:4000/api/users/caja/c",FormCajaData)
            alert("Se creo la caja")
            navegar("/caja")
        }catch(err){
            alert("Hubo un error",err)
        }
    }
   
    return (
    <>
    <div className="container mt-4">
        <div className="header-caja">
            <h2>Crear Nueva caja</h2>
            <button type="button" onClick={()=>navegar("/caja")}>Regresar</button>
        </div>
        <div className="body-caja">
            <form onSubmit={FormCrearCaja}>
                <div className="input-group">
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Saldo Inicial</label>
                        <input type="text" className='form-control' onChange={handleText} name='saldo_inicial' placeholder='ingrese el saldo incial'/>
                    </div>
                    <div className="w-50 p-3" >
                        <label htmlFor=""  className='form-label'>Saldo Final</label>
                        <input type="text" className='form-control' onChange={handleText} name='saldo_final' placeholder='ingrese el saldo final'/>
                    </div>
                </div>
                <div className="input-group">
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Total de Ingresos</label>
                        <input type="text" className='form-control' onChange={handleText} name='total_ingresos' placeholder='ingrese el total de ingresos'/>
                    </div>
                    <div className="w-50 p-3" >
                        <label htmlFor=""  className='form-label'>Total de Egresos</label>
                        <input type="text" className='form-control' onChange={handleText} name='total_egresos' placeholder='ingrese el total de egresos'/>
                    </div>
                </div>
                <div className="input-group">
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Fecha de Apertura</label>
                        <input type="datetime-local" className='form-control' onChange={handleText} name='fecha_apertura' placeholder='ingrese la fecha de apertura'/>
                    </div>
                    <div className="w-50 p-3" >
                        <label htmlFor=""  className='form-label'>Fecha de Cierre</label>
                        <input type="datetime-local" className='form-control' onChange={handleText} name='fecha_cierre' placeholder='ingrese la fecha de cierre'/>
                    </div>
                </div>
                <div className="w-100 p-3">
                        <label htmlFor=""  className='form-label'>Usuario ID</label>
                        <input type="text" className='form-control' onChange={handleText} name='usuario_id' placeholder='ingrese el usuario'/>
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
