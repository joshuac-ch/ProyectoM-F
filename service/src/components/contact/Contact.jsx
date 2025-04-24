import React, { useEffect, useState } from 'react'
import "../contact/hojacontact.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import FuncionDelimitar from '../hooks/Delimitar'
import FuncionClientes from '../hooks/Clientes'
export default function Contact() {
  
  const [clientes, setclientes] = useState([])
  const GetContactos=async()=>{
    try{
      const {data}=await axios.get("http://localhost:4000/api/users/cliente/g")
      setclientes(data)
    }catch(e){  
      console.log("hubo un error",e)
    }
  }
  useEffect(()=>{
    GetContactos()
  },[])
  
  const navegar=useNavigate()
  const redirigirCliente=()=>{
    if(FuncionDelimitar("crear")){
       navegar("/contact/crear-cliente")
    }else{
      alert("Solo personal autorizado")
    }
}
  const UpdateCliente=(id)=>{
    if(FuncionDelimitar("editar")){
    navegar(`/contact/cliente/${id}`)
    }else{
      alert("Solo personal autorizado")
    }
}
  const DeleteCliente=async(id)=>{
    if(FuncionDelimitar("eliminar")){
    const mensaje=window.confirm("Estas seguro de eliminar este contacto")
    if(mensaje){
      try{
        await axios.delete(`http://localhost:4000/api/users/cliente/d/${id}`)
        setclientes(clientes.filter((s)=>s.id!==id)) //Siver para filtrar solo los que hay
        navegar("/contact")
      }catch(e){
        alert("No se pudo eliminar el cliente",e)
      }
    }
  }else{
    alert("Solo personal autorizado")
  }
  }
  const {FecthCliente,cliente}=FuncionClientes()
  useEffect(()=>{
    FecthCliente()
  },[])
  const [clienteFilter, setclienteFilter] = useState("")
  const dataCliente=clienteFilter===""
  ?cliente: cliente.filter((c)=>c.nombre.toLowerCase().includes(clienteFilter.toLowerCase())) 
  
  const onchangeFilterCliente=(e)=>{
    setclienteFilter(e.target.value)   
  }
  return (
    <>
    <div className="contactos container mt-4">
      <div className="header-clientes">
        <h1>Clientes</h1>
        <div className="busqueda">
        <div className="agregar-cliente">        
          <button type="button" className='form-control' onClick={redirigirCliente}>Agregar Contacto</button>  
        </div>
        <div className="buscar-cliente">
          <input type="text" className="form-control" onChange={onchangeFilterCliente} value={clienteFilter} placeholder="Buscar..." />
          <button className="btn-search"><i className="bx bx-search-alt-2"></i></button>
        </div>
        </div>
      </div>
      <hr />
      <div className="table-responsive">
        <table className="table table-hover shadow-sm rounded res">
          <thead className="table-header ">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Tipo Cliente</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {dataCliente.length===0?(
              <tr id="not-found-cliente">
                 <td>No se encontro ningun cliente</td> 
              </tr>
            ):
            dataCliente.map((c, index) => (
              <tr key={index} className="align-middle ">
                <td>{c.id}</td>
                <td className="icon-user">
                <button>{c.nombre.charAt(0).toLocaleUpperCase()}{c.apellido.charAt(0).toLocaleUpperCase()}</button>                
                  {c.nombre} {c.apellido}
                </td>
                <td>{c.correo}</td>
                <td>{c.dirrecion}</td>
                <td>{c.telefono}</td>
                <td>{c.tipo_cliente}</td>
                <td>
                  <button onClick={()=>UpdateCliente(c.id)} className="btn btn-warning btn-sm me-2">
                  <i className='bx bxs-edit-alt' ></i>
                  </button>
                  <button onClick={()=>DeleteCliente(c.id)} className="btn btn-danger btn-sm me">
                  <i className='bx bxs-trash' ></i>
                  </button>
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
    </>
  )
}
