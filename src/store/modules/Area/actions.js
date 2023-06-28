// actions.js
export const LISTAR_AREAS_REQUEST = 'LISTAR_AREAS_REQUEST';
export const LISTAR_AREAS_SUCCESS = 'LISTAR_AREAS_SUCCESS';
export const LISTAR_AREAS_FAILURE = 'LISTAR_AREAS_FAILURE';

export const SHOW_AREAS_REQUEST = 'SHOW_AREAS_REQUEST';
export const SHOW_AREAS_SUCCESS = 'SHOW_AREAS_SUCCESS';
export const SHOW_AREAS_FAILURE = 'SHOW_AREAS_FAILURE';

export const CRIAR_AREAS_REQUEST = 'CRIAR_AREAS_REQUEST';
export const CRIAR_AREAS_SUCCESS = 'CRIAR_AREAS_SUCCESS';
export const CRIAR_AREAS_FAILURE = 'CRIAR_AREAS_FAILURE';

export const UPDATE_AREAS_REQUEST = 'UPDATE_AREAS_REQUEST';
export const UPDATE_AREAS_SUCCESS = 'UPDATE_AREAS_SUCCESS';
export const UPDATE_AREAS_FAILURE = 'UPDATE_AREAS_FAILURE';

export const DELETE_AREAS_REQUEST = 'DELETE_AREAS_REQUEST';
export const DELETE_AREAS_SUCCESS = 'DELETE_AREAS_SUCCESS';
export const DELETE_AREAS_FAILURE = 'DELETE_AREAS_FAILURE';

export const listarAreasRequest = (page, ativo) => ({
  type: LISTAR_AREAS_REQUEST,
  payload: {page, ativo}
});

export const listarAreasSuccess = (areas) => ({
  type: LISTAR_AREAS_SUCCESS,
  payload: {areas}
});

export const listarAreasFailure = (error) => ({
  type: LISTAR_AREAS_FAILURE,
  payload: {error}
});

export const showAreasRequest = (areaId) => ({
    type: SHOW_AREAS_REQUEST,
    payload: areaId,
  });
  
  export const showAreasSuccess = (area) => ({
    type: SHOW_AREAS_SUCCESS,
    payload: { area },
  });
  
  export const showAreasFailure = (error) => ({
    type: SHOW_AREAS_FAILURE,
    payload: { error },
  });
  
  export const criarAreasRequest = (area) => ({
    type: CRIAR_AREAS_REQUEST,
    payload: { area },
  });
  
  export const criarAreasSuccess = (area) => ({
    type: CRIAR_AREAS_SUCCESS,
    payload: { area },
  });;
  
  export const criarAreasFailure = (error) => ({
    type: CRIAR_AREAS_FAILURE,
    payload: { error },
  });
  
  export const updateAreasRequest = (id, area) => ({
    type: UPDATE_AREAS_REQUEST,
    payload: { id, area },
  });
  
  export const updateAreasSuccess = (area) => ({
    type: UPDATE_AREAS_SUCCESS,
    payload: { area },
  });
  
  export const updateAreasFailure = (error) => ({
    type: UPDATE_AREAS_FAILURE,
    payload: { error },
  });
  
  export const deleteAreasRequest = (id) => ({
    type: DELETE_AREAS_REQUEST,
    payload: id,
  });
  
  export const deleteAreasSuccess = (id) => ({
    type: DELETE_AREAS_SUCCESS,
    payload: {id},
  });
  
  export const deleteAreasFailure = (error) => ({
    type: DELETE_AREAS_FAILURE,
    payload: { error },
  });
  
  
