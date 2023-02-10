import axios from 'axios';
import env from 'react-dotenv'

export default axios.create({
    baseURL: env.BACK_APP_BASE_URL+'api/v1/auth'
});

export const axiosPrivate = axios.create({
    baseURL: process.env.BASE_URL+'api/v1/auth',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});