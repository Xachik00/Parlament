import axios from 'axios';

const BASE_URL = 'http://34.125.34.1:3000/api/v1/auth';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});