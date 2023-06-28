// actions.js
export const LISTAR_SETORES_REQUEST = 'LISTAR_SETORES_REQUEST';
export const LISTAR_SETORES_SUCCESS = 'LISTAR_SETORES_SUCCESS';
export const LISTAR_SETORES_FAILURE = 'LISTAR_SETORES_FAILURE';

export const SHOW_SETORES_REQUEST = 'SHOW_SETORES_REQUEST';
export const SHOW_SETORES_SUCCESS = 'SHOW_SETORES_SUCCESS';
export const SHOW_SETORES_FAILURE = 'SHOW_SETORES_FAILURE';

export const CRIAR_SETORES_REQUEST = 'CRIAR_SETORES_REQUEST';
export const CRIAR_SETORES_SUCCESS = 'CRIAR_SETORES_SUCCESS';
export const CRIAR_SETORES_FAILURE = 'CRIAR_SETORES_FAILURE';

export const UPDATE_SETORES_REQUEST = 'UPDATE_SETORES_REQUEST';
export const UPDATE_SETORES_SUCCESS = 'UPDATE_SETORES_SUCCESS';
export const UPDATE_SETORES_FAILURE = 'UPDATE_SETORES_FAILURE';

export const DELETE_SETORES_REQUEST = 'DELETE_SETORES_REQUEST';
export const DELETE_SETORES_SUCCESS = 'DELETE_SETORES_SUCCESS';
export const DELETE_SETORES_FAILURE = 'DELETE_SETORES_FAILURE';

export const listarSetoresRequest = (page, ativo) => ({
  type: LISTAR_SETORES_REQUEST,
  payload: {page, ativo}
});

export const listarSetoresSuccess = (setores) => ({
  type: LISTAR_SETORES_SUCCESS,
  payload: {setores}
});

export const listarSetoresFailure = (error) => ({
  type: LISTAR_SETORES_FAILURE,
  payload: {error}
});

export const showSetoresRequest = (setorId) => ({
    type: SHOW_SETORES_REQUEST,
    payload: setorId,
  });
  
  export const showSetoresSuccess = (setor) => ({
    type: SHOW_SETORES_SUCCESS,
    payload: { setor },
  });
  
  export const showSetoresFailure = (error) => ({
    type: SHOW_SETORES_FAILURE,
    payload: { error },
  });
  
  export const criarSetoresRequest = (setor) => ({
    type: CRIAR_SETORES_REQUEST,
    payload: { setor },
  });
  
  export const criarSetoresSuccess = (setor) => ({
    type: CRIAR_SETORES_SUCCESS,
    payload: { setor },
  });;
  
  export const criarSetoresFailure = (error) => ({
    type: CRIAR_SETORES_FAILURE,
    payload: { error },
  });
  
  export const updateSetoresRequest = (id, setor) => ({
    type: UPDATE_SETORES_REQUEST,
    payload: { id, setor },
  });
  
  export const updateSetoresSuccess = (setor) => ({
    type: UPDATE_SETORES_SUCCESS,
    payload: { setor },
  });
  
  export const updateSetoresFailure = (error) => ({
    type: UPDATE_SETORES_FAILURE,
    payload: { error },
  });
  
  export const deleteSetoresRequest = (id) => ({
    type: DELETE_SETORES_REQUEST,
    payload: id,
  });
  
  export const deleteSetoresSuccess = (id) => ({
    type: DELETE_SETORES_SUCCESS,
    payload: {id},
  });
  
  export const deleteSetoresFailure = (error) => ({
    type: DELETE_SETORES_FAILURE,
    payload: { error },
  });
  
  
