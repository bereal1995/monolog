import { combineReducers } from '@reduxjs/toolkit'
import type { AnyAction, CombinedState } from '@reduxjs/toolkit'

import AppReducer, { AppStateType } from '@/modules/app/reducer'

type ReducerState = {
  app: AppStateType
}

const rootReducer = (state: any, action: AnyAction): CombinedState<ReducerState> =>
  combineReducers({
    app: AppReducer,
  })(state, action)

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
