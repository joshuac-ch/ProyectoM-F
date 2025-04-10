import React, { useEffect, useState } from 'react';
import "../Inventario/hojainven.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FuncionDelimitar from '../hooks/Delimitar';
export default function Inventario() {
  const inventario=[
{imagen:"https://i.pinimg.com/236x/36/af/33/36af3325c88b9711b6285a4d408faa77.jpg",id:1,cantidad:10,nombre:"Vino tinto",code:"VIN001",condicion:"Buena",Ubicacion:"Tienda 1",precio:"32.00",modificado:"25/03/2025"},
{imagen:"https://i.pinimg.com/736x/c7/4f/46/c74f46a35b41019058b669936a2f7d44.jpg",id:2,cantidad:4 ,nombre:"Vino blanco",code:"VIN002",condicion:"Mala",Ubicacion:"Tienda 1",precio:"27.00",modificado:"25/03/2025"},
{imagen:"https://i.pinimg.com/236x/13/f2/fc/13f2fc8e4a6af772c14974f0d10be512.jpg",id:3,cantidad:6 ,nombre:"Leche descremada",code:"LECH001",condicion:"Buena",Ubicacion:"Tienda 1",precio:"9.00",modificado:"25/03/2025"},
{imagen:"https://i.pinimg.com/736x/91/8c/11/918c11ad08ba63f1b00432fd5d315060.jpg",id:4,cantidad:21 ,nombre:"Queso",code:"CHEES002",condicion:"Buena",Ubicacion:"Tienda 2",precio:"21.00",modificado:"25/03/2025"},
{imagen:"https://i.pinimg.com/736x/0d/a5/57/0da55748082548311c3ad6a9843cc15b.jpg",id:5,cantidad:5,nombre:"Absolute vodka",code:"VOD004",condicion:"Mala",Ubicacion:"Tienda 1",precio:"40.00",modificado:"25/03/2025"},
{imagen:"https://i.pinimg.com/236x/76/92/91/769291c0e153b016b29cf7a6adcc5387.jpg",id:6,cantidad:7,nombre:"Mermelada",code:"MER001",condicion:"Mala",Ubicacion:"Tienda 2",precio:"6.00",modificado:"25/03/2025"},    
  ]
  const [almacen, setalmacen] = useState([])
  const navegar=useNavigate()
  const FecthAlmacen=async()=>{
    try{
      const {data}=await axios.get("http://localhost:4000/api/users/almacen/g")
      setalmacen(data)
    }catch(e){
      alert("Hubo un error",e)
    }
  }
  useEffect(()=>{
    FecthAlmacen()
  },[])
  const onUpdate=(id)=>{
    if(FuncionDelimitar("editar")){
    navegar(`/update-almacen/${id}`)
    }else{
      alert("Solo personal autorizado")
    }
}
  const onDelete=async(id)=>{
    if(FuncionDelimitar("eliminar")){
      const mensaje=window.confirm("Estas seguro de eliminar este inventario?")
    if(mensaje){
      try{
        await axios.delete(`http://localhost:4000/api/users/almacen/d/${id}`)
        alert("Se elimino correctamente el almacen")
        setalmacen(almacen.filter((a)=>a.id!==id))
      }catch(e){  
        alert("hubo un error al eliminar el almacen",e.message)
      }
    }
    }else{
      alert("Solo personal autorizado")
    }
  } 
  return (
    <>
    <div className="container mt-4">
      <div className="header-inven">
        <h1>Almacen</h1>
        <div className="tools">
          <div className="add-warehouse">
            <button type='button' onClick={()=>navegar("/crear-almacen")}> Agregar Almacen </button>
                        
         </div>
          <div className="add-product">
            <button type="button" onClick={()=>navegar("/crear-producto")}>Agregar producto</button>
          </div>
          <div className="search ">
            <input type="text" placeholder='buscar...'/>
            <button type="button"><i className='bx bx-search-alt-2'></i></button>
          </div>
        </div>
      </div>
      <hr />
      <div className="body-categorias">
             <div className="tarjeta-cate">
              {almacen.map((c)=>{
                return(
                  <div key={c.id} className="categoria1">
                    <div className="first-cate">
                   <h4 className='identificador'>{c.id}</h4>
                      <div className="cont">
                        <div className="titulo">
                        <label htmlFor="">Almacen:</label>
                        <label>{c.nombre}</label>
                        </div>
                        <div className="contenido">
                        <label htmlFor="">Descripcion:</label>
                        <p>{c.descripcion.length>20?c.descripcion.slice(0,20)+"...":c.descripcion}</p>
                        </div>                      
                      </div>
                    </div>
                    
                      <div className="tools">
                      <button onClick={()=>onUpdate(c.id)} className="btn btn-warning btn-sm me-2">
                        <i class='bx bxs-edit-alt' ></i>
                      </button>
                     <button onClick={()=>onDelete(c.id)} className="btn btn-danger btn-sm me">
                        <i class='bx bxs-trash' ></i>
                      </button>
                      </div>
                  </div>
                  
                )
              })}
             </div>
      </div>
      
    </div>
    </>    
  )
}
