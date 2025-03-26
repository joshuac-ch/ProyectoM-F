import React from 'react';
import "../Inventario/hojainven.css";
export default function Inventario() {
  const inventario=[
{imagen:"https://i.pinimg.com/236x/36/af/33/36af3325c88b9711b6285a4d408faa77.jpg",id:1,cantidad:10,nombre:"Vino tinto",code:"VIN001",condicion:"Buena",Ubicacion:"Tienda 1",precio:"32.00",modificado:"25/03/2025"},
{imagen:"https://i.pinimg.com/736x/c7/4f/46/c74f46a35b41019058b669936a2f7d44.jpg",id:2,cantidad:4 ,nombre:"Vino blanco",code:"VIN002",condicion:"Mala",Ubicacion:"Tienda 1",precio:"27.00",modificado:"25/03/2025"},
{imagen:"https://i.pinimg.com/236x/13/f2/fc/13f2fc8e4a6af772c14974f0d10be512.jpg",id:3,cantidad:6 ,nombre:"Leche descremada",code:"LECH001",condicion:"Buena",Ubicacion:"Tienda 1",precio:"9.00",modificado:"25/03/2025"},
{imagen:"https://i.pinimg.com/736x/91/8c/11/918c11ad08ba63f1b00432fd5d315060.jpg",id:4,cantidad:21 ,nombre:"Queso",code:"CHEES002",condicion:"Buena",Ubicacion:"Tienda 2",precio:"21.00",modificado:"25/03/2025"},
{imagen:"https://i.pinimg.com/736x/0d/a5/57/0da55748082548311c3ad6a9843cc15b.jpg",id:5,cantidad:5,nombre:"Absolute vodka",code:"VOD004",condicion:"Mala",Ubicacion:"Tienda 1",precio:"40.00",modificado:"25/03/2025"},
{imagen:"https://i.pinimg.com/236x/76/92/91/769291c0e153b016b29cf7a6adcc5387.jpg",id:6,cantidad:7,nombre:"Mermelada",code:"MER001",condicion:"Mala",Ubicacion:"Tienda 2",precio:"6.00",modificado:"25/03/2025"},    
  ]
  return (
    <>
    <div className="container mt-4">
      <div className="header-inven">
        <h1>Inventario</h1>
        <div className="tools">
          <div className="add-warehouse">
            <button type='button'>
            Agregar deposito
            </button>
                        
         </div>
          <div className="add-product">
            <button type="button">Agregar producto</button>
          </div>
          <div className="search ">
            <input type="text" placeholder='buscar...'/>
            <button type="button"><i className='bx bx-search-alt-2'></i></button>
          </div>
        </div>
      </div>
      <hr />
      <div className="content-inventario overflow-auto">
      <table class="table table-hover shadow-sm">
  <thead className="table-header-inventario">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">NOMBRE</th>
      <th scope="col">CODIGO</th>
      <th scope="col">CONDICION</th>
      <th scope="col">UBICACION</th>
      <th scope="col">DISPONIBLE</th>
      <th scope="col">PRECIO</th>
      <th scope="col">MODICICADO</th>
      <th scope="col">ACCIONES</th>
    </tr>
  </thead>
  <tbody >  
    {inventario.map((i=>{
      return(
        <tr>
      <th scope="row">{i.id}</th>
      <td><div className="product ">
          <img src={i.imagen} alt="" />
          <label htmlFor="">{i.nombre}</label>
        </div>
      </td>
      <td className="align-middle text-start">{i.code}</td>
      <td className="align-middle text-start">{i.condicion}</td>
      <td className="align-middle text-start">{i.Ubicacion}</td>
      <td className="align-middle text-start">{i.cantidad}</td>
      <td className="align-middle text-start">{i.precio}</td>
      <td className="align-middle text-start">{i.modificado}</td>
      <td className="align-middle text-start">
        <div  className="btn-icons">
          <i class='bx bx-dots-horizontal-rounded '></i>
        </div>
        </td>
    </tr>
      )
    }))} 
    
   
    
  </tbody>
</table>
      </div>
    </div>
    </>    
  )
}
