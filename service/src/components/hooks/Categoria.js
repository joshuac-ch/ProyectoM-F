import axios from 'axios'
import React, { useState } from 'react'

export default function FunctionCategoria() {
  const [categoria, setcategoria] = useState([])
  const FecthCategoria=async()=>{
    try{
        const {data}=await axios.get("http://localhost:4000/api/users/categoria/s")
        setcategoria(data)
    }catch(err){
        alert("Hubo un error en categorias",err)
    }
  }
    return ({FecthCategoria,categoria})
}
