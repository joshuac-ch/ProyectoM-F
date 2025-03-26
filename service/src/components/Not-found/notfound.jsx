import React from 'react'
import { Link } from 'react-router-dom'
export default function Notfound() {
  return (
    <>
   <div className="container text-center mt-5">
      <h1>404 - Página no encontrada</h1>
      <p>La página que buscas no existe.</p>
      <Link to="/login" className="btn btn-primary">Volver al Login</Link>
    </div> 
    </>
   
  )
}
