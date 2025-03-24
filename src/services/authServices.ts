import axios from "axios"
import { userResponse } from "../types/userTypes";
const API_URL = import.meta.env.VITE_API_URL
export const login = async (email:string,password:string)=>{
    try{
        const response = await axios.post<userResponse>(`${API_URL}/login`,{
            email:email,
            password:password
        });
        const {user, token} = response.data.data;
        localStorage.setItem('token',token);
        return user
    }catch(error:any){
        console.error('Error al iniciar sesion: ', error.response?.data?.message);
        throw new Error (error.response?.data?.message)
    }
}

export const checkAuth = async ()=>{
    try{
        const token = localStorage.getItem('token');
        const response = await axios.get<userResponse>(`${API_URL}/user`,{
            headers: {Authorization: `Bearer ${token}`}
        });
        return response.data.data.user
    }catch(error:any){
        localStorage.removeItem('token');
        console.log('Error al checkear auth.', error.response?.data?.message);
        throw new Error(error.response?.data?.message)
    }
}

export const signUp =async (name:string,email:string,password:string,confirmation:string)=>{
    try{
        const response = await axios.post<userResponse>(`${API_URL}/register`,{
            name:name,
            email:email,
            password:password,
            password_confirmation:confirmation
        });
        localStorage.setItem('token',response.data.data.token);
        return response.data.data.user
    }catch(error:any){
        throw new Error(error.response?.data?.message)
    }
}