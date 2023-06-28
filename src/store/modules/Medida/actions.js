// actions.js
export const LISTAR_MEDIDAS_REQUEST = 'LISTAR_MEDIDAS_REQUEST';
export const LISTAR_MEDIDAS_SUCCESS = 'LISTAR_MEDIDAS_SUCCESS';
export const LISTAR_MEDIDAS_FAILURE = 'LISTAR_MEDIDAS_FAILURE';

export const SHOW_MEDIDAS_REQUEST = 'SHOW_MEDIDAS_REQUEST';
export const SHOW_MEDIDAS_SUCCESS = 'SHOW_MEDIDAS_SUCCESS';
export const SHOW_MEDIDAS_FAILURE = 'SHOW_MEDIDAS_FAILURE';

export const CRIAR_MEDIDAS_REQUEST = 'CRIAR_MEDIDAS_REQUEST';
export const CRIAR_MEDIDAS_SUCCESS = 'CRIAR_MEDIDAS_SUCCESS';
export const CRIAR_MEDIDAS_FAILURE = 'CRIAR_MEDIDAS_FAILURE';

export const UPDATE_MEDIDAS_REQUEST = 'UPDATE_MEDIDAS_REQUEST';
export const UPDATE_MEDIDAS_SUCCESS = 'UPDATE_MEDIDAS_SUCCESS';
export const UPDATE_MEDIDAS_FAILURE = 'UPDATE_MEDIDAS_FAILURE';

export const DELETE_MEDIDAS_REQUEST = 'DELETE_MEDIDAS_REQUEST';
export const DELETE_MEDIDAS_SUCCESS = 'DELETE_MEDIDAS_SUCCESS';
export const DELETE_MEDIDAS_FAILURE = 'DELETE_MEDIDAS_FAILURE';

export const listarMedidasRequest = (page, ativo) => ({
  type: LISTAR_MEDIDAS_REQUEST,
  payload: {page, ativo}
});

export const listarMedidasSuccess = (medidas) => ({
  type: LISTAR_MEDIDAS_SUCCESS,
  payload: {medidas}
});

export const listarMedidasFailure = (error) => ({
  type: LISTAR_MEDIDAS_FAILURE,
  payload: {error}
});

export const showMedidasRequest = (medidaId) => ({
    type: SHOW_MEDIDAS_REQUEST,
    payload: medidaId,
  });
  
  export const showMedidasSuccess = (medida) => ({
    type: SHOW_MEDIDAS_SUCCESS,
    payload: { medida },
  });
  
  export const showMedidasFailure = (error) => ({
    type: SHOW_MEDIDAS_FAILURE,
    payload: { error },
  });
  
  export const criarMedidasRequest = (medida) => ({
    type: CRIAR_MEDIDAS_REQUEST,
    payload: { medida },
  });
  
  export const criarMedidasSuccess = (medida) => ({
    type: CRIAR_MEDIDAS_SUCCESS,
    payload: { medida },
  });;
  
  export const criarMedidasFailure = (error) => ({
    type: CRIAR_MEDIDAS_FAILURE,
    payload: { error },
  });
  
  export const updateMedidasRequest = (id, medida) => ({
    type: UPDATE_MEDIDAS_REQUEST,
    payload: { id, medida },
  });
  
  export const updateMedidasSuccess = (medida) => ({
    type: UPDATE_MEDIDAS_SUCCESS,
    payload: { medida },
  });
  
  export const updateMedidasFailure = (error) => ({
    type: UPDATE_MEDIDAS_FAILURE,
    payload: { error },
  });
  
  export const deleteMedidasRequest = (id) => ({
    type: DELETE_MEDIDAS_REQUEST,
    payload: id,
  });
  
  export const deleteMedidasSuccess = (id) => ({
    type: DELETE_MEDIDAS_SUCCESS,
    payload: {id},
  });
  
  export const deleteMedidasFailure = (error) => ({
    type: DELETE_MEDIDAS_FAILURE,
    payload: { error },
  });
  
  
