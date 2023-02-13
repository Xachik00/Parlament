import axios from 'axios';
import env from 'react-dotenv'
const token=localStorage.getItem('token')
console.log(token,'token axios');

export default axios.create({
    baseURL: env.BACK_APP_BASE_URL+'auth'
});

export const axiosPrivate = axios.create({
    baseURL: env.BACK_APP_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
