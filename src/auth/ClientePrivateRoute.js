import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const PrivateRoute = ({ isAuthenticated, token, children }) => {

      const isTokenExpired = (token) => {
            try {
                  const decodedToken = jwtDecode(token);
                  const currentTime = Math.floor(Date.now() / 1000);
                  return decodedToken.exp < currentTime;
            } catch (error) {
                  return true;
            }
      };
      return (
            (isAuthenticated && token && !isTokenExpired(token)) ? children : <Navigate to="/login" />
      );
}

const mapStateToProps = (state) => ({
      isAuthenticated: state.usuario.isAuthenticated,
      token: state.usuario.token,
});


export default connect(mapStateToProps, null)(PrivateRoute);