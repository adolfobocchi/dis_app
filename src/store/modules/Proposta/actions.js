// actions.js
export const LISTAR_PROPOSTAS_REQUEST = 'LISTAR_PROPOSTAS_REQUEST';
export const LISTAR_PROPOSTAS_SUCCESS = 'LISTAR_PROPOSTAS_SUCCESS';
export const LISTAR_PROPOSTAS_FAILURE = 'LISTAR_PROPOSTAS_FAILURE';

export const SHOW_PROPOSTAS_REQUEST = 'SHOW_PROPOSTAS_REQUEST';
export const SHOW_PROPOSTAS_SUCCESS = 'SHOW_PROPOSTAS_SUCCESS';
export const SHOW_PROPOSTAS_FAILURE = 'SHOW_PROPOSTAS_FAILURE';

export const CRIAR_PROPOSTAS_REQUEST = 'CRIAR_PROPOSTAS_REQUEST';
export const CRIAR_PROPOSTAS_SUCCESS = 'CRIAR_PROPOSTAS_SUCCESS';
export const CRIAR_PROPOSTAS_FAILURE = 'CRIAR_PROPOSTAS_FAILURE';

export const UPDATE_PROPOSTAS_REQUEST = 'UPDATE_PROPOSTAS_REQUEST';
export const UPDATE_PROPOSTAS_SUCCESS = 'UPDATE_PROPOSTAS_SUCCESS';
export const UPDATE_PROPOSTAS_FAILURE = 'UPDATE_PROPOSTAS_FAILURE';

export const DELETE_PROPOSTAS_REQUEST = 'DELETE_PROPOSTAS_REQUEST';
export const DELETE_PROPOSTAS_SUCCESS = 'DELETE_PROPOSTAS_SUCCESS';
export const DELETE_PROPOSTAS_FAILURE = 'DELETE_PROPOSTAS_FAILURE';

export const listarPropostasRequest = (page, ativo) => ({
  type: LISTAR_PROPOSTAS_REQUEST,
  payload: {page, ativo}
});

export const listarPropostasSuccess = (propostas) => ({
  type: LISTAR_PROPOSTAS_SUCCESS,
  payload: {propostas}
});

export const listarPropostasFailure = (error) => ({
  type: LISTAR_PROPOSTAS_FAILURE,
  payload: {error}
});

export const showPropostasRequest = (propostaId) => ({
    type: SHOW_PROPOSTAS_REQUEST,
    payload: propostaId,
  });
  
  export const showPropostasSuccess = (proposta) => ({
    type: SHOW_PROPOSTAS_SUCCESS,
    payload: { proposta },
  });
  
  export const showPropostasFailure = (error) => ({
    type: SHOW_PROPOSTAS_FAILURE,
    payload: { error },
  });
  
  export const criarPropostasRequest = (proposta) => ({
    type: CRIAR_PROPOSTAS_REQUEST,
    payload: { proposta },
  });
  
  export const criarPropostasSuccess = (proposta) => ({
    type: CRIAR_PROPOSTAS_SUCCESS,
    payload: { proposta },
  });;
  
  export const criarPropostasFailure = (error) => ({
    type: CRIAR_PROPOSTAS_FAILURE,
    payload: { error },
  });
  
  export const updatePropostasRequest = (id, proposta) => ({
    type: UPDATE_PROPOSTAS_REQUEST,
    payload: { id, proposta },
  });
  
  export const updatePropostasSuccess = (proposta) => ({
    type: UPDATE_PROPOSTAS_SUCCESS,
    payload: { proposta },
  });
  
  export const updatePropostasFailure = (error) => ({
    type: UPDATE_PROPOSTAS_FAILURE,
    payload: { error },
  });
  
  export const deletePropostasRequest = (id) => ({
    type: DELETE_PROPOSTAS_REQUEST,
    payload: id,
  });
  
  export const deletePropostasSuccess = (id) => ({
    type: DELETE_PROPOSTAS_SUCCESS,
    payload: {id},
  });
  
  export const deletePropostasFailure = (error) => ({
    type: DELETE_PROPOSTAS_FAILURE,
    payload: { error },
  });
  
  
