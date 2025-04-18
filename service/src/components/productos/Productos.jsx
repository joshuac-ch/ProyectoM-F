import React, { useEffect, useState } from 'react';
import "../productos/hojaproduct.css"
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FuncionDelimitar from '../hooks/Delimitar';
import FunctionCategoria from '../hooks/Categoria';
import FuncionSubcategoria from '../hooks/Subcategoria';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import * as XLSX from "xlsx"
import { saveAs } from 'file-saver';
export default function Productos() {
  const formato=new Date()
    const productos=[
{imagen:"https://i.pinimg.com/236x/36/af/33/36af3325c88b9711b6285a4d408faa77.jpg","fecha_ven":"-",precio_compra:10,codigo:"VIN001",nombre:"Vino tinto",precio:"32.00",cantidad:10,Unidad:"L",proveedor:"joshua gustav",categoria:"licores"},
{imagen:"https://i.pinimg.com/736x/c7/4f/46/c74f46a35b41019058b669936a2f7d44.jpg","fecha_ven":"-",precio_compra:9,codigo:"VIN002",nombre:"Vino blanco",precio:"27.00",cantidad:15,Unidad:"L",proveedor:"miyo benavides",categoria:"licores"},
{imagen:"https://i.pinimg.com/236x/13/f2/fc/13f2fc8e4a6af772c14974f0d10be512.jpg","fecha_ven":"22/05/2025",precio_compra:14,codigo:"LECH001",nombre:"Leche descremada",precio:"9.00",cantidad:20,Unidad:"L",proveedor:"lorenzo aguzman",categoria:"abarrotes"},
{imagen:"https://i.pinimg.com/736x/91/8c/11/918c11ad08ba63f1b00432fd5d315060.jpg","fecha_ven":"25/08/2025",precio_compra:15,codigo:"CHEES002",nombre:"Queso",precio:"21.00",cantidad:34,Unidad:"KG",proveedor:"lorena mamani",categoria:"abarrotes"},
{imagen:"https://i.pinimg.com/736x/0d/a5/57/0da55748082548311c3ad6a9843cc15b.jpg","fecha_ven":"-",precio_compra:15,codigo:"VOD004",nombre:"Absolute vodka",precio:"40.00",cantidad:5,Unidad:"L",proveedor:"pancho guitierrez",categoria:"licores"},
{imagen:"https://i.pinimg.com/236x/76/92/91/769291c0e153b016b29cf7a6adcc5387.jpg","fecha_ven":"14/05/2025",precio_compra:12,codigo:"MER001",nombre:"Mermelada",precio:"6.00",cantidad:7,Unidad:"L",proveedor:"dante castro",categoria:"abarrotes"},
{imagen:"https://i.pinimg.com/736x/4f/fc/3e/4ffc3ec0163dcbbdf32ea2d910514e84.jpg","fecha_ven":"26/06/2025",precio_compra:16,codigo:"HUV001",nombre:"Huevos calera",precio:"6.00",cantidad:20,Unidad:"KG",proveedor:"joshua gustav",categoria:"abarrotes"},
{imagen:"https://i.pinimg.com/236x/0e/eb/2f/0eeb2fcb82f3c2598c1778f18f7b9e5f.jpg","fecha_ven":"27/06/2025",precio_compra:4,codigo:"JAM001",nombre:"Jamon americano",precio:"2.00",cantidad:37,Unidad:"KG",proveedor:"miguel angel",categoria:"abarrotes"},
{imagen:"https://i.pinimg.com/236x/a4/9e/b4/a49eb42bd244e6ba0760c90dd267c6af.jpg","fecha_ven":"-",precio_compra:6,codigo:"SMIR002",nombre:"Smirnoof",precio:"6.60",cantidad:5,Unidad:"L",proveedor:"miyo benavides",categoria:"licores"}


]
//total de productos
//const data=productos.reduce((p,i)=>p+ parseFloat(i.precio),0)
//console.log(data)


const redirigir=useNavigate()
const CrearProducto=()=>{
    redirigir("/crear-producto")
}
const [myproduct, setmyproduct] = useState([])
const GetProductos=async()=>{
  try{
    const {data}=await axios.get("http://localhost:4000/api/users/producto/g/")
    setmyproduct(data)
  }catch(e){
    alert("Hubo un error",e)
  }
}
const [subcategoria, setsubcategoria] = useState({})

useEffect(()=>{
  const FectSubcate=async()=>{
   try{
    const {data}=await axios.get("http://localhost:4000/api/users/subcategoria/g/") 
    const recorrer={};
    data.forEach((c)=>{
      recorrer[c.id]=c.nombre 
    })
    setsubcategoria(recorrer)
   }catch(err){
    alert("Hubo un error",err)
   }
  }
  FectSubcate()
},[])
 

useEffect(()=>{
  GetProductos()
},[])
const onUpdate=(id)=>{
  redirigir(`/update-producto/${id}`)
}
const onDelete=async(id)=>{
  if(FuncionDelimitar("eliminar")){
  const mensaje=window.confirm("Estas seguro querer eliminar este producto?")
  if(mensaje){
    try{
      await axios.delete(`http://localhost:4000/api/users/producto/d/${id}`)
      alert("Se elimino correctamente el producto")
      setmyproduct(myproduct.filter((m)=>m.id!==id))
    }catch(e){
      alert("Hubo un error la eliminar este producto",e)
    }
  }}
  else{
    alert("Solo personal autorizado")
  }
} 
const {FecthCategoria,categoria}=FunctionCategoria()
const {FechtSubcategoria,Subcategoria_id}=FuncionSubcategoria()
useEffect(()=>{
  FecthCategoria(),FechtSubcategoria()
},[])


const ExportPDF=()=>{
  const doc=new jsPDF()

  const Encabezado=[
   ["#","Nombre","Cantidad_Disponible","Fecha_vencimiento","Precio_Ingreso",
    "Precio_Venta","Descripcion","Codigo_Producto","Unidad_Medida","Almacen_ID","Subcategoria_ID"]
  ]
  const datos=myproduct.map((p,i)=>[
    i+1,
    p.nombre,
    p.cantidad_disponible,
    p.fecha_vencimiento,
    `S/.${p.precio_ingreso}`,
    `S/.${p.precio_venta}`,
    p.descripcion,
    p.codigo_producto,
    p.unidad_medida,
    p.almacen_id,
    p.subcategoria_id
  ]);
  autoTable(doc,{
    head:Encabezado,
    body:datos,
    startY:20,
    styles:{fontSize:8},
    headStyles:{fillColor:[22,160,133]},
  })
  doc.save("productos.pdf")
}
const ExportExecl=()=>{
    const dataexcel=myproduct.map((p,i)=>({
      "#":i+1,
      "Nombre":p.nombre,
      "Cantidad_Disponible":p.cantidad_disponible,
      "Fecha_vencimiento":p.fecha_vencimiento,
      "Precio_Ingreso": `S/.${p.precio_ingreso}`,
    "Precio_Venta":`S/.${p.precio_ingreso}`,
    "Descripcion":p.descripcion,
    "Codigo_Producto":p.codigo_producto,
    "Unidad_Medida":p.unidad_medida,
    "Almacen_ID":p.almacen_id,
    "Subcategoria_ID":p.subcategoria_id
    }))
    //crear hoja de caculo
    const workshee=XLSX.utils.json_to_sheet(dataexcel)
    //crear libro de excel
    const workbook=XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook,workshee,"Productos")

    //generar libro de execl
    const exelBuffer=XLSX.write(workbook,{bookType:'xlsx',type:'array'})
    const data=new Blob([exelBuffer],{type:"application/octet-stream"})
    saveAs(data,"producos.xlsx")
  }

