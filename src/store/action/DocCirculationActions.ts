import { Dispatch } from "@reduxjs/toolkit";
import axios from "../../axios";
import {  fetching_1, fetchSuccess_1, fetchSuccess_11, fetchSuccess_12, fetchError_1 } from "../slice/DocCirculationSlice";

export const fetchDocCirculation = ()=>{
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetching_1());
            const response =await axios.get('DocCirculation_1');
            const response1 =await axios.get('DocCirculation_2');
            const response2 =await axios.get('DocCirculation_3');
            
            dispatch(fetchSuccess_1(response.data));
            dispatch(fetchSuccess_11(response1.data));
            dispatch(fetchSuccess_12(response2.data));
        }
        catch(error){
            dispatch(fetchError_1(error as Error));
        }

    }
}