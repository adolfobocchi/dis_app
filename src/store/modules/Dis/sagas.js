import {call, put, all, takeLatest } from 'redux-saga/effects';

import {
  LISTAR_DIS_REQUEST,
  LISTAR_DIS_SUCCESS,
  LISTAR_DIS_FAILURE,
  CRIAR_DIS_REQUEST,
  CRIAR_DIS_SUCCESS,
  CRIAR_DIS_FAILURE,
  UPDATE_DIS_REQUEST,
  UPDATE_DIS_SUCCESS,
  UPDATE_DIS_FAILURE,
  DELETE_DIS_REQUEST,
  DELETE_DIS_SUCCESS,
  DELETE_DIS_FAILURE,
  SHOW_DIS_FAILURE,
  SHOW_DIS_SUCCESS,
  SHOW_DIS_REQUEST,
} from './actions';

import api from '../../../services/api';


function* listarDis(action) {
  try {
    const response = yield call(() => api.get(`/dis/${action.payload.page}/${action.payload.ativo}`));
    const dis = response.data;
    yield put({ type: LISTAR_DIS_SUCCESS, payload: dis});
  } catch (error) {
    yield put({ type: LISTAR_DIS_FAILURE, payload: error.message });
  }
}

function* showDis(action) {
  try {
    const response = yield call(() => api.get(`/dis/${action.payload}`));
    const dis = response.data;
    yield put({ type: SHOW_DIS_SUCCESS, payload: dis });
  } catch (error) {
    yield put({ type: SHOW_DIS_FAILURE, payload: error.message });
  }
}
// add empresa

function* criarDis(action) {
  try {
    const response = yield call(() => api.post('/dis', action.payload.dis));
    const dis = response.data;
    yield put({ type: CRIAR_DIS_SUCCESS, payload: dis });
  } catch (error) {
    yield put({ type: CRIAR_DIS_FAILURE, payload: error.message });
  }
}

// update empresa

function* updateDis(action) {
  try {
    const response = yield call(() => api.put(`/dis/${action.payload.id}`, action.payload.dis));
    const dis = response.data;
    yield put({ type: UPDATE_DIS_SUCCESS, payload: dis });
  } catch (error) {
    yield put({ type: UPDATE_DIS_FAILURE, payload: error.message });
  }
}

function* deleteDis(action) {
  try {
    yield call(() => api.delete(`/dis/${action.payload}`));
    yield put({ type: DELETE_DIS_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_DIS_FAILURE, payload: error.message });
  }
}


export default all([
  takeLatest(DELETE_DIS_REQUEST, deleteDis),
  takeLatest(UPDATE_DIS_REQUEST, updateDis),
  takeLatest(CRIAR_DIS_REQUEST, criarDis),
  takeLatest(SHOW_DIS_REQUEST, showDis),
  takeLatest(LISTAR_DIS_REQUEST, listarDis),
])
