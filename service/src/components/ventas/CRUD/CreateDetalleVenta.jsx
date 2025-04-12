import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../CRUD/ESTILOS/detalle.css"
import FunctionVentas from '../../hooks/Ventas'
import FunctionProducto from '../../hooks/Producto'
import axios from 'axios'
import FuncionAlmacenes from '../../hooks/Almacenes'
import FunctionUsuario from '../../hooks/Usuario'
import FuncionClientes from '../../hooks/Clientes'
import FuncionEmpleados from '../../hooks/Empleados'
import FuncitonBuscador from '../../hooks/BBuscador'
export default function CreateDetalleVenta() {
    const navegar=useNavigate()
    const {FecthVenta,venta}=FunctionVentas()
    const {FectProdcutos,producto}=FunctionProducto()
    const {empleado,FectUsuarios}=FuncionEmpleados() 
    
    const [almacenvalor, setalmacenvalor] = useState([])
    const [dataDetalle, setdataDetalle] = useState({
        producto_id:0,almacen_id:0,usuario_id:0,cliente_id:0,total_venta:0
    })
    const [productos, setproductos] = useState([
        {producto_id:"",cantidad:"",precio_unitario:""}
    ])
    const {almacen_id,FectAlmacen_id}=FuncionAlmacenes()
    const {usuario,FectUsuario}=FunctionUsuario()
    const {cliente,FecthCliente}=FuncionClientes()
   
    useEffect(()=>{
        if(almacen_id.length>0){
            const almacen_user=almacen_id.find((a)=>a.id===empleado.almacen_id)
            setalmacenvalor(almacen_user.id)
            
        }
    },[empleado])
    
    useEffect(()=>{
        FecthVenta(),FectProdcutos(),FectAlmacen_id(),FectUsuarios(),FecthCliente()
    },[])     
    useEffect(() => {
        if (empleado && empleado.id) {
            setdataDetalle((p) => ({
                ...p,
                cliente_id:empleado.id,
                usuario_id: empleado.id,
                almacen_id: empleado.almacen_id,
            }));
        }
    }, [empleado]);

    useEffect(() => {
        const almacen_user = almacen_id.find((a) => a.id === empleado.almacen_id);
        if (almacen_user) {
            setalmacenvalor(almacen_user.id);
        }
    }, [empleado, almacen_id]);

    const AgregarNuevoProducto = () => {
        setproductos([...productos, { producto_id: '', cantidad: 1, precio_unitario: 0 }]);
    };


    const CalcularVentaTotal = () => {
        return productos.reduce((acc, p) => {
            const subtotal = parseFloat(p.cantidad || 0) * parseFloat(p.precio_unitario || 0);
            return acc + subtotal;
        }, 0).toFixed(2);
    };

    useEffect(() => {
        const total = CalcularVentaTotal();
        setdataDetalle((prev) => ({
            ...prev,
            total_venta: total,
        }));
    }, [productos]);

    const EliminarNuevoProducto = (index) => {
        const eleminiarProducto = [...productos];
        eleminiarProducto.splice(index, 1);
        setproductos(eleminiarProducto);
    };

    const handleChangeproducto = (i, f, v) => {
        const nuevosProducots = [...productos];
        nuevosProducots[i][f] = v;
        setproductos(nuevosProducots);
    };

    const dataCompleta = {
        ...dataDetalle,
        productos: productos.map((p) => ({
            ...p,
            cantidad: parseInt(p.cantidad),
            precio_unitario: parseFloat(p.precio_unitario),
        })),
    };

    

    
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);

    const handleProductoSeleccionado = (producto, cantidad) => {
        const nuevoProducto = {
            producto_id: producto.id,
            precio_unitario: producto.precio_unitario,
            cantidad: cantidad
        };
        setProductosSeleccionados((prevProductos) => [...prevProductos, nuevoProducto]);
    };
        
        const [inputProducto, setInputProducto] = useState('');
        const [sugerencias, setSugerencias] = useState([]);
        const [productoSeleccionado, setProductoSeleccionado] = useState([]);
    
        useEffect(()=>{ FectProdcutos() },[]);
    
        useEffect(() => {
            if (inputProducto.trim() === '') {
                setSugerencias([]);
                return;
            }
    
            const filtrados = producto.filter((p) =>
                p.almacen_id === almacenvalor &&
                p.nombre.toLowerCase().includes(inputProducto.toLowerCase())
            );
    
            setSugerencias(filtrados);
        }, [inputProducto,almacenvalor, producto]);
    
        const handleSeleccionProducto = (producto) => {
            const productoExistente = productoSeleccionado.find((p) => p.producto_id === producto.id);

    if (productoExistente) {
        // Si el producto ya fue seleccionado, solo actualizamos la cantidad
        setProductoSeleccionado((prev) =>
            prev.map((p) =>
                p.producto_id === producto.id
                    ? { ...p, cantidad: p.cantidad === "" ? 1 : p.cantidad } // Si cantidad está vacía, la establecemos en 1
                    : p
            )
        );
        return;
    }

    // Si el producto no existe, lo agregamos a la lista
    const nuevoProducto = {
        producto_id: producto.id,
        nombre: producto.nombre,
        cantidad: 1, // Inicializamos con cantidad 1
        precio_unitario: producto.precio_venta,
    };
    
    setProductoSeleccionado([...productoSeleccionado, nuevoProducto]);
        };
    
        const handleCantidadChange = (e, producto_id) => {
            const { value } = e.target;
            setProductoSeleccionado((prev) =>
              prev.map((producto) =>
                producto.producto_id === producto_id ? { ...producto, cantidad: value } : producto
              )
            );
        };
    
        const handleEliminarProducto = (producto_id) => {
            setProductoSeleccionado((prev) =>
              prev.filter((producto) => producto.producto_id !== producto_id)
            );
        };
        const OnsumitDetalleCreate = async (e) => {
            e.preventDefault();
              // Crear la estructura de datos completa para enviar
    const dataCompleta = {
        ...dataDetalle,
        productos: productoSeleccionado.map((p) => ({
            ...p,
            cantidad: parseInt(p.cantidad),
            precio_unitario: parseFloat(p.precio_unitario),
        })),
        total_venta: CalcularTotalVenta(), // Sumar el total de la venta
    };
    console.log(dataCompleta);
            try {
                await axios.post("http://localhost:4000/api/users/detalle-venta-completo/", dataCompleta);
                alert("Se creó el detalle de venta");
                navegar("/ventas");
            } catch (err) {
               alert(err.response?.data?.message || err.message);
            }
        };
    
        const handleText = (e) => {
            setdataDetalle({ ...dataDetalle, [e.target.name]: e.target.value });
        };
        const CalcularSubtotal = (cantidad, precio_unitario) => {
            return cantidad * precio_unitario;
        };
        
        // Función para calcular el total de la venta
        const CalcularTotalVenta = () => {
            return productoSeleccionado.reduce((total, producto) => {
                return total + CalcularSubtotal(producto.cantidad, producto.precio_unitario);
            }, 0).toFixed(2);
        };

    return (
    <>
    <div className="container mt-4">
        <div className="header-detalle">
            <h2>Detalle de Venta</h2>
            <button type="button" onClick={()=>navegar("/ventas")}>Regresar</button>
        </div>
        <div className="body-detaller">
            <form onSubmit={OnsumitDetalleCreate}>
            <div className="input-group p-3">
                    <div className='w-50 p-3'>                        
                        <label>Usuario</label>
                        <input type="text" className="form-control" value={empleado.nombre} readOnly />               
                    </div>      
                    <div className='w-50 p-3'>
                        <label htmlFor="">Almacen ID</label>                        
                        <select name="almacen_id"  onChange={handleText} className='form-control' id="">
                                {(()=>{
                                    const almacen_user=almacen_id.find((a)=>a.id===empleado.almacen_id)
                                    
                                    
                                    return(
                                        almacen_user&&(
                                            <option selected value={almacen_user.id}>ID: {almacen_user.id} || Almacen: {almacen_user.nombre}</option>
                                        )
                                    );
                                })()}                      
                        </select>
                    </div>  
            </div>
            <div className="input-group p-3">
                    <div className="w-50 p-3">
                        <label htmlFor="">Cliente ID</label>
                        <select name="cliente_id"  onChange={handleText} className='form-control' id="">
                            <option value="" selected disabled>Seleccion del cliente ID</option>
                            <option value={empleado.id} selected>Persona anonima</option>
                            {cliente.map((c)=>{
                                
                                return(
                                    
                                    <option value={c.id}>ID: {c.id} || Nombre: {c.nombre}</option>
                                )
                            })}
                        </select>  
                                            
                    </div>
                   {/**
                     <div className="w-50 p-3">
                        <label htmlFor="">Nombre del cliente</label>
                        <input type="text" className='form-control' placeholder='ingrese nombre del cliente' />
                    </div>
                     
                    */}
            </div>
            <div className="w-100 p-3">        
            <div>
            <h3>Buscar Producto</h3>
            <input
              type="text"
              className="form-control"
              placeholder="Escribe un producto"
              value={inputProducto}
              onChange={(e) => setInputProducto(e.target.value)}
            />

            {sugerencias.length > 0 && (
              <ul className="list-group mt-2">
                {sugerencias.map((prod) => (
                  <li
                    key={prod.id}
                    className="list-group-item list-group-item-action"
                    onClick={() => handleSeleccionProducto(prod)}
                    style={{ cursor: 'pointer' }}
                  >
                    {prod.nombre}
                  </li>
                ))}
              </ul>
            )}

            {productoSeleccionado.length > 0 && (
              <div className="mt-3">
                <h4>Productos seleccionados:</h4>
                <ul>
                  {productoSeleccionado.map((producto) => (
                    <li key={producto.producto_id}>
                      <p><strong>Producto:</strong> {producto.nombre}</p>
                      <p><strong>Precio Unitario:</strong> {producto.precio_unitario}</p>
                      <label>Cantidad:</label>
                      <input
                        type="number"
                        name=''
                        className="form-control"
                        value={producto.cantidad}
                        onChange={(e) => handleCantidadChange(e, producto.producto_id)}
                      />
                      <button
                        className="btn btn-danger mt-2"
                        onClick={() => handleEliminarProducto(producto.producto_id)}
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>  
            </div>
            <div className='input-group p-3'>
                             
                 {productoSeleccionado.map((p, i) => (
                <div key={i} className="w-50 p-3">
                    <label htmlFor="">Subtotal</label>
                    <input
                        type="number"
                        readOnly
                        className="form-control"
                        value={CalcularSubtotal(p.cantidad, p.precio_unitario)} // Subtotal dinámico por producto
                        name="subtotal"
                        placeholder="Subtotal del producto"
                    />
                </div>
    ))}
             
            </div>  
            
            <div className="w-50 p-3">
            <label htmlFor="">Total de la venta</label>
            <input
                type="text"
                className="form-control"
                name="venta_total"
                value={CalcularTotalVenta()} // Calculamos el total de la venta sumando todos los subtotales
                readOnly // No editable
            />    
            </div>     
            <div className="input-group p-3">
                    <div className="p-3">
                        <button type="submit" className='btn btn-primary'>Crear Venta</button>
                    </div>
            </div>
            
                
            </form>
        </div>
    </div>
    </>
  )
}
