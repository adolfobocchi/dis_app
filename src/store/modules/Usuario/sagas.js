// sagas.js

import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST, loginSuccess, loginFailure, LOGOUT_REQUEST, logoutSuccess, DELETE_USUARIOS_REQUEST, UPDATE_USUARIOS_REQUEST, CRIAR_USUARIOS_REQUEST, SHOW_USUARIOS_REQUEST, LISTAR_USUARIOS_REQUEST, DELETE_USUARIOS_SUCCESS, DELETE_USUARIOS_FAILURE, UPDATE_USUARIOS_SUCCESS, UPDATE_USUARIOS_FAILURE, CRIAR_USUARIOS_SUCCESS, CRIAR_USUARIOS_FAILURE, SHOW_USUARIOS_SUCCESS, SHOW_USUARIOS_FAILURE, LISTAR_USUARIOS_FAILURE, LISTAR_USUARIOS_SUCCESS, UPDATEPASSWORD_USUARIOS_REQUEST} from './actions';
import api from '../../../services/api';
import { SHOW_INFORMATION } from '../Information/actions';

export function* login(action) {
  try {
    const response = yield call(() => api.post('/login', action.payload));
    yield put(loginSuccess(response.data.usuario, response.data.token, action.payload.history));
  } catch (error) {
    const {message} = error.response.data;
    yield put(loginFailure(message));
  }
}

export function* logout() {
  try {
    const state = yield select();
    const id = state.usuario.usuario._id;
    yield call(() => api.post('/logout', {id: id}));
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutSuccess());
  }
}

function* listarUsuarios(action) {
  try {
    const response = yield call(() => api.get(`/usuarios/${action.payload.page}/${action.payload.ativo}`));
    const usuario = response.data;
    yield put({ type: LISTAR_USUARIOS_SUCCESS, payload: usuario});
  } catch (error) {
    yield put({ type: LISTAR_USUARIOS_FAILURE, payload: error.message });
  }
}

function* showUsuarios(action) {
  try {
    const response = yield call(() => api.get(`/usuarios/${action.payload}`));
    const usuario = response.data;
    yield put({ type: SHOW_USUARIOS_SUCCESS, payload: usuario });
  } catch (error) {
    yield put({ type: SHOW_USUARIOS_FAILURE, payload: error.message });
  }
}
// add empresa

function* criarUsuarios(action) {
  try {
    const response = yield call(() => api.post('/usuarios', action.payload.usuario));
    const usuario = response.data;
    yield put({ type: CRIAR_USUARIOS_SUCCESS, payload: usuario });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'USUARIO CADASTRADO COM SUCESSO'} });

  } catch (error) {
    yield put({ type: CRIAR_USUARIOS_FAILURE, payload: error.message });
  }
}

// update empresa

function* updateUsuarios(action) {
  try {
    const response = yield call(() => api.put(`/usuarios/${action.payload.id}`, action.payload.usuario));
    const usuario = response.data;
    yield put({ type: UPDATE_USUARIOS_SUCCESS, payload: usuario });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'USUARIO ATUALIZADO COM SUCESSO'} });

  } catch (error) {
    yield put({ type: UPDATE_USUARIOS_FAILURE, payload: error.message });
  }
}

function* updatePassword(action) {
  try {
    const response = yield call(() => api.put(`/usuarios/${action.payload.id}/password`, action.payload.usuario));
    const usuario = response.data;
    yield put({ type: UPDATE_USUARIOS_SUCCESS, payload: usuario });
  } catch (error) {
    yield put({ type: UPDATE_USUARIOS_FAILURE, payload: error.message });
  }
}

function* deleteUsuarios(action) {
  try {
    yield call(() => api.delete(`/usuarios/${action.payload}`));
    yield put({ type: DELETE_USUARIOS_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_USUARIOS_FAILURE, payload: error.message });
  }
}




export default all([
  takeLatest(LOGIN_REQUEST, login),
  takeLatest(LOGOUT_REQUEST, logout),
  takeLatest(DELETE_USUARIOS_REQUEST, deleteUsuarios),
  takeLatest(UPDATE_USUARIOS_REQUEST, updateUsuarios),
  takeLatest(UPDATEPASSWORD_USUARIOS_REQUEST, updatePassword),
  takeLatest(CRIAR_USUARIOS_REQUEST, criarUsuarios),
  takeLatest(SHOW_USUARIOS_REQUEST, showUsuarios),
  takeLatest(LISTAR_USUARIOS_REQUEST, listarUsuarios),
])
