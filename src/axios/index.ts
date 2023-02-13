import axios from "axios"
import env from "react-dotenv";
import { useEffect,useState } from "react";

const [token,setToken]=useState<any>(localStorage.getItem('token'));

// useEffect(()=>{
//     setToken(localStorage.getItem('token')) 
// },[localStorage]) 

export default axios.create({
    baseURL: env.BACK_APP_BASE_URL,
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
})