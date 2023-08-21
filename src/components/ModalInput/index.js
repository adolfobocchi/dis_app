import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';
import * as Styled from '../styleds';
import ModalLoading from '../ModalLoading';

const ModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  height: auto;
  width: 100vw;
  height: calc(100vh);
  display: flex;
  flex-direction: column;
  z-index: 9999;
  overflow-y: scroll;
`;

const ModalContent = styled.div`
  background-color: rgba(255, 255,255, 0.9);
  padding: 20px;
  
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  flex-wrap: wrap;
  justify-content: center;
`;

const ModalHeader = styled.div`
  background-color: rgba(100, 100,100, 0.9);
  padding: 10px;
  height: 60px;
  width: 100vw;
  display: flex;
  justify-content: flex-end;
`;

const ListItem = styled.li`
  cursor: pointer;
  padding: 8px;
  color: ${(props) => (props.selected ? '#00FF00' : '#000')};
  display: flex;
  margin: 8px;
  width: 100px;
  overflow: hidden;
  font-size: 0.8em;
  font-weight: 400;
  text-decoration: ${(props) => (props.selected ? 'underline' : 'none')};;
`;

const ModalInput = ({dados, close, setItensSelected }) => {
  const [dadosState, setDadosState] = useState([]);
  const [inputData, setInputData] = useState({_id: 1, nome: ''})
  const [maiorIdState, setMaiorId] = useState(1);

  useEffect(() => {
    setDadosState(dados);
  }, [dados]);

  useEffect(() => {
    const maiorId = dadosState.reduce((maxId, obj) => {
      return obj.id > maxId ? obj.id : maxId;
    }, -Infinity);
    if(maiorId > 1)
      setMaiorId(maiorId)
  }, [dadosState])
  
  const handleChange = (event) => {
    setInputData({...inputData, _id: maiorIdState, nome: event.target.value})
  }

  return (
    <ModalWrapper className="element-to-keep-selected">
      <ModalHeader>

        <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}><h2>SELECIONAR ITENS DA LISTA</h2></div>
        
        <MdClose onClick={() => {setItensSelected([inputData]); close(false)}} color='#F00' style={{ cursor: 'pointer', height: '3em', width: '3em' }} />
      </ModalHeader>
      <ModalContent>
        <h3>Avaliação: </h3>
      <textarea style={{height: '70%', width: '70%'}} name="inputArea" value={inputData.nome} onChange={(event) => handleChange(event)} />
      </ModalContent>
    </ModalWrapper>
  );
};

export default ModalInput;
