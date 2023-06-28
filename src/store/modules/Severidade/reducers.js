import {
  LISTAR_SEVERIDADES_REQUEST,
  LISTAR_SEVERIDADES_SUCCESS,
  LISTAR_SEVERIDADES_FAILURE,
  SHOW_SEVERIDADES_REQUEST,
  SHOW_SEVERIDADES_SUCCESS,
  SHOW_SEVERIDADES_FAILURE,
  CRIAR_SEVERIDADES_REQUEST,
  CRIAR_SEVERIDADES_SUCCESS,
  CRIAR_SEVERIDADES_FAILURE,
  UPDATE_SEVERIDADES_REQUEST,
  UPDATE_SEVERIDADES_SUCCESS,
  UPDATE_SEVERIDADES_FAILURE,
  DELETE_SEVERIDADES_REQUEST,
  DELETE_SEVERIDADES_SUCCESS,
  DELETE_SEVERIDADES_FAILURE,
  
} from './actions'

const initialState = {
  loading: false,
  severidades: [],
  severidade: null,
  error: '',
  page: 1
};

const severidadeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SEVERIDADES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SHOW_SEVERIDADES_SUCCESS:
      return {
        ...state,
        severidade: action.payload,
        loading: false,
      };
    case SHOW_SEVERIDADES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LISTAR_SEVERIDADES_REQUEST:
      return {
        ...state,
        page: action.payload.page,
        loading: true,
      };
    case CRIAR_SEVERIDADES_REQUEST:
    case UPDATE_SEVERIDADES_REQUEST:
    case DELETE_SEVERIDADES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LISTAR_SEVERIDADES_SUCCESS:
      return {
        ...state,
        loading: false,
        severidades: action.payload,
        error: '',
      };
    case CRIAR_SEVERIDADES_SUCCESS:
      return {
        ...state,
        loading: false,
        severidades:  [...state.severidades, action.payload],
        error: '',
      };
    case UPDATE_SEVERIDADES_SUCCESS:
      var index = state.severidades.findIndex((severidade) => severidade._id === action.payload._id);
      state.severidades[index]= action.payload;
      return {
        ...state,
        loading: false,
        severidades: [...state.severidades],
        error: '',
      };
    case DELETE_SEVERIDADES_SUCCESS:
      var index = state.severidades.findIndex((severidade) => severidade._id === action.payload);
      return {
        ...state,
        loading: false,
        severidades: [
          ...state.severidades.slice(0, index),
          ...state.severidades.slice(index + 1)
        ],
        error: '',
      };
    case LISTAR_SEVERIDADES_FAILURE:
    case CRIAR_SEVERIDADES_FAILURE:
    case UPDATE_SEVERIDADES_FAILURE:
    case DELETE_SEVERIDADES_FAILURE:
      return {
        ...state,
        loading: false,
        severidade: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default severidadeReducer;
