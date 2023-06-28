// actions.js
export const LISTAR_NIVELRISCOS_REQUEST = 'LISTAR_NIVELRISCOS_REQUEST';
export const LISTAR_NIVELRISCOS_SUCCESS = 'LISTAR_NIVELRISCOS_SUCCESS';
export const LISTAR_NIVELRISCOS_FAILURE = 'LISTAR_NIVELRISCOS_FAILURE';

export const SHOW_NIVELRISCOS_REQUEST = 'SHOW_NIVELRISCOS_REQUEST';
export const SHOW_NIVELRISCOS_SUCCESS = 'SHOW_NIVELRISCOS_SUCCESS';
export const SHOW_NIVELRISCOS_FAILURE = 'SHOW_NIVELRISCOS_FAILURE';

export const CRIAR_NIVELRISCOS_REQUEST = 'CRIAR_NIVELRISCOS_REQUEST';
export const CRIAR_NIVELRISCOS_SUCCESS = 'CRIAR_NIVELRISCOS_SUCCESS';
export const CRIAR_NIVELRISCOS_FAILURE = 'CRIAR_NIVELRISCOS_FAILURE';

export const UPDATE_NIVELRISCOS_REQUEST = 'UPDATE_NIVELRISCOS_REQUEST';
export const UPDATE_NIVELRISCOS_SUCCESS = 'UPDATE_NIVELRISCOS_SUCCESS';
export const UPDATE_NIVELRISCOS_FAILURE = 'UPDATE_NIVELRISCOS_FAILURE';

export const DELETE_NIVELRISCOS_REQUEST = 'DELETE_NIVELRISCOS_REQUEST';
export const DELETE_NIVELRISCOS_SUCCESS = 'DELETE_NIVELRISCOS_SUCCESS';
export const DELETE_NIVELRISCOS_FAILURE = 'DELETE_NIVELRISCOS_FAILURE';

export const listarNivelriscosRequest = (page, ativo) => ({
  type: LISTAR_NIVELRISCOS_REQUEST,
  payload: {page, ativo}
});

export const listarNivelriscosSuccess = (nivelriscos) => ({
  type: LISTAR_NIVELRISCOS_SUCCESS,
  payload: {nivelriscos}
});

export const listarNivelriscosFailure = (error) => ({
  type: LISTAR_NIVELRISCOS_FAILURE,
  payload: {error}
});

export const showNivelriscosRequest = (nivelriscoId) => ({
    type: SHOW_NIVELRISCOS_REQUEST,
    payload: nivelriscoId,
  });
  
  export const showNivelriscosSuccess = (nivelrisco) => ({
    type: SHOW_NIVELRISCOS_SUCCESS,
    payload: { nivelrisco },
  });
  
  export const showNivelriscosFailure = (error) => ({
    type: SHOW_NIVELRISCOS_FAILURE,
    payload: { error },
  });
  
  export const criarNivelriscosRequest = (nivelrisco) => ({
    type: CRIAR_NIVELRISCOS_REQUEST,
    payload: { nivelrisco },
  });
  
  export const criarNivelriscosSuccess = (nivelrisco) => ({
    type: CRIAR_NIVELRISCOS_SUCCESS,
    payload: { nivelrisco },
  });;
  
  export const criarNivelriscosFailure = (error) => ({
    type: CRIAR_NIVELRISCOS_FAILURE,
    payload: { error },
  });
  
  export const updateNivelriscosRequest = (id, nivelrisco) => ({
    type: UPDATE_NIVELRISCOS_REQUEST,
    payload: { id, nivelrisco },
  });
  
  export const updateNivelriscosSuccess = (nivelrisco) => ({
    type: UPDATE_NIVELRISCOS_SUCCESS,
    payload: { nivelrisco },
  });
  
  export const updateNivelriscosFailure = (error) => ({
    type: UPDATE_NIVELRISCOS_FAILURE,
    payload: { error },
  });
  
  export const deleteNivelriscosRequest = (id) => ({
    type: DELETE_NIVELRISCOS_REQUEST,
    payload: id,
  });
  
  export const deleteNivelriscosSuccess = (id) => ({
    type: DELETE_NIVELRISCOS_SUCCESS,
    payload: {id},
  });
  
  export const deleteNivelriscosFailure = (error) => ({
    type: DELETE_NIVELRISCOS_FAILURE,
    payload: { error },
  });
  
  
