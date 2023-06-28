// actions.js
export const LISTAR_FUNCOES_REQUEST = 'LISTAR_FUNCOES_REQUEST';
export const LISTAR_FUNCOES_SUCCESS = 'LISTAR_FUNCOES_SUCCESS';
export const LISTAR_FUNCOES_FAILURE = 'LISTAR_FUNCOES_FAILURE';

export const SHOW_FUNCOES_REQUEST = 'SHOW_FUNCOES_REQUEST';
export const SHOW_FUNCOES_SUCCESS = 'SHOW_FUNCOES_SUCCESS';
export const SHOW_FUNCOES_FAILURE = 'SHOW_FUNCOES_FAILURE';

export const CRIAR_FUNCOES_REQUEST = 'CRIAR_FUNCOES_REQUEST';
export const CRIAR_FUNCOES_SUCCESS = 'CRIAR_FUNCOES_SUCCESS';
export const CRIAR_FUNCOES_FAILURE = 'CRIAR_FUNCOES_FAILURE';

export const UPDATE_FUNCOES_REQUEST = 'UPDATE_FUNCOES_REQUEST';
export const UPDATE_FUNCOES_SUCCESS = 'UPDATE_FUNCOES_SUCCESS';
export const UPDATE_FUNCOES_FAILURE = 'UPDATE_FUNCOES_FAILURE';

export const DELETE_FUNCOES_REQUEST = 'DELETE_FUNCOES_REQUEST';
export const DELETE_FUNCOES_SUCCESS = 'DELETE_FUNCOES_SUCCESS';
export const DELETE_FUNCOES_FAILURE = 'DELETE_FUNCOES_FAILURE';

export const listarFuncoesRequest = (page, ativo) => ({
  type: LISTAR_FUNCOES_REQUEST,
  payload: {page, ativo}
});

export const listarFuncoesSuccess = (funcoes) => ({
  type: LISTAR_FUNCOES_SUCCESS,
  payload: {funcoes}
});

export const listarFuncoesFailure = (error) => ({
  type: LISTAR_FUNCOES_FAILURE,
  payload: {error}
});

export const showFuncoesRequest = (funcaoId) => ({
    type: SHOW_FUNCOES_REQUEST,
    payload: funcaoId,
  });
  
  export const showFuncoesSuccess = (funcao) => ({
    type: SHOW_FUNCOES_SUCCESS,
    payload: { funcao },
  });
  
  export const showFuncoesFailure = (error) => ({
    type: SHOW_FUNCOES_FAILURE,
    payload: { error },
  });
  
  export const criarFuncoesRequest = (funcao) => ({
    type: CRIAR_FUNCOES_REQUEST,
    payload: { funcao },
  });
  
  export const criarFuncoesSuccess = (funcao) => ({
    type: CRIAR_FUNCOES_SUCCESS,
    payload: { funcao },
  });;
  
  export const criarFuncoesFailure = (error) => ({
    type: CRIAR_FUNCOES_FAILURE,
    payload: { error },
  });
  
  export const updateFuncoesRequest = (id, funcao) => ({
    type: UPDATE_FUNCOES_REQUEST,
    payload: { id, funcao },
  });
  
  export const updateFuncoesSuccess = (funcao) => ({
    type: UPDATE_FUNCOES_SUCCESS,
    payload: { funcao },
  });
  
  export const updateFuncoesFailure = (error) => ({
    type: UPDATE_FUNCOES_FAILURE,
    payload: { error },
  });
  
  export const deleteFuncoesRequest = (id) => ({
    type: DELETE_FUNCOES_REQUEST,
    payload: id,
  });
  
  export const deleteFuncoesSuccess = (id) => ({
    type: DELETE_FUNCOES_SUCCESS,
    payload: {id},
  });
  
  export const deleteFuncoesFailure = (error) => ({
    type: DELETE_FUNCOES_FAILURE,
    payload: { error },
  });
  
  
