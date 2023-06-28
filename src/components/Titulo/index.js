import React from 'react';
import styled from 'styled-components';

const TituloHeader = styled.header`
    display: flex;
    width: 100%;
    height: 80px;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 20px ;
`

const TituloBar = styled.div`
    width: 100%;
    height: 3px;
    background-color: #000;
    
`

const TituloTexto = styled.h1`

`

const Titulo = ({ titulo }) => {
    return (
        <TituloHeader>
            <TituloTexto>{titulo}</TituloTexto>
            <TituloBar />
        </TituloHeader>
    )
}

export default Titulo;