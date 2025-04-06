import axios from 'axios'
import React, { useState } from 'react'

export default function FuncitonDetalle() {
  const [detalle, setdetalle] = useState([])
  const FuncitonDetalleectDetalle=async()=>{
    const {data}=await axios.get("http://localhost:4000/api/users/detalle/g")
    setdetalle(data) 
  }
    return (
   {detalle,FuncitonDetalleectDetalle} 
  )
}
