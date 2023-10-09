import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { hideConfirmation } from '../../store/modules/Confirmation/actions';

const Overlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
`;

const Container = styled.div`
  width: 500px;
  max-width: 90%;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
`;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Message = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 5px;
  margin-right: 10px;
  background-color: ${props => props.color};
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const ConfirmationPopup = () => {
  const { title, text, onConfirm,  visible } = useSelector(state => state.confirmation);
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(hideConfirmation());
  };

  const handleOk = () => {
    if (onConfirm) {
      onConfirm();
    }
    dispatch(hideConfirmation());
  };
  return (
    <>
      {
        visible &&
        <Overlay>
          <Container>
            <Title>{title}</Title>
            <Message>{text}</Message>
            <div>
              <Button color="#007bff" onClick={handleOk}>Confirmar</Button>
              <Button color="#dc3545" onClick={handleCancel}>Cancelar</Button>
            </div>
          </Container>
        </Overlay>
      }
    </>

  );
};

export default ConfirmationPopup;
