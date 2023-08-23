import {call, put, all, takeLatest } from 'redux-saga/effects';

import {
  LISTAR_PROBABILIDADES_REQUEST,
  LISTAR_PROBABILIDADES_SUCCESS,
  LISTAR_PROBABILIDADES_FAILURE,
  CRIAR_PROBABILIDADES_REQUEST,
  CRIAR_PROBABILIDADES_SUCCESS,
  CRIAR_PROBABILIDADES_FAILURE,
  UPDATE_PROBABILIDADES_REQUEST,
  UPDATE_PROBABILIDADES_SUCCESS,
  UPDATE_PROBABILIDADES_FAILURE,
  DELETE_PROBABILIDADES_REQUEST,
  DELETE_PROBABILIDADES_SUCCESS,
  DELETE_PROBABILIDADES_FAILURE,
  SHOW_PROBABILIDADES_FAILURE,
  SHOW_PROBABILIDADES_SUCCESS,
  SHOW_PROBABILIDADES_REQUEST,
} from './actions';

import api from '../../../services/api';
import { SHOW_INFORMATION } from '../Information/actions';


function* listarProbabilidades(action) {
  try {
    const response = yield call(() => api.get(`/probabilidades/${action.payload.page}/${action.payload.ativo}`));
    const probabilidade = response.data;
    yield put({ type: LISTAR_PROBABILIDADES_SUCCESS, payload: probabilidade});
  } catch (error) {
    yield put({ type: LISTAR_PROBABILIDADES_FAILURE, payload: error.message });
  }
}

function* showProbabilidades(action) {
  try {
    const response = yield call(() => api.get(`/probabilidades/${action.payload}`));
    const probabilidade = response.data;
    yield put({ type: SHOW_PROBABILIDADES_SUCCESS, payload: probabilidade });
  } catch (error) {
    yield put({ type: SHOW_PROBABILIDADES_FAILURE, payload: error.message });
  }
}
// add empresa

function* criarProbabilidades(action) {
  try {
    const response = yield call(() => api.post('/probabilidades', action.payload.probabilidade));
    const probabilidade = response.data;
    yield put({ type: CRIAR_PROBABILIDADES_SUCCESS, payload: probabilidade });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'CADASTRO REALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: CRIAR_PROBABILIDADES_FAILURE, payload: error.message });
  }
}

// update empresa

function* updateProbabilidades(action) {
  try {
    const response = yield call(() => api.put(`/probabilidades/${action.payload.id}`, action.payload.probabilidade));
    const probabilidade = response.data;
    yield put({ type: UPDATE_PROBABILIDADES_SUCCESS, payload: probabilidade });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'ATUALIZAÇÃO REALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: UPDATE_PROBABILIDADES_FAILURE, payload: error.message });
  }
}

function* deleteProbabilidades(action) {
  try {
    yield call(() => api.delete(`/probabilidades/${action.payload}`));
    yield put({ type: DELETE_PROBABILIDADES_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_PROBABILIDADES_FAILURE, payload: error.message });
  }
}


export default all([
  takeLatest(DELETE_PROBABILIDADES_REQUEST, deleteProbabilidades),
  takeLatest(UPDATE_PROBABILIDADES_REQUEST, updateProbabilidades),
  takeLatest(CRIAR_PROBABILIDADES_REQUEST, criarProbabilidades),
  takeLatest(SHOW_PROBABILIDADES_REQUEST, showProbabilidades),
  takeLatest(LISTAR_PROBABILIDADES_REQUEST, listarProbabilidades),
])
