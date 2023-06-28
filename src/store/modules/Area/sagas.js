import {call, put, all, takeLatest } from 'redux-saga/effects';

import {
  LISTAR_AREAS_REQUEST,
  LISTAR_AREAS_SUCCESS,
  LISTAR_AREAS_FAILURE,
  CRIAR_AREAS_REQUEST,
  CRIAR_AREAS_SUCCESS,
  CRIAR_AREAS_FAILURE,
  UPDATE_AREAS_REQUEST,
  UPDATE_AREAS_SUCCESS,
  UPDATE_AREAS_FAILURE,
  DELETE_AREAS_REQUEST,
  DELETE_AREAS_SUCCESS,
  DELETE_AREAS_FAILURE,
  SHOW_AREAS_FAILURE,
  SHOW_AREAS_SUCCESS,
  SHOW_AREAS_REQUEST,
} from './actions';

import api from '../../../services/api';


function* listarAreas(action) {
  try {
    const response = yield call(() => api.get(`/areas/${action.payload.page}/${action.payload.ativo}`));
    const area = response.data;
    yield put({ type: LISTAR_AREAS_SUCCESS, payload: area});
  } catch (error) {
    yield put({ type: LISTAR_AREAS_FAILURE, payload: error.message });
  }
}

function* showAreas(action) {
  try {
    const response = yield call(() => api.get(`/areas/${action.payload}`));
    const area = response.data;
    yield put({ type: SHOW_AREAS_SUCCESS, payload: area });
  } catch (error) {
    yield put({ type: SHOW_AREAS_FAILURE, payload: error.message });
  }
}
// add empresa

function* criarAreas(action) {
  try {
    const response = yield call(() => api.post('/areas', action.payload.area));
    const area = response.data;
    yield put({ type: CRIAR_AREAS_SUCCESS, payload: area });
  } catch (error) {
    yield put({ type: CRIAR_AREAS_FAILURE, payload: error.message });
  }
}

// update empresa

function* updateAreas(action) {
  try {
    console.log(action.payload);
    const response = yield call(() => api.put(`/areas/${action.payload.id}`, action.payload.area));
    const area = response.data;
    yield put({ type: UPDATE_AREAS_SUCCESS, payload: area });
  } catch (error) {
    yield put({ type: UPDATE_AREAS_FAILURE, payload: error.message });
  }
}

function* deleteAreas(action) {
  try {
    yield call(() => api.delete(`/areas/${action.payload}`));
    yield put({ type: DELETE_AREAS_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_AREAS_FAILURE, payload: error.message });
  }
}


export default all([
  takeLatest(DELETE_AREAS_REQUEST, deleteAreas),
  takeLatest(UPDATE_AREAS_REQUEST, updateAreas),
  takeLatest(CRIAR_AREAS_REQUEST, criarAreas),
  takeLatest(SHOW_AREAS_REQUEST, showAreas),
  takeLatest(LISTAR_AREAS_REQUEST, listarAreas),
])
