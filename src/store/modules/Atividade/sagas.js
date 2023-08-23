import {call, put, all, takeLatest } from 'redux-saga/effects';

import {
  LISTAR_ATIVIDADES_REQUEST,
  LISTAR_ATIVIDADES_SUCCESS,
  LISTAR_ATIVIDADES_FAILURE,
  CRIAR_ATIVIDADES_REQUEST,
  CRIAR_ATIVIDADES_SUCCESS,
  CRIAR_ATIVIDADES_FAILURE,
  UPDATE_ATIVIDADES_REQUEST,
  UPDATE_ATIVIDADES_SUCCESS,
  UPDATE_ATIVIDADES_FAILURE,
  DELETE_ATIVIDADES_REQUEST,
  DELETE_ATIVIDADES_SUCCESS,
  DELETE_ATIVIDADES_FAILURE,
  SHOW_ATIVIDADES_FAILURE,
  SHOW_ATIVIDADES_SUCCESS,
  SHOW_ATIVIDADES_REQUEST,
} from './actions';

import api from '../../../services/api';
import { SHOW_INFORMATION } from '../Information/actions';


function* listarAtividades(action) {
  try {
    const response = yield call(() => api.get(`/atividades/${action.payload.page}/${action.payload.ativo}`));
    const atividade = response.data;
    yield put({ type: LISTAR_ATIVIDADES_SUCCESS, payload: atividade});
  } catch (error) {
    yield put({ type: LISTAR_ATIVIDADES_FAILURE, payload: error.message });
  }
}

function* showAtividades(action) {
  try {
    const response = yield call(() => api.get(`/atividades/${action.payload}`));
    const atividade = response.data;
    yield put({ type: SHOW_ATIVIDADES_SUCCESS, payload: atividade });
  } catch (error) {
    yield put({ type: SHOW_ATIVIDADES_FAILURE, payload: error.message });
  }
}
// add empresa

function* criarAtividades(action) {
  try {
    const response = yield call(() => api.post('/atividades', action.payload.atividade));
    const atividade = response.data;
    yield put({ type: CRIAR_ATIVIDADES_SUCCESS, payload: atividade });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'ATIVIDADE CADASTRADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: CRIAR_ATIVIDADES_FAILURE, payload: error.message });
  }
}

// update empresa

function* updateAtividades(action) {
  try {
    console.log(action.payload);
    const response = yield call(() => api.put(`/atividades/${action.payload.id}`, action.payload.atividade));
    const atividade = response.data;
    yield put({ type: UPDATE_ATIVIDADES_SUCCESS, payload: atividade });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'ATIVIDADE ATUALIZADA COM SUCESSO'} });
  } catch (error) {
    yield put({ type: UPDATE_ATIVIDADES_FAILURE, payload: error.message });
  }
}

function* deleteAtividades(action) {
  try {
    yield call(() => api.delete(`/atividades/${action.payload}`));
    yield put({ type: DELETE_ATIVIDADES_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_ATIVIDADES_FAILURE, payload: error.message });
  }
}


export default all([
  takeLatest(DELETE_ATIVIDADES_REQUEST, deleteAtividades),
  takeLatest(UPDATE_ATIVIDADES_REQUEST, updateAtividades),
  takeLatest(CRIAR_ATIVIDADES_REQUEST, criarAtividades),
  takeLatest(SHOW_ATIVIDADES_REQUEST, showAtividades),
  takeLatest(LISTAR_ATIVIDADES_REQUEST, listarAtividades),
])
