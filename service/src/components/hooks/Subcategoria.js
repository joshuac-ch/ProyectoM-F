
import React, { useState } from 'react'
import { axiosInstance } from '../lib/axios'

export default function FuncionSubcategoria() {
    const [Subcategoria_id, setSubcategoria_id] = useState([])
    const FechtSubcategoria=async()=>{
        try{
            const {data}=await axiosInstance.get("/subcategoria/g") 
           
            setSubcategoria_id(data)
        }catch(e){
            alert("Hubo un error",e)
        }
    }
  return (
   {Subcategoria_id,FechtSubcategoria}
  )
}
