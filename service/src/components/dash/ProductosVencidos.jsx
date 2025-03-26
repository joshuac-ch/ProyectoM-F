import React from 'react'

export default function ProductosVencidos() {
    const productosporvencer=[
        {nombre:"Leche",fecha:"1/04/2025",categoria:"lacteos"},
        {nombre:"Queso",fecha:"1/04/2025",categoria:"lacteos"},
        {nombre:"Mermelada",fecha:"1/04/2025",categoria:"mengunge"},
    ]
    return (
        <div className="container mt-4">
          <h2 className="text-center mb-4">📅 Productos Próximos a Vencer</h2>
    
          <div className="row">
            {productosporvencer.map((producto, index) => (
              <div key={index} className="col-md-4">
                <div className="card shadow-sm p-3 mb-4 rounded">
                  <div className="card-body text-center">
                    <h4 className="card-title">{producto.nombre}</h4>
                    <p className="text-muted">📅 Fecha de vencimiento: {producto.fecha}</p>
                    <span className="badge bg-primary">{producto.categoria}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
    
          {/* Estilos personalizados */}
          <style>
            {`
              .card {
                
                background: #f8fafc;
                transition: 0.3s ease-in-out;
              }
              .card:hover {
                transform: scale(1.05);
                box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
              }
              .badge {
                font-size: 14px;
                padding: 6px 12px;
              }
            `}
          </style>
        </div>
      );
}
