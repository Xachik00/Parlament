import axios from 'axios';


export default axios.create({
    baseURL: process.env.BASE_URL+'3000/api/v1/auth'
});

export const axiosPrivate = axios.create({
    baseURL: process.env.BASE_URL+'auth',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});