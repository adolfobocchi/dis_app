import styled from 'styled-components';
import { MdCircle } from 'react-icons/md';

export const Container = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

export const FormArea = styled.div`
  display: flex;
`;


export const Form = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 8px;
  text-transform: lowercase;
  font-size: 0.8em;
`;

export const Button = styled.button`
  padding: 8px 16px;
  background-color: #5BAE54;
  color: #FFF;
  border: none;
  cursor: pointer;
`;

export const ListArea = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  overflow-x: auto;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: auto;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 4px solid #f8f9fd;
  cursor: pointer;
  width: auto;
`;

export const ListHeader = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 4px solid #eceffa;
  width: auto;
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 0.9em;

`;

const AtivoItem = styled.div`
    color: #23BD5A;
    background: #CFF6DD;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 4px;
`;

const InativoItem = styled.div`
    color: #F2BE1D;
    background: #FDF5DD;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 4px;
`;

const ColunaHeader = styled.div`
    color: gray;
    text-transform: capitalize;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1em;
    font-weight: 500;
    padding: 20px;
    flex: 1;
`

export const ColunaValor = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8em;
    font-weight: 400;
    padding: 20px;
    flex: 1;
    text-transform: lowercase;

    p::first-letter {
      text-transform: uppercase;
    }
`

export const AreaFlex = styled.div`
  flex: 1;
  display: flex;
  font-size: 1em;
`

export const AreaWidth = styled.div`
  display: flex;
`

export const ImagemArea = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Imagem = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`

export const SectionArea = styled.div`
  background: #EBF0F7;
  display: flex;
  height: 40px;
  font-size: 1.1em;
  font-weight: 400;
  align-items: center;
  margin-bottom: 12px;
  margin-top: 12px;
  padding: 6px;
`;


export const Ativo = () => (
    <ColunaValor><AtivoItem><MdCircle />Ativo</AtivoItem></ColunaValor>
)

export const Inativo = () => (
    <ColunaValor><InativoItem><MdCircle />Inativo</InativoItem></ColunaValor>
)

export const Coluna = ({label=''}) => {
   return (
    <ColunaHeader>{label}</ColunaHeader>
    )

}

export const CampoValor = ({children}) => (
    <ColunaValor><p>{children}</p></ColunaValor>
)

export const CampoImg = ({src}) => (
  <ColunaValor>
    <ImagemArea>
      <Imagem src={src}  />
    </ImagemArea>
  </ColunaValor>
)