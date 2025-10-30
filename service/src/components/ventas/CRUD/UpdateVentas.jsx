
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '../../lib/axios'

export default function UpdateVentas() {
  const navegar=useNavigate()
  const {id}=useParams()
  const [ventasData, setventasData] = useState({
    total_venta:"",
    fecha_venta:"",
    cliente_id:"",
    usuario_id:"",
  })
  
  useEffect(()=>{
    const ShowVentas=async()=>{
        try{
            const {data}=await axiosInstance.get(`/venta/s/${id}`)
            setventasData(data)
        }catch(err){
            alert("Hubo un error",err)
        }
      }
      ShowVentas()
  },[id])
    const handleText=(e)=>{
        setventasData({...ventasData,[e.target.name]:e.target.value})
    }
    const SumibtUpdateVentas=async(e)=>{
        e.preventDefault()
        try{
            await axiosInstance.put(`/venta/u/${id}`,ventasData)
            alert("Se actualizo la venta")
            navegar("/ventas")
        }catch(err){
            alert("Hubo un error",err)
        }
    }
  
    return (

    <>
    <div className="container mt-4">
        <div className="header-ventas">
            <h2>Actualizar venta</h2>
            <button type="button" onClick={()=>navegar("/ventas")}>Regresar</button>
        </div>
        <hr />
        <div className="body-ventas">
        <form onSubmit={SumibtUpdateVentas} action="" >
                <div className="input-group">
                    <div className="w-50 p-3">
                        <label htmlFor="">Total de la venta</label>
                        <input type="text" className='form-control' value={ventasData.total_venta} onChange={handleText} name='total_venta' placeholder='ingrese total de la venta' />  
                    </div>
                    <div className="w-50 p-3">
                        <label htmlFor="">Fecha de la venta </label>
                        <input className='form-control' onChange={handleText} value={ventasData.fecha_venta.split("Z")[0]} type="datetime-local" name='fecha_venta' />  
                    </div>
                </div>
                <div className="input-group">
                    <div className="w-50 p-3">
                        <label htmlFor="">Cliente ID</label>
                        <input type="number" className='form-control' onChange={handleText} value={ventasData.cliente_id} name='cliente_id' placeholder='ingrese cliente ID' />  
                    </div>
                    <div className="w-50 p-3">
                        <label htmlFor="">Usuario ID</label>
                        <input className='form-control' type='number' onChange={handleText} placeholder='ingrese usuario ID' value={ventasData.usuario_id} name='usuario_id' />  
                    </div>
                </div>
                <div className="input-group">
                    <div className="w-100 p-3">
                        <button type="submit" className='btn btn-primary'>Crear Venta</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}
