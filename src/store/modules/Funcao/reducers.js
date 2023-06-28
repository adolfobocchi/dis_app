import {
  LISTAR_FUNCOES_REQUEST,
  LISTAR_FUNCOES_SUCCESS,
  LISTAR_FUNCOES_FAILURE,
  SHOW_FUNCOES_REQUEST,
  SHOW_FUNCOES_SUCCESS,
  SHOW_FUNCOES_FAILURE,
  CRIAR_FUNCOES_REQUEST,
  CRIAR_FUNCOES_SUCCESS,
  CRIAR_FUNCOES_FAILURE,
  UPDATE_FUNCOES_REQUEST,
  UPDATE_FUNCOES_SUCCESS,
  UPDATE_FUNCOES_FAILURE,
  DELETE_FUNCOES_REQUEST,
  DELETE_FUNCOES_SUCCESS,
  DELETE_FUNCOES_FAILURE,
  
} from './actions'

const initialState = {
  loading: false,
  funcoes: [],
  funcao: null,
  error: '',
  page: 1
};

const funcaoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_FUNCOES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SHOW_FUNCOES_SUCCESS:
      return {
        ...state,
        funcao: action.payload,
        loading: false,
      };
    case SHOW_FUNCOES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LISTAR_FUNCOES_REQUEST:
      return {
        ...state,
        page: action.payload.page,
        loading: true,
      };
    case CRIAR_FUNCOES_REQUEST:
    case UPDATE_FUNCOES_REQUEST:
    case DELETE_FUNCOES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LISTAR_FUNCOES_SUCCESS:
      return {
        ...state,
        loading: false,
        funcoes: action.payload,
        error: '',
      };
    case CRIAR_FUNCOES_SUCCESS:
      return {
        ...state,
        loading: false,
        funcoes:  [...state.funcoes, action.payload],
        error: '',
      };
    case UPDATE_FUNCOES_SUCCESS:
      var index = state.funcoes.findIndex((funcao) => funcao._id === action.payload._id);
      state.funcoes[index]= action.payload;
      return {
        ...state,
        loading: false,
        funcoes: [...state.funcoes],
        error: '',
      };
    case DELETE_FUNCOES_SUCCESS:
      var index = state.funcoes.findIndex((funcao) => funcao._id === action.payload);
      return {
        ...state,
        loading: false,
        funcoes: [
          ...state.funcoes.slice(0, index),
          ...state.funcoes.slice(index + 1)
        ],
        error: '',
      };
    case LISTAR_FUNCOES_FAILURE:
    case CRIAR_FUNCOES_FAILURE:
    case UPDATE_FUNCOES_FAILURE:
    case DELETE_FUNCOES_FAILURE:
      return {
        ...state,
        loading: false,
        funcao: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default funcaoReducer;
