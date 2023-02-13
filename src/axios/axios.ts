import axios from 'axios';
import env from 'react-dotenv'
const token=localStorage.getItem('token')
console.log(token,'token axios');

export default axios.create({
    baseURL: 'http://10.10.230.11:3000/api/v1/auth'
});

export const axiosPrivate = axios.create({
    baseURL: 'http://10.10.230.11:3000/api/v1/auth',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
