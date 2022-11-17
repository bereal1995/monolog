import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../reducers'

export interface AppStateType {
  themeMode: 'light' | 'dark' | 'default'
  systemThemeMode: 'light' | 'dark' | 'not-ready'
  data: any
}

const initialState: AppStateType = {
  themeMode: 'default',
  systemThemeMode: 'not-ready',
  data: null,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    enableDarkMode(state) {
      state.themeMode = 'dark'
    },
    enableLightMode(state) {
      state.themeMode = 'light'
    },
    setSystemTheme(state, action: PayloadAction<'dark' | 'light'>) {
      state.systemThemeMode = action.payload
      // localStorage.setItem('themeMode', action.payload.themeMode)
    },
    getPokemon(state) {},
    loadPokemon(state, action: PayloadAction<{ data: any }>) {
      state.data = action.payload.data
    },
  },
})

export const { enableDarkMode, enableLightMode, setSystemTheme, getPokemon, loadPokemon } = appSlice.actions

export const appSelector = {
  root: (state: RootState) => state.app,
  themeMode: (state: RootState) => state.app.themeMode,
  systemThemeMode: (state: RootState) => state.app.systemThemeMode,
}

export default appSlice.reducer
