import { Dispatch } from "@reduxjs/toolkit";
import axsios from "../../axios/axios";
import {  fetching_3, fetchSuccess_3, fetchError_3 } from "../slice/CommitteesSlice";

export const fetchCommittees = ()=>{
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetching_3());
            const response =await axsios.get('meets');
            dispatch(fetchSuccess_3(response.data));
            
        }
        catch(error){
            dispatch(fetchError_3(error as Error));
        }

    }
}