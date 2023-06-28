// reducers.js

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS } from './actions';


const initialState = {
  isAuthenticated: false,
  token: null,
  error: null,
  usuario: null,
  loading: false,
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
        usuario: null,
        loading: false,
      };
      
    default:
      return state;
  }
};

export default usuarioReducer;
