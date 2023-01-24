import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IDepnumbers } from '../../models/model'

interface DepNumbersState {
   loading: boolean;
   error:string;
   depnum:IDepnumbers[]
}

const initialState: DepNumbersState = {
    loading: false,
    error:"",
    depnum:[]
}

export const depNumberSlice = createSlice({
  name: 'depnum',
  initialState,
  reducers: {
    fetching(state){
        state.loading = true;
    },
    fetchSuccess(state,action: PayloadAction<IDepnumbers[]>){
        state.loading = false;
        state.depnum = action.payload;
        state.error = ''
    },
    fetchError(state,action: PayloadAction<Error>){
        state.loading = false;
        state.error = action.payload.message
    }
  }
})

export const {  fetching, fetchSuccess, fetchError } = depNumberSlice.actions


export default depNumberSlice.reducer