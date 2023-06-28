// actions.js
export const LISTAR_PROCESSOS_REQUEST = 'LISTAR_PROCESSOS_REQUEST';
export const LISTAR_PROCESSOS_SUCCESS = 'LISTAR_PROCESSOS_SUCCESS';
export const LISTAR_PROCESSOS_FAILURE = 'LISTAR_PROCESSOS_FAILURE';

export const SHOW_PROCESSOS_REQUEST = 'SHOW_PROCESSOS_REQUEST';
export const SHOW_PROCESSOS_SUCCESS = 'SHOW_PROCESSOS_SUCCESS';
export const SHOW_PROCESSOS_FAILURE = 'SHOW_PROCESSOS_FAILURE';

export const CRIAR_PROCESSOS_REQUEST = 'CRIAR_PROCESSOS_REQUEST';
export const CRIAR_PROCESSOS_SUCCESS = 'CRIAR_PROCESSOS_SUCCESS';
export const CRIAR_PROCESSOS_FAILURE = 'CRIAR_PROCESSOS_FAILURE';

export const UPDATE_PROCESSOS_REQUEST = 'UPDATE_PROCESSOS_REQUEST';
export const UPDATE_PROCESSOS_SUCCESS = 'UPDATE_PROCESSOS_SUCCESS';
export const UPDATE_PROCESSOS_FAILURE = 'UPDATE_PROCESSOS_FAILURE';

export const DELETE_PROCESSOS_REQUEST = 'DELETE_PROCESSOS_REQUEST';
export const DELETE_PROCESSOS_SUCCESS = 'DELETE_PROCESSOS_SUCCESS';
export const DELETE_PROCESSOS_FAILURE = 'DELETE_PROCESSOS_FAILURE';

export const listarProcessosRequest = (page, ativo) => ({
  type: LISTAR_PROCESSOS_REQUEST,
  payload: {page, ativo}
});

export const listarProcessosSuccess = (processos) => ({
  type: LISTAR_PROCESSOS_SUCCESS,
  payload: {processos}
});

export const listarProcessosFailure = (error) => ({
  type: LISTAR_PROCESSOS_FAILURE,
  payload: {error}
});

export const showProcessosRequest = (processoId) => ({
    type: SHOW_PROCESSOS_REQUEST,
    payload: processoId,
  });
  
  export const showProcessosSuccess = (processo) => ({
    type: SHOW_PROCESSOS_SUCCESS,
    payload: { processo },
  });
  
  export const showProcessosFailure = (error) => ({
    type: SHOW_PROCESSOS_FAILURE,
    payload: { error },
  });
  
  export const criarProcessosRequest = (processo) => ({
    type: CRIAR_PROCESSOS_REQUEST,
    payload: { processo },
  });
  
  export const criarProcessosSuccess = (processo) => ({
    type: CRIAR_PROCESSOS_SUCCESS,
    payload: { processo },
  });;
  
  export const criarProcessosFailure = (error) => ({
    type: CRIAR_PROCESSOS_FAILURE,
    payload: { error },
  });
  
  export const updateProcessosRequest = (id, processo) => ({
    type: UPDATE_PROCESSOS_REQUEST,
    payload: { id, processo },
  });
  
  export const updateProcessosSuccess = (processo) => ({
    type: UPDATE_PROCESSOS_SUCCESS,
    payload: { processo },
  });
  
  export const updateProcessosFailure = (error) => ({
    type: UPDATE_PROCESSOS_FAILURE,
    payload: { error },
  });
  
  export const deleteProcessosRequest = (id) => ({
    type: DELETE_PROCESSOS_REQUEST,
    payload: id,
  });
  
  export const deleteProcessosSuccess = (id) => ({
    type: DELETE_PROCESSOS_SUCCESS,
    payload: {id},
  });
  
  export const deleteProcessosFailure = (error) => ({
    type: DELETE_PROCESSOS_FAILURE,
    payload: { error },
  });
  
  
