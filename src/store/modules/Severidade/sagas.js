import {call, put, all, takeLatest } from 'redux-saga/effects';

import {
  LISTAR_SEVERIDADES_REQUEST,
  LISTAR_SEVERIDADES_SUCCESS,
  LISTAR_SEVERIDADES_FAILURE,
  CRIAR_SEVERIDADES_REQUEST,
  CRIAR_SEVERIDADES_SUCCESS,
  CRIAR_SEVERIDADES_FAILURE,
  UPDATE_SEVERIDADES_REQUEST,
  UPDATE_SEVERIDADES_SUCCESS,
  UPDATE_SEVERIDADES_FAILURE,
  DELETE_SEVERIDADES_REQUEST,
  DELETE_SEVERIDADES_SUCCESS,
  DELETE_SEVERIDADES_FAILURE,
  SHOW_SEVERIDADES_FAILURE,
  SHOW_SEVERIDADES_SUCCESS,
  SHOW_SEVERIDADES_REQUEST,
} from './actions';

import api from '../../../services/api';


function* listarSeveridades(action) {
  try {
    const response = yield call(() => api.get(`/severidades/${action.payload.page}/${action.payload.ativo}`));
    const severidade = response.data;
    yield put({ type: LISTAR_SEVERIDADES_SUCCESS, payload: severidade});
  } catch (error) {
    yield put({ type: LISTAR_SEVERIDADES_FAILURE, payload: error.message });
  }
}

function* showSeveridades(action) {
  try {
    const response = yield call(() => api.get(`/severidades/${action.payload}`));
    const severidade = response.data;
    yield put({ type: SHOW_SEVERIDADES_SUCCESS, payload: severidade });
  } catch (error) {
    yield put({ type: SHOW_SEVERIDADES_FAILURE, payload: error.message });
  }
}
// add empresa

function* criarSeveridades(action) {
  try {
    const response = yield call(() => api.post('/severidades', action.payload.severidade));
    const severidade = response.data;
    yield put({ type: CRIAR_SEVERIDADES_SUCCESS, payload: severidade });
  } catch (error) {
    yield put({ type: CRIAR_SEVERIDADES_FAILURE, payload: error.message });
  }
}

// update empresa

function* updateSeveridades(action) {
  try {
    const response = yield call(() => api.put(`/severidades/${action.payload.id}`, action.payload.severidade));
    const severidade = response.data;
    yield put({ type: UPDATE_SEVERIDADES_SUCCESS, payload: severidade });
  } catch (error) {
    yield put({ type: UPDATE_SEVERIDADES_FAILURE, payload: error.message });
  }
}

function* deleteSeveridades(action) {
  try {
    yield call(() => api.delete(`/severidades/${action.payload}`));
    yield put({ type: DELETE_SEVERIDADES_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_SEVERIDADES_FAILURE, payload: error.message });
  }
}


export default all([
  takeLatest(DELETE_SEVERIDADES_REQUEST, deleteSeveridades),
  takeLatest(UPDATE_SEVERIDADES_REQUEST, updateSeveridades),
  takeLatest(CRIAR_SEVERIDADES_REQUEST, criarSeveridades),
  takeLatest(SHOW_SEVERIDADES_REQUEST, showSeveridades),
  takeLatest(LISTAR_SEVERIDADES_REQUEST, listarSeveridades),
])
