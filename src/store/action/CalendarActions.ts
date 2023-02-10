import { Dispatch } from "@reduxjs/toolkit";
import axios from "../../axios";
import {  fetchingCal, fetchSuccessCal, fetchErrorCal } from "../slice/CalendarSlice";
import useAuth from "../../hooks/AdminHooks/useAuth";

export const fetchCalendar = ()=>{
    return async (dispatch:Dispatch)=>{
        try{
            const {auth}:any=useAuth();
            dispatch(fetchingCal());
            if(auth?.accessToken){
                const response =await axios.get('timestamp/getAllDate');
            dispatch(fetchSuccessCal(response.data))
            }else{
            const response =await axios.get('timestamp');
            dispatch(fetchSuccessCal(response.data));
            }
        }
        catch(error){
            dispatch(fetchErrorCal(error as Error));
        }

    }
}