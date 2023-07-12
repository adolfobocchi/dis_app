import {
  LISTAR_ATIVIDADES_REQUEST,
  LISTAR_ATIVIDADES_SUCCESS,
  LISTAR_ATIVIDADES_FAILURE,
  SHOW_ATIVIDADES_REQUEST,
  SHOW_ATIVIDADES_SUCCESS,
  SHOW_ATIVIDADES_FAILURE,
  CRIAR_ATIVIDADES_REQUEST,
  CRIAR_ATIVIDADES_SUCCESS,
  CRIAR_ATIVIDADES_FAILURE,
  UPDATE_ATIVIDADES_REQUEST,
  UPDATE_ATIVIDADES_SUCCESS,
  UPDATE_ATIVIDADES_FAILURE,
  DELETE_ATIVIDADES_REQUEST,
  DELETE_ATIVIDADES_SUCCESS,
  DELETE_ATIVIDADES_FAILURE,
  
} from './actions'

const initialState = {
  loading: false,
  atividades: [],
  atividade: null,
  error: '',
  page: 1
};

const atividadeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ATIVIDADES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SHOW_ATIVIDADES_SUCCESS:
      return {
        ...state,
        atividade: action.payload,
        loading: false,
      };
    case SHOW_ATIVIDADES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LISTAR_ATIVIDADES_REQUEST:
      return {
        ...state,
        page: action.payload.page,
        loading: true,
      };
    case CRIAR_ATIVIDADES_REQUEST:
    case UPDATE_ATIVIDADES_REQUEST:
    case DELETE_ATIVIDADES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LISTAR_ATIVIDADES_SUCCESS:
      return {
        ...state,
        loading: false,
        atividades: action.payload,
        error: '',
      };
    case CRIAR_ATIVIDADES_SUCCESS:
      return {
        ...state,
        loading: false,
        atividades:  [...state.atividades, action.payload],
        error: '',
      };
    case UPDATE_ATIVIDADES_SUCCESS:
      var index = state.atividades.findIndex((atividade) => atividade._id === action.payload._id);
      state.atividades[index]= action.payload;
      return {
        ...state,
        loading: false,
        atividades: [...state.atividades],
        error: '',
      };
    case DELETE_ATIVIDADES_SUCCESS:
      var index = state.atividades.findIndex((atividade) => atividade._id === action.payload);
      return {
        ...state,
        loading: false,
        atividades: [
          ...state.atividades.slice(0, index),
          ...state.atividades.slice(index + 1)
        ],
        error: '',
      };
    case LISTAR_ATIVIDADES_FAILURE:
    case CRIAR_ATIVIDADES_FAILURE:
    case UPDATE_ATIVIDADES_FAILURE:
    case DELETE_ATIVIDADES_FAILURE:
      return {
        ...state,
        loading: false,
        atividade: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default atividadeReducer;
