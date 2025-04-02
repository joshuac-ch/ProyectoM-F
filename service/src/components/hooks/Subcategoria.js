import axios from 'axios'
import React, { useState } from 'react'

export default function FuncionSubcategoria() {
    const [Subcategoria_id, setSubcategoria_id] = useState([])
    const FechtSubcategoria=async()=>{
        try{
            const {data}=await  axios.get("http://localhost:4000/api/users/subcategoria/g") 
           
            setSubcategoria_id(data)
        }catch(e){
            alert("Hubo un error",e)
        }
    }
  return (
   {Subcategoria_id,FechtSubcategoria}
  )
}
