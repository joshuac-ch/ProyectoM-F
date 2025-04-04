import React, { useEffect, useState } from 'react'
import FunctionProducto from '../hooks/Producto';

export default function ProductosVencidos() {
  const {producto,FectProdcutos}=FunctionProducto()
  const [productoPorVencer, setproductoPorVencer] = useState([])
  useEffect(()=>{ 
    FectProdcutos()
  },[])
  useEffect(()=>{
    if(producto.length>0){
    const hoy=new Date()
    const semana=new Date()
    semana.setDate(hoy.getDate()+7)
    const filtartProducto=producto.filter((p)=>{
      const productoPorVencer=new Date(p.fecha_vencimiento)
      console.log(productoPorVencer)
      return productoPorVencer>=hoy && productoPorVencer<=semana
    })
    setproductoPorVencer(filtartProducto)
  }      
  },[producto])
    
  
 

    return (
        <div className="container mt-4">
          <h2 className="text-center mb-4">📅 Productos Próximos a Vencer (7 dias)</h2>
    
          <div className="productosporvencer">
        {productoPorVencer.length === 0 ? (
          <p className="text-center">✅ No hay productos próximos a vencer esta semana.</p>
        ) : (
          productoPorVencer.map((producto, index) => (
           
            <div key={index} className="vencer">
              <div className="card shadow-sm p-3 mb-4 producto">
                <img src={producto.image} alt={producto.nombre} className="card-img-top" />
                <div className="card-body text-center">
                  <h4 className="card-title">{producto.nombre}</h4>
                  <p className="text-muted">
                    📅 Vence:{" "}
                    {new Date(producto.fecha_vencimiento).toLocaleDateString("es-ES")}
                  </p>
                  <span className="badge bg-danger">⚠ Código: {producto.codigo_producto}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    
          {/* Estilos personalizados */}
          <style>
            {`
            
            
            .productosporvencer{
              display:flex;
              gap:1rem;
              
              justify-content:center;
            }
              .card {
                border-radius:20px;
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
