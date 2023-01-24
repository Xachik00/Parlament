import {  Outlet } from "react-router-dom";
import useAuth from "../../../hooks/AdminHooks/useAuth";
import { HomePage } from "../../../pages/HomePage/HomePage";

const RequireAuth = ({ allowedRoles }:any) => {
    
    const { auth }:any = useAuth();
    
    return (
        auth?.roles?.find((role:any) => allowedRoles?.includes(role))
            ? <Outlet /> : <HomePage/>
            
    );
}

export default RequireAuth;