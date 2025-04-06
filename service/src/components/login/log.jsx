import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../login/hojalog.css"
import FunctionUsuario from "../hooks/Usuario";
const Log = () => {  
  const Navigate=useNavigate()
  const [FormDataLogin, setFormDataLogin] = useState({
    username:"",password:""
  })
  const handleText=(e)=>{
      setFormDataLogin({...FormDataLogin,[e.target.name]:e.target.value})
  }
  const {usuario,FectUsuario}=FunctionUsuario()
  useEffect(()=>{
    FectUsuario()
  },[])
  const handleSubmit = (e) => {
    e.preventDefault();    
    const consulta=usuario.find((u)=>u.username=FormDataLogin.username&& u.password==FormDataLogin.password)
    if(consulta){
        localStorage.setItem("usuario_autentificado","true")
        //alert("Datos correctos")
        Navigate("/dash")        
    }else{
        alert("correo o contraseña incorrecta")
    } 
    
    
};
  
  return (
    
    <div className="d-flex justify-content-center align-items-center vh-100" style={styles.background}>
      <div className="card p-4 shadow-lg" style={styles.glassEffect}>
        <div className="profile-icon">
          <div className="icon" >
            <img src="https://i.pinimg.com/736x/14/77/8a/14778a38194b6a42f5f2a72f77557875.jpg" alt="" />
          </div>
        </div>
        <h3 className="text-center mb-4 text-black">Iniciar Sesión</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-black">Correo Electrónico</label>
            <input
              type="text"
              className="form-control"
              placeholder="ejemplo@correo.com"
              name="username"
              onChange={handleText}
              //value={email}
              //onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label text-black ">Contraseña</label>
           
            <input
            name="password"
              type="password"
              className="form-control"
              placeholder="••••••••"
              onChange={handleText}
              //value={password}
              //onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Ingresar
          </button>
        </form>
        <div className="text-center mt-3">
          <a href="#" className="text-black">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </div>
  );
};

// 🎨 Estilos personalizados para el efecto vidrio
const styles = {
  background: {
    backgroundImage: "url('https://i.postimg.cc/L8hRctr0/login2.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  glassEffect: {
    marginTop:"200px",
    width: "22rem",
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "15px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  
};

export default Log;
