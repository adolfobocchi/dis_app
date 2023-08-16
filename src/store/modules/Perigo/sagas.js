import {call, put, all, takeLatest } from 'redux-saga/effects';

import {
  LISTAR_PERIGOS_REQUEST,
  LISTAR_PERIGOS_SUCCESS,
  LISTAR_PERIGOS_FAILURE,
  CRIAR_PERIGOS_REQUEST,
  CRIAR_PERIGOS_SUCCESS,
  CRIAR_PERIGOS_FAILURE,
  UPDATE_PERIGOS_REQUEST,
  UPDATE_PERIGOS_SUCCESS,
  UPDATE_PERIGOS_FAILURE,
  DELETE_PERIGOS_REQUEST,
  DELETE_PERIGOS_SUCCESS,
  DELETE_PERIGOS_FAILURE,
  SHOW_PERIGOS_FAILURE,
  SHOW_PERIGOS_SUCCESS,
  SHOW_PERIGOS_REQUEST,
} from './actions';

import api from '../../../services/api';


function* listarPerigos(action) {
  try {
    const response = yield call(() => api.get(`/perigos/${action.payload.page}/${action.payload.ativo}`));
    const perigo = response.data;
    yield put({ type: LISTAR_PERIGOS_SUCCESS, payload: perigo});
  } catch (error) {
    yield put({ type: LISTAR_PERIGOS_FAILURE, payload: error.message });
  }
}

function* showPerigos(action) {
  try {
    const response = yield call(() => api.get(`/perigos/${action.payload}`));
    const perigo = response.data;
    yield put({ type: SHOW_PERIGOS_SUCCESS, payload: perigo });
  } catch (error) {
    yield put({ type: SHOW_PERIGOS_FAILURE, payload: error.message });
  }
}
// add empresa

function* criarPerigos(action) {
  try {
    const response = yield call(() => api.post('/perigos', action.payload.perigo));
    const perigo = response.data;
    yield put({ type: CRIAR_PERIGOS_SUCCESS, payload: perigo });
  } catch (error) {
    yield put({ type: CRIAR_PERIGOS_FAILURE, payload: error.message });
  }
}

// update empresa

function* updatePerigos(action) {
  try {
    console.log(action.payload);
    const response = yield call(() => api.put(`/perigos/${action.payload.id}`, action.payload.perigo));
    const perigo = response.data;
    yield put({ type: UPDATE_PERIGOS_SUCCESS, payload: perigo });
  } catch (error) {
    yield put({ type: UPDATE_PERIGOS_FAILURE, payload: error.message });
  }
}

function* deletePerigos(action) {
  try {
    yield call(() => api.delete(`/perigos/${action.payload}`));
    yield put({ type: DELETE_PERIGOS_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_PERIGOS_FAILURE, payload: error.message });
  }
}


export default all([
  takeLatest(DELETE_PERIGOS_REQUEST, deletePerigos),
  takeLatest(UPDATE_PERIGOS_REQUEST, updatePerigos),
  takeLatest(CRIAR_PERIGOS_REQUEST, criarPerigos),
  takeLatest(SHOW_PERIGOS_REQUEST, showPerigos),
  takeLatest(LISTAR_PERIGOS_REQUEST, listarPerigos),
])
