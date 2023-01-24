import { Dispatch } from "@reduxjs/toolkit";
import axios from "../../axios";
import {  fetching, fetchSuccess, fetchError } from "../slice/depNumbersSlice";

export const fetchDepNum = () => {
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetching());
            const response =await axios.get('depnum');
            dispatch(fetchSuccess(response.data));
        }
        catch(error){
            dispatch(fetchError(error as Error));
        }

    }
}