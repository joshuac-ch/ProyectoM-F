import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../ESTILOS/estilos.css"

import { axiosInstance } from '../../lib/axios'
export default function CreateAlmacen() {
    const [valueFomr, setvalueFomr] = useState({
        nombre:"",
        descripcion:""
    })
    const handleText=(e)=>{
        setvalueFomr({...valueFomr,[e.target.name]:e.target.value})
    }
  const navegar=useNavigate()
  const SubmitCreate=async(e)=>{
    e.preventDefault()
    try{
        await axiosInstance.post("/almacen/c",valueFomr)
        alert("Se creo el almacen")
        navegar("/inventario")
    }catch(e){
        alert("Rellenar todos los campos",e)
    }
  }
    return (
    <>
    <div className="container mt-4">
        <div className="header-almacen">
            <h2>Crear nuevo almacen</h2>
            <button type='button' onClick={()=>navegar("/inventario")}>Regresar</button>
        </div>
        <hr />
        <div className="body-alamcen">
            <form onSubmit={SubmitCreate} action="">
                <div className="w-100 p-3">
                    <label htmlFor="">Nombre del Almacen</label>
                    <input type="text" className='form-control' onChange={handleText} name='nombre' placeholder='ingrese el almacen' />
                </div>
                <div className="w-100 p-3">
                    <label htmlFor="">Descripcion</label>
                    <textarea className='form-control' onChange={handleText} name='descripcion' id=""></textarea>                   
                </div>
                <div className="input-group w-100 p-3">
                    <button className='btn btn-primary' type="submit">Crear Almacen</button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}
