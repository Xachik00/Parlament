import { Dispatch } from "@reduxjs/toolkit";
import axios from "../../axios";
import {  fetching, fetchSuccess, fetchError } from "../slice/timeTableSlice";

export const fetchTimeTable = () => {
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetching());
            const response =await axios.get('acceptability');            
            dispatch(fetchSuccess(response.data));
        }
        catch(error){
            dispatch(fetchError(error as Error));
        }

    }
}