
import React, { useState } from 'react'
import { axiosInstance } from '../lib/axios'

export default function FunctionInventarrio() {
  const [inventario, setinventario] = useState([])
  const FectchInventario=async()=>{
    try{
        const {data}=await axiosInstance.get("/inven/g")
        setinventario(data)
    }catch(err){
    console.error("Hubo un error",err)
  }}
    return ({inventario,FectchInventario,setinventario}
  )
}
