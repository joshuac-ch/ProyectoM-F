import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function Rutaprotegia() {
    const isautentic=localStorage.getItem("usuario_autentificado")==="true"
    const location=useLocation()
    if (!isautentic) return <Navigate to="/login" />;
    
    // Si está autenticado y está en '/', lo mandamos al dashboard
    if (location.pathname === "/") return <Navigate to="/dash" />;
    return <Outlet />
}
