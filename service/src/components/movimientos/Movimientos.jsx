import React from 'react'
import "../movimientos/hojamo.css"
export default function Movimientos() {
  const movimientos=[
{id:1,accion:"D",color:"#fc5353",nombre:"joshua gustavo",des:"Realizó una edición en la configuración del sistema.",fecha:"22/02/2025"},
{id:1,accion:"C",color:"#4a84e0",nombre:"maria sanchez",des:"Creó un nuevo usuario en la plataforma.",fecha:"04/02/2025"},
{id:1,accion:"D",color:"#fc5353",nombre:"erick elera",des:"Borró un registro de clientes.",fecha:"22/03/2025"},
{id:1,accion:"E",color:"#babd24",nombre:"martin vizcarra",des:"Realizó una edición en la configuración del sistema",fecha:"17/02/2025"},
{id:1,accion:"E",color:"#babd24",nombre:"Gusatvo Moscoso",des:"Creó un nuevo usuario en la plataforma.",fecha:"15/02/2025"},
{id:1,accion:"C",color:"#4a84e0",nombre:"Editson mamani",des:"Borró un registro de clientes.",fecha:"30/12/2024"},
{id:1,accion:"E",color:"#babd24",nombre:"Oscar alonso",des:"Creó un nuevo usuario en la plataforma.",fecha:"22/01/2025"},

  ]
  return (
    <>
    <div className="movi container mt-4">
    <h1>Movimientos del sistema</h1>
    <div className="historial">
      <div className="lista-historial">
        <div className="header-list">
          <ul>
            
            <li>Accion</li>
            <li>Fecha</li>
            
          </ul>
          <hr />
        </div>
        <div className="box"> 
          {movimientos.map((m)=>{
            return(
            <div className="content" >
                <div className="accion">
                  <div className="ac" style={{backgroundColor:m.color}} >
                    <h4>{m.accion}</h4>
                  </div>
                               
                <div className="datos">
                  <label htmlFor="">{m.nombre}</label>
                  <p>{m.des}...</p>
                </div> 
                </div>
               
                <div className="fecha">
                  <label>{m.fecha}</label>
                  <i class='bx bxs-show'></i>
                </div>
              </div>
            )
          })}         
              
              
          
        </div>
      </div>
    </div>
    </div>
    </>
  )
}
