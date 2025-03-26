import React from 'react'
import "../contact/hojacontact.css"
import { useNavigate } from 'react-router-dom'
export default function Contact() {
  const contactos=[
{id:1,imagen:"JG",nombre:"joshua gustavo",dirrecion:"Av. inca",correo:"joshua@gmail.com",telefono:"910320803"},
{id:2,imagen:"EE",nombre:"erick elera",dirrecion:"Av. argentina",correo:"pez@gmail.com",telefono:"954320803"},
{id:3,imagen:"DC",nombre:"dante castro",dirrecion:"Av. peru",correo:"dant@gmail.com",telefono:"910345803"},
{id:4,imagen:"MA",nombre:"miguel angel",dirrecion:"Av. chile",correo:"am2mumu@gmail.com",telefono:"940620803"},
{id:5,imagen:"JG",nombre:"jhon gutierrez",dirrecion:"Av. nicaragua",correo:"gui21@gmail.com",telefono:"960380803"},
{id:6,imagen:"MC",nombre:"miguel cahuana",dirrecion:"Av. EE.UU.",correo:"cahu@gmail.com",telefono:"910470835"},
{id:7,imagen:"GA",nombre:"gustavo arias",dirrecion:"mariscal castilla",correo:"gustavo@gmail.com",telefono:"960428893"},
{id:8,imagen:"MA",nombre:"miguel arse",dirrecion:"miguel grau",correo:"miguel@gmail.com",telefono:"980428763"},
{id:9,imagen:"DC",nombre:"diego coata",dirrecion:"puerto rico",correo:"diego@gmail.com",telefono:"990380583"},
{id:10,imagen:"BE",nombre:"brad espejo",dirrecion:"urb las nieves",correo:"brad@gmail.com",telefono:"948427863"},


  ]
  const navegar=useNavigate()
  const redirigirCliente=()=>{
       navegar("/crear-cliente")
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
          <input type="text" className="form-control" placeholder="Buscar..." />
          <button className="btn-search"><i className="bx bx-search-alt-2"></i></button>
        </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-hover shadow-sm rounded res">
          <thead className="table-header text-center ">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {contactos.map((c, index) => (
              <tr key={index} className="align-middle text-center">
                <td>{c.id}</td>
                <td className="icon-user">
                <label>{c.imagen}</label>                
                  {c.nombre}
                </td>
                <td>{c.correo}</td>
                <td>{c.dirrecion}</td>
                <td>{c.telefono}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2">
                  <i class='bx bxs-edit-alt' ></i>
                  </button>
                  <button className="btn btn-danger btn-sm me">
                  <i class='bx bxs-trash' ></i>
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
