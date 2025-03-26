import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Createcliente() {
    const navegar=useNavigate()
    const redirigirCliente=()=>{
         navegar("/contact")
    }
  return (
   <>
   <div className="contenedor-proveedor container mt-4">
    <div className="header">
        <h2>Nuevo Cliente</h2>
        <div className="header-productos-create"> {/*ESTA CLASE LE PERTENECE A PRODUCTOS */}
            <button type="button" onClick={redirigirCliente} className='btn-crear'>Regresar</button>
        </div>        
    </div>
    <div className="second">
    <form>
        
        <div class="w-100 p-3">
            <label  class="form-label">Nombre</label>
            <input type="text" placeholder='Ingrese su nombre' class="form-control" />    
        </div>
        <div class="w-100 p-3">
            <label  class="form-label">Correo</label>
            <input type="email" placeholder='Ingrese su correo electronico' class="form-control" />    
        </div> 
        
        
        <div class="w-100 p-3">
            <label  class="form-label">Dirrecion</label>
            <input type="text" placeholder='Ingrese su dirrecion' class="form-control" />    
        </div> 
        <div class="w-100 p-3">
            <label  class="form-label">Telefono</label>
            <input type="email" placeholder='Ingrese su telefono' class="form-control" />    
        </div> 
        
        <div className="d-flex justify-content-center p-3">
            <button type="submit" class="btn btn-primary w-25 p-10">Submit</button>
        </div>
        
    </form>
    </div>
   </div>
   </>
  )
}
