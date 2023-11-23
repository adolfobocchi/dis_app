// reducers.js

import { LISTAR_CONFIGURACAOGERAIS_FAILURE, LISTAR_CONFIGURACAOGERAIS_SUCCESS, LISTAR_CONFIGURACAOGERAIS_REQUEST, UPDATE_CONFIGURACAOGERAIS_FAILURE, UPDATE_CONFIGURACAOGERAIS_REQUEST, UPDATE_CONFIGURACAOGERAIS_SUCCESS } from './actions';


const initialState = {
  error: null,
  gerais: null,
  loading: false,
};

const usuarioReducer = (state = initialState, action) => {
  switch (action.type) {
      case LISTAR_CONFIGURACAOGERAIS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_CONFIGURACAOGERAIS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case LISTAR_CONFIGURACAOGERAIS_SUCCESS:
        return {
          ...state,
          loading: false,
          gerais: action.payload,
          error: '',
        };
      case UPDATE_CONFIGURACAOGERAIS_SUCCESS:
        state.gerais = action.payload;
        return {
          ...state,
          loading: false,
          gerais: {...state.gerais},
          error: '',
        };
      case LISTAR_CONFIGURACAOGERAIS_FAILURE:
      case UPDATE_CONFIGURACAOGERAIS_FAILURE:
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
