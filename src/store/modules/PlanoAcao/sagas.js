import {call, put, all, takeLatest } from 'redux-saga/effects';

import {
  LISTAR_PLANOSACAO_REQUEST,
  LISTAR_PLANOSACAO_SUCCESS,
  LISTAR_PLANOSACAO_FAILURE,
  CRIAR_PLANOSACAO_REQUEST,
  CRIAR_PLANOSACAO_SUCCESS,
  CRIAR_PLANOSACAO_FAILURE,
  UPDATE_PLANOSACAO_REQUEST,
  UPDATE_PLANOSACAO_SUCCESS,
  UPDATE_PLANOSACAO_FAILURE,
  DELETE_PLANOSACAO_REQUEST,
  DELETE_PLANOSACAO_SUCCESS,
  DELETE_PLANOSACAO_FAILURE,
  SHOW_PLANOSACAO_FAILURE,
  SHOW_PLANOSACAO_SUCCESS,
  SHOW_PLANOSACAO_REQUEST,
} from './actions';

import api from '../../../services/api';

function* listarPlanosAcao(action) {
  try {
    const response = yield call(() => api.get(`/planosAcao/${action.payload.page}/${action.payload.ativo}`));
    const planoAcao = response.data;
    yield put({ type: LISTAR_PLANOSACAO_SUCCESS, payload: planoAcao});
  } catch (error) {
    yield put({ type: LISTAR_PLANOSACAO_FAILURE, payload: error.message });
  }
}

function* showPlanosAcao(action) {
  try {
    const response = yield call(() => api.get(`/planosAcao/${action.payload}`));
    const planoAcao = response.data;
    yield put({ type: SHOW_PLANOSACAO_SUCCESS, payload: planoAcao });
  } catch (error) {
    yield put({ type: SHOW_PLANOSACAO_FAILURE, payload: error.message });
  }
}
// add empresa

function* criarPlanosAcao(action) {
  try {
    const response = yield call(() => api.post('/planosAcao', action.payload.planoAcao));
    const planoAcao = response.data;
    yield put({ type: CRIAR_PLANOSACAO_SUCCESS, payload: planoAcao });
  } catch (error) {
    yield put({ type: CRIAR_PLANOSACAO_FAILURE, payload: error.message });
  }
}

// update empresa

function* updatePlanosAcao(action) {
  try {
    const response = yield call(() => api.put(`/planosAcao/${action.payload.id}`, action.payload.planoAcao));
    const planoAcao = response.data;
    yield put({ type: UPDATE_PLANOSACAO_SUCCESS, payload: planoAcao });
  } catch (error) {
    yield put({ type: UPDATE_PLANOSACAO_FAILURE, payload: error.message });
  }
}

function* deletePlanosAcao(action) {
  try {
    yield call(() => api.delete(`/planosAcao/${action.payload}`));
    yield put({ type: DELETE_PLANOSACAO_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_PLANOSACAO_FAILURE, payload: error.message });
  }
}


export default all([
  takeLatest(DELETE_PLANOSACAO_REQUEST, deletePlanosAcao),
  takeLatest(UPDATE_PLANOSACAO_REQUEST, updatePlanosAcao),
  takeLatest(CRIAR_PLANOSACAO_REQUEST, criarPlanosAcao),
  takeLatest(SHOW_PLANOSACAO_REQUEST, showPlanosAcao),
  takeLatest(LISTAR_PLANOSACAO_REQUEST, listarPlanosAcao),
])
