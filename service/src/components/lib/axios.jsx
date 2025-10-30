import axios from "axios";

export const axiosInstance= axios.create({
    baseURL:"http://3.87.87.124:7500/api/users",    
})