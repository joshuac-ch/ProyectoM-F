import axios from 'axios'
import React, { useState } from 'react'

export default function FunctionProducto() {
  const [producto, setproducto] = useState([]) 
  const FectProdcutos=async()=>{
    try{
        const {data}=await axios.get("http://localhost:4000/api/users/producto/g")
        setproducto(data)
    }
    catch(err){
        alert("Hubo un error",err)
    }
}
  return {FectProdcutos,producto}
}
