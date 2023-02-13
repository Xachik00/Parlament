import { Dispatch } from "@reduxjs/toolkit";
import axios from "../../axios";
import {  fetchingCal, fetchSuccessCal, fetchErrorCal } from "../slice/CalendarSlice";

export const fetchCalendar = ()=>{
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetchingCal());
            const Token=localStorage.getItem('token');
            if(Token){
                const response =await axios.get('timestamp/getAllDate');
                dispatch(fetchSuccessCal(response.data));
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