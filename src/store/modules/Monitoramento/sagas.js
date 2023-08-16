import {call, put, all, takeLatest } from 'redux-saga/effects';

import {
  LISTAR_MONITORAMENTOS_REQUEST,
  LISTAR_MONITORAMENTOS_SUCCESS,
  LISTAR_MONITORAMENTOS_FAILURE,
  CRIAR_MONITORAMENTOS_REQUEST,
  CRIAR_MONITORAMENTOS_SUCCESS,
  CRIAR_MONITORAMENTOS_FAILURE,
  UPDATE_MONITORAMENTOS_REQUEST,
  UPDATE_MONITORAMENTOS_SUCCESS,
  UPDATE_MONITORAMENTOS_FAILURE,
  DELETE_MONITORAMENTOS_REQUEST,
  DELETE_MONITORAMENTOS_SUCCESS,
  DELETE_MONITORAMENTOS_FAILURE,
  SHOW_MONITORAMENTOS_FAILURE,
  SHOW_MONITORAMENTOS_SUCCESS,
  SHOW_MONITORAMENTOS_REQUEST,
} from './actions';

import api from '../../../services/api';


function* listarMonitoramentos(action) {
  try {
    const response = yield call(() => api.get(`/monitoramentos/${action.payload.page}/${action.payload.ativo}`));
    const monitoramentos = response.data;
    yield put({ type: LISTAR_MONITORAMENTOS_SUCCESS, payload: monitoramentos});
  } catch (error) {
    yield put({ type: LISTAR_MONITORAMENTOS_FAILURE, payload: error.message });
  }
}

function* showMonitoramentos(action) {
  try {
    const response = yield call(() => api.get(`/monitoramentos/${action.payload}`));
    const monitoramentos = response.data;
    yield put({ type: SHOW_MONITORAMENTOS_SUCCESS, payload: monitoramentos });
  } catch (error) {
    yield put({ type: SHOW_MONITORAMENTOS_FAILURE, payload: error.message });
  }
}
// add empresa

function* criarMonitoramentos(action) {
  try {
    const response = yield call(() => api.post('/monitoramentos', action.payload.monitoramentos));
    const monitoramentos = response.data;
    yield put({ type: CRIAR_MONITORAMENTOS_SUCCESS, payload: monitoramentos });
  } catch (error) {
    yield put({ type: CRIAR_MONITORAMENTOS_FAILURE, payload: error.message });
  }
}

// update empresa

function* updateMonitoramentos(action) {
  try {
    console.log(action.payload);
    const response = yield call(() => api.put(`/monitoramentos/${action.payload.id}`, action.payload.monitoramentos));
    const monitoramentos = response.data;
    yield put({ type: UPDATE_MONITORAMENTOS_SUCCESS, payload: monitoramentos });
  } catch (error) {
    yield put({ type: UPDATE_MONITORAMENTOS_FAILURE, payload: error.message });
  }
}

function* deleteMonitoramentos(action) {
  try {
    yield call(() => api.delete(`/monitoramentos/${action.payload}`));
    yield put({ type: DELETE_MONITORAMENTOS_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_MONITORAMENTOS_FAILURE, payload: error.message });
  }
}


export default all([
  takeLatest(DELETE_MONITORAMENTOS_REQUEST, deleteMonitoramentos),
  takeLatest(UPDATE_MONITORAMENTOS_REQUEST, updateMonitoramentos),
  takeLatest(CRIAR_MONITORAMENTOS_REQUEST, criarMonitoramentos),
  takeLatest(SHOW_MONITORAMENTOS_REQUEST, showMonitoramentos),
  takeLatest(LISTAR_MONITORAMENTOS_REQUEST, listarMonitoramentos),
])
