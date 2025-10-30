
import React, { useState } from 'react'
import { axiosInstance } from '../lib/axios'

export default function FuncionClientes() {
  const [cliente, setcliente] = useState([])
  const FecthCliente=async()=>{
    try{
        const {data}=await axiosInstance.get("/cliente/g")
        setcliente(data)
    }catch(err){
        console.error("Hubo un error",err)
    }
  }
    return ({FecthCliente,cliente})
}
