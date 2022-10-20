import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../reducers'

export interface AppStateType {
  themeMode: 'light' | 'dark'
  data: any
}

const initialState: AppStateType = {
  themeMode: 'light',
  data: null,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setThemeMode(state, action: PayloadAction<{ themeMode: AppStateType['themeMode'] }>) {
      state.themeMode = action.payload.themeMode
      localStorage.setItem('themeMode', action.payload.themeMode)
    },
    getPokemon(state) {},
    loadPokemon(state, action: PayloadAction<{ data: any }>) {
      state.data = action.payload.data
    },
  },
})

export const { setThemeMode, getPokemon, loadPokemon } = appSlice.actions

export const appSelector = {
  root: (state: RootState) => state.app,
  themeMode: (state: RootState) => state.app.themeMode,
}

export default appSlice.reducer
