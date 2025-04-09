import axios from 'axios'
import React, { useState } from 'react'

export default function FuncionCajas() {
  const [caja, setcaja] = useState([])
  const FecthCaja=async(id)=>{
    const {data}=axios.get(`http://localhost:4000/api/users/caja/s/${id}`)
    setcaja(data)
  }
    return (
    {caja,FecthCaja}
  )
}
