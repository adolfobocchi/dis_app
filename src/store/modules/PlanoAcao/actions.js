// actions.js
export const LISTAR_PLANOSACAO_REQUEST = 'LISTAR_PLANOSACAO_REQUEST';
export const LISTAR_PLANOSACAO_SUCCESS = 'LISTAR_PLANOSACAO_SUCCESS';
export const LISTAR_PLANOSACAO_FAILURE = 'LISTAR_PLANOSACAO_FAILURE';

export const SHOW_PLANOSACAO_REQUEST = 'SHOW_PLANOSACAO_REQUEST';
export const SHOW_PLANOSACAO_SUCCESS = 'SHOW_PLANOSACAO_SUCCESS';
export const SHOW_PLANOSACAO_FAILURE = 'SHOW_PLANOSACAO_FAILURE';

export const CRIAR_PLANOSACAO_REQUEST = 'CRIAR_PLANOSACAO_REQUEST';
export const CRIAR_PLANOSACAO_SUCCESS = 'CRIAR_PLANOSACAO_SUCCESS';
export const CRIAR_PLANOSACAO_FAILURE = 'CRIAR_PLANOSACAO_FAILURE';

export const UPDATE_PLANOSACAO_REQUEST = 'UPDATE_PLANOSACAO_REQUEST';
export const UPDATE_PLANOSACAO_SUCCESS = 'UPDATE_PLANOSACAO_SUCCESS';
export const UPDATE_PLANOSACAO_FAILURE = 'UPDATE_PLANOSACAO_FAILURE';

export const DELETE_PLANOSACAO_REQUEST = 'DELETE_PLANOSACAO_REQUEST';
export const DELETE_PLANOSACAO_SUCCESS = 'DELETE_PLANOSACAO_SUCCESS';
export const DELETE_PLANOSACAO_FAILURE = 'DELETE_PLANOSACAO_FAILURE';

export const listarPlanosAcaoRequest = (page, ativo) => ({
  type: LISTAR_PLANOSACAO_REQUEST,
  payload: {page, ativo}
});

export const listarPlanosAcaoSuccess = (planosAcao) => ({
  type: LISTAR_PLANOSACAO_SUCCESS,
  payload: {planosAcao}
});

export const listarPlanosAcaoFailure = (error) => ({
  type: LISTAR_PLANOSACAO_FAILURE,
  payload: {error}
});

export const showPlanosAcaoRequest = (planoAcaoId) => ({
    type: SHOW_PLANOSACAO_REQUEST,
    payload: planoAcaoId,
  });
  
  export const showPlanosAcaoSuccess = (planoAcao) => ({
    type: SHOW_PLANOSACAO_SUCCESS,
    payload: { planoAcao },
  });
  
  export const showPlanosAcaoFailure = (error) => ({
    type: SHOW_PLANOSACAO_FAILURE,
    payload: { error },
  });
  
  export const criarPlanosAcaoRequest = (planoAcao) => ({
    type: CRIAR_PLANOSACAO_REQUEST,
    payload: { planoAcao },
  });
  
  export const criarPlanosAcaoSuccess = (planoAcao) => ({
    type: CRIAR_PLANOSACAO_SUCCESS,
    payload: { planoAcao },
  });;
  
  export const criarPlanosAcaoFailure = (error) => ({
    type: CRIAR_PLANOSACAO_FAILURE,
    payload: { error },
  });
  
  export const updatePlanosAcaoRequest = (id, planoAcao) => ({
    type: UPDATE_PLANOSACAO_REQUEST,
    payload: { id, planoAcao },
  });
  
  export const updatePlanosAcaoSuccess = (planoAcao) => ({
    type: UPDATE_PLANOSACAO_SUCCESS,
    payload: { planoAcao },
  });
  
  export const updatePlanosAcaoFailure = (error) => ({
    type: UPDATE_PLANOSACAO_FAILURE,
    payload: { error },
  });
  
  export const deletePlanosAcaoRequest = (id) => ({
    type: DELETE_PLANOSACAO_REQUEST,
    payload: id,
  });
  
  export const deletePlanosAcaoSuccess = (id) => ({
    type: DELETE_PLANOSACAO_SUCCESS,
    payload: {id},
  });
  
  export const deletePlanosAcaoFailure = (error) => ({
    type: DELETE_PLANOSACAO_FAILURE,
    payload: { error },
  });
  
  
