import { Dispatch } from "@reduxjs/toolkit";
import axios from "../../axios";
import {  fetchingSuper, fetchSuccessSuper, fetchErrorSuper } from "../slice/SuperAdminSlice";

export const fetchTimeTable = () => {
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetchingSuper());
            const response =await axios.get('superAdmin');
            console.log(response.data);
                        
            dispatch(fetchSuccessSuper(response.data));
        }
        catch(error){
            dispatch(fetchErrorSuper(error as Error));
        }

    }
}