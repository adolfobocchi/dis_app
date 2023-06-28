import {
  LISTAR_PROBABILIDADES_REQUEST,
  LISTAR_PROBABILIDADES_SUCCESS,
  LISTAR_PROBABILIDADES_FAILURE,
  SHOW_PROBABILIDADES_REQUEST,
  SHOW_PROBABILIDADES_SUCCESS,
  SHOW_PROBABILIDADES_FAILURE,
  CRIAR_PROBABILIDADES_REQUEST,
  CRIAR_PROBABILIDADES_SUCCESS,
  CRIAR_PROBABILIDADES_FAILURE,
  UPDATE_PROBABILIDADES_REQUEST,
  UPDATE_PROBABILIDADES_SUCCESS,
  UPDATE_PROBABILIDADES_FAILURE,
  DELETE_PROBABILIDADES_REQUEST,
  DELETE_PROBABILIDADES_SUCCESS,
  DELETE_PROBABILIDADES_FAILURE,
  
} from './actions'

const initialState = {
  loading: false,
  probabilidades: [],
  probabilidade: null,
  error: '',
  page: 1
};

const probabilidadeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_PROBABILIDADES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SHOW_PROBABILIDADES_SUCCESS:
      return {
        ...state,
        probabilidade: action.payload,
        loading: false,
      };
    case SHOW_PROBABILIDADES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LISTAR_PROBABILIDADES_REQUEST:
      return {
        ...state,
        page: action.payload.page,
        loading: true,
      };
    case CRIAR_PROBABILIDADES_REQUEST:
    case UPDATE_PROBABILIDADES_REQUEST:
    case DELETE_PROBABILIDADES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LISTAR_PROBABILIDADES_SUCCESS:
      return {
        ...state,
        loading: false,
        probabilidades: action.payload,
        error: '',
      };
    case CRIAR_PROBABILIDADES_SUCCESS:
      return {
        ...state,
        loading: false,
        probabilidades:  [...state.probabilidades, action.payload],
        error: '',
      };
    case UPDATE_PROBABILIDADES_SUCCESS:
      var index = state.probabilidades.findIndex((probabilidade) => probabilidade._id === action.payload._id);
      state.probabilidades[index]= action.payload;
      return {
        ...state,
        loading: false,
        probabilidades: [...state.probabilidades],
        error: '',
      };
    case DELETE_PROBABILIDADES_SUCCESS:
      var index = state.probabilidades.findIndex((probabilidade) => probabilidade._id === action.payload);
      return {
        ...state,
        loading: false,
        probabilidades: [
          ...state.probabilidades.slice(0, index),
          ...state.probabilidades.slice(index + 1)
        ],
        error: '',
      };
    case LISTAR_PROBABILIDADES_FAILURE:
    case CRIAR_PROBABILIDADES_FAILURE:
    case UPDATE_PROBABILIDADES_FAILURE:
    case DELETE_PROBABILIDADES_FAILURE:
      return {
        ...state,
        loading: false,
        probabilidade: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default probabilidadeReducer;
