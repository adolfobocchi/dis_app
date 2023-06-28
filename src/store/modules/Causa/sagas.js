import {call, put, all, takeLatest } from 'redux-saga/effects';

import {
  LISTAR_CAUSAS_REQUEST,
  LISTAR_CAUSAS_SUCCESS,
  LISTAR_CAUSAS_FAILURE,
  CRIAR_CAUSAS_REQUEST,
  CRIAR_CAUSAS_SUCCESS,
  CRIAR_CAUSAS_FAILURE,
  UPDATE_CAUSAS_REQUEST,
  UPDATE_CAUSAS_SUCCESS,
  UPDATE_CAUSAS_FAILURE,
  DELETE_CAUSAS_REQUEST,
  DELETE_CAUSAS_SUCCESS,
  DELETE_CAUSAS_FAILURE,
  SHOW_CAUSAS_FAILURE,
  SHOW_CAUSAS_SUCCESS,
  SHOW_CAUSAS_REQUEST,
} from './actions';

import api from '../../../services/api';


function* listarCausas(action) {
  try {
    const response = yield call(() => api.get(`/causas/${action.payload.page}/${action.payload.ativo}`));
    const causa = response.data;
    yield put({ type: LISTAR_CAUSAS_SUCCESS, payload: causa});
  } catch (error) {
    yield put({ type: LISTAR_CAUSAS_FAILURE, payload: error.message });
  }
}

function* showCausas(action) {
  try {
    const response = yield call(() => api.get(`/causas/${action.payload}`));
    const causa = response.data;
    yield put({ type: SHOW_CAUSAS_SUCCESS, payload: causa });
  } catch (error) {
    yield put({ type: SHOW_CAUSAS_FAILURE, payload: error.message });
  }
}
// add empresa

function* criarCausas(action) {
  try {
    const response = yield call(() => api.post('/causas', action.payload.causa));
    const causa = response.data;
    yield put({ type: CRIAR_CAUSAS_SUCCESS, payload: causa });
  } catch (error) {
    yield put({ type: CRIAR_CAUSAS_FAILURE, payload: error.message });
  }
}

// update empresa

function* updateCausas(action) {
  try {
    const response = yield call(() => api.put(`/causas/${action.payload.id}`, action.payload.causa));
    const causa = response.data;
    yield put({ type: UPDATE_CAUSAS_SUCCESS, payload: causa });
  } catch (error) {
    yield put({ type: UPDATE_CAUSAS_FAILURE, payload: error.message });
  }
}

function* deleteCausas(action) {
  try {
    yield call(() => api.delete(`/causas/${action.payload}`));
    yield put({ type: DELETE_CAUSAS_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_CAUSAS_FAILURE, payload: error.message });
  }
}


export default all([
  takeLatest(DELETE_CAUSAS_REQUEST, deleteCausas),
  takeLatest(UPDATE_CAUSAS_REQUEST, updateCausas),
  takeLatest(CRIAR_CAUSAS_REQUEST, criarCausas),
  takeLatest(SHOW_CAUSAS_REQUEST, showCausas),
  takeLatest(LISTAR_CAUSAS_REQUEST, listarCausas),
])
