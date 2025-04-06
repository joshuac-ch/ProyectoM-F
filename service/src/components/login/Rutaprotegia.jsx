import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function Rutaprotegia() {
    const isautentic=localStorage.getItem("usuario_autentificado")==="true"
    return isautentic?<Outlet/>:<Navigate to="/login"></Navigate>
}
