import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  background: #212934;
  height: 60px;
  justify-content: flex-end;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`;
const UserArea = styled.div`
  color: #fff;
  text-transform: uppercase;
`
function NavBar({usuario}) {
    return (
        <Nav>
          <UserArea>{usuario.nome}</UserArea>
        </Nav>
    )
}

const mapStateToProps = state => {
  return {
    usuario: state.usuario.usuario,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    null: null
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);