import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function UpdateCaja() {
    const navegar=useNavigate()
    const {id}=useParams()
    const [caja, setcaja] = useState({
        saldo_final:"", 
        saldo_inicial:"", 
        total_ingresos:"",
        total_egresos:"", 
        fecha_apertura:"",
        fecha_cierre:"",
        usuario_id:"",
        tienda_id:""
    })
    const handleText=(e)=>{
        setcaja({...caja,[e.target.name]:e.target.value})
    }
    useEffect(()=>{
        const FecthCajas=async()=>{
            try{
                const {data}=await axios.get(`http://localhost:4000/api/users/caja/s/${id}`)
                setcaja(data)
            }catch(err){
                alert("Hubo un error al mostrar los datos",err)
            }
        }
        FecthCajas()
    },[id])
    const SubmitUpdateCaja=async(e)=>{
        e.preventDefault()
        try{
            await axios.put(`http://localhost:4000/api/users/caja/u/${id}`,caja)
            alert("Se actualizo la caja")
            navegar("/caja")
        }catch(err){
            alert("Los campos no deben ser vacios en 0",err)
        }
    }    
  return (
    <>
    <div className="container mt-4">
        <div className="header-caja">
            <h2>Actualzar Caja</h2>
            <button type="button" onClick={()=>navegar("/caja")}>Regresar</button>
        </div>
        <hr />
        <div className="body-caja">
        <form onSubmit={SubmitUpdateCaja}>
                <div className="input-group">
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Saldo Inicial</label>
                        <input type="text" required className='form-control' value={caja.saldo_inicial} onChange={handleText} name='saldo_inicial' placeholder='ingrese el saldo incial'/>
                    </div>
                    <div className="w-50 p-3" >
                        <label htmlFor=""  className='form-label'>Saldo Final</label>
                        <input type="text" required className='form-control' value={caja.saldo_final} onChange={handleText} name='saldo_final' placeholder='ingrese el saldo final'/>
                    </div>
                </div>
                <div className="input-group">
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Total de Ingresos</label>
                        <input type="text" required className='form-control' value={caja.total_ingresos} onChange={handleText} name='total_ingresos' placeholder='ingrese el total de ingresos'/>
                    </div>
                    <div className="w-50 p-3" >
                        <label htmlFor=""  className='form-label'>Total de Egresos</label>
                        <input type="text" required className='form-control' value={caja.total_egresos} onChange={handleText} name='total_egresos' placeholder='ingrese el total de egresos'/>
                    </div>
                </div>
                <div className="input-group">
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Fecha de Apertura </label>
                        <input type="datetime-local" required className='form-control' onChange={handleText} value={caja.fecha_apertura?caja.fecha_apertura.split("Z")[0]:""}  name='fecha_apertura' placeholder='ingrese la fecha de apertura'/>
                    </div>
                    
                    <div className="w-50 p-3" >
                        <label htmlFor=""  className='form-label'>Fecha de Cierre </label>
                        <input type="datetime-local" required className='form-control' onChange={handleText} value={caja.fecha_cierre? caja.fecha_cierre.split("Z")[0]:""} name='fecha_cierre' placeholder='ingrese la fecha de cierre'/>
                    </div>
                </div>
                
               
                <div className="w-100 p-3">
                        <label htmlFor=""  className='form-label'>Usuario ID</label>
                        <input type="text" className='form-control' value={caja.usuario_id} onChange={handleText} name='usuario_id' placeholder='ingrese el usuario'/>
                </div>
                <div className="w-100 p-3">
                        <label htmlFor=""  className='form-label'>Tienda ID</label>
                        <input type="text" className='form-control' value={caja.tienda_id} onChange={handleText} name='tienda_id' placeholder='ingrese el usuario'/>
                </div>
                <div className="w-100 p-3">
                    <button type="submit" className='btn btn-primary'>Actualizar Caja</button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}
