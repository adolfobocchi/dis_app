import {call, put, all, takeLatest } from 'redux-saga/effects';

import {
  LISTAR_RECURSOS_REQUEST,
  LISTAR_RECURSOS_SUCCESS,
  LISTAR_RECURSOS_FAILURE,
  CRIAR_RECURSOS_REQUEST,
  CRIAR_RECURSOS_SUCCESS,
  CRIAR_RECURSOS_FAILURE,
  UPDATE_RECURSOS_REQUEST,
  UPDATE_RECURSOS_SUCCESS,
  UPDATE_RECURSOS_FAILURE,
  DELETE_RECURSOS_REQUEST,
  DELETE_RECURSOS_SUCCESS,
  DELETE_RECURSOS_FAILURE,
  SHOW_RECURSOS_FAILURE,
  SHOW_RECURSOS_SUCCESS,
  SHOW_RECURSOS_REQUEST,
} from './actions';

import api from '../../../services/api';


function* listarRecursos(action) {
  try {
    const response = yield call(() => api.get(`/recursos/${action.payload.page}/${action.payload.ativo}`));
    const recurso = response.data;
    yield put({ type: LISTAR_RECURSOS_SUCCESS, payload: recurso});
  } catch (error) {
    yield put({ type: LISTAR_RECURSOS_FAILURE, payload: error.message });
  }
}

function* showRecursos(action) {
  try {
    const response = yield call(() => api.get(`/recursos/${action.payload}`));
    const recurso = response.data;
    yield put({ type: SHOW_RECURSOS_SUCCESS, payload: recurso });
  } catch (error) {
    yield put({ type: SHOW_RECURSOS_FAILURE, payload: error.message });
  }
}
// add empresa

function* criarRecursos(action) {
  try {
    const response = yield call(() => api.post('/recursos', action.payload.recurso));
    const recurso = response.data;
    yield put({ type: CRIAR_RECURSOS_SUCCESS, payload: recurso });
  } catch (error) {
    yield put({ type: CRIAR_RECURSOS_FAILURE, payload: error.message });
  }
}

// update empresa

function* updateRecursos(action) {
  try {
    console.log(action.payload);
    const response = yield call(() => api.put(`/recursos/${action.payload.id}`, action.payload.recurso));
    const recurso = response.data;
    yield put({ type: UPDATE_RECURSOS_SUCCESS, payload: recurso });
  } catch (error) {
    yield put({ type: UPDATE_RECURSOS_FAILURE, payload: error.message });
  }
}

function* deleteRecursos(action) {
  try {
    yield call(() => api.delete(`/recursos/${action.payload}`));
    yield put({ type: DELETE_RECURSOS_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_RECURSOS_FAILURE, payload: error.message });
  }
}


export default all([
  takeLatest(DELETE_RECURSOS_REQUEST, deleteRecursos),
  takeLatest(UPDATE_RECURSOS_REQUEST, updateRecursos),
  takeLatest(CRIAR_RECURSOS_REQUEST, criarRecursos),
  takeLatest(SHOW_RECURSOS_REQUEST, showRecursos),
  takeLatest(LISTAR_RECURSOS_REQUEST, listarRecursos),
])
