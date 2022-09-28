import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AppStateType {
  themeMode: string
  data: any
}

const initialState: AppStateType = {
  themeMode: 'light',
  data: null
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setThemeMode (state, action: PayloadAction<{ themeMode: string }>) {
      state.themeMode = action.payload.themeMode
      localStorage.setItem('themeMode', action.payload.themeMode)
    },
    getPokemon (state) {},
    loadPokemon (state, action: PayloadAction<{ data: any }>) {
      state.data = action.payload.data
    }
  }
})

export const { setThemeMode, getPokemon, loadPokemon } = appSlice.actions

export default appSlice.reducer
