import React from 'react'
import "../CRUD/estilos/create.css"
import { useNavigate } from 'react-router-dom'
export default function Create() {
    const regresar=useNavigate()
    const RegresarPrincipal=()=>{
        regresar("/productos")
    }
  return (
    <>
    <div className="container mt-5">
       <div className="header-productos-create">
        <h2>Crear producto</h2>
        <button type="button" onClick={RegresarPrincipal} className='btn-crear'>Regresar</button>        
        </div>
        <hr />
        <div className="content-productos-create">
            <form>
            <div class="input-group ">
                <div class="w-50 p-3">
                    <label for="" class="form-label">Codigo</label>
                    <input type="text" class="form-control" placeholder='ingrese codigo'/>                
                </div>
                <div class="w-50 p-3">
                    <label for="" class="form-label">Nombre</label>
                    <input type="text" class="form-control" placeholder='ingrese nombre'/>                
                </div>     
            </div>
            <div className="input-group">
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Precio</label>
                        <input type="number" class="form-control" placeholder='ingrese precio'/> 
                    </div> 
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Cantidad</label>
                        <input type="number" class="form-control" placeholder='ingrese cantidad'/> 
                    </div> 
            </div>    
           
           <div className="input-group ">
           <div class="w-50 p-3">
                <label for="" class="form-label">Unidad</label>
                <input type="text" class="form-control" placeholder='ingrese Unidad'/>                
            </div>
            <div class="w-50 p-3">
                <label for="" class="form-label">Proveedor</label>
                <input type="text" class="form-control" placeholder='ingrese proveedor'/>                
            </div>
           </div>
            <div className="input-group ">
            <div class="w-100 p-3">
                <label for="" class="form-label">Categoria</label>
                <select name="" className='form-control' id="">
                    <option value="abarrotes">Abarrotes</option>
                    <option value="licores">Licores</option>
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
