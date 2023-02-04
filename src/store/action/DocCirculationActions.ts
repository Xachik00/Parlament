import { Dispatch } from "@reduxjs/toolkit";
import axios from "../../axios";
import {  fetching_1, fetchSuccess_1,  fetchError_1 } from "../slice/DocCirculationSlice";

export const fetchDocCirculation = ()=>{
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetching_1());
            const response =await axios.get('citizen');
            
            dispatch(fetchSuccess_1(response.data));
        }
        catch(error){
            dispatch(fetchError_1(error as Error));
        }

    }
}