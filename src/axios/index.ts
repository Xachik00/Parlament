import axios from "axios"
import env from "react-dotenv"
const token=localStorage.getItem('token')
console.log(token,'token');
const envv=process.env
console.log(envv,'env');



export default axios.create({
    baseURL: 'http://34.125.34.1:3000/api/v1/',
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
})