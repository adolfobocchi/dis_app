import {
  LISTAR_VIDEOS_REQUEST,
  LISTAR_VIDEOS_SUCCESS,
  LISTAR_VIDEOS_FAILURE,
  SHOW_VIDEOS_REQUEST,
  SHOW_VIDEOS_SUCCESS,
  SHOW_VIDEOS_FAILURE,
  CRIAR_VIDEOS_REQUEST,
  CRIAR_VIDEOS_SUCCESS,
  CRIAR_VIDEOS_FAILURE,
  UPDATE_VIDEOS_REQUEST,
  UPDATE_VIDEOS_SUCCESS,
  UPDATE_VIDEOS_FAILURE,
  DELETE_VIDEOS_REQUEST,
  DELETE_VIDEOS_SUCCESS,
  DELETE_VIDEOS_FAILURE,
  
} from './actions'

const initialState = {
  loading: false,
  videos: [],
  video: null,
  error: '',
  page: 1
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SHOW_VIDEOS_SUCCESS:
      return {
        ...state,
        video: action.payload,
        loading: false,
      };
    case SHOW_VIDEOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LISTAR_VIDEOS_REQUEST:
      return {
        ...state,
        page: action.payload.page,
        loading: true,
      };
    case CRIAR_VIDEOS_REQUEST:
    case UPDATE_VIDEOS_REQUEST:
    case DELETE_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LISTAR_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: action.payload,
        error: '',
      };
    case CRIAR_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        videos:  [...state.videos, action.payload],
        error: '',
      };
    case UPDATE_VIDEOS_SUCCESS:
      var index = state.videos.findIndex((video) => video._id === action.payload._id);
      state.videos[index]= action.payload;
      return {
        ...state,
        loading: false,
        videos: [...state.videos],
        error: '',
      };
    case DELETE_VIDEOS_SUCCESS:
      var index = state.videos.findIndex((video) => video._id === action.payload);
      return {
        ...state,
        loading: false,
        videos: [
          ...state.videos.slice(0, index),
          ...state.videos.slice(index + 1)
        ],
        error: '',
      };
    case LISTAR_VIDEOS_FAILURE:
    case CRIAR_VIDEOS_FAILURE:
    case UPDATE_VIDEOS_FAILURE:
    case DELETE_VIDEOS_FAILURE:
      return {
        ...state,
        loading: false,
        video: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default videoReducer;
