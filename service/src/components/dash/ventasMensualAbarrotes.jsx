import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";


export default function VentasMensualAbarrotes() {
  // Datos de ventas por mes
    const data = [
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
    ];
  
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

