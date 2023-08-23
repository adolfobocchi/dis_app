// sagas.js

import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { DELETE_EMPRESAS_REQUEST, UPDATE_EMPRESAS_REQUEST, CRIAR_EMPRESAS_REQUEST, SHOW_EMPRESAS_REQUEST, LISTAR_EMPRESAS_REQUEST, DELETE_EMPRESAS_SUCCESS, DELETE_EMPRESAS_FAILURE, UPDATE_EMPRESAS_SUCCESS, UPDATE_EMPRESAS_FAILURE, CRIAR_EMPRESAS_SUCCESS, CRIAR_EMPRESAS_FAILURE, SHOW_EMPRESAS_SUCCESS, SHOW_EMPRESAS_FAILURE, LISTAR_EMPRESAS_FAILURE, LISTAR_EMPRESAS_SUCCESS, UPDATEPASSWORD_EMPRESAS_REQUEST} from './actions';
import api from '../../../services/api';
import { SHOW_INFORMATION } from '../Information/actions';

function* listarEmpresas(action) {
  try {
    const response = yield call(() => api.get(`/empresas/${action.payload.page}/${action.payload.ativo}`));
    const empresa = response.data;
    yield put({ type: LISTAR_EMPRESAS_SUCCESS, payload: empresa});
  } catch (error) {
    yield put({ type: LISTAR_EMPRESAS_FAILURE, payload: error.message });
  }
}

function* showEmpresas(action) {
  try {
    const response = yield call(() => api.get(`/empresas/${action.payload}`));
    const empresa = response.data;
    yield put({ type: SHOW_EMPRESAS_SUCCESS, payload: empresa });
  } catch (error) {
    yield put({ type: SHOW_EMPRESAS_FAILURE, payload: error.message });
  }
}
// add empresa

function* criarEmpresas(action) {
  try {
    const response = yield call(() => api.post('/empresas', action.payload.empresa));
    const empresa = response.data;
    yield put({ type: CRIAR_EMPRESAS_SUCCESS, payload: empresa });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'CADASTRO REALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: CRIAR_EMPRESAS_FAILURE, payload: error.message });
  }
}

// update empresa

function* updateEmpresas(action) {
  try {
    const response = yield call(() => api.put(`/empresas/${action.payload.id}`, action.payload.empresa));
    const empresa = response.data;
    yield put({ type: UPDATE_EMPRESAS_SUCCESS, payload: empresa });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'REGISTRO ATUALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: UPDATE_EMPRESAS_FAILURE, payload: error.message });
  }
}

function* deleteEmpresas(action) {
  try {
    yield call(() => api.delete(`/empresas/${action.payload}`));
    yield put({ type: DELETE_EMPRESAS_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_EMPRESAS_FAILURE, payload: error.message });
  }
}

export default all([
  takeLatest(DELETE_EMPRESAS_REQUEST, deleteEmpresas),
  takeLatest(UPDATE_EMPRESAS_REQUEST, updateEmpresas),
  takeLatest(CRIAR_EMPRESAS_REQUEST, criarEmpresas),
  takeLatest(SHOW_EMPRESAS_REQUEST, showEmpresas),
  takeLatest(LISTAR_EMPRESAS_REQUEST, listarEmpresas),
])
