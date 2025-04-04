import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CerrarCaja() {
    const {id}=useState()
    const navegar=useNavigate()
    const [dataCerrarForm, setdataCerrarForm] = useState({
        tienda_id:id
    })
    const handleText=(e)=>{
        setdataCerrarForm({...dataCerrarForm,[e.target.name]:e.target.value})
    }
    const OnCerrarSumbit=async(e)=>{
        e.preventDefault()
        try{
            await axios.post(`http://localhost:4000/api/users/caja/cerrar/${id}`)
            alert("Se cerro la caja exitosamente")
            navegar("/caja")
        }catch(err){
            alert("Hubo un error al cerrar caja no es la caja abierta",err)
        }
    }
  return (
    <>
    <div className="container mt-4">
    <div className="header-movimiento">
    <h2>Cerrar Caja</h2>
    <button type="button" onClick={()=>navegar("/caja")}>Regresar</button>
    </div>
    <hr />
    <div className="body-movimiento">
        <form onSubmit={OnCerrarSumbit}>
            <label htmlFor="">TIENDA ID</label>
            <input type="number" placeholder='ingrese el ID de la tienda' onChange={handleText} name='tienda_id' />
            <button type="submit">Cerrar caja</button>
        </form>
    </div>
   </div>
    </>
  )
}
