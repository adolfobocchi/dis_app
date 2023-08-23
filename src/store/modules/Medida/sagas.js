import {call, put, all, takeLatest } from 'redux-saga/effects';

import {
  LISTAR_MEDIDAS_REQUEST,
  LISTAR_MEDIDAS_SUCCESS,
  LISTAR_MEDIDAS_FAILURE,
  CRIAR_MEDIDAS_REQUEST,
  CRIAR_MEDIDAS_SUCCESS,
  CRIAR_MEDIDAS_FAILURE,
  UPDATE_MEDIDAS_REQUEST,
  UPDATE_MEDIDAS_SUCCESS,
  UPDATE_MEDIDAS_FAILURE,
  DELETE_MEDIDAS_REQUEST,
  DELETE_MEDIDAS_SUCCESS,
  DELETE_MEDIDAS_FAILURE,
  SHOW_MEDIDAS_FAILURE,
  SHOW_MEDIDAS_SUCCESS,
  SHOW_MEDIDAS_REQUEST,
} from './actions';

import api from '../../../services/api';
import { SHOW_INFORMATION } from '../Information/actions';


function* listarMedidas(action) {
  try {
    const response = yield call(() => api.get(`/medidas/${action.payload.page}/${action.payload.ativo}`));
    const medida = response.data;
    yield put({ type: LISTAR_MEDIDAS_SUCCESS, payload: medida});
  } catch (error) {
    yield put({ type: LISTAR_MEDIDAS_FAILURE, payload: error.message });
  }
}

function* showMedidas(action) {
  try {
    const response = yield call(() => api.get(`/medidas/${action.payload}`));
    const medida = response.data;
    yield put({ type: SHOW_MEDIDAS_SUCCESS, payload: medida });
  } catch (error) {
    yield put({ type: SHOW_MEDIDAS_FAILURE, payload: error.message });
  }
}
// add empresa

function* criarMedidas(action) {
  try {
    const response = yield call(() => api.post('/medidas', action.payload.medida));
    const medida = response.data;
    yield put({ type: CRIAR_MEDIDAS_SUCCESS, payload: medida });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'CADASTRO REALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: CRIAR_MEDIDAS_FAILURE, payload: error.message });
  }
}

// update empresa

function* updateMedidas(action) {
  try {
    const response = yield call(() => api.put(`/medidas/${action.payload.id}`, action.payload.medida));
    const medida = response.data;
    yield put({ type: UPDATE_MEDIDAS_SUCCESS, payload: medida });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'ATUALIZAÇÃO REALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: UPDATE_MEDIDAS_FAILURE, payload: error.message });
  }
}

function* deleteMedidas(action) {
  try {
    yield call(() => api.delete(`/medidas/${action.payload}`));
    yield put({ type: DELETE_MEDIDAS_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_MEDIDAS_FAILURE, payload: error.message });
  }
}


export default all([
  takeLatest(DELETE_MEDIDAS_REQUEST, deleteMedidas),
  takeLatest(UPDATE_MEDIDAS_REQUEST, updateMedidas),
  takeLatest(CRIAR_MEDIDAS_REQUEST, criarMedidas),
  takeLatest(SHOW_MEDIDAS_REQUEST, showMedidas),
  takeLatest(LISTAR_MEDIDAS_REQUEST, listarMedidas),
])
