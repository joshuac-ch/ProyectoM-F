import axios from 'axios'
import React, { useState } from 'react'

export default function FunctionVentas() {
    const [venta, setventa] = useState([])
    const FecthVenta=async()=>{
        try{
            const {data}=await axios.get("http://localhost:4000/api/users/venta/g")
            setventa(data)
        }catch(err){
            console.error("Hubo un error",err)
        }
    }
    return (
   {
    venta,FecthVenta
   }
  )
}
