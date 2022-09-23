import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import type { AnyAction, CombinedState } from "@reduxjs/toolkit";

import AppReducer, { AppStateType } from "@/modules/app/reducer";

type ReducerState = {
  app: AppStateType;
};

const rootReducer = (state: any, action: AnyAction): CombinedState<ReducerState> => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return combineReducers({
        app: AppReducer,
      })(state, action);
  }
};

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>