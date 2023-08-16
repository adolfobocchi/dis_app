export const LISTAR_EMPRESAS_REQUEST = 'LISTAR_EMPRESAS_REQUEST';
export const LISTAR_EMPRESAS_SUCCESS = 'LISTAR_EMPRESAS_SUCCESS';
export const LISTAR_EMPRESAS_FAILURE = 'LISTAR_EMPRESAS_FAILURE';

export const SHOW_EMPRESAS_REQUEST = 'SHOW_EMPRESAS_REQUEST';
export const SHOW_EMPRESAS_SUCCESS = 'SHOW_EMPRESAS_SUCCESS';
export const SHOW_EMPRESAS_FAILURE = 'SHOW_EMPRESAS_FAILURE';

export const CRIAR_EMPRESAS_REQUEST = 'CRIAR_EMPRESAS_REQUEST';
export const CRIAR_EMPRESAS_SUCCESS = 'CRIAR_EMPRESAS_SUCCESS';
export const CRIAR_EMPRESAS_FAILURE = 'CRIAR_EMPRESAS_FAILURE';

export const UPDATE_EMPRESAS_REQUEST = 'UPDATE_EMPRESAS_REQUEST';
export const UPDATE_EMPRESAS_SUCCESS = 'UPDATE_EMPRESAS_SUCCESS';
export const UPDATE_EMPRESAS_FAILURE = 'UPDATE_EMPRESAS_FAILURE';

export const DELETE_EMPRESAS_REQUEST = 'DELETE_EMPRESAS_REQUEST';
export const DELETE_EMPRESAS_SUCCESS = 'DELETE_EMPRESAS_SUCCESS';
export const DELETE_EMPRESAS_FAILURE = 'DELETE_EMPRESAS_FAILURE';

export const listarEmpresasRequest = (page, ativo) => ({
    type: LISTAR_EMPRESAS_REQUEST,
    payload: {page, ativo}
  });
  
  export const listarEmpresasSuccess = (empresas) => ({
    type: LISTAR_EMPRESAS_SUCCESS,
    payload: {empresas}
  });
  
  export const listarEmpresasFailure = (error) => ({
    type: LISTAR_EMPRESAS_FAILURE,
    payload: {error}
  });
  
  export const showEmpresasRequest = (empresaId) => ({
      type: SHOW_EMPRESAS_REQUEST,
      payload: empresaId,
    });
    
    export const showEmpresasSuccess = (empresa) => ({
      type: SHOW_EMPRESAS_SUCCESS,
      payload: { empresa },
    });
    
    export const showEmpresasFailure = (error) => ({
      type: SHOW_EMPRESAS_FAILURE,
      payload: { error },
    });
    
    export const criarEmpresasRequest = (empresa) => ({
      type: CRIAR_EMPRESAS_REQUEST,
      payload: { empresa },
    });
    
    export const criarEmpresasSuccess = (empresa) => ({
      type: CRIAR_EMPRESAS_SUCCESS,
      payload: { empresa },
    });;
    
    export const criarEmpresasFailure = (error) => ({
      type: CRIAR_EMPRESAS_FAILURE,
      payload: { error },
    });
    
    export const updateEmpresasRequest = (id, empresa) => ({
      type: UPDATE_EMPRESAS_REQUEST,
      payload: { id, empresa },
    });
    
    export const updateEmpresasSuccess = (empresa) => ({
      type: UPDATE_EMPRESAS_SUCCESS,
      payload: { empresa },
    });
    
    export const updateEmpresasFailure = (error) => ({
      type: UPDATE_EMPRESAS_FAILURE,
      payload: { error },
    });
    
    export const deleteEmpresasRequest = (id) => ({
      type: DELETE_EMPRESAS_REQUEST,
      payload: id,
    });
    
    export const deleteEmpresasSuccess = (id) => ({
      type: DELETE_EMPRESAS_SUCCESS,
      payload: {id},
    });
    
    export const deleteEmpresasFailure = (error) => ({
      type: DELETE_EMPRESAS_FAILURE,
      payload: { error },
    });
    