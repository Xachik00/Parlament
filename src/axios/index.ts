import axios from "axios";


export default axios.create({
    baseURL: process.env.BASE_URL+'api/v1/',
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`}
});