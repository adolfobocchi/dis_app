// reducers.js

import { SHOW_EMPRESAS_REQUEST, SHOW_EMPRESAS_SUCCESS, SHOW_EMPRESAS_FAILURE, LISTAR_EMPRESAS_REQUEST, CRIAR_EMPRESAS_REQUEST, UPDATE_EMPRESAS_REQUEST, DELETE_EMPRESAS_REQUEST, LISTAR_EMPRESAS_SUCCESS, CRIAR_EMPRESAS_SUCCESS, UPDATE_EMPRESAS_SUCCESS, DELETE_EMPRESAS_SUCCESS, LISTAR_EMPRESAS_FAILURE, CRIAR_EMPRESAS_FAILURE, UPDATE_EMPRESAS_FAILURE, DELETE_EMPRESAS_FAILURE, UPDATEPASSWORD_EMPRESAS_FAILURE, UPDATEPASSWORD_EMPRESAS_SUCCESS, UPDATEPASSWORD_EMPRESAS_REQUEST } from './actions';


const initialState = {
  error: null,
  empresa: null,
  empresas: [],
  loading: false,
  page: 1
};

const empresaReducer = (state = initialState, action) => {
  switch (action.type) {
      case SHOW_EMPRESAS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case SHOW_EMPRESAS_SUCCESS:
        return {
          ...state,
          empresa: action.payload,
          loading: false,
        };
      case SHOW_EMPRESAS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case LISTAR_EMPRESAS_REQUEST:
        return {
          ...state,
          page: action.payload.page,
          loading: true,
        };
      case CRIAR_EMPRESAS_REQUEST:
      case UPDATE_EMPRESAS_REQUEST:
      case DELETE_EMPRESAS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case LISTAR_EMPRESAS_SUCCESS:
        return {
          ...state,
          loading: false,
          empresas: action.payload,
          error: '',
        };
      case CRIAR_EMPRESAS_SUCCESS:
        return {
          ...state,
          loading: false,
          empresas:  [...state.empresas, action.payload],
          error: '',
        };
      case UPDATE_EMPRESAS_SUCCESS:
        var index = state.empresas.findIndex((empresa) => empresa._id === action.payload._id);
        state.empresas[index]= action.payload;
        return {
          ...state,
          loading: false,
          empresas: [...state.empresas],
          error: '',
        };
      case DELETE_EMPRESAS_SUCCESS:
        var index = state.empresas.findIndex((empresa) => empresa._id === action.payload);
        return {
          ...state,
          loading: false,
          empresas: [
            ...state.empresas.slice(0, index),
            ...state.empresas.slice(index + 1)
          ],
          error: '',
        };
      case LISTAR_EMPRESAS_FAILURE:
      case CRIAR_EMPRESAS_FAILURE:
      case UPDATE_EMPRESAS_FAILURE:
      case DELETE_EMPRESAS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };  
    default:
      return state;
  }
};

export default empresaReducer;
