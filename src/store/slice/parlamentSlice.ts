import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IParlament } from '../../models/model'

interface ParlamentState {
   loading: boolean;
   error:string;
   parlament:IParlament[]
}

const initialState: ParlamentState = {
    loading: false,
    error:"",
    parlament:[],
}

export const parlamentSlice = createSlice({
  name: 'parlament',
  initialState,
  reducers: {
    fetching(state){
        state.loading = true;
    },
    fetchSuccess(state,action: PayloadAction<IParlament[]>){
        state.loading = false;
        state.parlament = action.payload;
        state.error = ''
    },
    fetchError(state,action: PayloadAction<Error>){
        state.loading = false;
        state.error = action.payload.message
    }
  }
})

export const {  fetching, fetchSuccess, fetchError } = parlamentSlice.actions


export default parlamentSlice.reducer