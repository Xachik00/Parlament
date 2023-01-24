import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IDocCirculation } from '../../models/model'

interface DocCirculationState {
  loading: boolean;
  error: string;
  DocCirculation_1: IDocCirculation[];
  DocCirculation_2: IDocCirculation[];
  DocCirculation_3: IDocCirculation[]
}

const initialState: DocCirculationState = {
  loading: false,
  error: "",
  DocCirculation_1: [],
  DocCirculation_2: [],
  DocCirculation_3: [],
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
      state.DocCirculation_1 = action.payload;
      state.error = ''
    },
    fetchSuccess_11(state, action: PayloadAction<IDocCirculation[]>) {
      state.loading = false;
      state.DocCirculation_2 = action.payload;
      state.error = ''
    },
    fetchSuccess_12(state, action: PayloadAction<IDocCirculation[]>) {
      state.loading = false;
      state.DocCirculation_3 = action.payload;
      state.error = ''
    },
    fetchError_1(state, action: PayloadAction<Error>) {
      state.loading = false;
      state.error = action.payload.message
    }
  }
})

export const { fetching_1, fetchSuccess_1, fetchSuccess_11, fetchSuccess_12, fetchError_1 } = DocCirculationtSlice.actions


export default DocCirculationtSlice.reducer