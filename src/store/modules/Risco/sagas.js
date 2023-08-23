import {call, put, all, takeLatest } from 'redux-saga/effects';

import {
  LISTAR_RISCOS_REQUEST,
  LISTAR_RISCOS_SUCCESS,
  LISTAR_RISCOS_FAILURE,
  CRIAR_RISCOS_REQUEST,
  CRIAR_RISCOS_SUCCESS,
  CRIAR_RISCOS_FAILURE,
  UPDATE_RISCOS_REQUEST,
  UPDATE_RISCOS_SUCCESS,
  UPDATE_RISCOS_FAILURE,
  DELETE_RISCOS_REQUEST,
  DELETE_RISCOS_SUCCESS,
  DELETE_RISCOS_FAILURE,
  SHOW_RISCOS_FAILURE,
  SHOW_RISCOS_SUCCESS,
  SHOW_RISCOS_REQUEST,
} from './actions';

import api from '../../../services/api';
import { SHOW_INFORMATION } from '../Information/actions';


function* listarRiscos(action) {
  try {
    const response = yield call(() => api.get(`/riscos/${action.payload.page}/${action.payload.ativo}`));
    const risco = response.data;
    yield put({ type: LISTAR_RISCOS_SUCCESS, payload: risco});
  } catch (error) {
    yield put({ type: LISTAR_RISCOS_FAILURE, payload: error.message });
  }
}

function* showRiscos(action) {
  try {
    const response = yield call(() => api.get(`/riscos/${action.payload}`));
    const risco = response.data;
    yield put({ type: SHOW_RISCOS_SUCCESS, payload: risco });
  } catch (error) {
    yield put({ type: SHOW_RISCOS_FAILURE, payload: error.message });
  }
}
// add empresa

function* criarRiscos(action) {
  try {
    const response = yield call(() => api.post('/riscos', action.payload.risco));
    const risco = response.data;
    yield put({ type: CRIAR_RISCOS_SUCCESS, payload: risco });
    yield put({ type:SHOW_INFORMATION, payload: {text: 'RISCO CADASTRADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: CRIAR_RISCOS_FAILURE, payload: error.message });
  }
}

// update empresa

function* updateRiscos(action) {
  try {
    const response = yield call(() => api.put(`/riscos/${action.payload.id}`, action.payload.risco));
    const risco = response.data;
    yield put({ type: UPDATE_RISCOS_SUCCESS, payload: risco });
    yield put({ type:SHOW_INFORMATION, payload: {text: 'RISCO ATUALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: UPDATE_RISCOS_FAILURE, payload: error.message });
  }
}

function* deleteRiscos(action) {
  try {
    yield call(() => api.delete(`/riscos/${action.payload}`));
    yield put({ type: DELETE_RISCOS_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_RISCOS_FAILURE, payload: error.message });
  }
}


export default all([
  takeLatest(DELETE_RISCOS_REQUEST, deleteRiscos),
  takeLatest(UPDATE_RISCOS_REQUEST, updateRiscos),
  takeLatest(CRIAR_RISCOS_REQUEST, criarRiscos),
  takeLatest(SHOW_RISCOS_REQUEST, showRiscos),
  takeLatest(LISTAR_RISCOS_REQUEST, listarRiscos),
])
