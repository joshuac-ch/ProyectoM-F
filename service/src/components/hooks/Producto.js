
import React, { useState } from 'react'
import { axiosInstance } from '../lib/axios'

export default function FunctionProducto() {
  const [producto, setproducto] = useState([]) 
  const FectProdcutos=async()=>{
    try{
        const {data}=await axiosInstance.get("/producto/g")
        setproducto(data)
    }
    catch(err){
        alert("Hubo un error",err)
    }
}
  return {FectProdcutos,producto}
}
