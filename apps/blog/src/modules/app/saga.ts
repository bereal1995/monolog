import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import { loadPokemon, getPokemon } from '@/modules/app/reducer'

function getPokemonAPI () {
  return axios.get('https://pokeapi.co/api/v2/pokemon/ditto')
}

function * getPokemonSaga () {
  const { data } = yield call(getPokemonAPI)
  yield put(loadPokemon({ data }))
}

export default function * appSaga () {
  yield takeLatest(getPokemon, getPokemonSaga)
}
