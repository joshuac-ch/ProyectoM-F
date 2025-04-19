import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "../dash/hojadash.css"
import VentasMensuales from "./ventasMensuales";
import VentasMensualAbarrotes from "./ventasMensualAbarrotes";
import VentasMensualLicores from "./ventasMensualLicores";
import ProductosVencidos from "./ProductosVencidos";
import ProductosAgotarse from "./ProductosAgotarse";


const Dashboard = () => {
  
  const lista=["Contactos","Clientes","Productos Disponibles","Productos Vendidos","Total Ventas","Ganancias Mensuales","Productos mas vendidos"]
  const cantidades=[200,140,34,40,500,1400,"Lacteos"]
  const descuentos=["20,1","32.5","24,5","42.5","22","30.4","10"]
  const [tarjetas] = useState(lista)
  const colores=["#4A90E2","#4A90E2","#34D399","#34D399","#FF8C42","#4A90E2","#34D399"]
  const navegar=useNavigate()
  const CrearProducto=()=>{
      navegar("/crear-producto")
  }
  const CrearCliente=()=>{
    navegar("/crear-cliente")
  }
  const VerHistorial=()=>{
    navegar("/movimientos")
  } 
  const NuevoEmpleado=()=>{
    navegar("/crear-empleado")
  }
  const NuevoProveedor=()=>{
    navegar("/crear-proveedor")
  }
  const RevisarInventario=()=>{
    navegar("/inventario")
  }
  const Proceso=()=>{
    alert("Esta funcion no se encuentra habilitada")
  }
  return (
    <>
    {/*CONTENEDOR PRINCIPAL*/}
    <div className="contenedor-principal container">
      {/*PRIMER CONENDOR*/}
        <div className="first">
       
        </div>
        {/*CONETENEDOR SECUNDARIO */}
        <div className="second">
          
         {/* <div className="welcome-dash">
            <h1>Bienvenido al Dashboard</h1>
            <div className="content">
              {tarjetas.map((e,i)=>{
                return(
                  <div key={i} style={{backgroundColor:colores[i],color:"white"}} className="target1">
                  <div className="content-target">
                  <label className="titulos">{e}</label>
                  <p>{cantidades[i]}</p>
                  <label className="descuentos">+{descuentos[i]}% respecto al mes pasado</label>
                  </div>
                  <div className="icon-target">
                  <FaUser className="icon" />
                  </div>
              </div>
                )
              })}             
            
            </div>      
              
              
                     
          </div>
      */}
      <div className="datos">
        <h1>Dashboard</h1>
            <div className="lista-content">
            <div className="content" id="venta" onClick={()=>navegar("/crear-detalle-venta")}>
                <img src="https://i.pinimg.com/236x/b4/2f/47/b42f479d8d444ef42b9bd10eae2f0139.jpg" alt="no se encontro la imagen" />
                <h2>Nueva venta</h2>
              </div>
              <div className="content" onClick={()=>navegar("/caja")}>
                <img src="https://i.pinimg.com/236x/21/e0/2d/21e02d39c7c0333eeb563b13c7ab941e.jpg" alt="no se encontro la imagen" />
                <h2>Abrir Caja </h2>
              </div>     
              <div className="content" onClick={RevisarInventario}>
                <img src="https://i.pinimg.com/236x/30/63/8c/30638cb914dfcb962e607e9c6455b5d2.jpg" alt="no se encontro la imagen" />
                <h2>Ver Inventario</h2>
              </div>
              <div className="content" onClick={CrearProducto}>
                <img src="https://i.pinimg.com/736x/c3/33/f6/c333f61501438720426ce649a7db3585.jpg" alt="no se encontro la imagen" />
                <h2>Nuevo producto</h2>
              </div>
              <div className="content" onClick={()=>navegar("/create-cate")}>
                <img src="https://i.pinimg.com/736x/18/9e/84/189e84d3d2d79c7274a99996ef7daf36.jpg" alt="no se encontro la imagen" />
                <h2>Nueva categoria</h2>
              </div>
              <div className="content" onClick={()=>navegar("/crear-Subcate")}>
                <img src="https://i.pinimg.com/736x/ce/45/b8/ce45b814459f8daeab4246337a7af1b1.jpg" alt="no se encontro la imagen" />
                <h2>Nueva Subcategoria</h2>
              </div>
              
              
              <div className="content" onClick={NuevoEmpleado}>
                <img src="https://i.pinimg.com/236x/49/8f/d5/498fd5d75b4fe59809b4d7095a79be21.jpg" alt="no se encontro la imagen" />
                <h2>Nuevo empleado</h2>
              </div>
              <div className="content" onClick={NuevoProveedor}>
                <img src="https://i.pinimg.com/236x/1c/fe/bc/1cfebc012964f064618e8f5554d24aac.jpg" alt="no se encontro la imagen" />
                <h2>Nuevo proveedor</h2>
              </div>
              <div className="content" onClick={CrearCliente}>
                <img src="https://i.pinimg.com/736x/2e/8a/e7/2e8ae738fc5b9b7e9919e0e4cc5c615f.jpg" alt="no se encontro la imagen" />
                <h2>Nuevo cliente</h2>
              </div>
              <div className="content" onClick={VerHistorial}>
                <img src="https://i.pinimg.com/236x/c3/6f/12/c36f1287cf638d8134a06ba5a9032c3a.jpg" alt="no se encontro la imagen" />
                <h2>Movimientos de productos</h2>
              </div>
              <div className="content" onClick={()=>navegar("/ventas")}>
                <img src="https://i.pinimg.com/236x/a2/05/52/a2055247927e6813890b51ebae1c8c7e.jpg" alt="no se encontro la imagen" />
                <h2>Movimientos de ventas</h2>
              </div>
             
             
              
             
              <div className="content" onClick={()=>navegar("/movimiento-caja")}>
                <img src="https://i.pinimg.com/736x/9f/43/38/9f4338dd591f5f53e75be70cef3211d0.jpg" alt="no se encontro la imagen" />
                <h2>Movimiento de caja</h2>
              </div>
             {/*  <div className="content">
                <img src="https://i.pinimg.com/236x/54/9f/cb/549fcb808a436d8f296be09d12aeccb0.jpg" alt="" />
                <h2>Historial de ventas</h2>
              </div>
              */}
            </div>
        
      </div>
          <div className="productos">
            <hr />
            <div className="productosven">
              <div>
              <h2>Productos</h2>
              <VentasMensuales></VentasMensuales>
              </div>
              <div>
              <h2>Productos a punto de vencer</h2>   
              <ProductosVencidos></ProductosVencidos>   
              </div>
              <hr />
              <div>
                <ProductosAgotarse></ProductosAgotarse>
              </div>
            </div>
              <hr />
            <h2>Ventas Mensuales de licores/Abarrotes </h2>
            <div className="ventasAnuales">
              <VentasMensualAbarrotes></VentasMensualAbarrotes>  
              <VentasMensualLicores></VentasMensualLicores>
            </div>
          </div>
        </div>
    </div>    
    
    </>
  );
};

export default Dashboard;

