import axios from "axios";
import env from "react-dotenv";

export default axios.create({
    baseURL: env.BACK_APP_BASE_URL+'api/v1/',
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`}
});