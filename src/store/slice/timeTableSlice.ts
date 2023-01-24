import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITime } from '../../models/model'

interface TimeTableState {
   loading: boolean;
   error:string;
   admission:ITime[],
   citizenAdmission:ITime[]
}

const initialState: TimeTableState = {
    loading: false,
    error:"",
    admission:[],
    citizenAdmission:[]
}

export const timeTableSlice = createSlice({
  name: 'admission',
  initialState,
  reducers: {
    fetching(state){
        state.loading = true;
    },
    fetchSuccess(state,action: PayloadAction<ITime[]>){
        state.loading = false;
        state.admission = action.payload;
        state.error = ''
    },
    fetchSuccess1(state,action: PayloadAction<ITime[]>){
      state.loading = false;
      state.citizenAdmission = action.payload;
      state.error = ''
  },
    fetchError(state,action: PayloadAction<Error>){
        state.loading = false;
        state.error = action.payload.message
    }
  }
})

export const {  fetching, fetchSuccess, fetchSuccess1, fetchError } = timeTableSlice.actions


export default timeTableSlice.reducer