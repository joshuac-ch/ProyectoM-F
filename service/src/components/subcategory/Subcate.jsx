import React, { useEffect, useState } from 'react'
import "../subcategory/hojasub.css" 
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import FuncionDelimitar from '../hooks/Delimitar'
export default function Subcate() {
    const [subcategoria, setsubcategoria] = useState([])
    const [categorias, setCategorias] = useState({}); // Guardará { idCategoria: nombreCategoria }
    const FecthSubcategoria=async()=>{
        try{
            const {data}=await axios.get("http://localhost:4000/api/users/subcategoria/g/")
            setsubcategoria(data)
             // Extraer los IDs de categoría únicos
            //const uniqueCategoryIds = [...new Set(data.map((c) => c.categoria_id))];

            // Obtener los nombres de las categorías
          //  fetchCategorias(uniqueCategoryIds);
        }catch(e){
            alert("Hubo un error",e)
        }
    }
    useEffect(()=>{
      FecthSubcategoria()
    })
     // 
   useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/users/categoria/s/");
        const categoriasMap = {};
        data.forEach((categoria) => {
          
          categoriasMap[categoria.id] = categoria.nombre;
        });
        setCategorias(categoriasMap);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };
    fetchCategorias();
  }, []);
    //_-------------------------
    
   

    const crear=useNavigate()
    const onUpdate=(id)=>{
      if(FuncionDelimitar("editar")){
        crear(`/update-subcate/${id}`)
    }else{
      alert("Solo personal autorizado")
    }
  }
    const onDelete=async(id)=>{
      if(FuncionDelimitar("eliminar")){
        const message=window.confirm("Esta seguro de eliminar esta subcategoria?")
        if(message){
            try{
                await axios.delete(`http://localhost:4000/api/users/subcategoria/d/${id}`)
                alert("Se eliminor correctamente la subcategoria")
                setsubcategoria(subcategoria.filter((s)=>s.id!==id))                
            }catch(e){  
                alert("hubo un error al eliminar esta subcategoria",e)
            }
        }}
        else{
          alert("Solo personal autorizado")
        }
    }
    
  return (
   <>
   <div className="container mt-4">
    <div className="header-subcategoria">
    <h2>Subcategorias</h2>
    <div className="tools-sub">
       <button type="button" onClick={()=>crear("/crear-Subcate")} >Crear Subcategoria</button>
    </div>
    </div>
    <hr />
    <div className="body-subcategoria">
    <div className="body-categorias">
             <div className="tarjeta-cate">
              {subcategoria.length===0?(
                <div className="not-found-sucategoria">
                  <p>No se encontro una subcategoria</p>
                </div>
              ):
              subcategoria.map((c)=>{
                return(
                  <div id='c.id' key={c.id} className="sub-cate">
                    <div className="first-cate">
                   <h4 className='identificador'>{c.id}</h4>
                      <div className="cont">
                        <div className="id-cate">
                            <label htmlFor="">Categoria id: {categorias[c.categoria_id]||"..cargando"}</label>                          
                        </div>
                        
                        <div className="titulo">
                        <label htmlFor="">Subcategoria:</label>
                        <label>{c.nombre}</label>
                        </div>
                        <div className="contenido">
                        <label htmlFor="">Descripcion:</label>
                        <p>{c.descripcion.length>20?c.descripcion.slice(0,20)+'...' :c.descripcion}</p>
                        </div>                      
                      </div>
                    </div>
                    
                      <div className="tools">
                      <button onClick={()=>onUpdate(c.id)} className="btn btn-warning btn-sm me-2">
                        <i class='bx bxs-edit-alt' ></i>
                      </button>
                     <button onClick={()=>onDelete(c.id)} className="btn btn-danger btn-sm me">
                        <i class='bx bxs-trash' ></i>
                      </button>
                      </div>
                  </div>
                  
                )
              })
              }
             </div>
      </div>
    </div>
   </div>
   </>
  )
}
