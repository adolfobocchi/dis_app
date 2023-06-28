import {
  LISTAR_CAUSAS_REQUEST,
  LISTAR_CAUSAS_SUCCESS,
  LISTAR_CAUSAS_FAILURE,
  SHOW_CAUSAS_REQUEST,
  SHOW_CAUSAS_SUCCESS,
  SHOW_CAUSAS_FAILURE,
  CRIAR_CAUSAS_REQUEST,
  CRIAR_CAUSAS_SUCCESS,
  CRIAR_CAUSAS_FAILURE,
  UPDATE_CAUSAS_REQUEST,
  UPDATE_CAUSAS_SUCCESS,
  UPDATE_CAUSAS_FAILURE,
  DELETE_CAUSAS_REQUEST,
  DELETE_CAUSAS_SUCCESS,
  DELETE_CAUSAS_FAILURE,
  
} from './actions'

const initialState = {
  loading: false,
  causas: [],
  causa: null,
  error: '',
  page: 1
};

const causaReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CAUSAS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SHOW_CAUSAS_SUCCESS:
      return {
        ...state,
        causa: action.payload,
        loading: false,
      };
    case SHOW_CAUSAS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LISTAR_CAUSAS_REQUEST:
      return {
        ...state,
        page: action.payload.page,
        loading: true,
      };
    case CRIAR_CAUSAS_REQUEST:
    case UPDATE_CAUSAS_REQUEST:
    case DELETE_CAUSAS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LISTAR_CAUSAS_SUCCESS:
      return {
        ...state,
        loading: false,
        causas: action.payload,
        error: '',
      };
    case CRIAR_CAUSAS_SUCCESS:
      return {
        ...state,
        loading: false,
        causas:  [...state.causas, action.payload],
        error: '',
      };
    case UPDATE_CAUSAS_SUCCESS:
      var index = state.causas.findIndex((causa) => causa._id === action.payload._id);
      state.causas[index]= action.payload;
      return {
        ...state,
        loading: false,
        causas: [...state.causas],
        error: '',
      };
    case DELETE_CAUSAS_SUCCESS:
      var index = state.causas.findIndex((causa) => causa._id === action.payload);
      return {
        ...state,
        loading: false,
        causas: [
          ...state.causas.slice(0, index),
          ...state.causas.slice(index + 1)
        ],
        error: '',
      };
    case LISTAR_CAUSAS_FAILURE:
    case CRIAR_CAUSAS_FAILURE:
    case UPDATE_CAUSAS_FAILURE:
    case DELETE_CAUSAS_FAILURE:
      return {
        ...state,
        loading: false,
        causa: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default causaReducer;
