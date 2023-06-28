import {
  LISTAR_RISCOS_REQUEST,
  LISTAR_RISCOS_SUCCESS,
  LISTAR_RISCOS_FAILURE,
  SHOW_RISCOS_REQUEST,
  SHOW_RISCOS_SUCCESS,
  SHOW_RISCOS_FAILURE,
  CRIAR_RISCOS_REQUEST,
  CRIAR_RISCOS_SUCCESS,
  CRIAR_RISCOS_FAILURE,
  UPDATE_RISCOS_REQUEST,
  UPDATE_RISCOS_SUCCESS,
  UPDATE_RISCOS_FAILURE,
  DELETE_RISCOS_REQUEST,
  DELETE_RISCOS_SUCCESS,
  DELETE_RISCOS_FAILURE,
  
} from './actions'

const initialState = {
  loading: false,
  riscos: [],
  risco: null,
  error: '',
  page: 1
};

const riscoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_RISCOS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SHOW_RISCOS_SUCCESS:
      return {
        ...state,
        risco: action.payload,
        loading: false,
      };
    case SHOW_RISCOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LISTAR_RISCOS_REQUEST:
      return {
        ...state,
        page: action.payload.page,
        loading: true,
      };
    case CRIAR_RISCOS_REQUEST:
    case UPDATE_RISCOS_REQUEST:
    case DELETE_RISCOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LISTAR_RISCOS_SUCCESS:
      return {
        ...state,
        loading: false,
        riscos: action.payload,
        error: '',
      };
    case CRIAR_RISCOS_SUCCESS:
      return {
        ...state,
        loading: false,
        riscos:  [...state.riscos, action.payload],
        error: '',
      };
    case UPDATE_RISCOS_SUCCESS:
      var index = state.riscos.findIndex((risco) => risco._id === action.payload._id);
      state.riscos[index]= action.payload;
      return {
        ...state,
        loading: false,
        riscos: [...state.riscos],
        error: '',
      };
    case DELETE_RISCOS_SUCCESS:
      var index = state.riscos.findIndex((risco) => risco._id === action.payload);
      return {
        ...state,
        loading: false,
        riscos: [
          ...state.riscos.slice(0, index),
          ...state.riscos.slice(index + 1)
        ],
        error: '',
      };
    case LISTAR_RISCOS_FAILURE:
    case CRIAR_RISCOS_FAILURE:
    case UPDATE_RISCOS_FAILURE:
    case DELETE_RISCOS_FAILURE:
      return {
        ...state,
        loading: false,
        risco: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default riscoReducer;
