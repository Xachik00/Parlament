import axios from 'axios';
import env from 'react-dotenv'
const token=localStorage.getItem('token')
console.log(token);

export default axios.create({
    baseURL: env.BACK_APP_BASE_URL+'auth'
});

export const axiosPrivate = axios.create({
    baseURL: env.BACK_APP_BASE_URL+'auth',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
export const axsios = axios.create({
    baseURL: env.BACK_APP_BASE_URL,
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`}
});