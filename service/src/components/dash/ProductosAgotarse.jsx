import React from 'react'

export default function ProductosAgotarse() {
    const productos = [
        { id: 1, nombre: "Leche", stock: 3, total: 20 },
        { id: 2, nombre: "Gaseosa Inca kola", stock: 2, total: 15 },
        { id: 3, nombre: "Jamon", stock: 2, total: 10 },
        { id: 4, nombre: "Queso crema", stock: 5, total: 20 },
      ];
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-danger">⚠️ Productos por Agotarse</h2>

      <div className="row">
        {productos.map((producto) => {
          const porcentaje=(producto.stock/producto.total)*100
          return (
            <div key={producto.id} className="col-md-6 mb-3">
              <div className="card tarjeta p-3 shadow-sm">
                <h5 className="mb-2">{producto.nombre}</h5>
                <div className="progress mb-2">
                  <div
                    className={`progress-bar ${porcentaje < 20 ? "bg-danger" : "bg-warning"} `}
                    role="progressbar"
                    style={{ width: `${porcentaje}%` }}
                    aria-valuenow={producto.stock}
                    aria-valuemin="0"
                    aria-valuemax={producto.total}
                  ></div>
                </div>
                <p className="text-muted">
                  Stock: <strong>{producto.stock}</strong> / {producto.total}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <style>
        {`
          .tarjeta{
            border-left:5px solid red;
            transition: transform 0.3s ease-in-out;
            }
          .tarjeta:hover {
            transform: scale(1.03);
          }
          .progress {
            height: 10px;
          }
        `}
      </style>
    </div>
  );
}
