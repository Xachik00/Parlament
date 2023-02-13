import { Dispatch } from "@reduxjs/toolkit";
import axsios from "../../axios/axios";
import {  fetching6, fetchSuccess6, fetchError6 } from "../slice/MpsnumberSlice";
import {  fetching7, fetchSuccess7, fetchError7 } from "../slice/CommitteSlice";
import { fetchError8, fetching8, fetchSuccess8 } from "../slice/FractionSlice";

export const fetchMpsnumber = ()=>{
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetching6());
            const response =await axsios.get('parlament');            
            dispatch(fetchSuccess6(response.data));
        }
        catch(error){
            dispatch(fetchError6(error as Error));
        }

    }
};
export const fetchCommitte = ()=>{
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetching7());
            const response =await axsios.get('committee');
            dispatch(fetchSuccess7(response.data));
        }
        catch(error){
            dispatch(fetchError7(error as Error));
        }

    }
};
export const fetchFraction = ()=>{
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetching8());
            const response =await axsios.get('faction');
            dispatch(fetchSuccess8(response.data));
        }
        catch(error){
            dispatch(fetchError8(error as Error));
        }

    }
}