import {
  LISTAR_PROCESSOS_REQUEST,
  LISTAR_PROCESSOS_SUCCESS,
  LISTAR_PROCESSOS_FAILURE,
  SHOW_PROCESSOS_REQUEST,
  SHOW_PROCESSOS_SUCCESS,
  SHOW_PROCESSOS_FAILURE,
  CRIAR_PROCESSOS_REQUEST,
  CRIAR_PROCESSOS_SUCCESS,
  CRIAR_PROCESSOS_FAILURE,
  UPDATE_PROCESSOS_REQUEST,
  UPDATE_PROCESSOS_SUCCESS,
  UPDATE_PROCESSOS_FAILURE,
  DELETE_PROCESSOS_REQUEST,
  DELETE_PROCESSOS_SUCCESS,
  DELETE_PROCESSOS_FAILURE,
  
} from './actions'

const initialState = {
  loading: false,
  processos: [],
  processo: null,
  error: '',
  page: 1
};

const processoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_PROCESSOS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SHOW_PROCESSOS_SUCCESS:
      return {
        ...state,
        processo: action.payload,
        loading: false,
      };
    case SHOW_PROCESSOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LISTAR_PROCESSOS_REQUEST:
      return {
        ...state,
        page: action.payload.page,
        loading: true,
      };
    case CRIAR_PROCESSOS_REQUEST:
    case UPDATE_PROCESSOS_REQUEST:
    case DELETE_PROCESSOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LISTAR_PROCESSOS_SUCCESS:
      return {
        ...state,
        loading: false,
        processos: action.payload,
        error: '',
      };
    case CRIAR_PROCESSOS_SUCCESS:
      return {
        ...state,
        loading: false,
        processos:  [...state.processos, action.payload],
        error: '',
      };
    case UPDATE_PROCESSOS_SUCCESS:
      var index = state.processos.findIndex((processo) => processo._id === action.payload._id);
      state.processos[index]= action.payload;
      return {
        ...state,
        loading: false,
        processos: [...state.processos],
        error: '',
      };
    case DELETE_PROCESSOS_SUCCESS:
      var index = state.processos.findIndex((processo) => processo._id === action.payload);
      return {
        ...state,
        loading: false,
        processos: [
          ...state.processos.slice(0, index),
          ...state.processos.slice(index + 1)
        ],
        error: '',
      };
    case LISTAR_PROCESSOS_FAILURE:
    case CRIAR_PROCESSOS_FAILURE:
    case UPDATE_PROCESSOS_FAILURE:
    case DELETE_PROCESSOS_FAILURE:
      return {
        ...state,
        loading: false,
        processo: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default processoReducer;
