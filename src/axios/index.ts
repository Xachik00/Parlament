import axios from "axios"
import env from "react-dotenv";


const token=localStorage.getItem('token')

export default axios.create({
    baseURL: env.BACK_APP_BASE_URL,
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
})