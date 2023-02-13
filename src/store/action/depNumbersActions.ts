import { Dispatch } from "@reduxjs/toolkit";
import axsios from "../../axios/axios";
import {  fetching, fetchSuccess, fetchError } from "../slice/depNumbersSlice";

export const fetchDepNum = () => {
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetching());
            const response =await axsios.get('units');
            
            dispatch(fetchSuccess(response.data));
        }
        catch(error){
            dispatch(fetchError(error as Error));
        }

    }
}