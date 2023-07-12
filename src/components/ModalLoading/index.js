import React from 'react';
import styled, { keyframes } from 'styled-components';

const ModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  position: relative;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: #767676;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${rotate} 0.8s linear infinite;
`;

const ModalInfo = ({ show }) => {
  return (
    <ModalWrapper>
      <ModalContent>
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>
      </ModalContent>
    </ModalWrapper>
  );
};

export default ModalInfo;
