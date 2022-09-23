import createSagaMiddleware from 'redux-saga'
import { createWrapper } from 'next-redux-wrapper'

import rootReducer from './reducers'
import rootSaga from './sagas'
import { configureStore } from '@reduxjs/toolkit';


const createStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  const store = configureStore({
    reducer: rootReducer,
    middleware: middlewares,
    devTools: true,
  });
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};


export const wrapper = createWrapper(createStore, { debug: true })
