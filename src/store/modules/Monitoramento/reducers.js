import {
  LISTAR_MONITORAMENTOS_REQUEST,
  LISTAR_MONITORAMENTOS_SUCCESS,
  LISTAR_MONITORAMENTOS_FAILURE,
  SHOW_MONITORAMENTOS_REQUEST,
  SHOW_MONITORAMENTOS_SUCCESS,
  SHOW_MONITORAMENTOS_FAILURE,
  CRIAR_MONITORAMENTOS_REQUEST,
  CRIAR_MONITORAMENTOS_SUCCESS,
  CRIAR_MONITORAMENTOS_FAILURE,
  UPDATE_MONITORAMENTOS_REQUEST,
  UPDATE_MONITORAMENTOS_SUCCESS,
  UPDATE_MONITORAMENTOS_FAILURE,
  DELETE_MONITORAMENTOS_REQUEST,
  DELETE_MONITORAMENTOS_SUCCESS,
  DELETE_MONITORAMENTOS_FAILURE,
  
} from './actions'

const initialState = {
  loading: false,
  monitoramentos: [],
  monitoramento: null,
  error: '',
  page: 1
};

const monitoramentosReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MONITORAMENTOS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SHOW_MONITORAMENTOS_SUCCESS:
      return {
        ...state,
        monitoramentos: action.payload,
        loading: false,
      };
    case SHOW_MONITORAMENTOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LISTAR_MONITORAMENTOS_REQUEST:
      return {
        ...state,
        page: action.payload.page,
        loading: true,
      };
    case CRIAR_MONITORAMENTOS_REQUEST:
    case UPDATE_MONITORAMENTOS_REQUEST:
    case DELETE_MONITORAMENTOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LISTAR_MONITORAMENTOS_SUCCESS:
      return {
        ...state,
        loading: false,
        monitoramentos: action.payload,
        error: '',
      };
    case CRIAR_MONITORAMENTOS_SUCCESS:
      return {
        ...state,
        loading: false,
        monitoramentos:  [...state.monitoramentos, action.payload],
        error: '',
      };
    case UPDATE_MONITORAMENTOS_SUCCESS:
      var index = state.monitoramentos.findIndex((monitoramentos) => monitoramentos._id === action.payload._id);
      state.monitoramentos[index]= action.payload;
      return {
        ...state,
        loading: false,
        monitoramentos: [...state.monitoramentos],
        error: '',
      };
    case DELETE_MONITORAMENTOS_SUCCESS:
      var index = state.monitoramentos.findIndex((monitoramentos) => monitoramentos._id === action.payload);
      return {
        ...state,
        loading: false,
        monitoramentos: [
          ...state.monitoramentos.slice(0, index),
          ...state.monitoramentos.slice(index + 1)
        ],
        error: '',
      };
    case LISTAR_MONITORAMENTOS_FAILURE:
    case CRIAR_MONITORAMENTOS_FAILURE:
    case UPDATE_MONITORAMENTOS_FAILURE:
    case DELETE_MONITORAMENTOS_FAILURE:
      return {
        ...state,
        loading: false,
        monitoramentos: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default monitoramentosReducer;
