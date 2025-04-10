import React, { useEffect, useState } from 'react'
import FunctionProducto from './Producto'
export default function FuncitonBuscador({almacenSeleccionado, onProductoSeleccionado}) {
    const {producto,FectProdcutos}=FunctionProducto()
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
            p.almacen_id === almacenSeleccionado &&
            p.nombre.toLowerCase().includes(inputProducto.toLowerCase())
        );

        setSugerencias(filtrados);
    }, [inputProducto, almacenSeleccionado, producto]);

    const handleSeleccionProducto = (producto) => {
        const productoExistente = productoSeleccionado.find((p) => p.producto_id === producto.id);
    
        if (productoExistente) {
          return;
        }
    
        const nuevoProducto = {
            producto_id: producto.id,
            nombre: producto.nombre,
            cantidad: "",
            precio_unitario: producto.precio_venta,
        };

        setProductoSeleccionado([...productoSeleccionado, nuevoProducto]);
        onProductoSeleccionado(nuevoProducto);  // Llamar a la función pasada como prop
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

    return(
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
    );
}