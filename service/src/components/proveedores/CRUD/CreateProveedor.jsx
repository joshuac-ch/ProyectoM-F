import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateProveedor() {
    const navegar=useNavigate()
    const regresarPrincipal=()=>{
            navegar("/proveedores")
    }

  return (
   <>
   <div className="contenedor-proveedor container mt-4">
    <div className="header">
        <h2>Nuevo proveedor</h2>
        <div className="header-productos-create"> {/*ESTA CLASE LE PERTENECE A PRODUCTOS */}
            <button type="button" onClick={regresarPrincipal} className='btn-crear'>Regresar</button>
        </div>        
    </div>
    <div className="second">
    <form>
        <div className="input-group">
        <div class="w-50 p-3">
            <label  class="form-label">Nombre</label>
            <input type="text" class="form-control" />    
        </div> 
        <div class="w-50 p-3">
            <label  class="form-label">Correo</label>
            <input type="email" class="form-control" />    
        </div> 
        </div>
        <div className="input-group">
        <div class="w-50 p-3">
            <label  class="form-label">Dirrecion</label>
            <input type="text" class="form-control" />    
        </div> 
        <div class="w-50 p-3">
            <label  class="form-label">Telefono</label>
            <input type="email" class="form-control" />    
        </div> 
        </div>
        <div className="d-flex justify-content-center">
            <button type="submit" class="btn btn-primary w-25 p-10">Submit</button>
        </div>
        
    </form>
    </div>
   </div>
   </>
  )
}
