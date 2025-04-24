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
import FuncionSubcategoria from '../../hooks/Subcategoria'
export default function CreateDetalleVenta() {
    const navegar=useNavigate()
    const {FecthVenta,venta}=FunctionVentas()
    const {FectProdcutos,producto}=FunctionProducto()
    const {empleado,FectUsuarios}=FuncionEmpleados() 
    
    const [almacenvalor, setalmacenvalor] = useState([])
    const [dataDetalle, setdataDetalle] = useState({
        producto_id:0,almacen_id:0,usuario_id:0,cliente_id:0,total_venta:0,metodo_pago:"",descripcion_pago:"",
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
                cliente_id:1, //TENER EN CUENDA QUE ESTE NUMERO ES POR DEFECTO SI PONEMOS EMPLEADO CUANDO CAMBIEMBOS AL DEBERA HABER EL CLIENTE ID 2 
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
        imagen:producto.image,
        cantidad: 1, // Inicializamos con cantidad 1
        precio_unitario: producto.precio_venta,
        subcategoria_id:producto.subcategoria_id
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
                const response=await axios.post("http://localhost:4000/api/users/detalle-venta-completo/", dataCompleta);
                //alert("Se creó el detalle de venta");
                
                //navegar("/ventas");
               const ventaID=response.data.id
                
                navegar(`/ventas/detalle-especifico/${ventaID}`)
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
        const CalcularTotalVentaXCodigo = () => {
            return productoSeleccionadoBarra.reduce((total, producto) => {
                return total + CalcularSubtotal(producto.cantidad, producto.precio_unitario);
            }, 0).toFixed(2);
        };
        //----------------------------------------------------------------------
        //----------------------------------------------------------------------
        //----------------------------------------------------------------------
       // const [btnEditarprecio, setbtnEditarprecio] = useState("")
        const [mensaje, setmensaje] = useState("")
        const [showMensaje, setshowMensaje] = useState(false)
        const {FechtSubcategoria,Subcategoria_id}=FuncionSubcategoria()
        useEffect(()=>{
            FechtSubcategoria()
        },[])
        const onEditPrecio=(produc_id)=>{
            const subcategoriaVerduras=Subcategoria_id.find((s)=>s.nombre=="verduras")           
            const productoSelec=productoSeleccionado.find((p)=>p.producto_id===produc_id)
                      
            if (productoSelec.subcategoria_id === subcategoriaVerduras.id) {
                //alert("✅ Se puede editar el producto.");
                return true;
              } else {
                setmensaje("❌ Solo editable para la subcategoría: 'verduras'")
                setshowMensaje(true)
                setTimeout(()=>{
                    setshowMensaje(false)
                },3000)
                return false;
              }
          
        }
        
        const handleEditarEdit=(e,produc_id)=>{
            const {value}=e.target
           
            if(!onEditPrecio(produc_id))return
            setProductoSeleccionado((prev)=>
            prev.map((p) =>
                p.producto_id===produc_id?{...p,precio_unitario:value}:p
            ))
        }
    
        const [codigoinput, setcodigoinput] = useState('') 
        const [sugerenciaLista, setsugerenciaLista] = useState([])   
        
        useEffect(()=>{
            if(codigoinput.trim() ===''){
                setsugerenciaLista([])
                return                 
            }else{
            const data_producto=producto.filter((p)=>///NO USAR PARENTESIS MEJOR RETURN
            (
                p.almacen_id===almacenvalor &&
                p.codigo_producto.includes(codigoinput)))
            setsugerenciaLista(data_producto)
            
            }
        },[codigoinput,producto,almacen_id])
        
        const [productoSeleccionadoBarra, setproductoSeleccionadoBarra] = useState([])
        const handleCodigoProducto=(producto)=>{
             
            const prodcutoSelect=productoSeleccionadoBarra.find((p)=>p.id===producto.id)
            if (prodcutoSelect) {
                // Si el producto ya fue seleccionado, solo actualizamos la cantidad
                setproductoSeleccionadoBarra((prev) =>
                    prev.map((p) =>
                        p.producto_id === producto.id
                            ? { ...p, cantidad: p.cantidad === "" ? 1 : p.cantidad } // Si cantidad está vacía, la establecemos en 1
                            : p
                    )
                );
                return;
            }
        
            // Si el producto no existe, lo agregamos a la lista
            const productoCodigoBarra = {
                producto_id: producto.id,
                nombre: producto.nombre,
                imagen:producto.image,
                cantidad: 1, // Inicializamos con cantidad 1
                precio_unitario: producto.precio_venta,
            };
            setproductoSeleccionadoBarra([...productoSeleccionadoBarra,productoCodigoBarra])
            setcodigoinput('')
        }
        const handleCantidadChangeCODIGO = (e, producto_id) => {
            const { value } = e.target;
            setproductoSeleccionadoBarra((prev) =>
              prev.map((producto) =>
                producto.producto_id === producto_id ? { ...producto, cantidad: value } : producto
              )
            );
        };
        
        const handleEliminarProductoCODIGO = (producto_id) => {
            setproductoSeleccionadoBarra((prev) =>
              prev.filter((producto) => producto.producto_id !== producto_id)
            );
        };
        
        const OnsumitDetalleCreateXcodigo = async (e) => {
            e.preventDefault();
              // Crear la estructura de datos completa para enviar
    const dataCompletaCodigo = {
        ...dataDetalle,
        
        productos: productoSeleccionadoBarra.map((p) => ({
            ...p,
            cantidad: parseInt(p.cantidad),
            precio_unitario: parseFloat(p.precio_unitario),
        })),
        total_venta: CalcularTotalVentaXCodigo(), // Sumar el total de la venta
    };
    
    console.log(dataCompleta);
            try {
                const response=await axios.post("http://localhost:4000/api/users/detalle-venta-completo/", dataCompletaCodigo);
                //alert("Se creó el detalle de venta de codigo de barras");
                //navegar("/ventas");
                const ventaID=response.data.id
                
                navegar(`/ventas/detalle-especifico/${ventaID}`)

            } catch (err) {
               alert(err.response?.data?.message || err.message);
            }
        };
        const [modoBusqueda, setmodoBusqueda] = useState("codigo")
        const busqueda = () => {
            const buscarmanual = document.getElementById("manual");
            const buscarcodigo = document.getElementById("codigo_barras");
        
            // Validamos que ambos elementos existan
            if (buscarmanual && buscarcodigo) {
                if (buscarcodigo.style.display === "none") {
                    buscarcodigo.style.display = "block";
                    buscarmanual.style.display = "none";
                    setmodoBusqueda("codigo")                                        
                } else {
                    buscarmanual.style.display = "block";
                    buscarcodigo.style.display = "none";
                    setmodoBusqueda("manual")
                }
            }
        };       
      
    return (
    <>
    <div className="container mt-4">
        <div className="header-detalle">
            <h2>Detalle de Venta</h2>
            <button type="button" onClick={()=>navegar("/ventas")}>Regresar</button>
        </div>
        <div className="body-detaller">
            <form onSubmit={modoBusqueda==="codigo"?OnsumitDetalleCreateXcodigo:OnsumitDetalleCreate}>
            <div className="input-group ">
                    <div className='w-50 p-3'>                        
                        <label>Usuario</label>
                        <input type="text" className="form-control" value={empleado.nombre} readOnly />               
                    </div>      
                    <div className='w-50 p-3'>
                        <label htmlFor="">Almacen ID</label>              
                                {(()=>{
                                    const almacen_user=almacen_id.find((a)=>a.id===empleado.almacen_id)
                                    return(
                                        almacen_user&&(
                                           
                                            <input type="text" name="almacen_id" readOnly value={almacen_user.nombre} onChange={handleText} className='form-control' />   
                                        )
                                    );
                                })()}                      
                       
                    </div>  
            </div>
            <div className="input-group ">
                    <div className="w-50 p-3">
                        <label htmlFor="">Cliente ID</label>
                        <select name="cliente_id"  onChange={handleText} className='form-control' id="">
                            <option value="" selected disabled>Seleccion del cliente ID</option>
                            <option value={1} selected>Persona anonima</option>
                            {cliente.map((c)=>{                                
                                return(                                    
                                    <option key={c.id} value={c.id}>ID: {c.id} || Nombre: {c.nombre}</option>
                                )
                            })}
                        </select>  
                                            
                    </div>
                  
                     <div className="w-50 p-3">
                        <label htmlFor="">Metodo de pago</label>
                        <select name="metodo_pago" onChange={handleText} className='form-control' id="">
                            <option value="" selected disabled>Seleccione metodo de pago</option>
                            <option value="tarjeta">Tarjeta</option>
                            <option value="efectivo">Efectivo</option>
                            <option value="yape">Yape</option>
                            <option value="pago_combinado">Pago Combinado</option>
                        </select>
                    </div>
                    {dataDetalle.metodo_pago=="pago_combinado"?
                    (
                        <div className='w-100 p-3'>
                            <label htmlFor="">Descripcion del pago *</label>
                            <textarea name="descripcion_pago" onChange={handleText} className='form-control' id=""></textarea>                            
                        </div>
                    )
                    :null} 
                    
            </div>
            <div className="search2 p-3">
                
                <button type="button" onClick={busqueda} className=' form-control'>Buscar producto por codigo/Manualmente</button>
               
                </div>
                
            <div id="codigo_barras">
            <div className="w-100 p-3">
                
                
                <h4>Busqueda por codigo</h4>
                 <input type="text" className="form-control" placeholder="ingrese codigo de barra" value={codigoinput}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault(); // Evita el submit
                          if (sugerenciaLista.length > 0) {
                            handleCodigoProducto(sugerenciaLista[0]); // Selecciona automáticamente el primer producto sugerido
                            setcodigoinput(''); // Limpia el input si deseas
                          }
                        }
                      }}
                 onChange={(e)=>setcodigoinput(e.target.value)}/>
                
                    {sugerenciaLista.length > 0 &&(
                         <ul className="list-group mt-2">
                         {sugerenciaLista.map((prod) => (
                           <li
                             key={prod.id}
                             className="list-group-item list-group-item-action"
                             onClick={() => handleCodigoProducto(prod)}
                             style={{ cursor: 'pointer' }}
                           >
                             {prod.nombre}
                           </li>
                         ))}
                       </ul>
                    )}
                    <hr />
                   
                   {productoSeleccionadoBarra.length > 0 && (
              <div className="mt-3">
                <h4>Productos seleccionados:</h4>
                <hr />
                <div className='lista-sugerencias'>
                  {productoSeleccionadoBarra.map((producto) => (
                    <div key={producto.producto_id} className="sub-p">
                        <div className='sugerencia' key={producto.producto_id}>
                        <div className="sug-producto">
                        <label><strong>Producto:</strong> </label>
                      <div className="producto-sugerido">
                      <img src={producto.imagen} alt="" />
                      <input className='form-control' value={producto.nombre}/>
                      </div>
                        </div>
                        <div className="sug precio">
                        <label><strong>Precio Unitario S/.</strong></label>
                        <div className='precio-editar '>
                        <input type="text" className='form-control' onChange={(e)=>handleEditarEdit(e,producto.producto_id)}  value={producto.precio_unitario} />
                        <button type="button" onClick={()=>onEditPrecio(producto.producto_id)} className='form-control'> <i className='bx bx-edit-alt' ></i></button>
                        </div>
                        
                        
                        </div>
                      <div className="sug-cantidad">
                      <label>Cantidad:</label>
                      <input
                        type="number"
                        name=''
                        className="form-control"
                        value={producto.cantidad}
                        onChange={(e) => handleCantidadChangeCODIGO(e, producto.producto_id)}
                      />
                      </div>
                     <div className="button-sug">
                     <button
                        className="btn btn-danger mt-2"
                        onClick={() => handleEliminarProductoCODIGO(producto.producto_id)}
                      >
                        Eliminar
                      </button>
                     </div>                     
                    </div>
                    <hr /> 
                    </div>                   
                  ))}
                
                </div>
               
              </div>
            )}  
            </div>
            <div className='input-group '>
                             
                 {productoSeleccionadoBarra.map((p, i) => (
                <div key={i} className="w-50 p-3">
                    <label htmlFor="">Subtotal</label>
                    <input
                        type="number"
                        readOnly
                        className="form-control"
                        value={CalcularSubtotal(p.cantidad, p.precio_unitario).toFixed(2)} // Subtotal dinámico por producto
                        name="subtotal"
                        placeholder="Subtotal del producto"
                    />
                </div>
                ))}
                <div className="w-50 p-3">
            <label htmlFor="">Total de la venta</label>
            <input
                type="text"
                className="form-control"
                name="venta_total"
                value={CalcularTotalVentaXCodigo()} // Calculamos el total de la venta sumando todos los subtotales
                readOnly // No editable
            />    
            </div>   
             
            </div> 
            </div>
           
                 
           <div id="manual">           
           <div className='w-100 p-3'>
           <h4>Busqueda manual</h4>
                
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar..."
                  value={inputProducto}
                  onChange={(e) => setInputProducto(e.target.value)}
                />
                <hr />
      
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
                 </div>
                 
                 
                 
                 
      
                  {productoSeleccionado.length > 0 && (
                    <div className="mt-3">
                      <h4>Productos seleccionados:</h4>
                      <hr />
                      {showMensaje && (
                        <div style={{
                            backgroundColor: "#ffe0e0",
                            color: "#cc0000",
                            padding: "10px",
                            borderRadius: "5px",
                            marginTop: "10px"
                        }}>
                            {mensaje}
                        </div>
                    )}
                      <div className='lista-sugerencias'>
                        {productoSeleccionado.map((producto) => (
                          <div key={producto.producto_id} className="sub-p">
                              <div className='sugerencia' key={producto.producto_id}>
                              <div className="sug-producto">
                              <label><strong>Producto:</strong> </label>
                            <div className="producto-sugerido">
                            <img src={producto.imagen} alt="" />
                            <input className='form-control' value={producto.nombre}/>
                            </div>
                              </div>
                              <div className="sug precio">
                              <label><strong>Precio Unitario S/.</strong></label>
                              <div className='precio-editar '>
                              <input type="text" className='form-control' onChange={(e)=>handleEditarEdit(e,producto.producto_id)} value={producto.precio_unitario} />
                              <button type="button" onClick={()=>onEditPrecio(producto.producto_id)} className='form-control'> <i className='bx bx-edit-alt' ></i></button>
                              </div>
                              
                              
                              </div>
                            <div className="sug-cantidad">
                            <label>Cantidad:</label>
                            <input
                              type="number"
                              name=''
                              className="form-control"
                              value={producto.cantidad}
                              onChange={(e) => handleCantidadChange(e, producto.producto_id)}
                            />
                            </div>
                           <div className="button-sug">
                           <button
                              className="btn btn-danger mt-2"
                              onClick={() => handleEliminarProducto(producto.producto_id)}
                            >
                              Eliminar
                            </button>
                           </div>                     
                          </div>
                          <hr /> 
                          </div>                   
                        ))}
                      
                      </div>
                     
                    </div>
                  )}   
                
            
            
            
           
            <div className='input-group '>
                             
                 {productoSeleccionado.map((p, i) => (
                <div key={i} className="w-50 p-3">
                    <label htmlFor="">Subtotal</label>
                    <input
                        type="number"
                        readOnly
                        className="form-control"
                        value={CalcularSubtotal(p.cantidad, p.precio_unitario).toFixed(2)} // Subtotal dinámico por producto
                        name="subtotal"
                        placeholder="Subtotal del producto"
                    />
                </div>
                ))}
                <br />
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
             
            </div>  
            
            </div>   
            <div className="input-group ">
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
