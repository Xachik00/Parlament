import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IDocCirculation } from '../../models/model'

interface DocCirculationState {
  loading: boolean;
  error: string;
  DocCirculation: IDocCirculation[]
}

const initialState: DocCirculationState = {
  loading: false,
  error: "",
  DocCirculation: [],
}

export const DocCirculationtSlice = createSlice({
  name: 'DocCirculation',
  initialState,
  reducers: {
    fetching_1(state) {
      state.loading = true;
    },
    fetchSuccess_1(state, action: PayloadAction<IDocCirculation[]>) {
      state.loading = false;
      state.DocCirculation = action.payload;
      state.error = ''
    },
    fetchError_1(state, action: PayloadAction<Error>) {
      state.loading = false;
      state.error = action.payload.message
    }
  }
})

export const { fetching_1, fetchSuccess_1, fetchError_1 } = DocCirculationtSlice.actions


export default DocCirculationtSlice.reducer