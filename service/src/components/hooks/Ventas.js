
import React, { useState } from 'react'
import { axiosInstance } from '../lib/axios'

export default function FunctionVentas() {
    const [venta, setventa] = useState([])
    const FecthVenta=async()=>{
        try{
            const {data}=await axiosInstance.get("/venta/g")
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
