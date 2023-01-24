import { configureStore } from '@reduxjs/toolkit';
import parlamentReducer from "./slice/parlamentSlice";
import depNumbersReducer from './slice/depNumbersSlice';
import timeTableReducer from "./slice/timeTableSlice";
import CommitteesReducer from './slice/CommitteesSlice';
import CommittesReducer from './slice/CommitteSlice';
import FractionReducer from './slice/FractionSlice'
import DocCirculationReducer from './slice/DocCirculationSlice';
import MpsnumberReducer from './slice/MpsnumberSlice';
import CalendarReducer from './slice/CalendarSlice';

export const store = configureStore({
  reducer: {
    parlament: parlamentReducer,
    telNumbers: depNumbersReducer,
    admission: timeTableReducer,
    Committees:CommitteesReducer,
    Committes:CommittesReducer,
    Fraction:FractionReducer,
    DocCirculation:DocCirculationReducer,
    Mpsnumber:MpsnumberReducer,
    Calendar:CalendarReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch