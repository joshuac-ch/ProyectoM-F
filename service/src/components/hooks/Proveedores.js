
import { useState } from "react";
import { axiosInstance } from "../lib/axios";

export const FuncionProveedoresId=()=>{
   const [proveedores_id, setproveedores_id] = useState([])
    const FectchProveedoresID=async()=>{
        try{
            const data_proveedor=await axiosInstance.get("/proveedor/g");
            setproveedores_id(data_proveedor.data)            
        
        }catch(e){
            alert("Hubo un erro no se puede mostrar los id de proveedores",e)
        }
    }
    return({
        FectchProveedoresID,proveedores_id,setproveedores_id
    })
}
