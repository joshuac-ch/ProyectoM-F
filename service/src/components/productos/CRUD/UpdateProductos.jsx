
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FuncionAlmacenes from '../../hooks/Almacenes'
import FuncionSubcategoria from '../../hooks/Subcategoria'
import { FuncionProveedoresId } from '../../hooks/Proveedores'
import FuncionDelimitar from '../../hooks/Delimitar'
import { axiosInstance } from '../../lib/axios'

export default function UpdateProductos() {
  const navigate=useNavigate()
  const {id}=useParams()
  const [productos, setproductos] = useState({
            image:"",
            //cantidad_disponible:"",
            fecha_vencimiento:"",
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
    setproductos({...productos,[e.target.name]:e.target.value})
  }
  useEffect(()=>{
    const fechtProductos=async()=>{
      try{
        const {data}=await axiosInstance.get(`/producto/s/${id}`)
        setproductos(data)
      }catch(e){
        alert("#Hubo un error",e)
      }
    }
    fechtProductos()
  },[id])
  const UpdateForm=async(e)=>{
    
    e.preventDefault()
    if(FuncionDelimitar("editar")){
    try{
      await axiosInstance.put(`/producto/u/${id}`,productos)
      alert("Se actualizaron los datos")
      navigate("/productos")
    }catch(e){
      alert("Hubo un error",e)
    }
  }else{
    alert("Solo personal autorizado puede editar los productos")
  }
}
  const {almacen_id,FectAlmacen_id}=FuncionAlmacenes()
  const {Subcategoria_id,FechtSubcategoria}=FuncionSubcategoria()
  const {proveedores_id,FectchProveedoresID}=FuncionProveedoresId()
  useEffect(()=>{
    FectAlmacen_id(),
    FechtSubcategoria(),
    FectchProveedoresID()
  },[])
 
  return (
    <>
    <div className="container mt-4">
        <div className="header-productos-create">
            <h2>Editar producto</h2>
            <button type="button" onClick={()=>navigate("/productos")} className='btn-crear'>Regresar</button>        
        </div>
        <hr />
     <div className="body-productos">
     <form onSubmit={UpdateForm} >
              <div className="grupo">
              <div className="detalles-grupo">
                <div className=''>
                    <label htmlFor="" className="form-label">Imagen</label>
                    <input type="text" className="form-control" value={productos.image} onChange={handleText} name='image' placeholder='ingrese imagen'/>       
                </div>
                <div className=" ">                
                    <label htmlFor="" className="form-label">Codigo</label>
                    <input type="text" className="form-control" value={productos.codigo_producto} onChange={handleText} name='codigo_producto' placeholder='ingrese codigo'/>                
                </div>
                <div >
                    <label htmlFor="" className="form-label">Nombre</label>
                    <input type="text" className="form-control" value={productos.nombre} onChange={handleText} name='nombre' placeholder='ingrese nombre'/>                
                </div>  
              </div>
               
             <div className="imagen-grupo">
             <img src={productos.image||null}  className='form-control' alt="no encontrado" />
             </div>
             </div>
             
            <div className="w-100 p-3">
                <label htmlFor="" className="form-label">Descripcion</label>
                <textarea  className="form-control" onChange={handleText} value={productos.descripcion} name='descripcion' rows={2} id=""></textarea>      
                </div>
            <div className="input-group">
                   {/*
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Cantidad</label>
                        <input type="number" onChange={handleText} class="form-control" value={productos.cantidad_disponible} name='cantidad_disponible' placeholder='ingrese cantidad'/> 
                    </div>
                   */}
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Fecha Vencimiento:</label>
                        <input type="datetime-local" onChange={handleText} className='form-control'  value={productos.fecha_vencimiento.split("Z")[0]} name='fecha_vencimiento' placeholder='ingrese cantidad'/> 
                    </div>  
            </div>
            <div className="input-group">
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Precio ingreso</label>
                        <input type="number"  step={0.01} onChange={handleText} className="form-control" value={productos.precio_ingreso} name='precio_ingreso' placeholder='ingrese precio ingreso'/> 
                    </div> 
                    <div className="w-50 p-3">
                        <label htmlFor="" className='form-label'>Precio Venta</label>
                        <input type="number"  step={0.01} onChange={handleText} className="form-control" value={productos.precio_venta} name='precio_venta' placeholder='ingrese precio venta'/> 
                    </div> 
            </div>    
           
           <div className="input-group ">
                    <div className="w-50 p-3">
                            <label htmlFor="" className="form-label">Unidad</label>
                            <input type="text" onChange={handleText} className="form-control" value={productos.unidad_medida} name='unidad_medida' />     
                                                     
                    </div>
                    <div className="w-50 p-3">
                            <label htmlFor="" className="form-label">Subcategoria ID</label>
                                           
                            <select  onChange={handleText} className="form-control" name='subcategoria_id' id="">

                                <option value={productos.subcategoria_id} selected>ID: {productos.subcategoria_id}</option>
                                <option value="" disabled>Cambiar de subcategoria</option>
                                {Subcategoria_id.map((s)=>{
                                    return(
                                        <option key={s.id} value={s.id}>ID: {s.id} || Nombre: {s.nombre}</option>                                        
                                    )
                                })}
                            </select>
                      </div>
            </div>
            <div className="input-group ">
                    <div className="w-50 p-3">
                            <label htmlFor="" className="form-label">Almacen id</label>
                           <select  onChange={handleText} className="form-control" name='almacen_id' id="">
                                    <option value={productos.almacen_id}>ID: {productos.almacen_id}</option>
                                    <option value="" disabled>Cambiar de almacen</option>
                                    {almacen_id.map((a)=>{
                                        return(
                                            <option key={a.id} value={a.id}>ID:{a.id} || Almacen: {a.nombre}</option>
                                        )
                                    })}
                                </select>  
                    </div>
                    <div className="w-50 p-3">
                            <label htmlFor="" className="form-label">Proveedor ID</label>                              
                            <select name='proveedor_id'  value={productos.proveedor_id} onChange={handleText} className="form-control"  id="proveedorSelect">
                                    <option value={productos.proveedor_id} >ID: {productos.proveedor_id}</option>
                                <option value="" disabled>Cambiar de proveedor</option>
                                {proveedores_id.map((p)=>{
                                    return(
                                        <option key={p.id} value={p.id}>ID: {p.id} || Nombre: {p.nombre} {p.apellido} || Empresa: {p.empresa}</option>
                                    )
                                })}
                            </select>
                    </div>
            </div>
             
            <div className="d-flex justify-content-center">  
                
                <button type="submit" className="btn btn-primary w-25 p-10">Actualizar Producto</button> 
                
            
            </div>        
            </form>
      </div>   
    </div>
    </>
  )
}
