import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMPs } from '../../models/model'

interface MPsState {
   loading: boolean;
   error:string;
   MPs:IMPs[]
}

const initialState: MPsState = {
    loading: false,
    error:"",
    MPs:[],
}

export const MpsnumberSlice = createSlice({
  name: 'MPs',
  initialState,
  reducers: {
    fetching6(state){
        state.loading = true;
    },
    fetchSuccess6(state,action: PayloadAction<IMPs[]>){
        state.loading = false;
        state.MPs = action.payload;
        state.error = ''
    },
    fetchError6(state,action: PayloadAction<Error>){
        state.loading = false;
        state.error = action.payload.message
    }
  }
})

export const {  fetching6, fetchSuccess6, fetchError6 } = MpsnumberSlice.actions


export default MpsnumberSlice.reducer