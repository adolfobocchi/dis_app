// actions.js
export const LISTAR_PROBABILIDADES_REQUEST = 'LISTAR_PROBABILIDADES_REQUEST';
export const LISTAR_PROBABILIDADES_SUCCESS = 'LISTAR_PROBABILIDADES_SUCCESS';
export const LISTAR_PROBABILIDADES_FAILURE = 'LISTAR_PROBABILIDADES_FAILURE';

export const SHOW_PROBABILIDADES_REQUEST = 'SHOW_PROBABILIDADES_REQUEST';
export const SHOW_PROBABILIDADES_SUCCESS = 'SHOW_PROBABILIDADES_SUCCESS';
export const SHOW_PROBABILIDADES_FAILURE = 'SHOW_PROBABILIDADES_FAILURE';

export const CRIAR_PROBABILIDADES_REQUEST = 'CRIAR_PROBABILIDADES_REQUEST';
export const CRIAR_PROBABILIDADES_SUCCESS = 'CRIAR_PROBABILIDADES_SUCCESS';
export const CRIAR_PROBABILIDADES_FAILURE = 'CRIAR_PROBABILIDADES_FAILURE';

export const UPDATE_PROBABILIDADES_REQUEST = 'UPDATE_PROBABILIDADES_REQUEST';
export const UPDATE_PROBABILIDADES_SUCCESS = 'UPDATE_PROBABILIDADES_SUCCESS';
export const UPDATE_PROBABILIDADES_FAILURE = 'UPDATE_PROBABILIDADES_FAILURE';

export const DELETE_PROBABILIDADES_REQUEST = 'DELETE_PROBABILIDADES_REQUEST';
export const DELETE_PROBABILIDADES_SUCCESS = 'DELETE_PROBABILIDADES_SUCCESS';
export const DELETE_PROBABILIDADES_FAILURE = 'DELETE_PROBABILIDADES_FAILURE';

export const listarProbabilidadesRequest = (page, ativo) => ({
  type: LISTAR_PROBABILIDADES_REQUEST,
  payload: {page, ativo}
});

export const listarProbabilidadesSuccess = (probabilidades) => ({
  type: LISTAR_PROBABILIDADES_SUCCESS,
  payload: {probabilidades}
});

export const listarProbabilidadesFailure = (error) => ({
  type: LISTAR_PROBABILIDADES_FAILURE,
  payload: {error}
});

export const showProbabilidadesRequest = (probabilidadeId) => ({
    type: SHOW_PROBABILIDADES_REQUEST,
    payload: probabilidadeId,
  });
  
  export const showProbabilidadesSuccess = (probabilidade) => ({
    type: SHOW_PROBABILIDADES_SUCCESS,
    payload: { probabilidade },
  });
  
  export const showProbabilidadesFailure = (error) => ({
    type: SHOW_PROBABILIDADES_FAILURE,
    payload: { error },
  });
  
  export const criarProbabilidadesRequest = (probabilidade) => ({
    type: CRIAR_PROBABILIDADES_REQUEST,
    payload: { probabilidade },
  });
  
  export const criarProbabilidadesSuccess = (probabilidade) => ({
    type: CRIAR_PROBABILIDADES_SUCCESS,
    payload: { probabilidade },
  });;
  
  export const criarProbabilidadesFailure = (error) => ({
    type: CRIAR_PROBABILIDADES_FAILURE,
    payload: { error },
  });
  
  export const updateProbabilidadesRequest = (id, probabilidade) => ({
    type: UPDATE_PROBABILIDADES_REQUEST,
    payload: { id, probabilidade },
  });
  
  export const updateProbabilidadesSuccess = (probabilidade) => ({
    type: UPDATE_PROBABILIDADES_SUCCESS,
    payload: { probabilidade },
  });
  
  export const updateProbabilidadesFailure = (error) => ({
    type: UPDATE_PROBABILIDADES_FAILURE,
    payload: { error },
  });
  
  export const deleteProbabilidadesRequest = (id) => ({
    type: DELETE_PROBABILIDADES_REQUEST,
    payload: id,
  });
  
  export const deleteProbabilidadesSuccess = (id) => ({
    type: DELETE_PROBABILIDADES_SUCCESS,
    payload: {id},
  });
  
  export const deleteProbabilidadesFailure = (error) => ({
    type: DELETE_PROBABILIDADES_FAILURE,
    payload: { error },
  });
  
  
