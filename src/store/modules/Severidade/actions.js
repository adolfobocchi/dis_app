// actions.js
export const LISTAR_SEVERIDADES_REQUEST = 'LISTAR_SEVERIDADES_REQUEST';
export const LISTAR_SEVERIDADES_SUCCESS = 'LISTAR_SEVERIDADES_SUCCESS';
export const LISTAR_SEVERIDADES_FAILURE = 'LISTAR_SEVERIDADES_FAILURE';

export const SHOW_SEVERIDADES_REQUEST = 'SHOW_SEVERIDADES_REQUEST';
export const SHOW_SEVERIDADES_SUCCESS = 'SHOW_SEVERIDADES_SUCCESS';
export const SHOW_SEVERIDADES_FAILURE = 'SHOW_SEVERIDADES_FAILURE';

export const CRIAR_SEVERIDADES_REQUEST = 'CRIAR_SEVERIDADES_REQUEST';
export const CRIAR_SEVERIDADES_SUCCESS = 'CRIAR_SEVERIDADES_SUCCESS';
export const CRIAR_SEVERIDADES_FAILURE = 'CRIAR_SEVERIDADES_FAILURE';

export const UPDATE_SEVERIDADES_REQUEST = 'UPDATE_SEVERIDADES_REQUEST';
export const UPDATE_SEVERIDADES_SUCCESS = 'UPDATE_SEVERIDADES_SUCCESS';
export const UPDATE_SEVERIDADES_FAILURE = 'UPDATE_SEVERIDADES_FAILURE';

export const DELETE_SEVERIDADES_REQUEST = 'DELETE_SEVERIDADES_REQUEST';
export const DELETE_SEVERIDADES_SUCCESS = 'DELETE_SEVERIDADES_SUCCESS';
export const DELETE_SEVERIDADES_FAILURE = 'DELETE_SEVERIDADES_FAILURE';

export const listarSeveridadesRequest = (page, ativo) => ({
  type: LISTAR_SEVERIDADES_REQUEST,
  payload: {page, ativo}
});

export const listarSeveridadesSuccess = (severidades) => ({
  type: LISTAR_SEVERIDADES_SUCCESS,
  payload: {severidades}
});

export const listarSeveridadesFailure = (error) => ({
  type: LISTAR_SEVERIDADES_FAILURE,
  payload: {error}
});

export const showSeveridadesRequest = (severidadeId) => ({
    type: SHOW_SEVERIDADES_REQUEST,
    payload: severidadeId,
  });
  
  export const showSeveridadesSuccess = (severidade) => ({
    type: SHOW_SEVERIDADES_SUCCESS,
    payload: { severidade },
  });
  
  export const showSeveridadesFailure = (error) => ({
    type: SHOW_SEVERIDADES_FAILURE,
    payload: { error },
  });
  
  export const criarSeveridadesRequest = (severidade) => ({
    type: CRIAR_SEVERIDADES_REQUEST,
    payload: { severidade },
  });
  
  export const criarSeveridadesSuccess = (severidade) => ({
    type: CRIAR_SEVERIDADES_SUCCESS,
    payload: { severidade },
  });;
  
  export const criarSeveridadesFailure = (error) => ({
    type: CRIAR_SEVERIDADES_FAILURE,
    payload: { error },
  });
  
  export const updateSeveridadesRequest = (id, severidade) => ({
    type: UPDATE_SEVERIDADES_REQUEST,
    payload: { id, severidade },
  });
  
  export const updateSeveridadesSuccess = (severidade) => ({
    type: UPDATE_SEVERIDADES_SUCCESS,
    payload: { severidade },
  });
  
  export const updateSeveridadesFailure = (error) => ({
    type: UPDATE_SEVERIDADES_FAILURE,
    payload: { error },
  });
  
  export const deleteSeveridadesRequest = (id) => ({
    type: DELETE_SEVERIDADES_REQUEST,
    payload: id,
  });
  
  export const deleteSeveridadesSuccess = (id) => ({
    type: DELETE_SEVERIDADES_SUCCESS,
    payload: {id},
  });
  
  export const deleteSeveridadesFailure = (error) => ({
    type: DELETE_SEVERIDADES_FAILURE,
    payload: { error },
  });
  
  
