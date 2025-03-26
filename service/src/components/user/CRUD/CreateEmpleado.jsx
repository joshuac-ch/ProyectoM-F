import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../CRUD/create.css"
export default function CreateEmpleado() {
    const redirigir=useNavigate()
    const RegresarUser=()=>{
        redirigir("/user")
    }
  return (
   <>
   <div className="container mt-5">
       <div className="header-emple-create">
        <h2>Nuevo empleado</h2>
        <button type="button" onClick={RegresarUser} className='btn-crear'>Regresar</button>        
        </div>
        <hr />
        <div className="content-emple-create">
            <form method='get' enctype='multipart/form-data'>
            <div class="input-group ">
                
                <div class="w-50 p-3">
                    <label for="" class="form-label">Imagen</label>
                    <input type="file" class="form-control" placeholder='ingrese nombre'/>                
                </div>     
            </div>
            <div className="input-group">
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Contacto</label>
                        <input type="text" class="form-control" placeholder='ingrese nombre'/> 
                    </div> 
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Username</label>
                        <input type="text" class="form-control" placeholder='ingrese username'/> 
                    </div> 
            </div>    
           
           <div className="input-group ">
           <div class="w-50 p-3">
                <label for="" class="form-label">Rol</label>
                <select name="rol" className='form-control' id="">
                    <option value="administrador">administrador</option>
                    <option value="vendedor">vendedor</option>
                </select>                
            </div>
            <div class="w-50 p-3">
                <label for="" class="form-label">Estado</label>
                <select name="estado" className='form-control' id="">
                    <option value="activo">activo</option>
                    <option value="inactivo">inactivo</option>
                </select>       
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
