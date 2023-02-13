import { Dispatch } from "@reduxjs/toolkit";
import axsios from "../../axios/axios";
import {  fetching, fetchSuccess, fetchError } from "../slice/timeTableSlice";

export const fetchTimeTable = () => {
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetching());
            const response =await axsios.get('acceptability');            
            dispatch(fetchSuccess(response.data));
        }
        catch(error){
            dispatch(fetchError(error as Error));
        }

    }
}