import {
  LISTAR_PLANOSACAO_REQUEST,
  LISTAR_PLANOSACAO_SUCCESS,
  LISTAR_PLANOSACAO_FAILURE,
  SHOW_PLANOSACAO_REQUEST,
  SHOW_PLANOSACAO_SUCCESS,
  SHOW_PLANOSACAO_FAILURE,
  CRIAR_PLANOSACAO_REQUEST,
  CRIAR_PLANOSACAO_SUCCESS,
  CRIAR_PLANOSACAO_FAILURE,
  UPDATE_PLANOSACAO_REQUEST,
  UPDATE_PLANOSACAO_SUCCESS,
  UPDATE_PLANOSACAO_FAILURE,
  DELETE_PLANOSACAO_REQUEST,
  DELETE_PLANOSACAO_SUCCESS,
  DELETE_PLANOSACAO_FAILURE,
  
} from './actions'

const initialState = {
  loading: false,
  planosAcao: [],
  planoAcao: null,
  error: '',
  page: 1
};

const planoAcaoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_PLANOSACAO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SHOW_PLANOSACAO_SUCCESS:
      return {
        ...state,
        planoAcao: action.payload,
        loading: false,
      };
    case SHOW_PLANOSACAO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LISTAR_PLANOSACAO_REQUEST:
      return {
        ...state,
        page: action.payload.page,
        loading: true,
      };
    case CRIAR_PLANOSACAO_REQUEST:
    case UPDATE_PLANOSACAO_REQUEST:
    case DELETE_PLANOSACAO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LISTAR_PLANOSACAO_SUCCESS:
      return {
        ...state,
        loading: false,
        planosAcao: action.payload,
        error: '',
      };
    case CRIAR_PLANOSACAO_SUCCESS:
      return {
        ...state,
        loading: false,
        planosAcao:  [...state.planosAcao, action.payload],
        error: '',
      };
    case UPDATE_PLANOSACAO_SUCCESS:
      var index = state.planosAcao.findIndex((planoAcao) => planoAcao._id === action.payload._id);
      state.planosAcao[index]= action.payload;
      return {
        ...state,
        loading: false,
        planosAcao: [...state.planosAcao],
        error: '',
      };
    case DELETE_PLANOSACAO_SUCCESS:
      var index = state.planosAcao.findIndex((planoAcao) => planoAcao._id === action.payload);
      return {
        ...state,
        loading: false,
        planosAcao: [
          ...state.planosAcao.slice(0, index),
          ...state.planosAcao.slice(index + 1)
        ],
        error: '',
      };
    case LISTAR_PLANOSACAO_FAILURE:
    case CRIAR_PLANOSACAO_FAILURE:
    case UPDATE_PLANOSACAO_FAILURE:
    case DELETE_PLANOSACAO_FAILURE:
      return {
        ...state,
        loading: false,
        planoAcao: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default planoAcaoReducer;