const [categoriaSelec, setcategoriaSelec] = useState(0)
const [productofilter, setproductofilter] = useState("")
const datosFiltrado=myproduct.filter((producto)=>{
    if(categoriaSelec==0) return producto;
    const subcat=Subcategoria_id.find((s)=>s.id===producto.subcategoria_id)
    return subcat && subcat.categoria_id==parseInt(categoriaSelec)
  })
  .filter((p)=>p.nombre.toLowerCase().includes(productofilter.toLowerCase()))
  
  
  const onHandleProdcutoFilter=(e)=>{
    setproductofilter(e.target.value)
  }
  

  return (
    <div className="container mt-4">
      <div className="header-productos">
        <div className="header">
         
          <div className="header-produc">
          <div className="box" ><h2>Productos</h2></div>
          <div className="caja-productos">
          <button className='addp' type='button' onClick={CrearProducto}>Agregar producto</button>
          <button className='addp' type='button' onClick={ExportPDF}>Exportar a PDF</button>
          <button className='addp' type='button' onClick={ExportExecl}>Exportar a Excel</button>
          </div>
          </div>         
          <div className="caja-filter">
            <select className="form-select" onChange={(e)=>setcategoriaSelec(e.target.value)} name="" id="">
              <option value={0} selected>todos</option>
              {categoria.map((c)=>{               
                return(
                  <>
                       <option key={c.id} value={c.id}>{c.nombre}</option>                      
                  </>
                )
              })}
             
            </select>        
            <div className='filter'>
            <input type="text" className='form-control' value={productofilter} onChange={onHandleProdcutoFilter} placeholder='filtrar' id="" />
            <i className='bx bx-search '></i>
            </div>
          </div>
          
        </div>
      </div>
      <hr />
      <div className="tarjetas">
        <div className="lista-tarjetas">
          {datosFiltrado.length===0?(
            <div className="not-found-productos">
              <p>No se encontraron productos</p>
            </div>
          ):datosFiltrado.map((p)=>{
            return(
              <div className="tarjeta" key={p.id}>
                <div className="header-card">
                <label htmlFor="">{p.nombre}</label>
                <div className="btn-producto">
                  <button type="button" onClick={()=>onUpdate(p.id)} className='form-control'><i class='bx bx-show-alt' ></i></button>
                  <button type="button" onClick={()=>onDelete(p.id)} className='form-control'><i class='bx bxs-trash'></i></button>
                </div>
                </div>
                <div className="body-card">
                <div className="imagen">
                  <img src={p.image} alt={p.nombre} />
                </div>
                </div>
                <div className="des-card">
                  <div className='precio'>
                    <label htmlFor="">Precio:</label>
                    <label htmlFor="">S/{p.precio_venta.toFixed(2)}</label>                   
                  </div>
                  <div className='categoria'>
                    <label htmlFor="">Subcategoria:</label>
                    <label htmlFor="">{subcategoria[p.subcategoria_id]}</label>
                    
                  </div>
                  <div className='fecha-ven'>
                    <label htmlFor="">Vence:</label>
                    <label htmlFor="">{p.fecha_vencimiento?p.fecha_vencimiento.split("T")[0] :"-"}</label> 
                  </div>
                  
                 
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {/*
      <div className="table-responsive">
        <table className="table table-hover custom-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Codigo</th>
              <th>Nombre</th>
              <th>Precio Venta</th>
              <th>Precio Compra</th>
              <th>Cantidad</th>
              <th>Unidad</th>
             <th>Proveedor</th>
              <th>Categoria</th>
              <th>Fecha vencimiento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosSeleccionado.map((producto) => (
              <tr key={producto.codigo}>
                 <td className="align-middle text-center">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="product-img"
                  />
                </td>
                <td className="align-middle text-center">{producto.codigo}</td>
                <td className="align-middle">{producto.nombre}</td>               
                <td className="align-middle text-center">${producto.precio}</td>
                <td className="align-middle text-center">${producto.precio_compra}.00</td>
                <td className="align-middle text-center">{producto.cantidad}</td>
                <td className="align-middle text-center">{producto.Unidad}</td>
                <td className="align-middle text-center">{producto.proveedor}</td>                             
                <td className="align-middle text-center">{producto.categoria}</td>
                <td className="align-middle text-center">{producto.fecha_ven}</td>
                <td className="align-middle text-center">
                  <button className="btn btn-warning btn-sm ">
                  <i class='bx bxs-edit-alt' ></i>
                  </button>
                  <button className="btn btn-danger btn-sm">
                  <i class='bx bxs-trash' ></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      Estilos personalizados 
      <style>
        {`
          .custom-table {
            border-radius: 10px;
            overflow: hidden;
            background: white;
               
          }
          .custom-table th {
            
          background:rgb(137, 173, 228);
            
            color: black;
            text-align: center;
          }
          .custom-table tbody tr:hover {
            background: #f1f5f9;
            transition: 0.3s;
            
          }
          .product-img {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 10px;
          }
          .btn {
            transition: 0.3s;
          }
          .btn:hover {
            transform: scale(1.05);
          }
        `}
      </style>*/}

    </div>
  );
}
