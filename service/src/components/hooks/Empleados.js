import axios from 'axios'
import React, { useState } from 'react'

export default function FuncionEmpleados() {
  const [empleado, setempleado] = useState([])
  const usuariologin=localStorage.getItem("id_usuario") 
  const FectUsuarios=async()=>{
    const {data}=await axios.get(`http://localhost:4000/api/users/usuario/s/${usuariologin}`)
    setempleado(data.user)
  }  
  return (
    {empleado,FectUsuarios}    
)
}
