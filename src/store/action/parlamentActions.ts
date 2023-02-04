import { Dispatch } from "@reduxjs/toolkit";
import axios from "../../axios";
import {  fetching, fetchSuccess, fetchError } from "../slice/parlamentSlice";

export const fetchParlament = ()=>{
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetching());
            const response =await axios.get('parlament');
            dispatch(fetchSuccess(response.data));
        }
        catch(error){
            dispatch(fetchError(error as Error));
        }

    }
}