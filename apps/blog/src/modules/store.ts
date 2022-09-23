import createSagaMiddleware from 'redux-saga'
import { createWrapper } from 'next-redux-wrapper'

import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './reducers'
import rootSaga from './sagas'

const createStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]

  const store = configureStore({
    reducer: rootReducer,
    middleware: middlewares,
    devTools: true
  })
  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export const wrapper = createWrapper(createStore, { debug: true })
