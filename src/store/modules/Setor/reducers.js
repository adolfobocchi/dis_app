import {
  LISTAR_SETORES_REQUEST,
  LISTAR_SETORES_SUCCESS,
  LISTAR_SETORES_FAILURE,
  SHOW_SETORES_REQUEST,
  SHOW_SETORES_SUCCESS,
  SHOW_SETORES_FAILURE,
  CRIAR_SETORES_REQUEST,
  CRIAR_SETORES_SUCCESS,
  CRIAR_SETORES_FAILURE,
  UPDATE_SETORES_REQUEST,
  UPDATE_SETORES_SUCCESS,
  UPDATE_SETORES_FAILURE,
  DELETE_SETORES_REQUEST,
  DELETE_SETORES_SUCCESS,
  DELETE_SETORES_FAILURE,
  
} from './actions'

const initialState = {
  loading: false,
  setores: [],
  setor: null,
  error: '',
  page: 1
};

const setorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SETORES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SHOW_SETORES_SUCCESS:
      return {
        ...state,
        setor: action.payload,
        loading: false,
      };
    case SHOW_SETORES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LISTAR_SETORES_REQUEST:
      return {
        ...state,
        page: action.payload.page,
        loading: true,
      };
    case CRIAR_SETORES_REQUEST:
    case UPDATE_SETORES_REQUEST:
    case DELETE_SETORES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LISTAR_SETORES_SUCCESS:
      return {
        ...state,
        loading: false,
        setores: action.payload,
        error: '',
      };
    case CRIAR_SETORES_SUCCESS:
      return {
        ...state,
        loading: false,
        setores:  [...state.setores, action.payload],
        error: '',
      };
    case UPDATE_SETORES_SUCCESS:
      var index = state.setores.findIndex((setor) => setor._id === action.payload._id);
      state.setores[index]= action.payload;
      return {
        ...state,
        loading: false,
        setores: [...state.setores],
        error: '',
      };
    case DELETE_SETORES_SUCCESS:
      var index = state.setores.findIndex((setor) => setor._id === action.payload);
      return {
        ...state,
        loading: false,
        setores: [
          ...state.setores.slice(0, index),
          ...state.setores.slice(index + 1)
        ],
        error: '',
      };
    case LISTAR_SETORES_FAILURE:
    case CRIAR_SETORES_FAILURE:
    case UPDATE_SETORES_FAILURE:
    case DELETE_SETORES_FAILURE:
      return {
        ...state,
        loading: false,
        setor: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default setorReducer;
