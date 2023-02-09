import axios from "axios";
// import useAuth from "../hooks/AdminHooks/useAuth";

// const {auth}:any=useAuth();

export default axios.create({
    baseURL: "http://34.125.34.1:3000/api/v1/",
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer` + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlciI6InNpbW9ueWFuIiwicm9sZSI6ImFkbWluIiwiY3JlYXRlZF9hdCI6IjIwMjMtMDItMDlUMTA6NDY6MTMuNjc2WiIsInVwZGF0ZWRfYXQiOiIyMDIzLTAyLTA5VDEwOjU3OjQ4Ljg0OFoiLCJpYXQiOjE2NzU5NDQ3MjV9.1LQNMVQdhkSbrSt67uZNb8s9eckm1TyjaNv317B-P-Y'}
});