// actions.js
export const LISTAR_PERIGOS_REQUEST = 'LISTAR_PERIGOS_REQUEST';
export const LISTAR_PERIGOS_SUCCESS = 'LISTAR_PERIGOS_SUCCESS';
export const LISTAR_PERIGOS_FAILURE = 'LISTAR_PERIGOS_FAILURE';

export const SHOW_PERIGOS_REQUEST = 'SHOW_PERIGOS_REQUEST';
export const SHOW_PERIGOS_SUCCESS = 'SHOW_PERIGOS_SUCCESS';
export const SHOW_PERIGOS_FAILURE = 'SHOW_PERIGOS_FAILURE';

export const CRIAR_PERIGOS_REQUEST = 'CRIAR_PERIGOS_REQUEST';
export const CRIAR_PERIGOS_SUCCESS = 'CRIAR_PERIGOS_SUCCESS';
export const CRIAR_PERIGOS_FAILURE = 'CRIAR_PERIGOS_FAILURE';

export const UPDATE_PERIGOS_REQUEST = 'UPDATE_PERIGOS_REQUEST';
export const UPDATE_PERIGOS_SUCCESS = 'UPDATE_PERIGOS_SUCCESS';
export const UPDATE_PERIGOS_FAILURE = 'UPDATE_PERIGOS_FAILURE';

export const DELETE_PERIGOS_REQUEST = 'DELETE_PERIGOS_REQUEST';
export const DELETE_PERIGOS_SUCCESS = 'DELETE_PERIGOS_SUCCESS';
export const DELETE_PERIGOS_FAILURE = 'DELETE_PERIGOS_FAILURE';

export const listarPerigosRequest = (page, ativo) => ({
  type: LISTAR_PERIGOS_REQUEST,
  payload: {page, ativo}
});

export const listarPerigosSuccess = (perigos) => ({
  type: LISTAR_PERIGOS_SUCCESS,
  payload: {perigos}
});

export const listarPerigosFailure = (error) => ({
  type: LISTAR_PERIGOS_FAILURE,
  payload: {error}
});

export const showPerigosRequest = (perigoId) => ({
    type: SHOW_PERIGOS_REQUEST,
    payload: perigoId,
  });
  
  export const showPerigosSuccess = (perigo) => ({
    type: SHOW_PERIGOS_SUCCESS,
    payload: { perigo },
  });
  
  export const showPerigosFailure = (error) => ({
    type: SHOW_PERIGOS_FAILURE,
    payload: { error },
  });
  
  export const criarPerigosRequest = (perigo) => ({
    type: CRIAR_PERIGOS_REQUEST,
    payload: { perigo },
  });
  
  export const criarPerigosSuccess = (perigo) => ({
    type: CRIAR_PERIGOS_SUCCESS,
    payload: { perigo },
  });;
  
  export const criarPerigosFailure = (error) => ({
    type: CRIAR_PERIGOS_FAILURE,
    payload: { error },
  });
  
  export const updatePerigosRequest = (id, perigo) => ({
    type: UPDATE_PERIGOS_REQUEST,
    payload: { id, perigo },
  });
  
  export const updatePerigosSuccess = (perigo) => ({
    type: UPDATE_PERIGOS_SUCCESS,
    payload: { perigo },
  });
  
  export const updatePerigosFailure = (error) => ({
    type: UPDATE_PERIGOS_FAILURE,
    payload: { error },
  });
  
  export const deletePerigosRequest = (id) => ({
    type: DELETE_PERIGOS_REQUEST,
    payload: id,
  });
  
  export const deletePerigosSuccess = (id) => ({
    type: DELETE_PERIGOS_SUCCESS,
    payload: {id},
  });
  
  export const deletePerigosFailure = (error) => ({
    type: DELETE_PERIGOS_FAILURE,
    payload: { error },
  });
  
  
