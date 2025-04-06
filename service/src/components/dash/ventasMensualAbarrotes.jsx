import React, { useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import FunctionCategoria from "../hooks/Categoria";
import FunctionProducto from "../hooks/Producto";
import FunctionVentas from "../hooks/Ventas";
import FuncitonDetalle from "../hooks/Detalle";
import FuncionSubcategoria from "../hooks/Subcategoria";


export default function VentasMensualAbarrotes() {
  // Datos de ventas por mes
   /* const data = [
      { mes: "Ene", ventas: 100 },
      { mes: "Feb", ventas: 120 },
      { mes: "Mar", ventas: 150 },
      { mes: "Abr", ventas: 180 },
      { mes: "May", ventas: 200 },
      { mes: "Jun", ventas: 170 },
      { mes: "Jul", ventas: 220 },
      { mes: "Ago", ventas: 210 },
      { mes: "Sep", ventas: 250 },
      { mes: "Oct", ventas: 230 },
      { mes: "Nov", ventas: 270 },
      { mes: "Dic", ventas: 300 },
    ];*/
    const {FecthCategoria,categoria}=FunctionCategoria()
    const {FectProdcutos,producto}=FunctionProducto()
    const {FecthVenta,venta}=FunctionVentas()
    const {FechtSubcategoria,Subcategoria_id}=FuncionSubcategoria()
    const {FuncitonDetalleectDetalle,detalle}=FuncitonDetalle()
    useEffect(()=>{
      FecthCategoria(),FuncitonDetalleectDetalle()
      FechtSubcategoria(),FecthVenta(),FectProdcutos()
    },[])
    //buscar abarrotes
    const categoriaAbarrotes=categoria.find((c)=>c.nombre=="Abarrotes")
    //buscar subcategoria ligada a abarrotes
    const subcategoriaAbarrotes=categoriaAbarrotes?
    Subcategoria_id.filter((sub)=>sub.categoria_id===categoriaAbarrotes.id):[]
        
    //productos dnetro de esas subbcategorias
    const productosAbarrotes=producto.filter((p)=>{
      return subcategoriaAbarrotes.some((s)=>s.id==p.subcategoria_id) //Usar return para que te retorne el valor SIEMPRE Y CUANDO USES LLAVES
    })
    // 4. IDs de productos
    
    const idsProductosAbarrotes = productosAbarrotes.map((p) => p.id);
    
    // 5. Detalles de venta que incluyan esos productos
const detallesFiltrados = detalle.filter((d) =>
  idsProductosAbarrotes.includes(d.producto_id)
);
  // 6. Combinar con la venta para obtener la fecha y agrupar por mes
const ventasPorMes = {};
detallesFiltrados.forEach((detalle) => {
  const ventaRelacionada = venta.find((v) => v.id === detalle.venta_id);
  if (ventaRelacionada) {
    const fecha = new Date(ventaRelacionada.fecha_venta); // Asegúrate de tener este campo
    const mes = fecha.toLocaleString("default", { month: "short", year: "numeric" });

    if (!ventasPorMes[mes]) ventasPorMes[mes] = 0;

    ventasPorMes[mes] += detalle.subtotal || detalle.cantidad * detalle.precio_unitario; // según tus campos
  }
});
   
// 7. Preparar data para el gráfico
const data = Object.entries(ventasPorMes).map(([mes, ventas]) => ({
  mes,
  ventas,
}));
    return (
      <div style={styles.container}>
      <h3 style={styles.title}>Ventas Mensuales de abarrotes</h3>
      <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="mes" tick={{ fill: "#333" }} />
            <YAxis tick={{ fill: "#333" }} />
            <Tooltip contentStyle={styles.tooltip} />
            {/* Degradado en barras */}
            <Bar dataKey="ventas" fill="url(#colorVentas)" radius={[10, 10, 0, 0]} />
            <defs>
              <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#1d29d1" stopOpacity={0.8} />
              
              
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
    </div>
  );
  };
  // Estilos personalizados
  const styles = {
    container: {
      width: "100%",
      maxWidth: "700px",
      margin: "20px auto",
      padding: "20px",
      background: "#fff", // Efecto vidrio
      backdropFilter: "blur(10px)", // Desenfoque
      borderRadius: "15px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Sombra
    },
    title: {
      textAlign: "center",
      color: "#333",
      fontSize: "20px",
      marginBottom: "10px",
    },
    tooltip: {
      backgroundColor: "#333",
      border: "none",
      borderRadius:"10px",
      color: "#fff",
    },
  };

