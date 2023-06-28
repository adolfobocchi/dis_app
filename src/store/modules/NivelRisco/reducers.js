import {
  LISTAR_NIVELRISCOS_REQUEST,
  LISTAR_NIVELRISCOS_SUCCESS,
  LISTAR_NIVELRISCOS_FAILURE,
  SHOW_NIVELRISCOS_REQUEST,
  SHOW_NIVELRISCOS_SUCCESS,
  SHOW_NIVELRISCOS_FAILURE,
  CRIAR_NIVELRISCOS_REQUEST,
  CRIAR_NIVELRISCOS_SUCCESS,
  CRIAR_NIVELRISCOS_FAILURE,
  UPDATE_NIVELRISCOS_REQUEST,
  UPDATE_NIVELRISCOS_SUCCESS,
  UPDATE_NIVELRISCOS_FAILURE,
  DELETE_NIVELRISCOS_REQUEST,
  DELETE_NIVELRISCOS_SUCCESS,
  DELETE_NIVELRISCOS_FAILURE,
  
} from './actions'

const initialState = {
  loading: false,
  nivelriscos: [],
  nivelrisco: null,
  error: '',
  page: 1
};

const nivelriscoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NIVELRISCOS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SHOW_NIVELRISCOS_SUCCESS:
      return {
        ...state,
        nivelrisco: action.payload,
        loading: false,
      };
    case SHOW_NIVELRISCOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LISTAR_NIVELRISCOS_REQUEST:
      return {
        ...state,
        page: action.payload.page,
        loading: true,
      };
    case CRIAR_NIVELRISCOS_REQUEST:
    case UPDATE_NIVELRISCOS_REQUEST:
    case DELETE_NIVELRISCOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LISTAR_NIVELRISCOS_SUCCESS:
      return {
        ...state,
        loading: false,
        nivelriscos: action.payload,
        error: '',
      };
    case CRIAR_NIVELRISCOS_SUCCESS:
      return {
        ...state,
        loading: false,
        nivelriscos:  [...state.nivelriscos, action.payload],
        error: '',
      };
    case UPDATE_NIVELRISCOS_SUCCESS:
      var index = state.nivelriscos.findIndex((nivelrisco) => nivelrisco._id === action.payload._id);
      state.nivelriscos[index]= action.payload;
      return {
        ...state,
        loading: false,
        nivelriscos: [...state.nivelriscos],
        error: '',
      };
    case DELETE_NIVELRISCOS_SUCCESS:
      var index = state.nivelriscos.findIndex((nivelrisco) => nivelrisco._id === action.payload);
      return {
        ...state,
        loading: false,
        nivelriscos: [
          ...state.nivelriscos.slice(0, index),
          ...state.nivelriscos.slice(index + 1)
        ],
        error: '',
      };
    case LISTAR_NIVELRISCOS_FAILURE:
    case CRIAR_NIVELRISCOS_FAILURE:
    case UPDATE_NIVELRISCOS_FAILURE:
    case DELETE_NIVELRISCOS_FAILURE:
      return {
        ...state,
        loading: false,
        nivelrisco: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default nivelriscoReducer;
