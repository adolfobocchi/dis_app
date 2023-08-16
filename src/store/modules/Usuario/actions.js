export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const LISTAR_USUARIOS_REQUEST = 'LISTAR_USUARIOS_REQUEST';
export const LISTAR_USUARIOS_SUCCESS = 'LISTAR_USUARIOS_SUCCESS';
export const LISTAR_USUARIOS_FAILURE = 'LISTAR_USUARIOS_FAILURE';

export const SHOW_USUARIOS_REQUEST = 'SHOW_USUARIOS_REQUEST';
export const SHOW_USUARIOS_SUCCESS = 'SHOW_USUARIOS_SUCCESS';
export const SHOW_USUARIOS_FAILURE = 'SHOW_USUARIOS_FAILURE';

export const CRIAR_USUARIOS_REQUEST = 'CRIAR_USUARIOS_REQUEST';
export const CRIAR_USUARIOS_SUCCESS = 'CRIAR_USUARIOS_SUCCESS';
export const CRIAR_USUARIOS_FAILURE = 'CRIAR_USUARIOS_FAILURE';

export const UPDATE_USUARIOS_REQUEST = 'UPDATE_USUARIOS_REQUEST';
export const UPDATE_USUARIOS_SUCCESS = 'UPDATE_USUARIOS_SUCCESS';
export const UPDATE_USUARIOS_FAILURE = 'UPDATE_USUARIOS_FAILURE';

export const UPDATEPASSWORD_USUARIOS_REQUEST = 'UPDATEPASSWORD_USUARIOS_REQUEST';
export const UPDATEPASSWORD_USUARIOS_SUCCESS = 'UPDATEPASSWORD_USUARIOS_SUCCESS';
export const UPDATEPASSWORD_USUARIOS_FAILURE = 'UPDATEPASSWORD_USUARIOS_FAILURE';

export const DELETE_USUARIOS_REQUEST = 'DELETE_USUARIOS_REQUEST';
export const DELETE_USUARIOS_SUCCESS = 'DELETE_USUARIOS_SUCCESS';
export const DELETE_USUARIOS_FAILURE = 'DELETE_USUARIOS_FAILURE';

export const loginRequest = (email, password, history) => ({
    type: LOGIN_REQUEST,
    payload: { email, password, history },
});

export const loginSuccess = (usuario, token, history) => ({
    type: LOGIN_SUCCESS,
    payload: { usuario, token, history },
});

export const loginFailure = (message) => ({
    type: LOGIN_FAILURE,
    payload: { message },
});

export const logoutRequest = () => ({
    type: LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
});


export const listarUsuariosRequest = (page, ativo) => ({
    type: LISTAR_USUARIOS_REQUEST,
    payload: {page, ativo}
  });
  
  export const listarUsuariosSuccess = (usuarios) => ({
    type: LISTAR_USUARIOS_SUCCESS,
    payload: {usuarios}
  });
  
  export const listarUsuariosFailure = (error) => ({
    type: LISTAR_USUARIOS_FAILURE,
    payload: {error}
  });
  
  export const showUsuariosRequest = (usuarioId) => ({
      type: SHOW_USUARIOS_REQUEST,
      payload: usuarioId,
    });
    
    export const showUsuariosSuccess = (usuario) => ({
      type: SHOW_USUARIOS_SUCCESS,
      payload: { usuario },
    });
    
    export const showUsuariosFailure = (error) => ({
      type: SHOW_USUARIOS_FAILURE,
      payload: { error },
    });
    
    export const criarUsuariosRequest = (usuario) => ({
      type: CRIAR_USUARIOS_REQUEST,
      payload: { usuario },
    });
    
    export const criarUsuariosSuccess = (usuario) => ({
      type: CRIAR_USUARIOS_SUCCESS,
      payload: { usuario },
    });;
    
    export const criarUsuariosFailure = (error) => ({
      type: CRIAR_USUARIOS_FAILURE,
      payload: { error },
    });
    
    export const updateUsuariosRequest = (id, usuario) => ({
      type: UPDATE_USUARIOS_REQUEST,
      payload: { id, usuario },
    });
    
    export const updateUsuariosSuccess = (usuario) => ({
      type: UPDATE_USUARIOS_SUCCESS,
      payload: { usuario },
    });
    
    export const updateUsuariosFailure = (error) => ({
      type: UPDATE_USUARIOS_FAILURE,
      payload: { error },
    });

    export const updatePasswordUsuariosRequest = (id, usuario) => ({
        type: UPDATEPASSWORD_USUARIOS_REQUEST,
        payload: { id, usuario },
      });
      
      export const updatePasswordUsuariosSuccess = (usuario) => ({
        type: UPDATEPASSWORD_USUARIOS_SUCCESS,
        payload: { usuario },
      });
      
      export const updatePasswordUsuariosFailure = (error) => ({
        type: UPDATEPASSWORD_USUARIOS_FAILURE,
        payload: { error },
      });
    
    export const deleteUsuariosRequest = (id) => ({
      type: DELETE_USUARIOS_REQUEST,
      payload: id,
    });
    
    export const deleteUsuariosSuccess = (id) => ({
      type: DELETE_USUARIOS_SUCCESS,
      payload: {id},
    });
    
    export const deleteUsuariosFailure = (error) => ({
      type: DELETE_USUARIOS_FAILURE,
      payload: { error },
    });
    