import axios from "axios";
// import useAuth from "../hooks/AdminHooks/useAuth";

// const {auth}:any=useAuth();

export default axios.create({
    baseURL: "http://34.125.34.1:3000/api/v1/",
    headers:{'Authorization': `Bearer  ${localStorage.getItem('token')}`}
});