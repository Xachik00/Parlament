import axios from "axios";


export default axios.create({
    baseURL: 'http://34.125.34.1:3000/api/v1/',
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`}
});