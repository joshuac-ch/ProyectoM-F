import axios from 'axios'
import React, { useState } from 'react'

export default function FunctionInventarrio() {
  const [inventario, setinventario] = useState([])
  const FectchInventario=async()=>{
    try{
        const {data}=await axios.get("http://localhost:4000/api/users/inven/g")
        setinventario(data)
    }catch(err){
    console.error("Hubo un error",err)
  }}
    return ({inventario,FectchInventario}
  )
}
