
import React, { useState } from 'react'
import { axiosInstance } from '../lib/axios'

export default function FunctionUsuario() {
  const [usuario, setusuario] = useState([])
  const FectUsuario=async()=>{
    try{
        const {data}=await axiosInstance.get("/usuario/g")
        setusuario(data)
    }catch(err){
        alert("Hubo un error",err)
    }
  }
    return {usuario,FectUsuario}
}
