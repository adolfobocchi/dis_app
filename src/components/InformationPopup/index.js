import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { hideInformation } from '../../store/modules/Information/actions';

const Overlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
`;

const Container = styled.div`
  width: 500px;
  max-width: 90%;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  height: 40px;
  width: 100%;
  align-items: center;
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
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

const InformationPopup = () => {
  const { title, text, visible } = useSelector(state => state.information);
  const dispatch = useDispatch();
  useEffect(() => {
    if(visible) {
      const delayedFunction = () => {
        dispatch(hideInformation());
      };
      const timeoutId = setTimeout(delayedFunction, 2200);
      return () => clearTimeout(timeoutId);
    }
    
  }, [visible]);
  return (
    <>
      {
        visible &&
        <Overlay>
          <Container>
            <Header>
              <Title>{title}</Title>
            </Header>
            <Body>
              <Message>{text}</Message>
            </Body>
            {/* <div>
              <Button color="#007bff" onClick={handleOk}>Confirmar</Button>
              <Button color="#dc3545" onClick={handleCancel}>Cancelar</Button>
            </div> */}
          </Container>
        </Overlay>
      }
    </>

  );
};

export default InformationPopup;
