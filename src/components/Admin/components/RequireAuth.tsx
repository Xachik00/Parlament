import {  Outlet } from "react-router-dom";
import useAuth from "../../../hooks/AdminHooks/useAuth";
import { HomePage } from "../../../pages/HomePage/HomePage";

const RequireAuth = ({ allowedRole }:any) => {
    
    const { auth }:any = useAuth();
    console.log(allowedRole);
    
    return (
        auth?.role?.find((role:any) => allowedRole?.includes(role))
            ? <Outlet /> : <HomePage/>
            
    );
}

export default RequireAuth;