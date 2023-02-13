import { Dispatch } from "@reduxjs/toolkit";
import axsios from "../../axios/axios";
import {  fetchingSuper, fetchSuccessSuper, fetchErrorSuper } from "../slice/SuperAdminSlice";

export const fetchSuperAdmin = () => {
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetchingSuper());
            const response =await axsios.get('superAdmin');                        
            dispatch(fetchSuccessSuper(response.data));
        }
        catch(error){
            dispatch(fetchErrorSuper(error as Error));
        }

    }
}