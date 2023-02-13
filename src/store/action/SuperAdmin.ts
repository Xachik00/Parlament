import { Dispatch } from "@reduxjs/toolkit";
import axios from "../../axios";
import {  fetchingSuper, fetchSuccessSuper, fetchErrorSuper } from "../slice/SuperAdminSlice";

export const fetchSuperAdmin = () => {
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetchingSuper());
            const response =await axios.get('superAdmin');                        
            dispatch(fetchSuccessSuper(response.data));
        }
        catch(error){
            dispatch(fetchErrorSuper(error as Error));
        }

    }
}