import {
  LISTAR_MEDIDAS_REQUEST,
  LISTAR_MEDIDAS_SUCCESS,
  LISTAR_MEDIDAS_FAILURE,
  SHOW_MEDIDAS_REQUEST,
  SHOW_MEDIDAS_SUCCESS,
  SHOW_MEDIDAS_FAILURE,
  CRIAR_MEDIDAS_REQUEST,
  CRIAR_MEDIDAS_SUCCESS,
  CRIAR_MEDIDAS_FAILURE,
  UPDATE_MEDIDAS_REQUEST,
  UPDATE_MEDIDAS_SUCCESS,
  UPDATE_MEDIDAS_FAILURE,
  DELETE_MEDIDAS_REQUEST,
  DELETE_MEDIDAS_SUCCESS,
  DELETE_MEDIDAS_FAILURE,
  
} from './actions'

const initialState = {
  loading: false,
  medidas: [],
  medida: null,
  error: '',
  page: 1
};

const medidaReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MEDIDAS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SHOW_MEDIDAS_SUCCESS:
      return {
        ...state,
        medida: action.payload,
        loading: false,
      };
    case SHOW_MEDIDAS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LISTAR_MEDIDAS_REQUEST:
      return {
        ...state,
        page: action.payload.page,
        loading: true,
      };
    case CRIAR_MEDIDAS_REQUEST:
    case UPDATE_MEDIDAS_REQUEST:
    case DELETE_MEDIDAS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LISTAR_MEDIDAS_SUCCESS:
      return {
        ...state,
        loading: false,
        medidas: action.payload,
        error: '',
      };
    case CRIAR_MEDIDAS_SUCCESS:
      return {
        ...state,
        loading: false,
        medidas:  [...state.medidas, action.payload],
        error: '',
      };
    case UPDATE_MEDIDAS_SUCCESS:
      var index = state.medidas.findIndex((medida) => medida._id === action.payload._id);
      state.medidas[index]= action.payload;
      return {
        ...state,
        loading: false,
        medidas: [...state.medidas],
        error: '',
      };
    case DELETE_MEDIDAS_SUCCESS:
      var index = state.medidas.findIndex((medida) => medida._id === action.payload);
      return {
        ...state,
        loading: false,
        medidas: [
          ...state.medidas.slice(0, index),
          ...state.medidas.slice(index + 1)
        ],
        error: '',
      };
    case LISTAR_MEDIDAS_FAILURE:
    case CRIAR_MEDIDAS_FAILURE:
    case UPDATE_MEDIDAS_FAILURE:
    case DELETE_MEDIDAS_FAILURE:
      return {
        ...state,
        loading: false,
        medida: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default medidaReducer;
