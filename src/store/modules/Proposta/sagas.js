import {call, put, all, takeLatest } from 'redux-saga/effects';

import {
  LISTAR_PROPOSTAS_REQUEST,
  LISTAR_PROPOSTAS_SUCCESS,
  LISTAR_PROPOSTAS_FAILURE,
  CRIAR_PROPOSTAS_REQUEST,
  CRIAR_PROPOSTAS_SUCCESS,
  CRIAR_PROPOSTAS_FAILURE,
  UPDATE_PROPOSTAS_REQUEST,
  UPDATE_PROPOSTAS_SUCCESS,
  UPDATE_PROPOSTAS_FAILURE,
  DELETE_PROPOSTAS_REQUEST,
  DELETE_PROPOSTAS_SUCCESS,
  DELETE_PROPOSTAS_FAILURE,
  SHOW_PROPOSTAS_FAILURE,
  SHOW_PROPOSTAS_SUCCESS,
  SHOW_PROPOSTAS_REQUEST,
} from './actions';

import api from '../../../services/api';

function* listarPropostas(action) {
  try {
    const response = yield call(() => api.get(`/propostas/${action.payload.page}/${action.payload.ativo}`));
    const proposta = response.data;
    yield put({ type: LISTAR_PROPOSTAS_SUCCESS, payload: proposta});
  } catch (error) {
    yield put({ type: LISTAR_PROPOSTAS_FAILURE, payload: error.message });
  }
}

function* showPropostas(action) {
  try {
    const response = yield call(() => api.get(`/propostas/${action.payload}`));
    const proposta = response.data;
    yield put({ type: SHOW_PROPOSTAS_SUCCESS, payload: proposta });
  } catch (error) {
    yield put({ type: SHOW_PROPOSTAS_FAILURE, payload: error.message });
  }
}
// add empresa

function* criarPropostas(action) {
  try {
    const response = yield call(() => api.post('/propostas', action.payload.proposta));
    const proposta = response.data;
    yield put({ type: CRIAR_PROPOSTAS_SUCCESS, payload: proposta });
  } catch (error) {
    yield put({ type: CRIAR_PROPOSTAS_FAILURE, payload: error.message });
  }
}

// update empresa

function* updatePropostas(action) {
  try {
    const response = yield call(() => api.put(`/propostas/${action.payload.id}`, action.payload.proposta));
    const proposta = response.data;
    yield put({ type: UPDATE_PROPOSTAS_SUCCESS, payload: proposta });
  } catch (error) {
    yield put({ type: UPDATE_PROPOSTAS_FAILURE, payload: error.message });
  }
}

function* deletePropostas(action) {
  try {
    yield call(() => api.delete(`/propostas/${action.payload}`));
    yield put({ type: DELETE_PROPOSTAS_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_PROPOSTAS_FAILURE, payload: error.message });
  }
}


export default all([
  takeLatest(DELETE_PROPOSTAS_REQUEST, deletePropostas),
  takeLatest(UPDATE_PROPOSTAS_REQUEST, updatePropostas),
  takeLatest(CRIAR_PROPOSTAS_REQUEST, criarPropostas),
  takeLatest(SHOW_PROPOSTAS_REQUEST, showPropostas),
  takeLatest(LISTAR_PROPOSTAS_REQUEST, listarPropostas),
])
