
import React, { useState } from 'react'
import { axiosInstance } from '../lib/axios'

export default function FuncionCajas() {
  const [caja, setcaja] = useState([])
  const FecthCaja=async(id)=>{
    const {data}=axiosInstance.get(`/caja/s/${id}`)
    setcaja(data)
  }
    return (
    {caja,FecthCaja}
  )
}
