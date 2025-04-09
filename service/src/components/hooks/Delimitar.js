import React from 'react'

export default function FuncionDelimitar(accion) {
    const autenticar=localStorage.getItem("rol_usuario")
    console.log(autenticar)
    const permisos={
                    administrador:["crear","editar","eliminar","ver"],
                    vendedor:["crear","ver"]
    }    
    return ( permisos[autenticar]?.includes(accion)   
  )
}
