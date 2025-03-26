import React from 'react'
import "../proveedores/hojaprove.css"
import { useNavigate } from 'react-router-dom'
export default function Proveedores() {
    const proveedores=[
{id:1,user_name:"JG",nombre:"joshua gustavo",correo:"joshua@gmail.com",dirrecion:"Av. pirua",telefono:"996230942"},
{id:2,user_name:"A",nombre:"miguel angel",correo:"mangel@gmail.com",  dirrecion:"jr de la union",telefono:"983230942"},
{id:3,user_name:"D",nombre:"dante castro",correo:"danteC@gmail.com",  dirrecion:"gamarra",telefono:"910230977"},
{id:4,user_name:"M",nombre:"miguel arse",correo:"mmarse23@gmail.com", dirrecion:"los jardines",telefono:"916230942"},
{id:5,user_name:"J",nombre:"jeremy arista",correo:"jeremy@gmail.com", dirrecion:"piramides del sol",telefono:"910520942"},
{id:6,user_name:"SC",nombre:"sergio chacon",correo:"sergio@gmial.com", dirrecion:"bayovar",telefono:"910230942"},

    ]
    const navegar=useNavigate()
    const redirigirCrearProveedor=()=>{
        navegar("/crear-proveedor")
    }
  return (
    <>
    
    <div className="contenedor-proveedores container mt-4">
        <div className="header container mt-4">
        <div className="title">
            <h1>Proveedores</h1>
        </div>
        <div className="herra">
          <div className="box">
          <button type='button' className='addp' onClick={redirigirCrearProveedor}  >Agregar Proveedor</button>
          </div>
          
          <div className="box">
            <div className='filter'>
            <input type="text" className='form-control' name="" placeholder='filtrar' id="" />
            <i className='bx bx-search '></i>
            </div>
          </div>
          </div>
        </div>
        <hr />
    <div className="table-responsive">
    <table class="table table-hover shadow-sm rounded res">
        <thead className='table-header text-start'>
            <tr  className='header-table'>
                <th scope="col">Id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Correo</th>
                <th scope="col">Dirrecion</th>
                <th scope="col">Telefono</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
  <tbody >
    {proveedores.map((p)=>{
        return(
            
            <tr>
                <th scope="row" className='align-middle text-start'>{p.id}</th>
                <td >
                    <div className='nombre'>
                        <button type='button' className='form-control'>{p.user_name}</button>
                        <label >{p.nombre}</label>
                    </div>
                </td>
                <td className='align-middle text-start' >{p.correo}</td>
                <td className='align-middle text-start'>{p.dirrecion}</td>
                <td className='align-middle text-start'>{p.telefono}</td>
                <td className='align-middle text-start'>
                    <div className="btn-icons">
                        <button type='button' className='form-control'>
                        <i class='bx bx-edit-alt'></i>
                        </button>
                        <button type='button' className='form-control'>
                        <i class='bx bxs-trash' ></i>
                        </button>
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
