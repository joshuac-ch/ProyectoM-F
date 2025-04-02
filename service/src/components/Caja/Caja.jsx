import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../Caja/hojacaja.css"
import axios from 'axios'
export default function Caja() {
    const [Cajas, setCajas] = useState([])
    const FecthCaja=async()=>{
        try{
            const {data}=await axios.get("http://localhost:4000/api/users/caja/g")
            setCajas(data)
        }catch(e){
            console.log("Hubo un error",e.message)
        }
    }
    useEffect(()=>{
        FecthCaja()
    },[])
    
    const navegar=useNavigate()
    const onUpdate=(id)=>{
        navegar(`/update-caja/${id}`)   
    }
    const onDelete=async(id)=>{
        const mensaje=window.confirm("Estas seguro de eliminar esta caja?")
        if(mensaje){
            try{
                await axios.delete(`http://localhost:4000/api/users/caja/d/${id}`)
                alert("Se elimino correctamente la caja")
                setCajas(Cajas.filter((c)=>c.id!==id))
            }catch(err){
                alert("Hubo un error no se puede eliminar esta caja",err)
            }
        }
        
    }
  return (
    <div className="container mt-4">
        <div className="header-caja">
            <h2>Caja</h2>
            <button type="button" onClick={()=>navegar("/create-caja")}>Crear Caja</button>
        </div>
        <div className="body-caja mt-4">
        <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Saldo Inicial</th>
                    <th scope="col">Saldo Final</th>
                    <th scope='col'>Total de Ingresos</th>
                    <th scope="col">Total de Egresos</th>
                    <th scope="col">Fecha de apertura</th>
                    <th scope="col">Fecha de cierre</th>
                    <th scope="col">Usuario ID</th>
                    <th scope='col'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Cajas.map((c)=>{
                        return(
                            <tr>
                                <th scope="row">{c.id}</th>
                                <td>{c.saldo_inicial}</td>
                                <td>{c.saldo_final}</td>
                                <td>{c.total_ingresos}</td>
                                <td>{c.total_egresos}</td>
                                <td>
                                {c.fecha_apertura
                                    ? new Date(c.fecha_apertura)
                                        .toISOString()
                                        .replace(/T/, " ") // Reemplaza la "T" por un espacio
                                        .replace(/:\d{2}\.\d{3}Z/, "") // Elimina ":00.000Z"
                                    : ""}
                                   
                                </td>
                                <td>
                                {c.fecha_cierre
                                    ? new Date(c.fecha_cierre)
                                        .toISOString()
                                        .replace(/T/, " ") // Reemplaza la "T" por un espacio
                                        .replace(/:\d{2}\.\d{3}Z/, "") // Elimina ":00.000Z"
                                    : ""}
                                   
                                </td>
                                <td>{c.usuario_id}</td>
                                <td>
                                    <div className="btn-icons">
                                        <button type="button" onClick={()=>onUpdate(c.id)} className='form-control'><i class='bx bx-edit-alt'></i></button>
                                        <button type="button" onClick={()=>onDelete(c.id)} className='form-control'><i class='bx bx-trash' ></i></button>
                                    </div>
                                </td>
                            </tr>    
                        )
                    })}
                                        
                </tbody>
</table>
        </div>
    </div>
  )
}
