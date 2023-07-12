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
  
`;

const ModalContent = styled.div`
  background-color: rgba(255, 255,255, 0.9);
  padding: 20px;
  
  border-radius: 5px;
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  flex-direction: column;
`;

const ModalHeader = styled.div`
background-color: rgba(100, 100,100, 0.9);
  padding: 10px;
  height: 60px;
  width: 100vw;
  display: flex;
  justify-content: flex-end;
`;
const ContentInfoBasic = styled.div`
  width: 100vw;
  display: flex;
`;
const ContentInfoSetorizacao = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const ContentInfoSetor = styled.div`
  margin: 8px;
  flex: 1;
  min-width: 300px;

`;

const ContentInfoSeparador = styled.div`
  border-bottom: 2px solid #000;
  width: 100%;
`;

const ContentInfoText = styled.div`
  color: #000;
  font-weight: 700;
`;

const ContentInfoArea = styled.div`
  margin-left: 10px;
`;

const API_URL = process.env.REACT_APP_URL_API;

const ModalInfo = ({ dados, close }) => {
  const [dadosState, setDadosState] = useState(null);
  useEffect(() => {
    setDadosState(dados);
  }, [dados])

  if(!dadosState) {
    return <ModalLoading />
  }
  return (
    <ModalWrapper>
      <ModalHeader>

        <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}><h2>DETALHES</h2></div>
        
        <MdClose onClick={() => close(false)} color='#F00' style={{ cursor: 'pointer', height: '3em', width: '3em' }} />
      </ModalHeader>
      <ModalContent>
        <ContentInfoBasic>
          <div style={{width: 120, display: 'flex', justifyContent: 'center'}}>
          <Styled.ImagemArea style={{width: 80, height: 80}}>
            <Styled.Imagem src={`${API_URL}/images/${dadosState?.fachada}`}/>
          </Styled.ImagemArea>
          </div>
          <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
          <h2 style={{textTransform: 'uppercase'}}>{dadosState.empresa}</h2>
        <ContentInfoText>{`Data: ${dadosState.data}`}</ContentInfoText>
        <ContentInfoText>{`Responsavel: ${dadosState.responsavel}`}</ContentInfoText>
        <ContentInfoText>{`E-mail: ${dadosState.email}`}</ContentInfoText>
        <ContentInfoText>{`Local: ${dadosState.localizacao}`}</ContentInfoText>
        <ContentInfoText>{`Ramo de atividade: ${dadosState?.area?.nome}`}</ContentInfoText>
        <ContentInfoText>{`Descrição do ambiente: ${dadosState?.ambiente}`}</ContentInfoText>
        <ContentInfoText>{`Observações: ${dadosState?.observacao}`}</ContentInfoText>
          </div>
        
        </ContentInfoBasic>
        
        <h2>DIAGNOSTICO</h2>
        <ContentInfoSetorizacao>

        
        {dadosState?.setores.map((setor, index) => (
        <ContentInfoSetor key={index}>
          <ContentInfoSeparador><ContentInfoText>{setor.setor.nome}</ContentInfoText></ContentInfoSeparador>
          {setor?.funcoes.map((funcao, index) => (
            <ContentInfoArea key={index}>
              <ContentInfoText>{funcao.funcao.nome}</ContentInfoText>
              {funcao?.processos.map((processo, index) => (
                <ContentInfoArea key={index}>
                  <ContentInfoText>{processo.processo.nome}</ContentInfoText>
                  {processo?.atividades.map((atividade, index) => (
                    <ContentInfoArea key={index}>
                      <ContentInfoText>{atividade.atividade.nome}</ContentInfoText>
                      {atividade?.recursos.map((recurso, index) => (
                        <ContentInfoArea key={index}>
                          <ContentInfoText>{recurso.recurso.nome}</ContentInfoText>
                          {recurso?.riscos.map((risco, index) => (
                            <ContentInfoArea key={index}>
                              <ContentInfoText>{risco.risco.nome}</ContentInfoText>
                              {risco?.causas.map((causa, index) => (
                                <ContentInfoArea key={index}>
                                  <ContentInfoText>{causa.causa.nome}</ContentInfoText>
                                  {causa?.medidas.map((medida, index) => (
                                    <ContentInfoArea key={index}>
                                      <ContentInfoText>{medida.medida.nome}</ContentInfoText>
                                      {medida?.probabilidades.map((probabilidade, index) => (
                                        <ContentInfoArea key={index}>
                                          <ContentInfoText>{probabilidade.probabilidade.nome}</ContentInfoText>
                                          {probabilidade?.severidades.map((severidade, index) => (
                                            <ContentInfoArea key={index}>
                                              <ContentInfoText>{severidade.severidade.nome}</ContentInfoText>
                                              {severidade?.niveisRisco.map((nivelRisco, index) => (
                                                <ContentInfoArea key={index}>
                                                  <ContentInfoText>{nivelRisco.nivelRisco.nome}</ContentInfoText>
                                                  {nivelRisco?.propostas.map((proposta, index) => (
                                                    <ContentInfoArea key={index}>
                                                      <ContentInfoText>{proposta.proposta.nome}</ContentInfoText>
                                                    </ContentInfoArea>
                                                  ))}
                                                </ContentInfoArea>
                                              ))}
                                            </ContentInfoArea>
                                          ))}
                                        </ContentInfoArea>
                                      ))}
                                    </ContentInfoArea>
                                  ))}
                                </ContentInfoArea>
                              ))}
                            </ContentInfoArea>
                          ))}
                        </ContentInfoArea>
                      ))}
                    </ContentInfoArea>
                  ))}
                </ContentInfoArea>
              ))}
            </ContentInfoArea>
          ))}
        </ContentInfoSetor>
      ))}
        </ContentInfoSetorizacao>
      </ModalContent>
    </ModalWrapper>
  );
};

export default ModalInfo;
