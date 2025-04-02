import React, { useEffect, useState } from 'react'
import "../ventas/hojaventas.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Ventas() {
    const [ventas, setventas] = useState([])
    const FectchVentas=async()=>{
        try{
            const {data}=await axios.get("http://localhost:4000/api/users/venta/g")
            setventas(data)
        }catch(err){
            console.log("Hubo un error",err)
        }
    }
    useEffect(()=>{
        FectchVentas()   
    },[])
    const navegar=useNavigate()
    const onUpdate=(id)=>{
        navegar(`/update-ventas/${id}`)
       }
    const onDelete=async(id)=>{
        const mensaje=window.confirm("Esta seguro de eliminar esta venta?")
        if(mensaje){
            try{
                await axios.delete(`http://localhost:4000/api/users/venta/d/${id}`)
                alert("Se elimino la venta")
                setventas(ventas.filter((v)=>v.id!==id))
            }catch(err){
                alert("Hubo un error al eliminar esta venta",err)
            }
        }
    }   
  return (
    <>
    <div className="container mt-4">
        <div className="header-ventas">
            <h2>Ventas</h2>
            <button type="button" onClick={()=>navegar("/create-ventas")}>Crear venta</button>
        </div>
        <div className="body-ventas p-3">
        <table class="table">
            <thead>
              <tr>
                <th scope="col">#ID</th>
                <th scope="col">Total venta</th>
                <th scope="col">Fecha venta</th>
                <th scope="col">Cliente ID</th>
                <th scope="col">Usuario ID</th>
                <th scope='col'>Acciones</th>
              </tr>
            </thead>
            <tbody>
                {ventas.map((v)=>{
                    return(
                        <tr>
                            <th scope="row">{v.id}</th>
                            <td>{v.total_venta}</td>
                            <td>{v.fecha_venta? new Date(v.fecha_venta).toISOString().replace("T"," ").replace(/:\d{2}\.\d{3}Z/,"") :"" }</td>
                            <td>{v.cliente_id}</td>
                            <td>{v.usuario_id}</td>
                            <td>
                                <div className="btn-icon">
                                <button type="button" onClick={()=>onUpdate(v.id)}><i class='bx bx-edit-alt'></i></button>
                                <button type="button" onClick={()=>onDelete(v.id)}><i class='bx bx-trash' ></i></button>
                                </div>
                            </td>
                        </tr>
                    )
                })}
              
              
            </tbody>
        </table>
        </div>
    </div>
    </>
  )
}
