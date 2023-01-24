import { Dispatch } from "@reduxjs/toolkit";
import axios from "../../axios";
import {  fetchingCal, fetchSuccessCal, fetchErrorCal } from "../slice/CalendarSlice";

export const fetchCalendar = ()=>{
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetchingCal());
            const response =await axios.get('Calendar');
            dispatch(fetchSuccessCal(response.data));
        }
        catch(error){
            dispatch(fetchErrorCal(error as Error));
        }

    }
}