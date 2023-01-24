import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICommittee } from '../../models/model'

interface CommitteState {
   loading: boolean;
   error:string;
   Committe:ICommittee[]
}

const initialState: CommitteState = {
    loading: false,
    error:"",
    Committe:[],
}

export const CommitteSlice = createSlice({
  name: 'Committe',
  initialState,
  reducers: {
    fetching7(state){
        state.loading = true;
    },
    fetchSuccess7(state,action: PayloadAction<ICommittee[]>){
        state.loading = false;
        state.Committe = action.payload;
        state.error = ''
    },
    fetchError7(state,action: PayloadAction<Error>){
        state.loading = false;
        state.error = action.payload.message
    }
  }
})

export const {  fetching7, fetchSuccess7, fetchError7 } = CommitteSlice.actions


export default CommitteSlice.reducer