// actions.js
export const LISTAR_RECURSOS_REQUEST = 'LISTAR_RECURSOS_REQUEST';
export const LISTAR_RECURSOS_SUCCESS = 'LISTAR_RECURSOS_SUCCESS';
export const LISTAR_RECURSOS_FAILURE = 'LISTAR_RECURSOS_FAILURE';

export const SHOW_RECURSOS_REQUEST = 'SHOW_RECURSOS_REQUEST';
export const SHOW_RECURSOS_SUCCESS = 'SHOW_RECURSOS_SUCCESS';
export const SHOW_RECURSOS_FAILURE = 'SHOW_RECURSOS_FAILURE';

export const CRIAR_RECURSOS_REQUEST = 'CRIAR_RECURSOS_REQUEST';
export const CRIAR_RECURSOS_SUCCESS = 'CRIAR_RECURSOS_SUCCESS';
export const CRIAR_RECURSOS_FAILURE = 'CRIAR_RECURSOS_FAILURE';

export const UPDATE_RECURSOS_REQUEST = 'UPDATE_RECURSOS_REQUEST';
export const UPDATE_RECURSOS_SUCCESS = 'UPDATE_RECURSOS_SUCCESS';
export const UPDATE_RECURSOS_FAILURE = 'UPDATE_RECURSOS_FAILURE';

export const DELETE_RECURSOS_REQUEST = 'DELETE_RECURSOS_REQUEST';
export const DELETE_RECURSOS_SUCCESS = 'DELETE_RECURSOS_SUCCESS';
export const DELETE_RECURSOS_FAILURE = 'DELETE_RECURSOS_FAILURE';

export const listarRecursosRequest = (page, ativo) => ({
  type: LISTAR_RECURSOS_REQUEST,
  payload: {page, ativo}
});

export const listarRecursosSuccess = (recursos) => ({
  type: LISTAR_RECURSOS_SUCCESS,
  payload: {recursos}
});

export const listarRecursosFailure = (error) => ({
  type: LISTAR_RECURSOS_FAILURE,
  payload: {error}
});

export const showRecursosRequest = (recursoId) => ({
    type: SHOW_RECURSOS_REQUEST,
    payload: recursoId,
  });
  
  export const showRecursosSuccess = (recurso) => ({
    type: SHOW_RECURSOS_SUCCESS,
    payload: { recurso },
  });
  
  export const showRecursosFailure = (error) => ({
    type: SHOW_RECURSOS_FAILURE,
    payload: { error },
  });
  
  export const criarRecursosRequest = (recurso) => ({
    type: CRIAR_RECURSOS_REQUEST,
    payload: { recurso },
  });
  
  export const criarRecursosSuccess = (recurso) => ({
    type: CRIAR_RECURSOS_SUCCESS,
    payload: { recurso },
  });;
  
  export const criarRecursosFailure = (error) => ({
    type: CRIAR_RECURSOS_FAILURE,
    payload: { error },
  });
  
  export const updateRecursosRequest = (id, recurso) => ({
    type: UPDATE_RECURSOS_REQUEST,
    payload: { id, recurso },
  });
  
  export const updateRecursosSuccess = (recurso) => ({
    type: UPDATE_RECURSOS_SUCCESS,
    payload: { recurso },
  });
  
  export const updateRecursosFailure = (error) => ({
    type: UPDATE_RECURSOS_FAILURE,
    payload: { error },
  });
  
  export const deleteRecursosRequest = (id) => ({
    type: DELETE_RECURSOS_REQUEST,
    payload: id,
  });
  
  export const deleteRecursosSuccess = (id) => ({
    type: DELETE_RECURSOS_SUCCESS,
    payload: {id},
  });
  
  export const deleteRecursosFailure = (error) => ({
    type: DELETE_RECURSOS_FAILURE,
    payload: { error },
  });
  
  
