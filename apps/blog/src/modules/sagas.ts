import { all, call } from 'redux-saga/effects'

import appSaga from './app/saga'

export default function * rootSaga () {
  yield all([
    call(appSaga)
  ])
}
