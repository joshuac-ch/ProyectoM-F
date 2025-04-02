import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import FuncionAlmacenes from "../../hooks/Almacenes";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    username: "",
    correo: "",
    telefono: "",
    direccion: "",
    rol: "",
    almacen_id: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/users/usuario/s/${id}`);
        setUser(data.user ||data);
      } catch (err) {
        console.error("Error al obtener el usuario", err);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/users/usuario/u/${id}`, user);
      alert("Usuario actualizado correctamente");
      navigate("/user");
    } catch (err) {
      console.error("Error al actualizar el usuario", err);
    }
  };
  const {almacen_id,FectAlmacen_id}=FuncionAlmacenes()
  useEffect(()=>{
    FectAlmacen_id()
  },[])
  return (
    <div className="container mt-4">
      <div className="header-user">
        <h2>Editar Usuario</h2>
        <button type="button" onClick={()=>navigate("/user")} >Regresar</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="w-50 p-3">
          <label>Nombre:</label>
          <input type="text" name="nombre" value={user.nombre} onChange={handleChange} className="form-control" required />
          </div>
          <div className="w-50 p-3">
          <label>Apellido:</label>
          <input type="text" name="apellido" value={user.apellido} onChange={handleChange} className="form-control" required />
          </div>          
        </div>

        <div className="input-group">
          <div className="w-50 p-3">
          <label>Username:</label>
          <input type="text" name="username" value={user.username} onChange={handleChange} className="form-control" required />
          </div>
          <div className="w-50 p-3">
          <label>Correo:</label>
          <input type="email" name="correo" value={user.correo} onChange={handleChange} className="form-control" required />
          </div>          
        </div>

        <div className="input-group">
          <div className="w-50 p-3">
          <label>Teléfono:</label>
          <input type="text" name="telefono" value={user.telefono} onChange={handleChange} className="form-control" required />
          </div>
          <div className="w-50 p-3">
          <label>Dirección:</label>
        <input type="text" name="direccion" value={user.direccion} onChange={handleChange} className="form-control" required />
          </div>          
        </div>
       
        <div className="input-group">
          <div className="w-50 p-3">
              <label>Rol:</label>
              <select name="rol" value={user.rol} onChange={handleChange} className="form-control">
                <option value="vendedor">Vendedor</option>
                <option value="administrador">Administrador</option>
              </select>
          </div>
          <div className="w-50 p-3">
              <label>Almacén ID:</label>
              <select  onChange={handleChange} name='almacen_id' class="form-control"  id="">
                        <option value={user.almacen_id}>ID: {user.almacen_id}</option>
                        <option value="">Cambiar de almacen</option>
                            {almacen_id.map((a)=>{
                                return(
                                    <option value={a.id}>ID: {a.id} || Nombre: {a.nombre}</option>
                                )
                            })}
                        </select>
          </div>
        </div>      

        <div className="input-group">
                            <div className="w-100 p-3">
                            <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                            </div>
        </div>      
        
      </form>
    </div>
  );
}
