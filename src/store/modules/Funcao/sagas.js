import {call, put, all, takeLatest } from 'redux-saga/effects';

import {
  LISTAR_FUNCOES_REQUEST,
  LISTAR_FUNCOES_SUCCESS,
  LISTAR_FUNCOES_FAILURE,
  CRIAR_FUNCOES_REQUEST,
  CRIAR_FUNCOES_SUCCESS,
  CRIAR_FUNCOES_FAILURE,
  UPDATE_FUNCOES_REQUEST,
  UPDATE_FUNCOES_SUCCESS,
  UPDATE_FUNCOES_FAILURE,
  DELETE_FUNCOES_REQUEST,
  DELETE_FUNCOES_SUCCESS,
  DELETE_FUNCOES_FAILURE,
  SHOW_FUNCOES_FAILURE,
  SHOW_FUNCOES_SUCCESS,
  SHOW_FUNCOES_REQUEST,
} from './actions';

import api from '../../../services/api';
import { SHOW_INFORMATION } from '../Information/actions';


function* listarFuncoes(action) {
  try {
    const response = yield call(() => api.get(`/funcoes/${action.payload.page}/${action.payload.ativo}`));
    const funcao = response.data;
    yield put({ type: LISTAR_FUNCOES_SUCCESS, payload: funcao});
  } catch (error) {
    yield put({ type: LISTAR_FUNCOES_FAILURE, payload: error.message });
  }
}

function* showFuncoes(action) {
  try {
    const response = yield call(() => api.get(`/funcoes/${action.payload}`));
    const funcao = response.data;
    yield put({ type: SHOW_FUNCOES_SUCCESS, payload: funcao });
  } catch (error) {
    yield put({ type: SHOW_FUNCOES_FAILURE, payload: error.message });
  }
}
// add empresa

function* criarFuncoes(action) {
  try {
    const response = yield call(() => api.post('/funcoes', action.payload.funcao));
    const funcao = response.data;
    yield put({ type: CRIAR_FUNCOES_SUCCESS, payload: funcao });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'CADASTRO REALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: CRIAR_FUNCOES_FAILURE, payload: error.message });
  }
}

// update empresa

function* updateFuncoes(action) {
  try {
    console.log(action.payload);
    const response = yield call(() => api.put(`/funcoes/${action.payload.id}`, action.payload.funcao));
    const funcao = response.data;
    yield put({ type: UPDATE_FUNCOES_SUCCESS, payload: funcao });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'ATUALIZAÇÃO REALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: UPDATE_FUNCOES_FAILURE, payload: error.message });
  }
}

function* deleteFuncoes(action) {
  try {
    yield call(() => api.delete(`/funcoes/${action.payload}`));
    yield put({ type: DELETE_FUNCOES_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_FUNCOES_FAILURE, payload: error.message });
  }
}


export default all([
  takeLatest(DELETE_FUNCOES_REQUEST, deleteFuncoes),
  takeLatest(UPDATE_FUNCOES_REQUEST, updateFuncoes),
  takeLatest(CRIAR_FUNCOES_REQUEST, criarFuncoes),
  takeLatest(SHOW_FUNCOES_REQUEST, showFuncoes),
  takeLatest(LISTAR_FUNCOES_REQUEST, listarFuncoes),
])
