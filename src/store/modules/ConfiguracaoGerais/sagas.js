// sagas.js

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { LISTAR_CONFIGURACAOGERAIS_FAILURE, LISTAR_CONFIGURACAOGERAIS_REQUEST, LISTAR_CONFIGURACAOGERAIS_SUCCESS, UPDATE_CONFIGURACAOGERAIS_FAILURE, UPDATE_CONFIGURACAOGERAIS_REQUEST, UPDATE_CONFIGURACAOGERAIS_SUCCESS } from './actions';
import api from '../../../services/api';
import { SHOW_INFORMATION } from '../Information/actions';

function* listarConfGerais(action) {
  try {
    const response = yield call(() => api.get(`/configuracoes/gerais`));
    const configuracao = response.data;
    yield put({ type: LISTAR_CONFIGURACAOGERAIS_SUCCESS, payload: configuracao});
  } catch (error) {
    yield put({ type: LISTAR_CONFIGURACAOGERAIS_FAILURE, payload: error.message });
  }
}

function* updateConfGerais(action) {
  try {
    const response = yield call(() => api.put(`/configuracoes/gerais`, action.payload.configuracao));
    const configuracao = response.data;
    yield put({ type: UPDATE_CONFIGURACAOGERAIS_SUCCESS, payload: configuracao });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'CONFIGURAÇÕES ATUALIZADA COM SUCESSO'} });

  } catch (error) {
    yield put({ type: UPDATE_CONFIGURACAOGERAIS_FAILURE, payload: error.message });
  }
}

export default all([
  takeLatest(UPDATE_CONFIGURACAOGERAIS_REQUEST, updateConfGerais),
  takeLatest(LISTAR_CONFIGURACAOGERAIS_REQUEST, listarConfGerais),
])
