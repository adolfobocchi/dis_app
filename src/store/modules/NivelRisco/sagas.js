import {call, put, all, takeLatest } from 'redux-saga/effects';

import {
  LISTAR_NIVELRISCOS_REQUEST,
  LISTAR_NIVELRISCOS_SUCCESS,
  LISTAR_NIVELRISCOS_FAILURE,
  CRIAR_NIVELRISCOS_REQUEST,
  CRIAR_NIVELRISCOS_SUCCESS,
  CRIAR_NIVELRISCOS_FAILURE,
  UPDATE_NIVELRISCOS_REQUEST,
  UPDATE_NIVELRISCOS_SUCCESS,
  UPDATE_NIVELRISCOS_FAILURE,
  DELETE_NIVELRISCOS_REQUEST,
  DELETE_NIVELRISCOS_SUCCESS,
  DELETE_NIVELRISCOS_FAILURE,
  SHOW_NIVELRISCOS_FAILURE,
  SHOW_NIVELRISCOS_SUCCESS,
  SHOW_NIVELRISCOS_REQUEST,
} from './actions';

import api from '../../../services/api';
import { SHOW_INFORMATION } from '../Information/actions';


function* listarNivelriscos(action) {
  try {
    const response = yield call(() => api.get(`/nivelriscos/${action.payload.page}/${action.payload.ativo}`));
    const nivelrisco = response.data;
    yield put({ type: LISTAR_NIVELRISCOS_SUCCESS, payload: nivelrisco});
  } catch (error) {
    yield put({ type: LISTAR_NIVELRISCOS_FAILURE, payload: error.message });
  }
}

function* showNivelriscos(action) {
  try {
    const response = yield call(() => api.get(`/nivelriscos/${action.payload}`));
    const nivelrisco = response.data;
    yield put({ type: SHOW_NIVELRISCOS_SUCCESS, payload: nivelrisco });
  } catch (error) {
    yield put({ type: SHOW_NIVELRISCOS_FAILURE, payload: error.message });
  }
}
// add empresa

function* criarNivelriscos(action) {
  try {
    const response = yield call(() => api.post('/nivelriscos', action.payload.nivelrisco));
    const nivelrisco = response.data;
    yield put({ type: CRIAR_NIVELRISCOS_SUCCESS, payload: nivelrisco });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'CADASTRO REALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: CRIAR_NIVELRISCOS_FAILURE, payload: error.message });
  }
}

// update empresa

function* updateNivelriscos(action) {
  try {
    const response = yield call(() => api.put(`/nivelriscos/${action.payload.id}`, action.payload.nivelrisco));
    const nivelrisco = response.data;
    yield put({ type: UPDATE_NIVELRISCOS_SUCCESS, payload: nivelrisco });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'ATUALIZAÇÃO REALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: UPDATE_NIVELRISCOS_FAILURE, payload: error.message });
  }
}

function* deleteNivelriscos(action) {
  try {
    yield call(() => api.delete(`/nivelriscos/${action.payload}`));
    yield put({ type: DELETE_NIVELRISCOS_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_NIVELRISCOS_FAILURE, payload: error.message });
  }
}


export default all([
  takeLatest(DELETE_NIVELRISCOS_REQUEST, deleteNivelriscos),
  takeLatest(UPDATE_NIVELRISCOS_REQUEST, updateNivelriscos),
  takeLatest(CRIAR_NIVELRISCOS_REQUEST, criarNivelriscos),
  takeLatest(SHOW_NIVELRISCOS_REQUEST, showNivelriscos),
  takeLatest(LISTAR_NIVELRISCOS_REQUEST, listarNivelriscos),
])
