import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICommittees } from '../../models/model'

interface CommitteesState {
   loading: boolean;
   error:string;
   Committees:ICommittees[]
}

const initialState: CommitteesState = {
    loading: false,
    error:"",
    Committees:[],
}

export const CommitteesSlice = createSlice({
  name: 'Committees',
  initialState,
  reducers: {
    fetching_3(state){
        state.loading = true;
    },
    fetchSuccess_3(state,action: PayloadAction<ICommittees[]>){
        state.loading = false;
        state.Committees = action.payload;
        state.error = ''
    },
    fetchError_3(state,action: PayloadAction<Error>){
        state.loading = false;
        state.error = action.payload.message
    }
  }
})

export const {  fetching_3, fetchSuccess_3, fetchError_3 } =CommitteesSlice.actions


export default CommitteesSlice.reducer