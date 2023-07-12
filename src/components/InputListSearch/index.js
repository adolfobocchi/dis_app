import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Controller } from 'react-hook-form';

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
`;

const DropdownItem = styled.li`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const InputListSearch = ({
  items,
  control,
  name,
  setValue
}) => {
  const searchTimerRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    clearTimeout(searchTimerRef.current);
    if (searchTerm.length >= 2) {
      searchTimerRef.current = setTimeout(() => {
        if (items.length > 0) {
          const filteredItems = items.filter((item) =>
            item.nome.toLowerCase().includes(searchTerm)
          );
          setSearchResults(filteredItems);
        } else {
          setSearchResults([]);
        }
      }, 2000);
    }

  };

  const handleSelectItem = (item) => {
    setSelectedItem(item.nome);
    setSearchResults([]);
  };
  return (
    <Container>
      <Controller style={{ width: '100%' }}
        control={control}
        name={name}
        render={({ field }) => (
          <Input type='search'
            placeholder="Pesquisar"
            value={field.value || selectedItem || ''}
            onChange={(e) => {
              field.onChange(e);
              handleSearch(e);
            }}
          />
        )}
      />
      {searchResults.length > 0 && (
        <Dropdown>
          {searchResults.map((item, index) => (
            <DropdownItem key={index} onClick={() => handleSelectItem(item)}>
              {item.nome}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Container>
  );
};

export default InputListSearch;
