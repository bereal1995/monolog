import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from "@reduxjs/toolkit";


export interface AppStateType {
  count: any
  data: any
}

const initialState: AppStateType = {
  count: 0,
  data: null
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    getPokemon(state) {},
    loadPokemon(state, action: PayloadAction<{ data: any }>) {
      state.data = action.payload.data
    },
  },
});

export const { getPokemon, loadPokemon } = appSlice.actions;

export default appSlice.reducer;