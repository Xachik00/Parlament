import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISuperAdmin } from '../../models/model'

interface SuperAdminState {
   loading: boolean;
   error:string;
   SuperAdmin:ISuperAdmin[]
}

const initialState: SuperAdminState = {
    loading: false,
    error:"",
    SuperAdmin:[],
}

export const SuperAdminSlice = createSlice({
  name: 'SuperAdmin',
  initialState,
  reducers: {
    fetchingSuper(state){
        state.loading = true;
    },
    fetchSuccessSuper(state,action: PayloadAction<ISuperAdmin[]>){
        state.loading = false;
        state.SuperAdmin = action.payload;
        state.error = ''
    },
    fetchErrorSuper(state,action: PayloadAction<Error>){
        state.loading = false;
        state.error = action.payload.message
    }
  }
})

export const {  fetchingSuper, fetchSuccessSuper, fetchErrorSuper } = SuperAdminSlice.actions


export default SuperAdminSlice.reducer