// sagas.js

import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST, loginSuccess, loginFailure, LOGOUT_REQUEST, logoutSuccess} from './actions';
import api from '../../../services/api';

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



export default all([
  takeLatest(LOGIN_REQUEST, login),
  takeLatest(LOGOUT_REQUEST, logout)
])
