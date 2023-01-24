import { Dispatch } from "@reduxjs/toolkit";
import axios from "../../axios";
import {  fetching, fetchSuccess, fetchError, fetchSuccess1 } from "../slice/timeTableSlice";

export const fetchTimeTable = () => {
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetching());
            const response =await axios.get('admission');
            const response1 =await axios.get('citizenAdmission');
            dispatch(fetchSuccess(response.data));
            dispatch(fetchSuccess1(response1.data));
        }
        catch(error){
            dispatch(fetchError(error as Error));
        }

    }
}