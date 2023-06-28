import {
  LISTAR_RECURSOS_REQUEST,
  LISTAR_RECURSOS_SUCCESS,
  LISTAR_RECURSOS_FAILURE,
  SHOW_RECURSOS_REQUEST,
  SHOW_RECURSOS_SUCCESS,
  SHOW_RECURSOS_FAILURE,
  CRIAR_RECURSOS_REQUEST,
  CRIAR_RECURSOS_SUCCESS,
  CRIAR_RECURSOS_FAILURE,
  UPDATE_RECURSOS_REQUEST,
  UPDATE_RECURSOS_SUCCESS,
  UPDATE_RECURSOS_FAILURE,
  DELETE_RECURSOS_REQUEST,
  DELETE_RECURSOS_SUCCESS,
  DELETE_RECURSOS_FAILURE,
  
} from './actions'

const initialState = {
  loading: false,
  recursos: [],
  recurso: null,
  error: '',
  page: 1
};

const recursoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_RECURSOS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SHOW_RECURSOS_SUCCESS:
      return {
        ...state,
        recurso: action.payload,
        loading: false,
      };
    case SHOW_RECURSOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LISTAR_RECURSOS_REQUEST:
      return {
        ...state,
        page: action.payload.page,
        loading: true,
      };
    case CRIAR_RECURSOS_REQUEST:
    case UPDATE_RECURSOS_REQUEST:
    case DELETE_RECURSOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LISTAR_RECURSOS_SUCCESS:
      return {
        ...state,
        loading: false,
        recursos: action.payload,
        error: '',
      };
    case CRIAR_RECURSOS_SUCCESS:
      return {
        ...state,
        loading: false,
        recursos:  [...state.recursos, action.payload],
        error: '',
      };
    case UPDATE_RECURSOS_SUCCESS:
      var index = state.recursos.findIndex((recurso) => recurso._id === action.payload._id);
      state.recursos[index]= action.payload;
      return {
        ...state,
        loading: false,
        recursos: [...state.recursos],
        error: '',
      };
    case DELETE_RECURSOS_SUCCESS:
      var index = state.recursos.findIndex((recurso) => recurso._id === action.payload);
      return {
        ...state,
        loading: false,
        recursos: [
          ...state.recursos.slice(0, index),
          ...state.recursos.slice(index + 1)
        ],
        error: '',
      };
    case LISTAR_RECURSOS_FAILURE:
    case CRIAR_RECURSOS_FAILURE:
    case UPDATE_RECURSOS_FAILURE:
    case DELETE_RECURSOS_FAILURE:
      return {
        ...state,
        loading: false,
        recurso: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default recursoReducer;
