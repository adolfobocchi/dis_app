// actions.js
export const LISTAR_VIDEOS_REQUEST = 'LISTAR_VIDEOS_REQUEST';
export const LISTAR_VIDEOS_SUCCESS = 'LISTAR_VIDEOS_SUCCESS';
export const LISTAR_VIDEOS_FAILURE = 'LISTAR_VIDEOS_FAILURE';

export const SHOW_VIDEOS_REQUEST = 'SHOW_VIDEOS_REQUEST';
export const SHOW_VIDEOS_SUCCESS = 'SHOW_VIDEOS_SUCCESS';
export const SHOW_VIDEOS_FAILURE = 'SHOW_VIDEOS_FAILURE';

export const CRIAR_VIDEOS_REQUEST = 'CRIAR_VIDEOS_REQUEST';
export const CRIAR_VIDEOS_SUCCESS = 'CRIAR_VIDEOS_SUCCESS';
export const CRIAR_VIDEOS_FAILURE = 'CRIAR_VIDEOS_FAILURE';

export const UPDATE_VIDEOS_REQUEST = 'UPDATE_VIDEOS_REQUEST';
export const UPDATE_VIDEOS_SUCCESS = 'UPDATE_VIDEOS_SUCCESS';
export const UPDATE_VIDEOS_FAILURE = 'UPDATE_VIDEOS_FAILURE';

export const DELETE_VIDEOS_REQUEST = 'DELETE_VIDEOS_REQUEST';
export const DELETE_VIDEOS_SUCCESS = 'DELETE_VIDEOS_SUCCESS';
export const DELETE_VIDEOS_FAILURE = 'DELETE_VIDEOS_FAILURE';

export const listarVideosRequest = (page, ativo) => ({
  type: LISTAR_VIDEOS_REQUEST,
  payload: {page, ativo}
});

export const listarVideosSuccess = (videos) => ({
  type: LISTAR_VIDEOS_SUCCESS,
  payload: {videos}
});

export const listarVideosFailure = (error) => ({
  type: LISTAR_VIDEOS_FAILURE,
  payload: {error}
});

export const showVideosRequest = (videoId) => ({
    type: SHOW_VIDEOS_REQUEST,
    payload: videoId,
  });
  
  export const showVideosSuccess = (video) => ({
    type: SHOW_VIDEOS_SUCCESS,
    payload: { video },
  });
  
  export const showVideosFailure = (error) => ({
    type: SHOW_VIDEOS_FAILURE,
    payload: { error },
  });
  
  export const criarVideosRequest = (video) => ({
    type: CRIAR_VIDEOS_REQUEST,
    payload: { video },
  });
  
  export const criarVideosSuccess = (video) => ({
    type: CRIAR_VIDEOS_SUCCESS,
    payload: { video },
  });;
  
  export const criarVideosFailure = (error) => ({
    type: CRIAR_VIDEOS_FAILURE,
    payload: { error },
  });
  
  export const updateVideosRequest = (id, video) => ({
    type: UPDATE_VIDEOS_REQUEST,
    payload: { id, video },
  });
  
  export const updateVideosSuccess = (video) => ({
    type: UPDATE_VIDEOS_SUCCESS,
    payload: { video },
  });
  
  export const updateVideosFailure = (error) => ({
    type: UPDATE_VIDEOS_FAILURE,
    payload: { error },
  });
  
  export const deleteVideosRequest = (id) => ({
    type: DELETE_VIDEOS_REQUEST,
    payload: id,
  });
  
  export const deleteVideosSuccess = (id) => ({
    type: DELETE_VIDEOS_SUCCESS,
    payload: {id},
  });
  
  export const deleteVideosFailure = (error) => ({
    type: DELETE_VIDEOS_FAILURE,
    payload: { error },
  });
  
  
