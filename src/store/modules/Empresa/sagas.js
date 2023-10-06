// sagas.js

import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { DELETE_EMPRESAS_REQUEST, UPDATE_EMPRESAS_REQUEST, CRIAR_EMPRESAS_REQUEST, SHOW_EMPRESAS_REQUEST, LISTAR_EMPRESAS_REQUEST, DELETE_EMPRESAS_SUCCESS, DELETE_EMPRESAS_FAILURE, UPDATE_EMPRESAS_SUCCESS, UPDATE_EMPRESAS_FAILURE, CRIAR_EMPRESAS_SUCCESS, CRIAR_EMPRESAS_FAILURE, SHOW_EMPRESAS_SUCCESS, SHOW_EMPRESAS_FAILURE, LISTAR_EMPRESAS_FAILURE, LISTAR_EMPRESAS_SUCCESS, UPDATEPASSWORD_EMPRESAS_REQUEST, LISTAR_GRUPOS_REQUEST, SHOW_GRUPOS_SUCCESS, SHOW_GRUPOS_FAILURE, LISTAR_GRUPOS_SUCCESS, LISTAR_GRUPOS_FAILURE, CRIAR_GRUPOS_SUCCESS, CRIAR_GRUPOS_FAILURE, UPDATE_GRUPOS_SUCCESS, UPDATE_GRUPOS_FAILURE, DELETE_GRUPOS_SUCCESS, DELETE_GRUPOS_FAILURE, DELETE_GRUPOS_REQUEST, UPDATE_GRUPOS_REQUEST, CRIAR_GRUPOS_REQUEST, SHOW_GRUPOS_REQUEST, ADD_COMUNICADO_REQUEST, ADD_COMUNICADO_SUCCESS, ADD_COMUNICADO_FAILURE, ADD_DOCUMENTO_REQUEST, ADD_DOCUMENTO_SUCCESS, ADD_DOCUMENTO_FAILURE, REMOVE_DOCUMENTO_SUCCESS, REMOVE_DOCUMENTO_FAILURE, REMOVE_DOCUMENTO_REQUEST, UPDATE_DOCUMENTO_REQUEST, UPDATE_DOCUMENTO_SUCCESS, UPDATE_DOCUMENTO_FAILURE, UPDATE_COMUNICADO_SUCCESS, UPDATE_COMUNICADO_FAILURE, REMOVE_COMUNICADO_SUCCESS, REMOVE_COMUNICADO_FAILURE, REMOVE_COMUNICADO_REQUEST, UPDATE_COMUNICADO_REQUEST, ADD_HISTORICOACAO_SUCCESS, ADD_HISTORICOACAO_FAILURE, UPDATE_HISTORICOACAO_SUCCESS, UPDATE_HISTORICOACAO_FAILURE, REMOVE_HISTORICOACAO_SUCCESS, REMOVE_HISTORICOACAO_FAILURE, ADD_HISTORICOACAO_REQUEST, REMOVE_HISTORICOACAO_REQUEST, UPDATE_HISTORICOACAO_REQUEST, ADD_PLANOACAO_SUCCESS, ADD_PLANOACAO_FAILURE, UPDATE_PLANOACAO_SUCCESS, UPDATE_PLANOACAO_FAILURE, REMOVE_PLANOACAO_SUCCESS, REMOVE_PLANOACAO_FAILURE, ADD_PLANOACAO_REQUEST, REMOVE_PLANOACAO_REQUEST, UPDATE_PLANOACAO_REQUEST, REMOVE_SOLICITACAO_FAILURE, REMOVE_SOLICITACAO_SUCCESS, UPDATE_SOLICITACAO_FAILURE, UPDATE_SOLICITACAO_SUCCESS, ADD_SOLICITACAO_FAILURE, ADD_SOLICITACAO_SUCCESS, ADD_SOLICITACAO_REQUEST, REMOVE_SOLICITACAO_REQUEST, UPDATE_SOLICITACAO_REQUEST, ADD_RESPOSTASOLICITACAO_REQUEST, REMOVE_RESPOSTASOLICITACAO_REQUEST, UPDATE_RESPOSTASOLICITACAO_REQUEST, ADD_RESPOSTASOLICITACAO_SUCCESS, ADD_RESPOSTASOLICITACAO_FAILURE, UPDATE_RESPOSTASOLICITACAO_SUCCESS, UPDATE_RESPOSTASOLICITACAO_FAILURE, REMOVE_RESPOSTASOLICITACAO_SUCCESS, REMOVE_RESPOSTASOLICITACAO_FAILURE, loginEmpresaSuccess, loginEmpresaFailure, logoutEmpresaSuccess, LOGINEMPRESA_REQUEST, LOGOUTEMPRESA_REQUEST} from './actions';
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

