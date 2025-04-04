import axios from 'axios'
import React, { useState } from 'react'

export default function FuncionClientes() {
  const [cliente, setcliente] = useState([])
  const FecthCliente=async()=>{
    try{
        const {data}=await axios.get("http://localhost:4000/api/users/cliente/g")
        setcliente(data)
    }catch(err){
        console.error("Hubo un error",err)
    }
  }
    return ({FecthCliente,cliente})
}
