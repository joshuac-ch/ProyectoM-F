import axios from 'axios'
import React, { useState } from 'react'

export default function FuncionAlmacenes() {
   const [almacen_id, setalmacen_id] = useState([])
   const FectAlmacen_id=async()=>{
    try{      
        
        const data_almacen=await axios.get("http://localhost:4000/api/users/almacen/g")
        setalmacen_id(data_almacen.data)
    }catch(e){
        alert("Hubo un erro no se puede mostrar los id de proveedores",e)
    }
}
    return (
    {almacen_id,FectAlmacen_id}
  )
}
