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
 useEffect(()=>{
    if(Subcategoria_id.length>0&& proveedores_id.length>0 && almacen_id.length>0){
        setformdata((p)=>({
            ...p,
            subcategoria_id:Subcategoria_id[0].id,
            proveedor_id:proveedores_id[0].id,
            almacen_id:almacen_id[0].id      
            //proveedor_id:proveedores_id
          }))
    }
  },[Subcategoria_id,proveedores_id,almacen_id])
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
                <div className="grupo">
                    <div className="detalles-grupo">
                    <div className="">
                        <label htmlFor="" className="form-label">Imagen Opcional*</label>
                        <input type="text" className="form-control" onChange={handleText} name='image' placeholder='ingrese imagen'/>       
                    </div>           
                    <div className="">
                        <label htmlFor="" className="form-label">Codigo</label>
                        <input type="text" className="form-control" onChange={handleText} name='codigo_producto' placeholder='ingrese codigo'/>                
                    </div>            
                    <div className="">
                        <label htmlFor="" className="form-label">Nombre</label>
                        <input type="text" className="form-control" onChange={handleText} name='nombre' placeholder='ingrese nombre'/>                
                    </div>
                    </div>
                    <div className="imagen-grupo">
                        <img className='form-control' src={formdata.image} alt="" />
                    </div> 
                </div> 
            <div className="w-100 p-3">
                <label htmlFor="" className="form-label">Descripcion Opcional*</label>
                <textarea  className="form-control" onChange={handleText} name='descripcion' rows={2} id=""></textarea>      
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
                        <input type="datetime-local" onChange={handleText} className="form-control" name='fecha_vencimiento' /> 
                    </div>  
            </div>
            <div className="input-group">
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Precio ingreso</label>
                        <input type="number"  step={0.01} onChange={handleText} className="form-control" name='precio_ingreso' placeholder='ingrese precio ingreso'/> 
                    </div> 
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Precio Venta</label>
                        <input type="number" step={0.01} onChange={handleText} className="form-control" name='precio_venta' placeholder='ingrese precio venta'/> 
                    </div> 
            </div>    
           
           <div className="input-group ">
                    <div className="w-50 p-3">
                            <label htmlFor="" className="form-label">Unidad de medida </label> 
                            <input type="text" onChange={handleText} className="form-control" placeholder='ejemplo caja, botellas, sixpack' name='unidad_medida' />     
                                        
                    </div>
                    <div className="w-50 p-3">
                            <label htmlFor="" className="form-label">Subcategoria ID</label>
                            <select  onChange={handleText} className="form-control" name='subcategoria_id' id="">
                                <option value="" disabled>Elija una Subcategoria</option>
                                {Subcategoria_id.map((s)=>{
                                    return(
                                        <option key={s.id} value={s.id}>ID: {s.id}|| Nombre:{s.nombre}</option>                                        
                                    )
                                })}
                            </select>
                                     
                    </div>
            </div>
            <div className="input-group ">
                    <div className="w-50 p-3">
                            <label htmlFor="" className="form-label">Almacen id</label>                            
                            <select  onChange={handleText} className="form-control" name='almacen_id' id="">
                                    <option value=""  disabled>Por favor seleccione su almacen</option>
                                    {almacen_id.map((a)=>{
                                        return(
                                            <option key={a.id} value={a.id}>ID:{a.id} || Almacen: {a.nombre}</option>
                                        )
                                    })}
                                </select>                
                    </div>
                    <div className="w-50 p-3">
                            <label htmlFor="" className="form-label">Proveedor ID</label>
                            <select name='proveedor_id' onChange={handleText} className="form-control" id="">
                                <option value=""  disabled>Por favor seleccione su proveedor</option>
                                {proveedores_id.map((p)=>{
                                    return(
                                        <option key={p.id} value={p.id}>ID: {p.id} || Nombre: {p.nombre} {p.apellido} || Empresa: {p.empresa}</option>
                                    )
                                })}
                            </select>
                                       
                    </div>
            </div>
             
            <div className="d-flex justify-content-center">  
                
                <button type="submit" className="btn btn-primary w-25 p-10">Submit</button> 
                
            
            </div>        
            </form>
        </div>
    </div>
    </>
  )
}
