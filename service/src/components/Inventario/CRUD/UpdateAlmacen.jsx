import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function UpdateAlmacen() {
    const navegar=useNavigate()
    const {id}=useParams()
    const [almacen, setalmacen] = useState({
        nombre:"",
        descripcion:""
    })
    
    useEffect(()=>{
        const FecthAlmacen=async()=>{
            try{
               const {data}=await axios.get(`http://localhost:4000/api/users/almacen/show/${id}`)
               setalmacen(data)  
            }catch(e){
                alert("Se encontro un error",e)
            }
        }
        FecthAlmacen()
    },[id])
    const handleText=(e)=>{
        setalmacen({...almacen,[e.target.name]:e.target.value})
    }
    const UpdateAlmacen=async(e)=>{
        e.preventDefault()
        try{
            await axios.put(`http://localhost:4000/api/users/almacen/u/${id}`,almacen)
            alert("Se actualizo el almacen")
            navegar("/inventario")
        }catch(err){
            alert("Hubo un error",err)
        }
    }
  return (
   <>
    <div className="container mt-4">
        <div className="header-almacen">
            <h2>Editar Almacen</h2>
            <button type='button' onClick={()=>navegar("/inventario")}>Regresar</button>
        </div>
        <div className="body-almacen">
        <form onSubmit={UpdateAlmacen} action="">
                <div className="w-100 p-3">
                    <label htmlFor="">Nombre del Almacen</label>
                    <input type="text" className='form-control' value={almacen.nombre} onChange={handleText} name='nombre' placeholder='ingrese el almacen' />
                </div>
                <div className="w-100 p-3">
                    <label htmlFor="">Descripcion</label>
                    <textarea className='form-control' value={almacen.descripcion} onChange={handleText} name='descripcion' id=""></textarea>                   
                </div>
                <div className="input-group w-100 p-3">
                    <button className='btn btn-primary' type="submit">Actualizar Almacen</button>
                </div>
            </form>
        </div>
    </div>
   </>
  )
}
