import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;

const Input = styled.input`
  padding: 8px;
  width:100%;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  list-style: none;
  padding: 0;
  margin-top: 4px;
  z-index: 2;
  max-height: 200px;
  overflow-y: auto;
`;

const DropdownItem = styled.li`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;



const InputSearch = ({
  items,
  onSelect,
  valueSelected,
  field = 'nome',
}) => {
  const searchTimerRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [itemSelected, setItemSelected] = useState('');
  useEffect(() => {
    setItemSelected(valueSelected);
  }, [valueSelected])
  const handleSearch = (event) => {
    
    setItemSelected(event.target.value);
    const searchTerm = event.target.value.toLowerCase();
    if(searchTerm=== '') {
      setSearchResults([]);
    }
    clearTimeout(searchTimerRef.current);
    if (searchTerm.length === 1 && (searchTerm === '*' || searchTerm === ' ') ) {
      searchTimerRef.current = setTimeout(() => {
        if (items.length > 0) {
          const filteredItems = items.filter((item) =>
            item[field].toLowerCase()
          );
          setSearchResults(filteredItems);
        } else {
          setSearchResults([]);
        }
      }, 1000);
    }
    if (searchTerm.length >= 2) {
      searchTimerRef.current = setTimeout(() => {
        if (items.length > 0) {
          const filteredItems = items.filter((item) =>
            item[field].toLowerCase().includes(searchTerm)
          );
          setSearchResults(filteredItems);
        } else {
          setSearchResults([]);
        }
      }, 1000);
    }
  
  };

  function clearResults(inputElement) {
    if (inputElement.value === '') {
      console.log('aqui')
      setSearchResults([]);
    } 
  }

  const handleSelectItem = (item) => {
    onSelect(item);
    setItemSelected(item[field])
    setSearchResults([]);
  };

  return (
    <Container>
      <form style={{ width: '100%' }} >
        <Input type='search' placeholder="Pesquisar, digite parte do nome ou * para listar todos" onChange={handleSearch} value={itemSelected} />
      </form>
      {searchResults.length > 0 && (
        <Dropdown>
          {searchResults.map((item, index) => (
            <DropdownItem key={index} onClick={() => handleSelectItem(item)}>
              {item[field]}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Container>
  );
};

export default InputSearch;
