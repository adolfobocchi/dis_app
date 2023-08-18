import {
  LISTAR_DIS_REQUEST,
  LISTAR_DIS_SUCCESS,
  LISTAR_DIS_FAILURE,
  SHOW_DIS_REQUEST,
  SHOW_DIS_SUCCESS,
  SHOW_DIS_FAILURE,
  CRIAR_DIS_REQUEST,
  CRIAR_DIS_SUCCESS,
  CRIAR_DIS_FAILURE,
  UPDATE_DIS_REQUEST,
  UPDATE_DIS_SUCCESS,
  UPDATE_DIS_FAILURE,
  DELETE_DIS_REQUEST,
  DELETE_DIS_SUCCESS,
  DELETE_DIS_FAILURE,
  SET_DIS,
  
} from './actions'

const initialState = {
  loading: false,
  disList: [],
  dis: null,
  error: '',
  page: 1,
  setores: [],
};

const disReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_DIS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SHOW_DIS_SUCCESS:
      return {
        ...state,
        dis: action.payload,
        loading: false,
      };
    case SHOW_DIS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LISTAR_DIS_REQUEST:
      return {
        ...state,
        page: action.payload.page,
        loading: true,
      };
    case CRIAR_DIS_REQUEST:
    case UPDATE_DIS_REQUEST:
    case DELETE_DIS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LISTAR_DIS_SUCCESS:
      return {
        ...state,
        loading: false,
        disList: action.payload,
        error: '',
      };
    case CRIAR_DIS_SUCCESS:
      return {
        ...state,
        loading: false,
        disList: [...state.disList, action.payload],
        setores: [],
        error: '',
      };
    case UPDATE_DIS_SUCCESS:
      var index = state.disList.findIndex((dis) => dis._id === action.payload._id);
      state.disList[index] = action.payload;
      return {
        ...state,
        loading: false,
        disList: [...state.disList],
        setores: [],
        error: '',
      };
    case DELETE_DIS_SUCCESS:
      var index = state.disList.findIndex((dis) => dis._id === action.payload);
      return {
        ...state,
        loading: false,
        disList: [
          ...state.disList.slice(0, index),
          ...state.disList.slice(index + 1)
        ],
        setores: [],
        error: '',
      };
    case LISTAR_DIS_FAILURE:
    case CRIAR_DIS_FAILURE:
    case UPDATE_DIS_FAILURE:
    case DELETE_DIS_FAILURE:
      return {
        ...state,
        loading: false,
        dis: null,
        setores: [],
        error: action.payload,
      };
    case SET_DIS:
      return {
        ...state,
        loading: false,
        dis: { ...state.disList[action.payload] },
        setores: [...state.disList[action.payload].setores],
        error: '',
      };
      default:
    return state;
  }
};

export default disReducer;
