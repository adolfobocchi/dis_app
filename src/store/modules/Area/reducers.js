import {
  LISTAR_AREAS_REQUEST,
  LISTAR_AREAS_SUCCESS,
  LISTAR_AREAS_FAILURE,
  SHOW_AREAS_REQUEST,
  SHOW_AREAS_SUCCESS,
  SHOW_AREAS_FAILURE,
  CRIAR_AREAS_REQUEST,
  CRIAR_AREAS_SUCCESS,
  CRIAR_AREAS_FAILURE,
  UPDATE_AREAS_REQUEST,
  UPDATE_AREAS_SUCCESS,
  UPDATE_AREAS_FAILURE,
  DELETE_AREAS_REQUEST,
  DELETE_AREAS_SUCCESS,
  DELETE_AREAS_FAILURE,
  
} from './actions'

const initialState = {
  loading: false,
  areas: [],
  area: null,
  error: '',
  page: 1
};

const areaReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_AREAS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SHOW_AREAS_SUCCESS:
      return {
        ...state,
        area: action.payload,
        loading: false,
      };
    case SHOW_AREAS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LISTAR_AREAS_REQUEST:
      return {
        ...state,
        page: action.payload.page,
        loading: true,
      };
    case CRIAR_AREAS_REQUEST:
    case UPDATE_AREAS_REQUEST:
    case DELETE_AREAS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LISTAR_AREAS_SUCCESS:
      return {
        ...state,
        loading: false,
        areas: action.payload,
        error: '',
      };
    case CRIAR_AREAS_SUCCESS:
      return {
        ...state,
        loading: false,
        areas:  [...state.areas, action.payload],
        error: '',
      };
    case UPDATE_AREAS_SUCCESS:
      var index = state.areas.findIndex((area) => area._id === action.payload._id);
      state.areas[index]= action.payload;
      return {
        ...state,
        loading: false,
        areas: [...state.areas],
        error: '',
      };
    case DELETE_AREAS_SUCCESS:
      var index = state.areas.findIndex((area) => area._id === action.payload);
      return {
        ...state,
        loading: false,
        areas: [
          ...state.areas.slice(0, index),
          ...state.areas.slice(index + 1)
        ],
        error: '',
      };
    case LISTAR_AREAS_FAILURE:
    case CRIAR_AREAS_FAILURE:
    case UPDATE_AREAS_FAILURE:
    case DELETE_AREAS_FAILURE:
      return {
        ...state,
        loading: false,
        area: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default areaReducer;
