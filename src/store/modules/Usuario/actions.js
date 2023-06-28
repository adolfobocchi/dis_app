export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

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
