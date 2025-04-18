import React from 'react'

export default function FuncionFecha() {
  const FechaFormateada=(fecha)=>{
    const fechaLima=new Date(fecha).toLocaleString("es-PE",{
      timeZone:"America/Lima",
      hour12:false,
      year:'numeric',
      month:'2-digit',
      day:'2-digit',
      hour:'2-digit',
      minute:'2-digit',
      second:'2-digit'    
  })
      return fechaLima
  }
  return {FechaFormateada}
}
