import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../Caja/hojacaja.css"
import axios from 'axios'
import FuncionDelimitar from '../hooks/Delimitar'
import FuncionEmpleados from '../hooks/Empleados'

export default function Caja() {
    const [Cajas, setCajas] = useState([])
    const {empleado,FectUsuarios}=FuncionEmpleados()
    useEffect(()=>{
        FectUsuarios()
    },[])
    
   
    useEffect(()=>{
        const FecthCaja=async()=>{
            try{
                //const {data}=await axios.get("http://localhost:4000/api/users/caja/g")
                const {data}=await axios.get(`http://localhost:4000/api/users/caja/especifica/${empleado.almacen_id}`)
                setCajas(data)
                
            }catch(e){
                console.log("Hubo un error",e.message)
            }
        }
        FecthCaja()
    },[empleado])
    
    const navegar=useNavigate()
   
    const onUpdate=(id)=>{
        if(FuncionDelimitar("editar")){
        navegar(`/update-caja/${id}`)   
        }else{
            alert("Solo personal autorizado")
        }
}
    const onDelete=async(id)=>{
        if(FuncionDelimitar("eliminar")){
        const mensaje=window.confirm("Estas seguro de eliminar esta caja?")
        if(mensaje){
            try{
                await axios.delete(`http://localhost:4000/api/users/caja/d/${id}`)
                alert("Se elimino correctamente la caja")
                setCajas(Cajas.filter((c)=>c.id!==id))
            }catch(err){
                alert("Hubo un error no se puede eliminar esta caja",err)
            }
        }}else{
            alert("Solo personal autorizado")
        }      
    }
    const CerrarCaja=async(id)=>{
        const mesaje=window.confirm("Estas seguro de cerrar esta caja?")
        if(mesaje){
            try{
                await axios.put(`http://localhost:4000/api/users/caja/cerrar/${id}`)
                alert("Se cerro la caja exitosamente")                
                             
            }catch (err) {
                
                alert(err.response?.data?.message);
            }
        }
    }
    
    
      
  return (
    <div className="container mt-4">
        <div className="header-caja">
            <h1>Caja</h1>
            <div className="header-btn">
                <button type="button" onClick={()=>navegar("/create-caja")}>Abrir Caja</button>
                <button type="button" onClick={()=>navegar("/registrar-caja")}>Registrar movimiento</button>
                <button type="button" onClick={()=>navegar("/movimiento-caja")}>Ver Movimientos</button>
            </div>
        </div>
        <hr />
        
        <div className="body-caja mt-4">
        <table className="table">
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
                    <th scope="col">Tienda ID</th>
                    <th scope='col'>Acciones</th>
                    <th scope='col'>Cerrar Caja</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Cajas.length===0?(
                           
                            <tr id='Not-Fount-caja'>
                                <td> No se encontro una caja abierta</td>
                            </tr>                         
                                                  
                            
                        ):
                        Cajas.map((c)=>{
                            return(
                                <tr>
                                    <th scope="row">{c.id}</th>
                                    <td>{c.saldo_inicial.toFixed(2)}</td>
                                    <td>{c.saldo_final.toFixed(2)}</td>
                                    <td>{c.total_ingresos.toFixed(2)}</td>
                                    <td>{c.total_egresos.toFixed(2)}</td>
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
                                    <td>{c.tienda_id}</td>
                                    <td>
                                        <div className="btn-icons">
                                            <button type="button" onClick={()=>onUpdate(c.id)} className='form-control'><i className='bx bx-edit-alt'></i></button>
                                            <button type="button" onClick={()=>onDelete(c.id)} className='form-control'><i className='bx bx-trash' ></i></button>
                                        </div>
                                    </td>
                                    <th>
                                        <button type="button" className='btn btn-danger cerrar_caja' onClick={()=>CerrarCaja(c.tienda_id)}>Cerrar caja</button>
                                    </th>
                                </tr>    
                            )
                        })
                    }
                                        
                </tbody>
</table>
        </div>
    </div>
  )
}