function* listarGrupos(action) {
  try {
    const response = yield call(() => api.get(`/grupos/${action.payload.page}/${action.payload.ativo}`));
    const grupo = response.data;
    yield put({ type: LISTAR_GRUPOS_SUCCESS, payload: grupo});
  } catch (error) {
    yield put({ type: LISTAR_GRUPOS_FAILURE, payload: error.message });
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

function* showGrupos(action) {
  try {
    const response = yield call(() => api.get(`/grupos/${action.payload}`));
    const grupo = response.data;
    yield put({ type: SHOW_GRUPOS_SUCCESS, payload: grupo });
  } catch (error) {
    yield put({ type: SHOW_GRUPOS_FAILURE, payload: error.message });
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
    yield put({ type: SHOW_INFORMATION, payload: {text: error.response.data.message} });
  }
}

function* criarGrupos(action) {
  try {
    const response = yield call(() => api.post('/grupos', action.payload.grupo));
    const grupo = response.data;
    yield put({ type: CRIAR_GRUPOS_SUCCESS, payload: grupo });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'CADASTRO REALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: CRIAR_GRUPOS_FAILURE, payload: error.message });
    yield put({ type: SHOW_INFORMATION, payload: {text: error.response.data.message} });
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

function* updateGrupos(action) {
  try {
    const response = yield call(() => api.put(`/grupos/${action.payload.id}`, action.payload.grupo));
    const grupo = response.data;
    yield put({ type: UPDATE_GRUPOS_SUCCESS, payload: grupo });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'REGISTRO ATUALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: UPDATE_GRUPOS_FAILURE, payload: error.message });
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

function* deleteGrupos(action) {
  try {
    yield call(() => api.delete(`/grupos/${action.payload}`));
    yield put({ type: DELETE_GRUPOS_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_GRUPOS_FAILURE, payload: error.message });
  }
}

function* addComunicado(action) {
  try {
    const response = yield call(() => api.post(`/empresas/comunicado/${action.payload.id}`, action.payload.comunicado));
    const empresa = response.data;
    yield put({ type: ADD_COMUNICADO_SUCCESS, payload: empresa });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'REGISTRO ATUALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: ADD_COMUNICADO_FAILURE, payload: error.message });
  }
}

function* updateComunicado(action) {
  try {
    const response = yield call(() => api.put(`/empresas/comunicado/${action.payload.id}`, action.payload.comunicado));
    const empresa = response.data;
    yield put({ type: UPDATE_COMUNICADO_SUCCESS, payload: empresa });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'REGISTRO ATUALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: UPDATE_COMUNICADO_FAILURE, payload: error.message });
  }
}

function* removeComunicado(action) {
  try {
    const response = yield call(() => api.delete(`/empresas/${action.payload.id}/comunicado/${action.payload.comunicadoId}`));
    const empresa = response.data;
    yield put({ type: REMOVE_COMUNICADO_SUCCESS, payload: empresa });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'REGISTRO ATUALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: REMOVE_COMUNICADO_FAILURE, payload: error.message });
  }
}

function* addDocumento(action) {
  try {
    const response = yield call(() => api.post(`/empresas/documento/${action.payload.id}`, action.payload.documento));
    const empresa = response.data;
    yield put({ type: ADD_DOCUMENTO_SUCCESS, payload: empresa });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'REGISTRO ATUALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: ADD_DOCUMENTO_FAILURE, payload: error.message });
  }
}

function* updateDocumento(action) {
  try {
    const response = yield call(() => api.put(`/empresas/documento/${action.payload.id}`, action.payload.documento));
    const empresa = response.data;
    yield put({ type: UPDATE_DOCUMENTO_SUCCESS, payload: empresa });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'REGISTRO ATUALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: UPDATE_DOCUMENTO_FAILURE, payload: error.message });
  }
}

function* removeDocumento(action) {
  try {
    const response = yield call(() => api.delete(`/empresas/${action.payload.id}/documento/${action.payload.documentoId}/${action.payload.documentoNome}`));
    const empresa = response.data;
    yield put({ type: REMOVE_DOCUMENTO_SUCCESS, payload: empresa });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'REGISTRO ATUALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: REMOVE_DOCUMENTO_FAILURE, payload: error.message });
  }
}

function* addHistoricoAcao(action) {
  try {
    const response = yield call(() => api.post(`/empresas/historicoacao/${action.payload.id}`, action.payload.historicoAcao));
    const empresa = response.data;
    yield put({ type: ADD_HISTORICOACAO_SUCCESS, payload: empresa });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'REGISTRO ATUALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: ADD_HISTORICOACAO_FAILURE, payload: error.message });
  }
}

function* updateHistoricoAcao(action) {
  try {
    const response = yield call(() => api.put(`/empresas/historicoacao/${action.payload.id}`, action.payload.historicoAcao));
    const empresa = response.data;
    yield put({ type: UPDATE_HISTORICOACAO_SUCCESS, payload: empresa });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'REGISTRO ATUALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: UPDATE_HISTORICOACAO_FAILURE, payload: error.message });
  }
}

function* removeHistoricoAcao(action) {
  try {
    const response = yield call(() => api.delete(`/empresas/${action.payload.id}/historicoacao/${action.payload.historicoAcaoId}`));
    const empresa = response.data;
    yield put({ type: REMOVE_HISTORICOACAO_SUCCESS, payload: empresa });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'REGISTRO ATUALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: REMOVE_HISTORICOACAO_FAILURE, payload: error.message });
  }
}

function* addPlanoAcao(action) {
  try {
    const response = yield call(() => api.post(`/empresas/planoacao/${action.payload.id}`, action.payload.planoAcao));
    const empresa = response.data;
    yield put({ type: ADD_PLANOACAO_SUCCESS, payload: empresa });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'REGISTRO ATUALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: ADD_PLANOACAO_FAILURE, payload: error.message });
  }
}

function* updatePlanoAcao(action) {
  try {
    const response = yield call(() => api.put(`/empresas/planoacao/${action.payload.id}`, action.payload.planoAcao));
    const empresa = response.data;
    yield put({ type: UPDATE_PLANOACAO_SUCCESS, payload: empresa });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'REGISTRO ATUALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: UPDATE_PLANOACAO_FAILURE, payload: error.message });
  }
}

function* removePlanoAcao(action) {
  try {
    const response = yield call(() => api.delete(`/empresas/${action.payload.id}/planoacao/${action.payload.planoAcaoId}/${action.payload.documentoNome}`));
    const empresa = response.data;
    yield put({ type: REMOVE_PLANOACAO_SUCCESS, payload: empresa });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'REGISTRO ATUALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: REMOVE_PLANOACAO_FAILURE, payload: error.message });
  }
}

function* addSolicitacao(action) {
  try {
    const response = yield call(() => api.post(`/empresas/solicitacao/${action.payload.id}`, action.payload.solicitacao));
    const empresa = response.data;
    yield put({ type: ADD_SOLICITACAO_SUCCESS, payload: empresa });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'REGISTRO ATUALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: ADD_SOLICITACAO_FAILURE, payload: error.message });
  }
}

function* updateSolicitacao(action) {
  try {
    const response = yield call(() => api.put(`/empresas/solicitacao/${action.payload.id}`, action.payload.solicitacao));
    const empresa = response.data;
    yield put({ type: UPDATE_SOLICITACAO_SUCCESS, payload: empresa });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'REGISTRO ATUALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: UPDATE_SOLICITACAO_FAILURE, payload: error.message });
  }
}

function* removeSolicitacao(action) {
  try {
    const response = yield call(() => api.delete(`/empresas/${action.payload.id}/solicitacao/${action.payload.solicitacaoId}`));
    const empresa = response.data;
    yield put({ type: REMOVE_SOLICITACAO_SUCCESS, payload: empresa });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'REGISTRO ATUALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: REMOVE_SOLICITACAO_FAILURE, payload: error.message });
  }
}
function* addRespostaSolicitacao(action) {
  try {
    const response = yield call(() => api.post(`/empresas/${action.payload.id}/solicitacao/${action.payload.solicitacaoId}/resposta`, action.payload.respostaSolicitacao));
    const empresa = response.data;
    yield put({ type: ADD_RESPOSTASOLICITACAO_SUCCESS, payload: empresa });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'REGISTRO ATUALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: ADD_RESPOSTASOLICITACAO_FAILURE, payload: error.message });
  }
}

function* updateRespostaSolicitacao(action) {
  try {
    const response = yield call(() => api.put(`/empresas/${action.payload.id}/solicitacao/${action.payload.solicitacaoId}/resposta/${action.payload.respostaSolicitacaoId}`, action.payload.respostaSolicitacao));
    const empresa = response.data;
    yield put({ type: UPDATE_RESPOSTASOLICITACAO_SUCCESS, payload: empresa });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'REGISTRO ATUALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: UPDATE_RESPOSTASOLICITACAO_FAILURE, payload: error.message });
  }
}

function* removeRespostaSolicitacao(action) {
  try {
    const response = yield call(() => api.delete(`/empresas/${action.payload.id}/solicitacao/${action.payload.solicitacaoId}/resposta/${action.payload.respostaSolicitacaoId}`));
    const empresa = response.data;
    yield put({ type: REMOVE_RESPOSTASOLICITACAO_SUCCESS, payload: empresa });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'REGISTRO ATUALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: REMOVE_RESPOSTASOLICITACAO_FAILURE, payload: error.message });
  }
}

export function* login(action) {
  try {
    const response = yield call(() => api.post('/areadocliente/login', action.payload));
    yield put(loginEmpresaSuccess(response.data.grupo, response.data.token, action.payload.history));
  } catch (error) {
    const {message} = error.response.data;
    yield put(loginEmpresaFailure(message));
  }
}

export function* logout() {
  try {
    const state = yield select();
    const id = state.empresa.grupoLogado._id;
    yield call(() => api.post('/areadocliente/logout', {id: id}));
    yield put(logoutEmpresaSuccess());
  } catch (error) {
    yield put(logoutEmpresaSuccess());
  }
}

export default all([
  takeLatest(DELETE_EMPRESAS_REQUEST, deleteEmpresas),
  takeLatest(UPDATE_EMPRESAS_REQUEST, updateEmpresas),
  takeLatest(CRIAR_EMPRESAS_REQUEST, criarEmpresas),
  takeLatest(SHOW_EMPRESAS_REQUEST, showEmpresas),
  takeLatest(LISTAR_EMPRESAS_REQUEST, listarEmpresas),
  takeLatest(DELETE_GRUPOS_REQUEST, deleteGrupos),
  takeLatest(UPDATE_GRUPOS_REQUEST, updateGrupos),
  takeLatest(CRIAR_GRUPOS_REQUEST, criarGrupos),
  takeLatest(SHOW_GRUPOS_REQUEST, showGrupos),
  takeLatest(LISTAR_GRUPOS_REQUEST, listarGrupos),
  takeLatest(ADD_COMUNICADO_REQUEST, addComunicado),
  takeLatest(REMOVE_COMUNICADO_REQUEST, removeComunicado),
  takeLatest(UPDATE_COMUNICADO_REQUEST, updateComunicado),
  takeLatest(ADD_DOCUMENTO_REQUEST, addDocumento),
  takeLatest(REMOVE_DOCUMENTO_REQUEST, removeDocumento),
  takeLatest(UPDATE_DOCUMENTO_REQUEST, updateDocumento),
  takeLatest(ADD_HISTORICOACAO_REQUEST, addHistoricoAcao),
  takeLatest(REMOVE_HISTORICOACAO_REQUEST, removeHistoricoAcao),
  takeLatest(UPDATE_HISTORICOACAO_REQUEST, updateHistoricoAcao),
  takeLatest(ADD_PLANOACAO_REQUEST, addPlanoAcao),
  takeLatest(REMOVE_PLANOACAO_REQUEST, removePlanoAcao),
  takeLatest(UPDATE_PLANOACAO_REQUEST, updatePlanoAcao),
  takeLatest(ADD_SOLICITACAO_REQUEST, addSolicitacao),
  takeLatest(REMOVE_SOLICITACAO_REQUEST, removeSolicitacao),
  takeLatest(UPDATE_SOLICITACAO_REQUEST, updateSolicitacao),
  takeLatest(UPDATE_PLANOACAO_REQUEST, updatePlanoAcao),
  takeLatest(ADD_RESPOSTASOLICITACAO_REQUEST, addRespostaSolicitacao),
  takeLatest(REMOVE_RESPOSTASOLICITACAO_REQUEST, removeRespostaSolicitacao),
  takeLatest(UPDATE_RESPOSTASOLICITACAO_REQUEST, updateRespostaSolicitacao),
  takeLatest(LOGINEMPRESA_REQUEST, login),
  takeLatest(LOGOUTEMPRESA_REQUEST, logout),
])
