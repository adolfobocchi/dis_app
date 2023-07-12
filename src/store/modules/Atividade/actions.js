// actions.js
export const LISTAR_ATIVIDADES_REQUEST = 'LISTAR_ATIVIDADES_REQUEST';
export const LISTAR_ATIVIDADES_SUCCESS = 'LISTAR_ATIVIDADES_SUCCESS';
export const LISTAR_ATIVIDADES_FAILURE = 'LISTAR_ATIVIDADES_FAILURE';

export const SHOW_ATIVIDADES_REQUEST = 'SHOW_ATIVIDADES_REQUEST';
export const SHOW_ATIVIDADES_SUCCESS = 'SHOW_ATIVIDADES_SUCCESS';
export const SHOW_ATIVIDADES_FAILURE = 'SHOW_ATIVIDADES_FAILURE';

export const CRIAR_ATIVIDADES_REQUEST = 'CRIAR_ATIVIDADES_REQUEST';
export const CRIAR_ATIVIDADES_SUCCESS = 'CRIAR_ATIVIDADES_SUCCESS';
export const CRIAR_ATIVIDADES_FAILURE = 'CRIAR_ATIVIDADES_FAILURE';

export const UPDATE_ATIVIDADES_REQUEST = 'UPDATE_ATIVIDADES_REQUEST';
export const UPDATE_ATIVIDADES_SUCCESS = 'UPDATE_ATIVIDADES_SUCCESS';
export const UPDATE_ATIVIDADES_FAILURE = 'UPDATE_ATIVIDADES_FAILURE';

export const DELETE_ATIVIDADES_REQUEST = 'DELETE_ATIVIDADES_REQUEST';
export const DELETE_ATIVIDADES_SUCCESS = 'DELETE_ATIVIDADES_SUCCESS';
export const DELETE_ATIVIDADES_FAILURE = 'DELETE_ATIVIDADES_FAILURE';

export const listarAtividadesRequest = (page, ativo) => ({
  type: LISTAR_ATIVIDADES_REQUEST,
  payload: {page, ativo}
});

export const listarAtividadesSuccess = (atividades) => ({
  type: LISTAR_ATIVIDADES_SUCCESS,
  payload: {atividades}
});

export const listarAtividadesFailure = (error) => ({
  type: LISTAR_ATIVIDADES_FAILURE,
  payload: {error}
});

export const showAtividadesRequest = (atividadeId) => ({
    type: SHOW_ATIVIDADES_REQUEST,
    payload: atividadeId,
  });
  
  export const showAtividadesSuccess = (atividade) => ({
    type: SHOW_ATIVIDADES_SUCCESS,
    payload: { atividade },
  });
  
  export const showAtividadesFailure = (error) => ({
    type: SHOW_ATIVIDADES_FAILURE,
    payload: { error },
  });
  
  export const criarAtividadesRequest = (atividade) => ({
    type: CRIAR_ATIVIDADES_REQUEST,
    payload: { atividade },
  });
  
  export const criarAtividadesSuccess = (atividade) => ({
    type: CRIAR_ATIVIDADES_SUCCESS,
    payload: { atividade },
  });;
  
  export const criarAtividadesFailure = (error) => ({
    type: CRIAR_ATIVIDADES_FAILURE,
    payload: { error },
  });
  
  export const updateAtividadesRequest = (id, atividade) => ({
    type: UPDATE_ATIVIDADES_REQUEST,
    payload: { id, atividade },
  });
  
  export const updateAtividadesSuccess = (atividade) => ({
    type: UPDATE_ATIVIDADES_SUCCESS,
    payload: { atividade },
  });
  
  export const updateAtividadesFailure = (error) => ({
    type: UPDATE_ATIVIDADES_FAILURE,
    payload: { error },
  });
  
  export const deleteAtividadesRequest = (id) => ({
    type: DELETE_ATIVIDADES_REQUEST,
    payload: id,
  });
  
  export const deleteAtividadesSuccess = (id) => ({
    type: DELETE_ATIVIDADES_SUCCESS,
    payload: {id},
  });
  
  export const deleteAtividadesFailure = (error) => ({
    type: DELETE_ATIVIDADES_FAILURE,
    payload: { error },
  });
  
  
