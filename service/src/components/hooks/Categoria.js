
import React, { useState } from 'react'
import { axiosInstance } from '../lib/axios'

export default function FunctionCategoria() {
  const [categoria, setcategoria] = useState([])
  const FecthCategoria=async()=>{
    try{
        const {data}=await axiosInstance.get("/categoria/s")
        setcategoria(data)
    }catch(err){
        alert("Hubo un error en categorias",err)
    }
  }
    return ({FecthCategoria,categoria})
}
