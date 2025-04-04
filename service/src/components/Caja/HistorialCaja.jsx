import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function HistorialCaja() {
     const [movimientos, setMovimientos] = useState([]);    
        useEffect(() => {          
            ObtenerMovimientos();
        }, []);
    
        
        const ObtenerMovimientos = async () => {
            try {
                const { data } = await axios.get("http://localhost:4000/api/users/movimiento-caja"); // Cambia por el ID de la caja
                setMovimientos(data);
            } catch (error) {
                console.error("Error al obtener los movimientos", error);
            }
        };
        const navegar=useNavigate()
  return (
    <div className="container mt-4">
        <div className="header-movimiento">
            <h1>Movimiento de caja</h1>
            <button type="button" onClick={()=>navegar("/caja")}>Regresar</button>
        </div>
        <hr />
        <div className="body-movimiento"  >
        <div> 

            <h3>Historial de Movimientos</h3>
            <div className="body-m">
            {movimientos.map((m)=>{         
                return(
                    <div className="movimiento" key={m.id}>
                    
                    <div className="body-m">
                    <div className="header-m">
                       <label htmlFor="">N°{m.id}</label>
                    </div>
                        <label htmlFor="">Usuario ID: {m.usuario_id}</label> || <label htmlFor="">Caja ID: {m.caja_id} </label><br />
                       
                        <label htmlFor="">Monto: {m.monto}</label><br />
                        <label htmlFor="">Descripcion: {m.descripcion}</label>
                    </div>
                    <div className="foot-m">
                    <label htmlFor="" className={m.tipo}>Tipo: {m.tipo}</label><br />
                        <label htmlFor="">Fecha: {m.fecha.split(".")[0].replace("T"," ")}</label>
                    </div>
                </div>
                )
             })} 
            </div>
           
        </div>
        </div>
    </div>
  )
}
