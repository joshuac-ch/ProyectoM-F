import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import "../user/hojauser.css"
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function User() {
 // const navigae=Navigate()
  const [users, setusers] = useState([])
  const FectchUsers=async()=>{
    try{
      const {data}=await axios.get("http://localhost:4000/api/users/usuario/g")
      setusers(data)
    }catch(e){
      console.error("hubo un error",e)
    }
  }
  useEffect(()=>{
    FectchUsers()
  },[])
  const redirigir=useNavigate()
  const CreateEmpleado=()=>{
    redirigir("/crear-empleado")
  }
  //SHOW
  const handleViewUser = (id) => {
    redirigir(`/user/${id}`); // Redirige a la página de detalles del usuario
  };
  
  //const [Empleados, setEmpleado] = useState("todos")
  //const EmpleadosFiltar=Empleados==="todos"?
  //usuarios: usuarios.filter((e)=>e.rol===Empleados)
  
  //DELETE
  const handleDeleteUser = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar este usuario?");
    if (confirmar) {
      try {
        await axios.delete(`http://localhost:4000/api/users/usuario/d/${id}`);
        setusers(users.filter((user) => user.id !== id)); // Actualiza la lista eliminando el usuario
        
        alert("Usuario eliminado correctamente");
      } catch (error) {
        console.error("Error al eliminar el usuario", error);
        alert("No se pudo eliminar el usuario");
      }
    }
  };  
  
 

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
            <select className="form-select" onChange={""}  name="" id="">
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
    <div className="p-3 ">
        <div className="table-responsive">
                <table className="table table-hover custom-table">
                  <thead>
                    <tr>
                    <th>Id</th>  
                    
                                          
                      <th>Contacto</th>
                      <th>Username</th>
                     
                      <th>Correo</th>
                      <th>Telefono</th>
                      <th>Direccion</th>
                      <th>Rol</th>
                      <th>Almacen ID</th>
                      <th>Acciones</th>                      
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                        
                      <tr key={user.id}>
                       
                        <td className="align-middle ">{user.id}</td>
                        
                        <td className="align-middle btn-user">
                          
                          <button type='button'>{user.nombre.charAt(0).toLocaleUpperCase()}{user.apellido.charAt(0).toLocaleUpperCase()}  </button>
                          
                          {user.nombre} {user.apellido}</td>               
                        <td className="align-middle">{user.username}</td>               
                        
                        <td className="align-middle text-start">{user.correo}</td>
                        <td className="align-middle text-start">{user.telefono}</td>
                        <td className="align-middle text-start">{user.direccion}</td>
                        <td className="align-middle text-start">{user.rol}</td>
                        <td className="align-middle text-start">{user.almacen_id}</td>                       
                        <td className="align-middle text-start botones">
                          <button onClick={()=>handleViewUser(user.id)} className="btn btn-warning btn-sm me">
                          <i className='bx bxs-edit-alt' ></i>
                          </button>
                          <button onClick={()=>handleDeleteUser(user.id)} className="btn btn-danger btn-sm">
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
                    text-align: start;
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
