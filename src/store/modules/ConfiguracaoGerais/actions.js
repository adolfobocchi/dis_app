export const LISTAR_CONFIGURACAOGERAIS_REQUEST = 'LISTAR_CONFIGURACAOGERAIS_REQUEST';
export const LISTAR_CONFIGURACAOGERAIS_SUCCESS = 'LISTAR_CONFIGURACAOGERAIS_SUCCESS';
export const LISTAR_CONFIGURACAOGERAIS_FAILURE = 'LISTAR_CONFIGURACAOGERAIS_FAILURE';

export const UPDATE_CONFIGURACAOGERAIS_REQUEST = 'UPDATE_CONFIGURACAOGERAIS_REQUEST';
export const UPDATE_CONFIGURACAOGERAIS_SUCCESS = 'UPDATE_CONFIGURACAOGERAIS_SUCCESS';
export const UPDATE_CONFIGURACAOGERAIS_FAILURE = 'UPDATE_CONFIGURACAOGERAIS_FAILURE';

export const listarConfiguracaoGeraisRequest = () => ({
    type: LISTAR_CONFIGURACAOGERAIS_REQUEST,
  });
  
  export const listarConfiguracaoGeraisSuccess = (configuracao) => ({
    type: LISTAR_CONFIGURACAOGERAIS_SUCCESS,
    payload: {configuracao}
  });
  
  export const listarConfiguracaoGeraisFailure = (error) => ({
    type: LISTAR_CONFIGURACAOGERAIS_FAILURE,
    payload: {error}
  });
  
    export const updateConfiguracaoGeraisRequest = ( configuracao) => ({
      type: UPDATE_CONFIGURACAOGERAIS_REQUEST,
      payload: {  configuracao },
    });
    
    export const updateConfiguracaoGeraisSuccess = (configuracao) => ({
      type: UPDATE_CONFIGURACAOGERAIS_SUCCESS,
      payload: { configuracao },
    });
    
    export const updateConfiguracaoGeraisFailure = (error) => ({
      type: UPDATE_CONFIGURACAOGERAIS_FAILURE,
      payload: { error },
    });
