import axios from "axios"
import env from "react-dotenv"
const token=localStorage.getItem('token')
console.log(token,'token');


export default token?axios.create({
    baseURL: env.BACK_APP_BASE_URL,
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
}):axios.create({
    baseURL: env.BACK_APP_BASE_URL,
})