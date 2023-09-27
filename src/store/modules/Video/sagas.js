import {call, put, all, takeLatest } from 'redux-saga/effects';

import {
  LISTAR_VIDEOS_REQUEST,
  LISTAR_VIDEOS_SUCCESS,
  LISTAR_VIDEOS_FAILURE,
  CRIAR_VIDEOS_REQUEST,
  CRIAR_VIDEOS_SUCCESS,
  CRIAR_VIDEOS_FAILURE,
  UPDATE_VIDEOS_REQUEST,
  UPDATE_VIDEOS_SUCCESS,
  UPDATE_VIDEOS_FAILURE,
  DELETE_VIDEOS_REQUEST,
  DELETE_VIDEOS_SUCCESS,
  DELETE_VIDEOS_FAILURE,
  SHOW_VIDEOS_FAILURE,
  SHOW_VIDEOS_SUCCESS,
  SHOW_VIDEOS_REQUEST,
} from './actions';

import api from '../../../services/api';
import { SHOW_INFORMATION } from '../Information/actions';


function* listarVideos(action) {
  try {
    const response = yield call(() => api.get(`/videos/${action.payload.page}/${action.payload.ativo}`));
    const video = response.data;
    yield put({ type: LISTAR_VIDEOS_SUCCESS, payload: video});
  } catch (error) {
    yield put({ type: LISTAR_VIDEOS_FAILURE, payload: error.message });
  }
}

function* showVideos(action) {
  try {
    const response = yield call(() => api.get(`/videos/${action.payload}`));
    const video = response.data;
    yield put({ type: SHOW_VIDEOS_SUCCESS, payload: video });
  } catch (error) {
    yield put({ type: SHOW_VIDEOS_FAILURE, payload: error.message });
  }
}
// add empresa

function* criarVideos(action) {
  try {
    const response = yield call(() => api.post('/videos', action.payload.video));
    const video = response.data;
    yield put({ type: CRIAR_VIDEOS_SUCCESS, payload: video });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'CADASTRO REALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: CRIAR_VIDEOS_FAILURE, payload: error.message });
  }
}

// update empresa

function* updateVideos(action) {
  try {
    console.log(action.payload);
    const response = yield call(() => api.put(`/videos/${action.payload.id}`, action.payload.video));
    const video = response.data;
    yield put({ type: UPDATE_VIDEOS_SUCCESS, payload: video });
    yield put({ type: SHOW_INFORMATION, payload: {text: 'ATUALIZAÇÃO REALIZADO COM SUCESSO'} });
  } catch (error) {
    yield put({ type: UPDATE_VIDEOS_FAILURE, payload: error.message });
  }
}

function* deleteVideos(action) {
  try {
    yield call(() => api.delete(`/videos/${action.payload}`));
    yield put({ type: DELETE_VIDEOS_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_VIDEOS_FAILURE, payload: error.message });
  }
}


export default all([
  takeLatest(DELETE_VIDEOS_REQUEST, deleteVideos),
  takeLatest(UPDATE_VIDEOS_REQUEST, updateVideos),
  takeLatest(CRIAR_VIDEOS_REQUEST, criarVideos),
  takeLatest(SHOW_VIDEOS_REQUEST, showVideos),
  takeLatest(LISTAR_VIDEOS_REQUEST, listarVideos),
])
