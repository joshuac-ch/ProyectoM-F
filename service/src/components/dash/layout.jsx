import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from './Navbar';
import FuncionEmpleados from '../hooks/Empleados';


export default function Layout() {
  
  return (
    <div className="d-flex vh-100">
    {/* Sidebar */}
    <Navbar></Navbar>

    {/* Contenido principal */}
    <div className="flex-grow-1 p-4 overflow-auto" style={{ background: "linear-gradient(to right, #F4F7FE, #E6ECFF)" }}>
      <Outlet /> {/* Aquí se carga la página correspondiente */}
    </div>
  </div>
)
}
