import {call, put, all, takeLatest } from 'redux-saga/effects';

import {
  LISTAR_PROCESSOS_REQUEST,
  LISTAR_PROCESSOS_SUCCESS,
  LISTAR_PROCESSOS_FAILURE,
  CRIAR_PROCESSOS_REQUEST,
  CRIAR_PROCESSOS_SUCCESS,
  CRIAR_PROCESSOS_FAILURE,
  UPDATE_PROCESSOS_REQUEST,
  UPDATE_PROCESSOS_SUCCESS,
  UPDATE_PROCESSOS_FAILURE,
  DELETE_PROCESSOS_REQUEST,
  DELETE_PROCESSOS_SUCCESS,
  DELETE_PROCESSOS_FAILURE,
  SHOW_PROCESSOS_FAILURE,
  SHOW_PROCESSOS_SUCCESS,
  SHOW_PROCESSOS_REQUEST,
} from './actions';

import api from '../../../services/api';


function* listarProcessos(action) {
  try {
    const response = yield call(() => api.get(`/processos/${action.payload.page}/${action.payload.ativo}`));
    const processo = response.data;
    yield put({ type: LISTAR_PROCESSOS_SUCCESS, payload: processo});
  } catch (error) {
    yield put({ type: LISTAR_PROCESSOS_FAILURE, payload: error.message });
  }
}

function* showProcessos(action) {
  try {
    const response = yield call(() => api.get(`/processos/${action.payload}`));
    const processo = response.data;
    yield put({ type: SHOW_PROCESSOS_SUCCESS, payload: processo });
  } catch (error) {
    yield put({ type: SHOW_PROCESSOS_FAILURE, payload: error.message });
  }
}
// add empresa

function* criarProcessos(action) {
  try {
    const response = yield call(() => api.post('/processos', action.payload.processo));
    const processo = response.data;
    yield put({ type: CRIAR_PROCESSOS_SUCCESS, payload: processo });
  } catch (error) {
    yield put({ type: CRIAR_PROCESSOS_FAILURE, payload: error.message });
  }
}

// update empresa

function* updateProcessos(action) {
  try {
    console.log(action.payload);
    const response = yield call(() => api.put(`/processos/${action.payload.id}`, action.payload.processo));
    const processo = response.data;
    yield put({ type: UPDATE_PROCESSOS_SUCCESS, payload: processo });
  } catch (error) {
    yield put({ type: UPDATE_PROCESSOS_FAILURE, payload: error.message });
  }
}

function* deleteProcessos(action) {
  try {
    yield call(() => api.delete(`/processos/${action.payload}`));
    yield put({ type: DELETE_PROCESSOS_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_PROCESSOS_FAILURE, payload: error.message });
  }
}


export default all([
  takeLatest(DELETE_PROCESSOS_REQUEST, deleteProcessos),
  takeLatest(UPDATE_PROCESSOS_REQUEST, updateProcessos),
  takeLatest(CRIAR_PROCESSOS_REQUEST, criarProcessos),
  takeLatest(SHOW_PROCESSOS_REQUEST, showProcessos),
  takeLatest(LISTAR_PROCESSOS_REQUEST, listarProcessos),
])
