// reducers.js

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, SHOW_USUARIOS_REQUEST, SHOW_USUARIOS_SUCCESS, SHOW_USUARIOS_FAILURE, LISTAR_USUARIOS_REQUEST, CRIAR_USUARIOS_REQUEST, UPDATE_USUARIOS_REQUEST, DELETE_USUARIOS_REQUEST, LISTAR_USUARIOS_SUCCESS, CRIAR_USUARIOS_SUCCESS, UPDATE_USUARIOS_SUCCESS, DELETE_USUARIOS_SUCCESS, LISTAR_USUARIOS_FAILURE, CRIAR_USUARIOS_FAILURE, UPDATE_USUARIOS_FAILURE, DELETE_USUARIOS_FAILURE, UPDATEPASSWORD_USUARIOS_FAILURE, UPDATEPASSWORD_USUARIOS_SUCCESS, UPDATEPASSWORD_USUARIOS_REQUEST } from './actions';


const initialState = {
  isAuthenticated: false,
  token: null,
  error: null,
  usuario: null,
  usuarios: [],
  loading: false,
  page: 1
};

const usuarioReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        error: null,
        loading: true,
      };
    case LOGIN_SUCCESS:
      action.payload.history(`/?id=${action.payload.usuario._id}`);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        usuario: action.payload.usuario,
        error: null,
        loading: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        usuario: null,
        error: action.payload.message,
        loading: false,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        error: null,
        usuarios: [],
        usuario: null,
        loading: false,
        page: 1,
      };
      case SHOW_USUARIOS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case SHOW_USUARIOS_SUCCESS:
        return {
          ...state,
          usuario: action.payload,
          loading: false,
        };
      case SHOW_USUARIOS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case LISTAR_USUARIOS_REQUEST:
        return {
          ...state,
          page: action.payload.page,
          loading: true,
        };
      case CRIAR_USUARIOS_REQUEST:
      case UPDATE_USUARIOS_REQUEST:
      case UPDATEPASSWORD_USUARIOS_REQUEST:
      case DELETE_USUARIOS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case LISTAR_USUARIOS_SUCCESS:
        return {
          ...state,
          loading: false,
          usuarios: action.payload,
          error: '',
        };
      case CRIAR_USUARIOS_SUCCESS:
        return {
          ...state,
          loading: false,
          usuarios:  [...state.usuarios, action.payload],
          error: '',
        };
      case UPDATEPASSWORD_USUARIOS_SUCCESS:
      case UPDATE_USUARIOS_SUCCESS:
        var index = state.usuarios.findIndex((usuario) => usuario._id === action.payload._id);
        state.usuarios[index]= action.payload;
        return {
          ...state,
          loading: false,
          usuarios: [...state.usuarios],
          error: '',
        };
      case DELETE_USUARIOS_SUCCESS:
        var index = state.usuarios.findIndex((usuario) => usuario._id === action.payload);
        return {
          ...state,
          loading: false,
          usuarios: [
            ...state.usuarios.slice(0, index),
            ...state.usuarios.slice(index + 1)
          ],
          error: '',
        };
      case LISTAR_USUARIOS_FAILURE:
      case CRIAR_USUARIOS_FAILURE:
      case UPDATE_USUARIOS_FAILURE:
      case UPDATEPASSWORD_USUARIOS_FAILURE:
      case DELETE_USUARIOS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };  
    default:
      return state;
  }
};

export default usuarioReducer;
