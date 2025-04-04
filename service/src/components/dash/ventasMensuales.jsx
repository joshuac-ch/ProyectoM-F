import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import FunctionVentas from "../hooks/Ventas";

const VentasMensuales = () => {
  const {venta,FecthVenta}=FunctionVentas()
  useEffect(()=>{
    FecthVenta()
  },[])
  // Datos de ventas por mes
  
  const [ventasAgrupadas, setVentasAgrupadas] = useState([]);
  useEffect(() => {
    if (venta.length > 0) {
      // Agrupar ventas por mes y sumar total_venta
      const ventasPorMes = venta.reduce((acc, v) => {
        const mesAnio = new Date(v.fecha_venta).toLocaleString("es-ES", { month: "long", year: "numeric" });

        if (!acc[mesAnio]) {
          acc[mesAnio] = { fecha_formateada: mesAnio, total_venta: 0 };
        }
        acc[mesAnio].total_venta += v.total_venta;

        return acc;
      }, {});

      // Convertir objeto a array
      setVentasAgrupadas(Object.values(ventasPorMes));
    }
  }, [venta]);

  return (
    <>
    <div style={styles.container}>
      <h3 style={styles.title}>Ventas Mensuales</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={ventasAgrupadas} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="fecha_formateada" tick={{ fill: "#333" }} />
          <YAxis tick={{ fill: "#333" }} />
          <Tooltip contentStyle={styles.tooltip} />
          <Bar dataKey="total_venta" fill="url(#colorVentas)" radius={[10, 10, 0, 0]} />
          <defs>
            <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#1d29d1" stopOpacity={0.8} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
    </>
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
export default VentasMensuales;
