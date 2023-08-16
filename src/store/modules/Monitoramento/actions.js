// actions.js
export const LISTAR_MONITORAMENTOS_REQUEST = 'LISTAR_MONITORAMENTOS_REQUEST';
export const LISTAR_MONITORAMENTOS_SUCCESS = 'LISTAR_MONITORAMENTOS_SUCCESS';
export const LISTAR_MONITORAMENTOS_FAILURE = 'LISTAR_MONITORAMENTOS_FAILURE';

export const SHOW_MONITORAMENTOS_REQUEST = 'SHOW_MONITORAMENTOS_REQUEST';
export const SHOW_MONITORAMENTOS_SUCCESS = 'SHOW_MONITORAMENTOS_SUCCESS';
export const SHOW_MONITORAMENTOS_FAILURE = 'SHOW_MONITORAMENTOS_FAILURE';

export const CRIAR_MONITORAMENTOS_REQUEST = 'CRIAR_MONITORAMENTOS_REQUEST';
export const CRIAR_MONITORAMENTOS_SUCCESS = 'CRIAR_MONITORAMENTOS_SUCCESS';
export const CRIAR_MONITORAMENTOS_FAILURE = 'CRIAR_MONITORAMENTOS_FAILURE';

export const UPDATE_MONITORAMENTOS_REQUEST = 'UPDATE_MONITORAMENTOS_REQUEST';
export const UPDATE_MONITORAMENTOS_SUCCESS = 'UPDATE_MONITORAMENTOS_SUCCESS';
export const UPDATE_MONITORAMENTOS_FAILURE = 'UPDATE_MONITORAMENTOS_FAILURE';

export const DELETE_MONITORAMENTOS_REQUEST = 'DELETE_MONITORAMENTOS_REQUEST';
export const DELETE_MONITORAMENTOS_SUCCESS = 'DELETE_MONITORAMENTOS_SUCCESS';
export const DELETE_MONITORAMENTOS_FAILURE = 'DELETE_MONITORAMENTOS_FAILURE';

export const listarMonitoramentosRequest = (page, ativo) => ({
  type: LISTAR_MONITORAMENTOS_REQUEST,
  payload: {page, ativo}
});

export const listarMonitoramentosSuccess = (monitoramentos) => ({
  type: LISTAR_MONITORAMENTOS_SUCCESS,
  payload: {monitoramentos}
});

export const listarMonitoramentosFailure = (error) => ({
  type: LISTAR_MONITORAMENTOS_FAILURE,
  payload: {error}
});

export const showMonitoramentosRequest = (monitoramentosId) => ({
    type: SHOW_MONITORAMENTOS_REQUEST,
    payload: monitoramentosId,
  });
  
  export const showMonitoramentosSuccess = (monitoramentos) => ({
    type: SHOW_MONITORAMENTOS_SUCCESS,
    payload: { monitoramentos },
  });
  
  export const showMonitoramentosFailure = (error) => ({
    type: SHOW_MONITORAMENTOS_FAILURE,
    payload: { error },
  });
  
  export const criarMonitoramentosRequest = (monitoramentos) => ({
    type: CRIAR_MONITORAMENTOS_REQUEST,
    payload: { monitoramentos },
  });
  
  export const criarMonitoramentosSuccess = (monitoramentos) => ({
    type: CRIAR_MONITORAMENTOS_SUCCESS,
    payload: { monitoramentos },
  });;
  
  export const criarMonitoramentosFailure = (error) => ({
    type: CRIAR_MONITORAMENTOS_FAILURE,
    payload: { error },
  });
  
  export const updateMonitoramentosRequest = (id, monitoramentos) => ({
    type: UPDATE_MONITORAMENTOS_REQUEST,
    payload: { id, monitoramentos },
  });
  
  export const updateMonitoramentosSuccess = (monitoramentos) => ({
    type: UPDATE_MONITORAMENTOS_SUCCESS,
    payload: { monitoramentos },
  });
  
  export const updateMonitoramentosFailure = (error) => ({
    type: UPDATE_MONITORAMENTOS_FAILURE,
    payload: { error },
  });
  
  export const deleteMonitoramentosRequest = (id) => ({
    type: DELETE_MONITORAMENTOS_REQUEST,
    payload: id,
  });
  
  export const deleteMonitoramentosSuccess = (id) => ({
    type: DELETE_MONITORAMENTOS_SUCCESS,
    payload: {id},
  });
  
  export const deleteMonitoramentosFailure = (error) => ({
    type: DELETE_MONITORAMENTOS_FAILURE,
    payload: { error },
  });
  
  
