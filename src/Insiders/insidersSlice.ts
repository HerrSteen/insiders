import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { Insider, InsiderState } from './InsiderTypes';

const initialState: InsiderState = {}

export const insidersSlice = createSlice({
  name: 'insiders',
  initialState,
  reducers: {
    updateInsiders: (state, action) => {
      console.log(action.payload)
      state.insiders = action.payload
    }
  }
})

export const { updateInsiders } = insidersSlice.actions
export const selectInsiders = (state: RootState): Insider[] => state.insiders.insiders!
export default insidersSlice.reducer
