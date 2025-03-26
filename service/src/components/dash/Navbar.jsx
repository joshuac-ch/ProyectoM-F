import React, { useState } from 'react';
import { Link,NavLink } from "react-router-dom";
import "../dash/hojanavbar.css"
import { FaHome, FaUser, FaCog, FaBars, FaSignOutAlt, FaContao, FaFileContract, FaProductHunt, FaUserTag, FaTag, FaVectorSquare, FaUserFriends, FaInbox, FaBoxes } from "react-icons/fa";
import Dashboard from './dashboard';
export default function Navbar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
   
  return (
    <div className="d-flex principal">
    {/* Barra lateral */}
    <div className={`sidebar bg-dark text-white d-flex flex-column p-3  ${isCollapsed ? "collapsed" : ""}`}>
      {/* Botón para expandir/colapsar */}
      <button className="btn btn-outline-light mb-3" onClick={() => setIsCollapsed(!isCollapsed)}>
        <FaBars />
      </button>

      {/* Menú */}
      <ul className="nav flex-column">
      <li className="nav-item home">
            <NavLink
              to="/dash"
              className={({ isActive }) =>
                "nav-link text-white d-flex align-items-center" + (isActive ? " active-route" : "")
              }
            >
              <FaHome className="icon" />
              {!isCollapsed && <span className="ms-3">Dashboard</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/user"
              className={({ isActive }) =>
                "nav-link text-white d-flex align-items-center" + (isActive ? " active-route" : "")
              }
            >
              <FaUser className="icon" />
              {!isCollapsed && <span className="ms-3">Empleados</span>}
            </NavLink>
          </li>
        <li className="nav-item">
          <NavLink to="/contact" 
                    className={({isActive})=>
                    "nav-link text-white d-flex align-items-center" + (isActive ? " active-route":"")}>
            <FaFileContract className="icon" />
            {!isCollapsed && <span className="ms-3">Contactos</span>}

          </NavLink>
          
        </li>
        <li className="nav-item">
          <NavLink to="/cate"
                    className={({isActive})=>
                    "nav-link text-white d-flex align-items-center" + (isActive ? " active-route ":"")}>
                    <FaTag className="icon" />
                    {!isCollapsed && <span className="ms-3">Categorias</span>}
          </NavLink>
         
        </li>
        <li className="nav-item">
          <Link to="/sub" className="nav-link text-white d-flex align-items-center">
          
            <FaUserTag className="icon" />
            {!isCollapsed && <span className="ms-3">Subcategorias</span>}
          </Link>
        </li>
        <li className="nav-item">
          <NavLink to="/productos" className={({isActive})=>
                    "nav-link text-white d-flex align-items-center" + (isActive ? " active-route" : "")}>
                  <FaProductHunt className="icon" />
                  {!isCollapsed && <span className="ms-3">Productos</span>}
          </NavLink>         
        </li>
        <li className="nav-item">
          <NavLink to="/inventario" className={({isActive})=> 
                      "nav-link text-white d-flex align-items-center" + (isActive ? " active-route ": "")}>
                  <FaBoxes className='icon'></FaBoxes>
                  {!isCollapsed && <span className="ms-3">Inventario</span>}
          </NavLink>
          
        </li>
        
        <li className="nav-item">
          <NavLink to="/proveedores" className={({isActive})=> 
                      "nav-link text-white d-flex align-items-center" + (isActive ? " active-route ": "")}>
                  <FaUserFriends className='icon'></FaUserFriends>
                  {!isCollapsed && <span className="ms-3">Proveedores</span>}
          </NavLink>
          
        </li>
        <li className="nav-item">
          <NavLink to="/movimientos" className={({isActive})=> 
                      "nav-link text-white d-flex align-items-center" + (isActive ? " active-route ": "")}>
                  <FaVectorSquare className="icon" />
                  {!isCollapsed && <span className="ms-3">Movimientos</span>}
          </NavLink>
          
        </li>
        <li className="nav-item ">
          <Link to="/not-found" className="nav-link text-danger d-flex align-items-center">
            <FaSignOutAlt className="icon" />
            {!isCollapsed && <span className="ms-3">Cerrar Sesión</span>}
          </Link>
        </li>
      </ul>
    </div>
   

    {/* Estilos */}
    <style>
      {`
        .sidebar {
          background: linear-gradient(to bottom, #1E293B, #0F172A);

          width: 250px;
          
          transition: width 0.3s;
        }
        .collapsed {
          width: 80px;
        }
        .icon {
          font-size: 20px;
        }
        .nav-item:hover{
          background-color:rgb(137, 173, 228);
          border-radius:10px;
        }
          .active-route {
            background-color:rgb(137, 173, 228);
            border-radius: 8px;
           
            color:white;
      `
      }
    </style>
  
  </div>
      
  )
}
