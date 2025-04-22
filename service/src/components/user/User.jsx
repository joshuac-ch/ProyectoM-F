import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import "../user/hojauser.css"
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import FuncionDelimitar from '../hooks/Delimitar'
import FunctionUsuario from '../hooks/Usuario'


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
  //Revisar estos cambios
  const redirigir=useNavigate()
  const CreateEmpleado=()=>{
    if(FuncionDelimitar("editar")){
    redirigir("/user/crear-empleado")
  } else{
    alert("Solo personal autorizado")
  }
}
  //SHOW
  
  const handleViewUser = (id) => {
    if(FuncionDelimitar("editar")){
      //redirigir(`/user/${id}`); // Redirige a la página de detalles del usuario
      redirigir(`/user/${id}`);
    }else{
      alert("No puede ingresar solo personal autorizado")       
      
    }
    
  
 
};
  
  //const [Empleados, setEmpleado] = useState("todos")
  //const EmpleadosFiltar=Empleados==="todos"?
  //usuarios: usuarios.filter((e)=>e.rol===Empleados)
  
 
  //DELETE
  
  const handleDeleteUser = async (id) => {
    if(FuncionDelimitar("eliminar")){
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
  }else{
    alert("Solo personal autorizado")
  }
  };  
 const {FectUsuario,usuario}=FunctionUsuario()
 useEffect(()=>{
  FectUsuario()
 },[]) 
 const [empleadofilter, setempleadofilter] = useState("")
 const datosFiltrados=usuario.filter((u)=>u.nombre.toLowerCase().includes(empleadofilter.toLowerCase())  
) 
 const handleChangeEmpleados=(e)=>{
  setempleadofilter(e.target.value)
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
            <div className='filter'>
            <input type="text" className='form-control' value={empleadofilter} onChange={handleChangeEmpleados}  placeholder='buscar...' id="" />
            <i className='bx bx-search '></i>
            </div>
          </div>
          </div>
     </div>
    </div>
    <div className="p-3 tabla-emp ">
        <div className="table-responsive tabla-empleados">
                <table className="table table-hover custom-table cabecera-user">
                  <thead >
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
                    {datosFiltrados.map((user) => (
                        
                      <tr key={user.id}>
                       
                        <td className="align-middle ">{user.id}</td>
                        
                        <td className="align-middle btn-user">
                          
                          <button type='button'>{user.nombre.charAt(0).toLocaleUpperCase()}{user.apellido.charAt(0).toLocaleUpperCase()}  </button>
                          
                          {user.nombre} </td>               
                        <td className="align-middle">{user.username}</td>               
                        
                        <td className="align-middle text-start">{user.correo.slice(0,3)+"..."+user.correo.slice(17,35)}</td>
                        <td className="align-middle text-start">{user.telefono.slice(0,3)+"..."+user.telefono.slice(6,9)}</td>
                        <td className="align-middle text-start">{user.direccion.length>=20?user.direccion.slice(0,10)+"...":user.direccion}</td>
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
