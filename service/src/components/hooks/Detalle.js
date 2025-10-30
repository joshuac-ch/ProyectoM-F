
import React, { useState } from 'react'
import { axiosInstance } from '../lib/axios'

export default function FuncitonDetalle() {
  const [detalle, setdetalle] = useState([])
  const FuncitonDetalleectDetalle=async()=>{
    const {data}=await axiosInstance.get("/detalle/g")
    setdetalle(data) 
  }
    return (
   {detalle,FuncitonDetalleectDetalle} 
  )
}
