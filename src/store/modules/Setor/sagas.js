import {call, put, all, takeLatest } from 'redux-saga/effects';

import {
  LISTAR_SETORES_REQUEST,
  LISTAR_SETORES_SUCCESS,
  LISTAR_SETORES_FAILURE,
  CRIAR_SETORES_REQUEST,
  CRIAR_SETORES_SUCCESS,
  CRIAR_SETORES_FAILURE,
  UPDATE_SETORES_REQUEST,
  UPDATE_SETORES_SUCCESS,
  UPDATE_SETORES_FAILURE,
  DELETE_SETORES_REQUEST,
  DELETE_SETORES_SUCCESS,
  DELETE_SETORES_FAILURE,
  SHOW_SETORES_FAILURE,
  SHOW_SETORES_SUCCESS,
  SHOW_SETORES_REQUEST,
} from './actions';

import api from '../../../services/api';
import { SHOW_INFORMATION } from '../Information/actions';


function* listarSetores(action) {
  try {
    const response = yield call(() => api.get(`/setores/${action.payload.page}/${action.payload.ativo}`));
    const setor = response.data;
    yield put({ type: LISTAR_SETORES_SUCCESS, payload: setor});
  } catch (error) {
    yield put({ type: LISTAR_SETORES_FAILURE, payload: error.message });
  }
}

function* showSetores(action) {
  try {
    const response = yield call(() => api.get(`/setores/${action.payload}`));
    const setor = response.data;
    yield put({ type: SHOW_SETORES_SUCCESS, payload: setor });
  } catch (error) {
    yield put({ type: SHOW_SETORES_FAILURE, payload: error.message });
  }
}
// add empresa

function* criarSetores(action) {
  try {
    const response = yield call(() => api.post('/setores', action.payload.setor));
    const setor = response.data;
    yield put({ type: CRIAR_SETORES_SUCCESS, payload: setor });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'CADASTRO REALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: CRIAR_SETORES_FAILURE, payload: error.message });
  }
}

// update empresa

function* updateSetores(action) {
  try {
    console.log(action.payload);
    const response = yield call(() => api.put(`/setores/${action.payload.id}`, action.payload.setor));
    const setor = response.data;
    yield put({ type: UPDATE_SETORES_SUCCESS, payload: setor });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'ATUALIZAÇÃO REALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: UPDATE_SETORES_FAILURE, payload: error.message });
  }
}

function* deleteSetores(action) {
  try {
    yield call(() => api.delete(`/setores/${action.payload}`));
    yield put({ type: DELETE_SETORES_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_SETORES_FAILURE, payload: error.message });
  }
}


export default all([
  takeLatest(DELETE_SETORES_REQUEST, deleteSetores),
  takeLatest(UPDATE_SETORES_REQUEST, updateSetores),
  takeLatest(CRIAR_SETORES_REQUEST, criarSetores),
  takeLatest(SHOW_SETORES_REQUEST, showSetores),
  takeLatest(LISTAR_SETORES_REQUEST, listarSetores),
])
