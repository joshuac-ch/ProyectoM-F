
import React, { useState } from 'react'
import { axiosInstance } from '../lib/axios'

export default function FuncionEmpleados() {
  const [empleado, setempleado] = useState([])
  const usuariologin=localStorage.getItem("id_usuario") 
  const FectUsuarios=async()=>{
    const {data}=await axiosInstance.get(`/usuario/s/${usuariologin}`)
    setempleado(data.user)
  }  
  return (
    {empleado,FectUsuarios}    
)
}
