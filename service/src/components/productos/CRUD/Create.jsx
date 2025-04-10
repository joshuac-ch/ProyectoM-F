import React, { useEffect, useState } from 'react'
import "../CRUD/estilos/create.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FuncionProveedoresId } from '../../hooks/Proveedores'
import FuncionAlmacenes from '../../hooks/Almacenes'
import FuncionSubcategoria from '../../hooks/Subcategoria'
export default function Create() {
    const regresar=useNavigate()
    const RegresarPrincipal=()=>{
        regresar("/productos")
    }
    const [formdata, setformdata] = useState({
            image:"https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_1280.png",
            //cantidad_disponible:"",
            fecha_vencimiento:new Date(),
            precio_ingreso:"",
            precio_venta:"",
            descripcion:"",
            codigo_producto:"",           
            nombre:"",
            unidad_medida:"",
            proveedor_id:"",
            almacen_id:"",
            subcategoria_id:""
    }) 
    const handleText=(e)=>{
        setformdata({...formdata,[e.target.name]:e.target.value})
    }
    const SubmitCreate=async(e)=>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:4000/api/users/producto/c/",formdata)
            alert("Se creo el producto")
            regresar("/productos")
        }catch(e){
            alert("Hubo un error",e)
        } 
    }
    //fUNCIONES DERIVADAS DE HOOKS
    const {proveedores_id,FectchProveedoresID}=FuncionProveedoresId()
    const {almacen_id,FectAlmacen_id}=FuncionAlmacenes()
    const {Subcategoria_id,FechtSubcategoria}=FuncionSubcategoria()   
    
    useEffect(()=>{
        FectchProveedoresID(),
        FectAlmacen_id(),
        FechtSubcategoria()
    },[])

  return (
    <>
    <div className="container mt-5">
       <div className="header-productos-create">
        <h2>Crear producto</h2>
        <button type="button" onClick={RegresarPrincipal} className='btn-crear'>Regresar</button>        
        </div>
        <hr />
        <div className="content-productos-create">
            <form onSubmit={SubmitCreate}>
                <div className="w-100 p-3">
                <label for="" class="form-label">Imagen Opcional*</label>
                <input type="text" class="form-control" onChange={handleText} name='image' placeholder='ingrese imagen'/>       
                </div>
            <div class="input-group ">
                <div class="w-50 p-3">
                    <label for="" class="form-label">Codigo</label>
                    <input type="text" class="form-control" onChange={handleText} name='codigo_producto' placeholder='ingrese codigo'/>                
                </div>                   
            </div>
            <div class="w-50 p-3">
                    <label for="" class="form-label">Nombre</label>
                    <input type="text" class="form-control" onChange={handleText} name='nombre' placeholder='ingrese nombre'/>                
                </div>  
            <div className="w-100 p-3">
                <label for="" class="form-label">Descripcion Opcional*</label>
                <textarea  class="form-control" onChange={handleText} name='descripcion' rows={2} id=""></textarea>      
                </div>
            <div className="input-group">
                    {/*
                        <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Cantidad</label>
                        <input type="number" onChange={handleText} class="form-control" name='cantidad_disponible' placeholder='ingrese cantidad'/> 
                    </div>
                    */}
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Fecha Vencimiento Opcional*</label>
                        <input type="datetime-local" onChange={handleText} class="form-control" name='fecha_vencimiento' /> 
                    </div>  
            </div>
            <div className="input-group">
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Precio ingreso</label>
                        <input type="number"  step={0.01} onChange={handleText} class="form-control" name='precio_ingreso' placeholder='ingrese precio ingreso'/> 
                    </div> 
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Precio Venta</label>
                        <input type="number" step={0.01} onChange={handleText} class="form-control" name='precio_venta' placeholder='ingrese precio venta'/> 
                    </div> 
            </div>    
           
           <div className="input-group ">
                    <div class="w-50 p-3">
                            <label for="" class="form-label">Unidad de medida </label> 
                            <input type="text" onChange={handleText} class="form-control" placeholder='ejemplo caja, botellas, sixpack' name='unidad_medida' />     
                                        
                    </div>
                    <div class="w-50 p-3">
                            <label for="" class="form-label">Subcategoria ID</label>
                            <select  onChange={handleText} class="form-control" name='subcategoria_id' id="">
                                <option value="" selected disabled>Elija una Subcategoria</option>
                                {Subcategoria_id.map((s)=>{
                                    return(
                                        <option value={s.id}>ID: {s.id}|| Nombre:{s.nombre}</option>                                        
                                    )
                                })}
                            </select>
                                     
                    </div>
            </div>
            <div className="input-group ">
                    <div class="w-50 p-3">
                            <label for="" class="form-label">Almacen id</label>                            
                            <select  onChange={handleText} class="form-control" name='almacen_id' id="">
                                    <option value="" selected disabled>Por favor seleccione su almacen</option>
                                    {almacen_id.map((a)=>{
                                        return(
                                            <option value={a.id}>ID:{a.id} || Almacen: {a.nombre}</option>
                                        )
                                    })}
                                </select>                
                    </div>
                    <div class="w-50 p-3">
                            <label for="" class="form-label">Proveedor ID</label>
                            <select name='proveedor_id' onChange={handleText} class="form-control" id="">
                                <option value="" selected disabled>Por favor seleccione su proveedor</option>
                                {proveedores_id.map((p)=>{
                                    return(
                                        <option value={p.id}>ID: {p.id} || Nombre: {p.nombre} {p.apellido} || Empresa: {p.empresa}</option>
                                    )
                                })}
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
