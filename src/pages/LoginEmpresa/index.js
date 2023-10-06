import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { MdEmail, MdLockPerson } from "react-icons/md";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ModalLoading from '../../components/ModalLoading';
import { loginEmpresaRequest } from '../../store/modules/Empresa/actions';

const LoginContainer = styled.div`
  background: linear-gradient(#212934, #5BAE54);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  @media screen and (max-width: 768px) {
    // Estilos para tablet...
  }

  @media screen and (max-width: 480px) {
    // Estilos para smartphone...
    flex-direction: column;
  }
`;

const LoginForm = styled.form`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 40px;
  display: flex;
  width: 50%;
  @media screen and (max-width: 768px) {
    // Estilos para tablet...
  }

  @media screen and (max-width: 480px) {
    // Estilos para smartphone...
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  background-color: #ffffff;
  border-radius: 10px 0 0 10px;
`;

const AnimatedIcon = styled.img`
  width: 100px;
  height: 100px;
  fill: #5BAE54;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  width: 100%;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  flex: 1;
  height: 50px;
`;

const Input = styled.input`
  width: 100%;
  padding-left: 30px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  height: 40px;
`;

const InputIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: absolute;
  padding: 6px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #FBAF3A;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;


const ErrorText = styled.p`
  color: red;
  font-size: 14px;
`;

const LoginEmpresaPage = ({fetchLogin, loading, error}) => {
  const { handleSubmit, register } = useForm();
  const  history = useNavigate();

  const onSubmit = (data,event) => {
    event.preventDefault();
    fetchLogin(data.email, data.password, history);
  };
  if (loading ) {
    return (<ModalLoading />)
  }
  return (

    <LoginContainer>
      
      <LoginForm method='POST' onSubmit={(event) => handleSubmit(onSubmit)(event)}>
        <LeftPanel>
          <h1>Area do cliente</h1>
          <h1>Seja bem vindo!</h1>
        </LeftPanel>
        <RightPanel>
          <Title>Login</Title>
          <InputContainer>
            <InputIcon>
              <MdEmail />
            </InputIcon>
            <Input type="email" placeholder="Email" {...register('email')} />
          </InputContainer>
          <InputContainer>
            <InputIcon>
              <MdLockPerson />
            </InputIcon>
            <Input type="password" placeholder="Senha" {...register('password')} />
          </InputContainer>
          <InputContainer>
            <Button type='submit'>Login</Button>
          </InputContainer>
          {error && <ErrorText>{error}</ErrorText>}
        </RightPanel>
      </LoginForm>
    </LoginContainer>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.empresa.isAuthenticated,
    token: state.empresa.token,
    grupos: state.empresa.grupoLogado,
    error: state.empresa.error,
    loading: state.empresa.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchLogin: (email,password, history) => dispatch(loginEmpresaRequest(email,password,history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginEmpresaPage);
