import { Dispatch } from "@reduxjs/toolkit";
import axios from "../../axios";
import {  fetching_3, fetchSuccess_3, fetchError_3 } from "../slice/CommitteesSlice";

export const fetchCommittees = ()=>{
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetching_3());
            const response =await axios.get('Committees');
            dispatch(fetchSuccess_3(response.data));
        }
        catch(error){
            dispatch(fetchError_3(error as Error));
        }

    }
}