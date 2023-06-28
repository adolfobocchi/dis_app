import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { logoutRequest } from '../../store/modules/Usuario/actions';
import ModalLoading from '../ModalLoading';

const Logout = ({loading}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoutRequest());
    }, []);
    if (loading ) {
        return (<ModalLoading />)
      }
    return(
        <></>
    )
}

const mapStateToProps = state => {
    return {
      loading: state.usuario.loading,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      null: null
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Logout);