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
  align-items: center;
  flex: 1;
  flex-wrap: wrap;
  justify-content: center;
  
  overflow-y: auto;
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

const ModalListSelect = ({ dados, close, setItensSelected }) => {
  const [dadosState, setDadosState] = useState(null);
  useEffect(() => {
    setDadosState(dados);
  }, [dados]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleItemClick = (item) => {
    const itemIndex = selectedItems.findIndex((selectedItem) => selectedItem._id === item._id);

    if (itemIndex === -1) {
      // Adicionar o item aos itens selecionados
      setSelectedItems([...selectedItems, item]);
    } else {
      // Remover o item dos itens selecionados
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem._id !== item._id));
    }
  };

  if(!dadosState) {
    return <ModalLoading />
  }
  return (
    <ModalWrapper className="element-to-keep-selected">
      <ModalHeader>

        <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}><h2>SELECIONAR ITENS DA LISTA</h2></div>
        
        <MdClose onClick={() => {setItensSelected(selectedItems); close(false)}} color='#F00' style={{ cursor: 'pointer', height: '3em', width: '3em' }} />
      </ModalHeader>
      <ModalContent >
      {dadosState && dadosState.length > 0 && dadosState.map((item, index) => {
        
        return (
        <ListItem
          key={item._id} 
          selected={selectedItems.some((selectedItem) => selectedItem._id === item._id)} 
          onClick={() => handleItemClick(item)}
          >
          
          {item.nome}
        </ListItem>
      )})}
      </ModalContent>
    </ModalWrapper>
  );
};

export default ModalListSelect;
