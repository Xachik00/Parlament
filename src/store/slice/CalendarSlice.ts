import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICalendar } from '../../models/model'

interface CalendarState {
   loading: boolean;
   error:string;
   Calendar:ICalendar[]
}

const initialState: CalendarState = {
    loading: false,
    error:"",
    Calendar:[],
}

export const CalendarSlice = createSlice({
  name: 'Calendar',
  initialState,
  reducers: {
    fetchingCal(state){
        state.loading = true;
    },
    fetchSuccessCal(state,action: PayloadAction<ICalendar[]>){
        state.loading = false;
        state.Calendar = action.payload;
        state.error = ''
    },
    fetchErrorCal(state,action: PayloadAction<Error>){
        state.loading = false;
        state.error = action.payload.message
    }
  }
})

export const {  fetchingCal, fetchSuccessCal, fetchErrorCal } =CalendarSlice.actions


export default CalendarSlice.reducer