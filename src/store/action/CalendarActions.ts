import { Dispatch } from "@reduxjs/toolkit";
import axsios from "../../axios/axios";
import {  fetchingCal, fetchSuccessCal, fetchErrorCal } from "../slice/CalendarSlice";

export const fetchCalendar = ()=>{
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetchingCal());
            const Token=localStorage.getItem('token');
            if(Token){
                const response =await axsios.get( 'timestamp/getAllDate');
                dispatch(fetchSuccessCal(response.data));
            }else{
                const response =await axsios.get('timestamp');
                dispatch(fetchSuccessCal(response.data));
            }
        }

        catch(error){
            dispatch(fetchErrorCal(error as Error));
        }

    }
}