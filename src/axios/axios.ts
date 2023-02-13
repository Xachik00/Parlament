import axios from 'axios';
// import env from 'react-dotenv'
const token=localStorage.getItem('token')
console.log(token);

export default axios.create({
    baseURL: 'http://34.125.34.1:3000/api/v1/'+'auth'
});

export const axiosPrivate = axios.create({
    baseURL: 'http://34.125.34.1:3000/api/v1/',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
