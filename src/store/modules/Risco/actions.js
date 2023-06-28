// actions.js
export const LISTAR_RISCOS_REQUEST = 'LISTAR_RISCOS_REQUEST';
export const LISTAR_RISCOS_SUCCESS = 'LISTAR_RISCOS_SUCCESS';
export const LISTAR_RISCOS_FAILURE = 'LISTAR_RISCOS_FAILURE';

export const SHOW_RISCOS_REQUEST = 'SHOW_RISCOS_REQUEST';
export const SHOW_RISCOS_SUCCESS = 'SHOW_RISCOS_SUCCESS';
export const SHOW_RISCOS_FAILURE = 'SHOW_RISCOS_FAILURE';

export const CRIAR_RISCOS_REQUEST = 'CRIAR_RISCOS_REQUEST';
export const CRIAR_RISCOS_SUCCESS = 'CRIAR_RISCOS_SUCCESS';
export const CRIAR_RISCOS_FAILURE = 'CRIAR_RISCOS_FAILURE';

export const UPDATE_RISCOS_REQUEST = 'UPDATE_RISCOS_REQUEST';
export const UPDATE_RISCOS_SUCCESS = 'UPDATE_RISCOS_SUCCESS';
export const UPDATE_RISCOS_FAILURE = 'UPDATE_RISCOS_FAILURE';

export const DELETE_RISCOS_REQUEST = 'DELETE_RISCOS_REQUEST';
export const DELETE_RISCOS_SUCCESS = 'DELETE_RISCOS_SUCCESS';
export const DELETE_RISCOS_FAILURE = 'DELETE_RISCOS_FAILURE';

export const listarRiscosRequest = (page, ativo) => ({
  type: LISTAR_RISCOS_REQUEST,
  payload: {page, ativo}
});

export const listarRiscosSuccess = (riscos) => ({
  type: LISTAR_RISCOS_SUCCESS,
  payload: {riscos}
});

export const listarRiscosFailure = (error) => ({
  type: LISTAR_RISCOS_FAILURE,
  payload: {error}
});

export const showRiscosRequest = (riscoId) => ({
    type: SHOW_RISCOS_REQUEST,
    payload: riscoId,
  });
  
  export const showRiscosSuccess = (risco) => ({
    type: SHOW_RISCOS_SUCCESS,
    payload: { risco },
  });
  
  export const showRiscosFailure = (error) => ({
    type: SHOW_RISCOS_FAILURE,
    payload: { error },
  });
  
  export const criarRiscosRequest = (risco) => ({
    type: CRIAR_RISCOS_REQUEST,
    payload: { risco },
  });
  
  export const criarRiscosSuccess = (risco) => ({
    type: CRIAR_RISCOS_SUCCESS,
    payload: { risco },
  });;
  
  export const criarRiscosFailure = (error) => ({
    type: CRIAR_RISCOS_FAILURE,
    payload: { error },
  });
  
  export const updateRiscosRequest = (id, risco) => ({
    type: UPDATE_RISCOS_REQUEST,
    payload: { id, risco },
  });
  
  export const updateRiscosSuccess = (risco) => ({
    type: UPDATE_RISCOS_SUCCESS,
    payload: { risco },
  });
  
  export const updateRiscosFailure = (error) => ({
    type: UPDATE_RISCOS_FAILURE,
    payload: { error },
  });
  
  export const deleteRiscosRequest = (id) => ({
    type: DELETE_RISCOS_REQUEST,
    payload: id,
  });
  
  export const deleteRiscosSuccess = (id) => ({
    type: DELETE_RISCOS_SUCCESS,
    payload: {id},
  });
  
  export const deleteRiscosFailure = (error) => ({
    type: DELETE_RISCOS_FAILURE,
    payload: { error },
  });
  
  
