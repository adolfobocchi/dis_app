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
  padding: 20px;
`;

const ContentInfoSeparador = styled.div`
  border-bottom: 2px solid #000;
  width: 100%;
  margin-bottom: 10px;
`;

const ContentInfoText = styled.div`
  color: #000;
  font-weight: 500;
  margin-bottom: 6px;
  font-size: 1em;
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
  console.log(dadosState);
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
          <h2 style={{textTransform: 'uppercase'}}>{dadosState.empresa.razaoSocial}</h2>
        <ContentInfoText>{`Data: ${dadosState.data}`}</ContentInfoText>
        <ContentInfoText>{`Responsavel: ${dadosState.responsavel}`}</ContentInfoText>
        <ContentInfoText>{`E-mail: ${dadosState.email}`}</ContentInfoText>
        <ContentInfoText>{`Local: ${dadosState.empresa?.endereco}, ${dadosState.empresa?.numero} - ${dadosState.empresa?.cidade}`}</ContentInfoText>
        <ContentInfoText>{`Ramo de atividade: ${dadosState?.empresa.area.nome}`}</ContentInfoText>
        
          </div>
          
        </ContentInfoBasic>
        <h3>Descrição do ambiente</h3>
        <ContentInfoSeparador />
          <ContentInfoText>{` ${dadosState?.ambiente}`}</ContentInfoText>
          <h3>Observações</h3>
          <ContentInfoSeparador />
        <ContentInfoText>{`${dadosState?.observacaoAmbiente}`}</ContentInfoText>
        <h3>Diagnostico</h3>
        <ContentInfoSeparador />  
        <ContentInfoSetorizacao>

        
        {dadosState?.setores.map((setor, index) => (
        <ContentInfoSetor key={index}>
          <ContentInfoText style={{fontSize: 20, fontWeight: 700}}>{setor.setor.nome}</ContentInfoText>
          {setor?.funcoes.map((funcao, index) => (
            <ContentInfoArea key={index}>
              <ContentInfoText>{funcao.funcao.nome}</ContentInfoText>
              {funcao?.atividades.map((atividade, index) => (
                <ContentInfoArea key={index}>
                  <ContentInfoText>{atividade.atividade.nome}</ContentInfoText>
                  {atividade?.perigos.map((perigo, index) => (
                    <ContentInfoArea key={index}>
                      <ContentInfoText>{perigo.perigo.nome}</ContentInfoText>
                      {perigo?.agentesRisco.map((agenteRisco, index) => (
                        <ContentInfoArea key={index}>
                          <ContentInfoText>{agenteRisco.agenteRisco.nome}</ContentInfoText>
                          {agenteRisco?.riscos.map((risco, index) => (
                            <ContentInfoArea key={index}>
                              <ContentInfoText>{risco.risco.nome}</ContentInfoText>
                              {risco?.viaAbsorcao.map((viaAbsorcao, index) => (
                                <ContentInfoText>{viaAbsorcao.nome}</ContentInfoText>
                              ))}
                               {risco?.frequenciaExposicao.map((frequenciaExposicao, index) => (
                                <ContentInfoText>{frequenciaExposicao.nome}</ContentInfoText>
                              ))}
                              {risco?.duracaoExposicao.map((duracaoExposicao, index) => (
                                <ContentInfoText>{duracaoExposicao.nome}</ContentInfoText>
                              ))}
                              {risco?.causa.map((causa, index) => (
                                  <ContentInfoText>{causa.causa.nome}</ContentInfoText>
                                
                              ))}
                              {risco?.medida.map((medida, index) => (
                                <ContentInfoText>{medida.medida.nome}</ContentInfoText>
                              ))}
                              {risco?.avaliacao.map((avaliacao, index) => (
                                <ContentInfoText>{avaliacao.nome}</ContentInfoText>
                              ))}
                              {risco?.probabilidade.map((probabilidade, index) => (
                                <ContentInfoText>{probabilidade.probabilidade.nome}</ContentInfoText>
                              ))}
                              {risco?.severidade.map((severidade, index) => (
                                <ContentInfoText>{severidade.severidade.nome}</ContentInfoText>
                              ))}
                              {risco?.nivelRisco.map((nivelRisco, index) => (
                                <ContentInfoText>{nivelRisco.nivelRisco.nome}</ContentInfoText>
                              ))}
                              {risco?.planosAcao.map((planoAcao, index) => (
                                <ContentInfoArea key={index}>
                                <ContentInfoText>{planoAcao.planoAcao.nome}</ContentInfoText>
                                
                                {planoAcao?.intencao.map((intencao, index) => (
                                  <ContentInfoText>{intencao.nome}</ContentInfoText>
                                ))}
                                {planoAcao?.prioridade.map((prioridade, index) => (
                                  <ContentInfoText>{prioridade.nome}</ContentInfoText>
                                ))}
                                {planoAcao?.prazo.map((prazo, index) => (
                                  <ContentInfoText>{prazo.nome}</ContentInfoText>
                                ))}
                                
                                {planoAcao?.monitoramento.map((monitoramento, index) => (
                                  <ContentInfoText>{monitoramento.monitoramento.nome}</ContentInfoText>
                                ))}
                                {planoAcao?.status.map((status, index) => (
                                  <ContentInfoText>{status.nome}</ContentInfoText>
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
