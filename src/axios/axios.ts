import axios from 'axios';


export default axios.create({
    baseURL: 'http://34.125.34.1:3000/api/v1/auth'
});

export const axiosPrivate = axios.create({
    baseURL: 'http://34.125.34.1:3000/api/v1/auth',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});