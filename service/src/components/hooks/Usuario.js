import axios from 'axios'
import React, { useState } from 'react'

export default function FunctionUsuario() {
  const [usuario, setusuario] = useState([])
  const FectUsuario=async()=>{
    try{
        const {data}=await axios.get("http://localhost:4000/api/users/usuario/g")
        setusuario(data)
    }catch(err){
        alert("Hubo un error",err)
    }
  }
    return {usuario,FectUsuario}
}
