import React, { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import "../user/hojauser.css"
import { useNavigate } from 'react-router-dom'
export default function User() {
  const usuarios=[
        {id:1,imagen:"https://i.pinimg.com/474x/0f/31/41/0f31417053111c551663e0e8c0b9e5c9.jpg",contacto:"anais paliyo" ,password:"animales1424",username:"joshua",rol:"vendedor",estado:"activo"},
        {id:2,imagen:"https://i.pinimg.com/474x/0f/b7/43/0fb74310291412e498e81b6493ff1ea8.jpg",contacto:"amanda elera" ,password:"pyJHcrz132",username:"erick",rol:"administrador",estado:"activo"},
        {id:3,imagen:"https://i.pinimg.com/474x/b9/b3/8a/b9b38aac2791b02b81e166d1a0819201.jpg",contacto:"andrea wiese" ,password:"blackMan2121",username:"andres",rol:"vendedor",estado:"no activo"},
  ]
  const redirigir=useNavigate()
  const CreateEmpleado=()=>{
    redirigir("/crear-empleado")
  }
  const [Empleados, setEmpleado] = useState("todos")
  const EmpleadosFiltar=Empleados==="todos"?
  usuarios: usuarios.filter((e)=>e.rol===Empleados)
  
  
  
  const CambiarRolEmpleado=(v)=>{
      setEmpleado(v)
  }

  return (
    <>
    <div className="header-usuarios container mt-4">
     <div className="usuarios">
      <div className="user">
        <h2>Empleados</h2>
      </div>
      <div className="herra">
          <div className="box">
          <button type='button' className='addp' onClick={CreateEmpleado} >Agregar empleado</button>
          </div>
          <div className="box">
            <select className="form-select" onChange={(e)=>CambiarRolEmpleado(e.target.value)}  name="" id="">
              <option value="todos" selected>todos</option>
              <option value="vendedor">vendedor</option>
              <option value="administrador">administrador</option>
              
            </select>
          </div>
          <div className="box">
            <div className='filter'>
            <input type="text" className='form-control' name="" placeholder='filtrar' id="" />
            <i className='bx bx-search '></i>
            </div>
          </div>
          </div>
     </div>
    </div>
    <div className="container mt-4" >
        <div className="table-responsive">
                <table className="table table-hover custom-table">
                  <thead>
                    <tr>
                      <th>Foto</th>
                      <th>Id</th>                      
                      <th>Contacto</th>
                      <th>Username</th>
                      <th>Password</th>
                      <th>Rol</th>
                      <th>Estado</th>
                      <th>Acciones</th>                      
                    </tr>
                  </thead>
                  <tbody>
                    {EmpleadosFiltar.map((user) => (
                        
                      <tr key={user.id}>
                        <td className="align-middle text-center">
                          <img
                            src={user.imagen}
                            alt={user.contacto}
                            className="product-img"
                          />
                        </td> 
                        <td className="align-middle text-center">{user.id}</td>
                        <td className="align-middle">{user.contacto}</td>               
                        <td className="align-middle text-center">{user.username}</td>
                        <td className="align-middle text-center">                        
                          <input type="password" value={user.password} name="" id="" />
                          
                         
                          
                          </td>
                        <td className="align-middle text-center">{user.rol}</td>
                        <td className="align-middle text-center">{user.estado}</td>                       
                        <td className="align-middle text-center">
                          <button className="btn btn-warning btn-sm me">
                          <i className='bx bxs-edit-alt' ></i>
                          </button>
                          <button className="btn btn-danger btn-sm">
                          <i className='bx bxs-trash' ></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
        
              {/* Estilos personalizados */}
              <style>
                {`
                  .custom-table {
                    overflow: hidden;
                    background: white;
                                             
                  }
                  .custom-table th {
                    background: rgb(137, 173, 228);
                    color: black;
                    text-align: center;
                  }
                  .custom-table tbody tr:hover {
                    background: #f1f5f9;
                    transition: 0.3s;
                  }
                  .product-img {
                    width: 50px;
                    height: 50px;
                    object-fit: cover;
                    border-radius: 10px;
                  }
                  .btn {
                    transition: 0.3s;
                  }
                  .btn:hover {
                    transform: scale(1.05);
                  }
                `}
              </style>
            </div>
    

    
    </>
  )
}
