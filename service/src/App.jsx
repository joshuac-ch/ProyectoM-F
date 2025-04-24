import './App.css'
import Dashboard from './components/dash/dashboard';
import Log from './components/login/log'
import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Notfound from './components/Not-found/notfound';
import Productos from './components/productos/Productos';
import Navbar from './components/dash/Navbar';
import Layout from './components/dash/layout.jsx';
import User from './components/user/User.jsx';
import Contact from './components/contact/Contact.jsx';
import Category from './components/category/category.jsx';
import Transaciones from './components/transacciones/Transaciones.jsx';
import Movimientos from './components/movimientos/Movimientos.jsx';
import Create from './components/productos/CRUD/Create.jsx';
import CreateEmpleado from './components/user/CRUD/CreateEmpleado.jsx';
import Proveedores from './components/proveedores/Proveedores.jsx';
import Inventario from './components/Inventario/inventario.jsx';
import CreateProveedor from './components/proveedores/CRUD/CreateProveedor.jsx';
import Createcliente from './components/contact/CRUD/Createcliente.jsx';

import EditUser from './components/user/CRUD/EditUser.jsx';
import UpdateCliente from './components/contact/CRUD/UpdateCliente.jsx';
import CreateCategoria from './components/category/CRUD/CreateCategoria.jsx';
import UpdateCategoria from './components/category/CRUD/UpdateCategoria.jsx';
import Subcate from './components/subcategory/Subcate.jsx';
import CreateSubCategoria from './components/subcategory/CRUD/CreateSubCategoria.jsx';
import EditSubCategoria from './components/subcategory/CRUD/EditSubCategoria.jsx';
import UpdateProductos from './components/productos/CRUD/UpdateProductos.jsx';
import CreateAlmacen from './components/Inventario/CRUD/CreateAlmacen.jsx';
import UpdateAlmacen from './components/Inventario/CRUD/UpdateAlmacen.jsx';
import UpdateProveedor from './components/proveedores/CRUD/UpdateProveedor.jsx';
import Caja from './components/Caja/Caja.jsx';
import Createcaja from './components/Caja/CRUD/Createcaja.jsx';
import UpdateCaja from './components/Caja/CRUD/UpdateCaja.jsx';
import CreateMovimiento from './components/movimientos/CRUD/CreateMovimiento.jsx';
import UpdateMovimiento from './components/movimientos/CRUD/UpdateMovimiento.jsx';
import Ventas from './components/ventas/Ventas.jsx';
import CreateVentas from './components/ventas/CRUD/CreateVentas.jsx';
import UpdateVentas from './components/ventas/CRUD/UpdateVentas.jsx';
import HistorialCaja from './components/Caja/HistorialCaja.jsx';
import CerrarCaja from './components/Caja/CerrarCaja.jsx';
import RegistrarMovimiento from './components/Caja/CRUD/RegistrarMovimiento.jsx';
import CreateDetalleVenta from './components/ventas/CRUD/CreateDetalleVenta.jsx';
import Iproductos from './components/InventarioProductos/Iproductos.jsx';
import CreateInventarrio from './components/InventarioProductos/CRUD/CreateInventarrio.jsx';
import ActualizarInventario from './components/InventarioProductos/CRUD/ActualizarInventario.jsx';
import Rutaprotegia from './components/login/Rutaprotegia.jsx';
import DetalleEspecifico from './components/ventas/CRUD/DetalleEspecifico.jsx';
import ReporteMensual from './components/Reportes/reporteMensual.jsx';
function App() {
    return (
    <>
   
    <BrowserRouter>
    <Routes>
      {/*RUTA DE LOGIN*/}
      <Route path='/login' element={<Log></Log>}></Route>
      <Route path='*' element={<Notfound></Notfound>}></Route>
      {/*RUTAS ANIDADES EN UN LAYOUT */}
      <Route path='/' element={<Rutaprotegia></Rutaprotegia>}>
      <Route path='/' element={<Layout></Layout>}>
        <Route path="/not-found" element={<Notfound></Notfound>}/>        
        <Route index path='/dash' element={<Dashboard></Dashboard>}></Route>
        <Route path='/productos' element={<Productos></Productos>}></Route>
        <Route path='/user' element={<User></User>}></Route>
        
        <Route path='/contact' element={<Contact></Contact>}></Route>
        <Route path='/cate' element={<Category></Category>}></Route>
        <Route path='/transacciones' element={<Transaciones></Transaciones>}></Route>
        <Route path='/movimientos' element={<Movimientos></Movimientos>}></Route>
        <Route path='/proveedores' element={<Proveedores></Proveedores>}></Route>
        <Route path='/inventario' element={<Inventario></Inventario>}></Route>
        <Route path='/sub' element={<Subcate></Subcate>}></Route>
        {/*RUTAS DE CRUD */}
          <Route path='/ventas/detalle-especifico/:id' element={<DetalleEspecifico></DetalleEspecifico>}></Route>
          <Route path='/ventas/crear-detalle-venta' element={<CreateDetalleVenta></CreateDetalleVenta>}></Route>
        {/*Reporte Mensual*/}
        <Route path='/ventas/reporte-mensual' element={<ReporteMensual></ReporteMensual>}></Route>
        {/*Inventario de productos */}
        <Route path='/invetario-producto' element={<Iproductos></Iproductos>}></Route>
        <Route path='/invetario-producto/inventario-producto-create' element={<CreateInventarrio></CreateInventarrio>}></Route>
        <Route path='/invetario-producto/inventario-update/:id' element={<ActualizarInventario></ActualizarInventario>}></Route>
        {/*Caja */}
        <Route path='/caja' element={<Caja></Caja>}></Route>
        <Route path='/caja/movimiento-caja' element={<HistorialCaja></HistorialCaja>}></Route>
        <Route path='/caja/cerrar-caja' element={<CerrarCaja></CerrarCaja>}></Route>
        <Route path='/caja/registrar-caja' element={<RegistrarMovimiento></RegistrarMovimiento>}></Route>
        {/*Ventas */}
        <Route path='/ventas' element={<Ventas></Ventas>}></Route>
        <Route path='/ventas/create-ventas' element={<CreateVentas></CreateVentas>}></Route>
        <Route path='/ventas/update-ventas/:id' element={<UpdateVentas></UpdateVentas>}></Route>
        {/**Movimientos*/}
        <Route path='/movimientos/create-movimiento' element={<CreateMovimiento></CreateMovimiento>}></Route>
        <Route path='/movimientos/update-movimiento/:id' element={<UpdateMovimiento></UpdateMovimiento>}></Route>

        <Route path='/caja/create-caja' element={<Createcaja></Createcaja>}></Route>
        <Route path='/caja/update-caja/:id' element={<UpdateCaja></UpdateCaja>}></Route>
        {/*productos */}
        <Route path='/productos/crear-producto' element={<Create></Create>}></Route>
        <Route path='/productos/update-producto/:id' element={<UpdateProductos></UpdateProductos>}></Route>
        {/**Categoria */}
        <Route path='/cate/create-cate' element={<CreateCategoria></CreateCategoria>}></Route>
        <Route path='/cate/update-cate/:id' element={<UpdateCategoria></UpdateCategoria>}></Route>

        <Route path='/inventario/crear-almacen' element={<CreateAlmacen></CreateAlmacen>}></Route>
        <Route path='/inventario/update-almacen/:id' element={<UpdateAlmacen></UpdateAlmacen>}></Route>
       
        {/*Subcategoria */}
        <Route path='/sub/crear-Subcate' element={<CreateSubCategoria></CreateSubCategoria>}></Route>
        <Route path='/sub/update-subcate/:id' element={<EditSubCategoria></EditSubCategoria>}></Route>
       
        <Route path='/user/crear-empleado' element={<CreateEmpleado></CreateEmpleado>}></Route>
        <Route path='/user/:id' element={<EditUser></EditUser>}></Route>
       
      
        {/*Proveedores */}       
        <Route path='/proveedores/crear-proveedor' element={<CreateProveedor></CreateProveedor>}></Route>
        <Route path='/proveedores/update-proveedor/:id' element={<UpdateProveedor></UpdateProveedor>}></Route>
        {/*Contactos */}
        <Route path='/contact/cliente/:id' element={<UpdateCliente></UpdateCliente>}></Route>
        <Route path='/contact/crear-cliente' element={<Createcliente></Createcliente>}></Route>
        </Route>
       
        </Route>
    </Routes>
    </BrowserRouter> 
      
    </>
  )
}

export default App
