import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const Select = styled.select`
  padding: 8px;
  width: 100%;
`;

const Option = styled.option``;

const SelectSearch = ({
  items,
  onSelect,
  valueSelected,
  field = 'nome',
}) => {
  const [itemSelected, setItemSelected] = useState(valueSelected);

  useEffect(() => {
    if (valueSelected) {
      if (valueSelected[field] !== itemSelected) {
        setItemSelected(valueSelected);
      }
    }
  }, [valueSelected, itemSelected]);

  const handleSelectChange = (event) => {
    console.log(event.target.value);
    const selectedValue = event.target.value;
    setItemSelected(selectedValue);
    const selectedItem = items.find((item) => item[field] === selectedValue);
    onSelect(selectedItem);
  };

  return (
    <Container>
      <Select value={itemSelected?.nomeFantasia && itemSelected[field]} onChange={handleSelectChange}>
        <Option value="0" selected>
          Selecione uma opção
        </Option>
        {items.map((item, index) => (
          <Option key={index} value={item[field]}>
            {item[field]}
          </Option>
        ))}
      </Select>
    </Container>
  );
};

export default SelectSearch;
