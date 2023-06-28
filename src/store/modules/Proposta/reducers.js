import {
  LISTAR_PROPOSTAS_REQUEST,
  LISTAR_PROPOSTAS_SUCCESS,
  LISTAR_PROPOSTAS_FAILURE,
  SHOW_PROPOSTAS_REQUEST,
  SHOW_PROPOSTAS_SUCCESS,
  SHOW_PROPOSTAS_FAILURE,
  CRIAR_PROPOSTAS_REQUEST,
  CRIAR_PROPOSTAS_SUCCESS,
  CRIAR_PROPOSTAS_FAILURE,
  UPDATE_PROPOSTAS_REQUEST,
  UPDATE_PROPOSTAS_SUCCESS,
  UPDATE_PROPOSTAS_FAILURE,
  DELETE_PROPOSTAS_REQUEST,
  DELETE_PROPOSTAS_SUCCESS,
  DELETE_PROPOSTAS_FAILURE,
  
} from './actions'

const initialState = {
  loading: false,
  propostas: [],
  proposta: null,
  error: '',
  page: 1
};

const propostaReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_PROPOSTAS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SHOW_PROPOSTAS_SUCCESS:
      return {
        ...state,
        proposta: action.payload,
        loading: false,
      };
    case SHOW_PROPOSTAS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LISTAR_PROPOSTAS_REQUEST:
      return {
        ...state,
        page: action.payload.page,
        loading: true,
      };
    case CRIAR_PROPOSTAS_REQUEST:
    case UPDATE_PROPOSTAS_REQUEST:
    case DELETE_PROPOSTAS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LISTAR_PROPOSTAS_SUCCESS:
      return {
        ...state,
        loading: false,
        propostas: action.payload,
        error: '',
      };
    case CRIAR_PROPOSTAS_SUCCESS:
      return {
        ...state,
        loading: false,
        propostas:  [...state.propostas, action.payload],
        error: '',
      };
    case UPDATE_PROPOSTAS_SUCCESS:
      var index = state.propostas.findIndex((proposta) => proposta._id === action.payload._id);
      state.propostas[index]= action.payload;
      return {
        ...state,
        loading: false,
        propostas: [...state.propostas],
        error: '',
      };
    case DELETE_PROPOSTAS_SUCCESS:
      var index = state.propostas.findIndex((proposta) => proposta._id === action.payload);
      return {
        ...state,
        loading: false,
        propostas: [
          ...state.propostas.slice(0, index),
          ...state.propostas.slice(index + 1)
        ],
        error: '',
      };
    case LISTAR_PROPOSTAS_FAILURE:
    case CRIAR_PROPOSTAS_FAILURE:
    case UPDATE_PROPOSTAS_FAILURE:
    case DELETE_PROPOSTAS_FAILURE:
      return {
        ...state,
        loading: false,
        proposta: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default propostaReducer;
