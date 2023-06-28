// actions.js
export const LISTAR_CAUSAS_REQUEST = 'LISTAR_CAUSAS_REQUEST';
export const LISTAR_CAUSAS_SUCCESS = 'LISTAR_CAUSAS_SUCCESS';
export const LISTAR_CAUSAS_FAILURE = 'LISTAR_CAUSAS_FAILURE';

export const SHOW_CAUSAS_REQUEST = 'SHOW_CAUSAS_REQUEST';
export const SHOW_CAUSAS_SUCCESS = 'SHOW_CAUSAS_SUCCESS';
export const SHOW_CAUSAS_FAILURE = 'SHOW_CAUSAS_FAILURE';

export const CRIAR_CAUSAS_REQUEST = 'CRIAR_CAUSAS_REQUEST';
export const CRIAR_CAUSAS_SUCCESS = 'CRIAR_CAUSAS_SUCCESS';
export const CRIAR_CAUSAS_FAILURE = 'CRIAR_CAUSAS_FAILURE';

export const UPDATE_CAUSAS_REQUEST = 'UPDATE_CAUSAS_REQUEST';
export const UPDATE_CAUSAS_SUCCESS = 'UPDATE_CAUSAS_SUCCESS';
export const UPDATE_CAUSAS_FAILURE = 'UPDATE_CAUSAS_FAILURE';

export const DELETE_CAUSAS_REQUEST = 'DELETE_CAUSAS_REQUEST';
export const DELETE_CAUSAS_SUCCESS = 'DELETE_CAUSAS_SUCCESS';
export const DELETE_CAUSAS_FAILURE = 'DELETE_CAUSAS_FAILURE';

export const listarCausasRequest = (page, ativo) => ({
  type: LISTAR_CAUSAS_REQUEST,
  payload: {page, ativo}
});

export const listarCausasSuccess = (causas) => ({
  type: LISTAR_CAUSAS_SUCCESS,
  payload: {causas}
});

export const listarCausasFailure = (error) => ({
  type: LISTAR_CAUSAS_FAILURE,
  payload: {error}
});

export const showCausasRequest = (causaId) => ({
    type: SHOW_CAUSAS_REQUEST,
    payload: causaId,
  });
  
  export const showCausasSuccess = (causa) => ({
    type: SHOW_CAUSAS_SUCCESS,
    payload: { causa },
  });
  
  export const showCausasFailure = (error) => ({
    type: SHOW_CAUSAS_FAILURE,
    payload: { error },
  });
  
  export const criarCausasRequest = (causa) => ({
    type: CRIAR_CAUSAS_REQUEST,
    payload: { causa },
  });
  
  export const criarCausasSuccess = (causa) => ({
    type: CRIAR_CAUSAS_SUCCESS,
    payload: { causa },
  });;
  
  export const criarCausasFailure = (error) => ({
    type: CRIAR_CAUSAS_FAILURE,
    payload: { error },
  });
  
  export const updateCausasRequest = (id, causa) => ({
    type: UPDATE_CAUSAS_REQUEST,
    payload: { id, causa },
  });
  
  export const updateCausasSuccess = (causa) => ({
    type: UPDATE_CAUSAS_SUCCESS,
    payload: { causa },
  });
  
  export const updateCausasFailure = (error) => ({
    type: UPDATE_CAUSAS_FAILURE,
    payload: { error },
  });
  
  export const deleteCausasRequest = (id) => ({
    type: DELETE_CAUSAS_REQUEST,
    payload: id,
  });
  
  export const deleteCausasSuccess = (id) => ({
    type: DELETE_CAUSAS_SUCCESS,
    payload: {id},
  });
  
  export const deleteCausasFailure = (error) => ({
    type: DELETE_CAUSAS_FAILURE,
    payload: { error },
  });
  
  
