import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IFraction } from '../../models/model'

interface FractionState {
   loading: boolean;
   error:string;
   Fraction:IFraction[]
}

const initialState: FractionState = {
    loading: false,
    error:"",
    Fraction:[],
}

export const FractionSlice = createSlice({
  name: 'Fraction',
  initialState,
  reducers: {
    fetching8(state){
        state.loading = true;
    },
    fetchSuccess8(state,action: PayloadAction<IFraction[]>){
        state.loading = false;
        state.Fraction = action.payload;
        state.error = ''
    },
    fetchError8(state,action: PayloadAction<Error>){
        state.loading = false;
        state.error = action.payload.message
    }
  }
})

export const {  fetching8, fetchSuccess8, fetchError8 } = FractionSlice.actions


export default FractionSlice.reducer