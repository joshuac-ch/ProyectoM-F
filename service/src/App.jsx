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
function App() {
    return (
    <>
    <BrowserRouter>
    <Routes>
      {/*RUTA DE LOGIN*/}
      <Route path='/login' element={<Log></Log>}></Route>
      
      {/*RUTAS ANIDADES EN UN LAYOUT */}
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
        {/*RUTAS DE CRUD */}
        <Route path='/crear-producto' element={<Create></Create>}></Route>
        <Route path='/crear-empleado' element={<CreateEmpleado></CreateEmpleado>}></Route>
        <Route path='/crear-proveedor' element={<CreateProveedor></CreateProveedor>}></Route>
        <Route path='/crear-cliente' element={<Createcliente></Createcliente>}></Route>
        </Route>
       
       
    </Routes>
    </BrowserRouter> 
      
    </>
  )
}

export default App
