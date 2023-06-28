import axios from 'axios';
import {store} from '../store/index';

const api = axios.create({
  //baseURL: `http://localhost:3001/api`,
  baseURL: `${process.env.REACT_APP_URL_API}/api`,
});

api.interceptors.request.use((config)  => {
  //const token = localStorage.getItem('token');
  const token = store.getState().usuario.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;