// actions.js
export const LISTAR_DIS_REQUEST = 'LISTAR_DIS_REQUEST';
export const LISTAR_DIS_SUCCESS = 'LISTAR_DIS_SUCCESS';
export const LISTAR_DIS_FAILURE = 'LISTAR_DIS_FAILURE';

export const SHOW_DIS_REQUEST = 'SHOW_DIS_REQUEST';
export const SHOW_DIS_SUCCESS = 'SHOW_DIS_SUCCESS';
export const SHOW_DIS_FAILURE = 'SHOW_DIS_FAILURE';

export const CRIAR_DIS_REQUEST = 'CRIAR_DIS_REQUEST';
export const CRIAR_DIS_SUCCESS = 'CRIAR_DIS_SUCCESS';
export const CRIAR_DIS_FAILURE = 'CRIAR_DIS_FAILURE';

export const UPDATE_DIS_REQUEST = 'UPDATE_DIS_REQUEST';
export const UPDATE_DIS_SUCCESS = 'UPDATE_DIS_SUCCESS';
export const UPDATE_DIS_FAILURE = 'UPDATE_DIS_FAILURE';

export const DELETE_DIS_REQUEST = 'DELETE_DIS_REQUEST';
export const DELETE_DIS_SUCCESS = 'DELETE_DIS_SUCCESS';
export const DELETE_DIS_FAILURE = 'DELETE_DIS_FAILURE';

export const SET_DIS = 'SET_DIS';

export const listarDisRequest = (page, ativo) => ({
  type: LISTAR_DIS_REQUEST,
  payload: {page, ativo}
});

export const listarDisSuccess = (dis) => ({
  type: LISTAR_DIS_SUCCESS,
  payload: {dis}
});

export const listarDisFailure = (error) => ({
  type: LISTAR_DIS_FAILURE,
  payload: {error}
});

export const setDis = (index) => ({
  type: SET_DIS,
  payload: index,
});

export const showDisRequest = (disId) => ({
    type: SHOW_DIS_REQUEST,
    payload: disId,
  });
  
  export const showDisSuccess = (dis) => ({
    type: SHOW_DIS_SUCCESS,
    payload: { dis },
  });
  
  export const showDisFailure = (error) => ({
    type: SHOW_DIS_FAILURE,
    payload: { error },
  });
  
  export const criarDisRequest = (dis) => ({
    type: CRIAR_DIS_REQUEST,
    payload: { dis },
  });
  
  export const criarDisSuccess = (dis) => ({
    type: CRIAR_DIS_SUCCESS,
    payload: { dis },
  });;
  
  export const criarDisFailure = (error) => ({
    type: CRIAR_DIS_FAILURE,
    payload: { error },
  });
  
  export const updateDisRequest = (id, dis) => ({
    type: UPDATE_DIS_REQUEST,
    payload: { id, dis },
  });
  
  export const updateDisSuccess = (dis) => ({
    type: UPDATE_DIS_SUCCESS,
    payload: { dis },
  });
  
  export const updateDisFailure = (error) => ({
    type: UPDATE_DIS_FAILURE,
    payload: { error },
  });
  
  export const deleteDisRequest = (id) => ({
    type: DELETE_DIS_REQUEST,
    payload: id,
  });
  
  export const deleteDisSuccess = (id) => ({
    type: DELETE_DIS_SUCCESS,
    payload: {id},
  });
  
  export const deleteDisFailure = (error) => ({
    type: DELETE_DIS_FAILURE,
    payload: { error },
  });
