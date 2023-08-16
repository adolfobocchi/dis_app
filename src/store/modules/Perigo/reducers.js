import {
  LISTAR_PERIGOS_REQUEST,
  LISTAR_PERIGOS_SUCCESS,
  LISTAR_PERIGOS_FAILURE,
  SHOW_PERIGOS_REQUEST,
  SHOW_PERIGOS_SUCCESS,
  SHOW_PERIGOS_FAILURE,
  CRIAR_PERIGOS_REQUEST,
  CRIAR_PERIGOS_SUCCESS,
  CRIAR_PERIGOS_FAILURE,
  UPDATE_PERIGOS_REQUEST,
  UPDATE_PERIGOS_SUCCESS,
  UPDATE_PERIGOS_FAILURE,
  DELETE_PERIGOS_REQUEST,
  DELETE_PERIGOS_SUCCESS,
  DELETE_PERIGOS_FAILURE,
  
} from './actions'

const initialState = {
  loading: false,
  perigos: [],
  perigo: null,
  error: '',
  page: 1
};

const perigoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_PERIGOS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SHOW_PERIGOS_SUCCESS:
      return {
        ...state,
        perigo: action.payload,
        loading: false,
      };
    case SHOW_PERIGOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LISTAR_PERIGOS_REQUEST:
      return {
        ...state,
        page: action.payload.page,
        loading: true,
      };
    case CRIAR_PERIGOS_REQUEST:
    case UPDATE_PERIGOS_REQUEST:
    case DELETE_PERIGOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LISTAR_PERIGOS_SUCCESS:
      return {
        ...state,
        loading: false,
        perigos: action.payload,
        error: '',
      };
    case CRIAR_PERIGOS_SUCCESS:
      return {
        ...state,
        loading: false,
        perigos:  [...state.perigos, action.payload],
        error: '',
      };
    case UPDATE_PERIGOS_SUCCESS:
      var index = state.perigos.findIndex((perigo) => perigo._id === action.payload._id);
      state.perigos[index]= action.payload;
      return {
        ...state,
        loading: false,
        perigos: [...state.perigos],
        error: '',
      };
    case DELETE_PERIGOS_SUCCESS:
      var index = state.perigos.findIndex((perigo) => perigo._id === action.payload);
      return {
        ...state,
        loading: false,
        perigos: [
          ...state.perigos.slice(0, index),
          ...state.perigos.slice(index + 1)
        ],
        error: '',
      };
    case LISTAR_PERIGOS_FAILURE:
    case CRIAR_PERIGOS_FAILURE:
    case UPDATE_PERIGOS_FAILURE:
    case DELETE_PERIGOS_FAILURE:
      return {
        ...state,
        loading: false,
        perigo: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default perigoReducer;
