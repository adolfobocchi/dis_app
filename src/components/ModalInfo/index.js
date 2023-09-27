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
  height: calc(100vh);
  display: flex;
  flex-direction: column;
  z-index: 9999;
  overflow-y: scroll;
  font-size: 13px;
  overflow-y: auto;
`;

const ModalContent = styled.div`
  background-color: rgba(255, 255,255, 0.9);
  border-radius: 5px;
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  background-color: rgba(100, 100,100, 0.9);
  padding: 10px;
  height: 60px;
  width: 100vw;
  display: flex;
  justify-content: flex-end;
  position: fixed;
`;
const ContentInfoBasic = styled.div`
  width: 100vw;
  display: flex;
  margin-top: 60px;
`;
const ContentInfoSetorizacao = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const ColLabel = styled.div`
  
  display: flex;
  width: 110px;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  height: 110px;
  background-color: #CCC;
  overflow: hidden;
  white-space: normal;
  padding: 6px;
`;
const API_URL = process.env.REACT_APP_URL_API;

const ModalInfo = ({ dados, close }) => {

  const [dadosState, setDadosState] = useState(null);

  const [setorState, setSetorState] = useState('');
  const [funcaoState, setFuncaoState] = useState('');
  const [perigoState, setPerigoState] = useState('');
  const [riscoState, setRiscoState] = useState('');
  const [planoState, setPlanoState] = useState('');

  useEffect(() => {
    setDadosState(dados);
  }, [dados])
  if (!dadosState) {
    return <ModalLoading />
  }

  function compararPorNome(a, b, obj) {
    const nomeA = a[obj].nome.toUpperCase();
    const nomeB = b[obj].nome.toUpperCase();
  
    if (nomeA < nomeB) {
      return -1;
    }
    if (nomeA > nomeB) {
      return 1;
    }
    return 0;
  }
  
  return (
    <ModalWrapper>

      <ModalContent>
        <ModalHeader>

          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}><h2>DETALHES</h2></div>

          <MdClose onClick={() => close(false)} color='#F00' style={{ cursor: 'pointer', height: '3em', width: '3em', marginRight: 8 }} />
        </ModalHeader>
        <ContentInfoBasic>
          <div style={{ width: 120, display: 'flex', justifyContent: 'center' }}>
            <Styled.ImagemArea style={{ width: 80, height: 80 }}>
              <Styled.Imagem src={`${API_URL}/images/${dadosState?.fachada}`} />
            </Styled.ImagemArea>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ textTransform: 'uppercase' }}>{dadosState.empresa.razaoSocial}</h2>
            <ContentInfoText>{`Data: ${dadosState.data}`}</ContentInfoText>
            <ContentInfoText>{`Responsavel: ${dadosState.responsavel}`}</ContentInfoText>
            <ContentInfoText>{`E-mail: ${dadosState.email}`}</ContentInfoText>
            <ContentInfoText>{`Local: ${dadosState.empresa?.endereco}, ${dadosState.empresa?.numero} - ${dadosState.empresa?.cidade}`}</ContentInfoText>
            <ContentInfoText>{`Ramo de atividade: ${dadosState?.empresa.area.nome}`}</ContentInfoText>

          </div>

        </ContentInfoBasic>
        <h3>Observações</h3>
        <ContentInfoSeparador />
        <ContentInfoText>{`${dadosState?.observacaoAmbiente}`}</ContentInfoText>
        <h3>Diagnostico</h3>
        <ContentInfoSeparador />
        <ContentInfoSetorizacao>
          
        {dadosState?.setores.sort((a,b) => compararPorNome(a,b,'setor')).map((setor, setorIndex) => {
            //setSetorState(setor?.setor?._id)
            const funcoesSetor = dadosState?.funcoes.filter(funcao => funcao.setor === setor.setor?._id).sort((a,b) => compararPorNome(a,b,'funcao'))
            return (
              funcoesSetor.map((funcao, funcaoIndex) => {
                console.log(funcao.funcao.nome)
                const perigosFuncao = dadosState?.perigos.filter(perigo => perigo.funcao === funcao.funcao?._id).sort((a,b) => compararPorNome(a,b,'perigo'))
                console.log(perigosFuncao);
                return (
                  <div style={{ display: 'flex', flex: 1, flexDirection: 'column', width: '80%', margin: 20 }}>
                    <div style={{ display: 'flex', flex: 1, width: '100%' }}>
                      <ColLabel>{funcaoIndex + 1}</ColLabel>
                      <ColLabel>Função:</ColLabel>
                      <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 110 }}>{funcao.funcao.nome}</div>
                      <ColLabel>QT DE FUNCIONARIOS:</ColLabel>
                      <div style={{ display: 'flex', width: 100, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 110 }}>{funcao.quantidade}</div>
                    </div>
                    <div style={{ display: 'flex', flex: 1, width: '100%' }}>

                      <ColLabel>Setor:</ColLabel>
                      <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 110 }}>{setor.setor.nome}</div>
                    </div>
                    <div style={{ display: 'flex', flex: 1, width: '100%' }}>

                      <ColLabel>descricao do ambiente: </ColLabel>
                      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 110 }}>
                        {setor?.descricao?.nome}
                      </div>
                      <ColLabel>data da identificação: </ColLabel>
                      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 110 }}>
                        {dadosState.data}
                      </div>

                    </div>
                    <div style={{ display: 'flex', flex: 1, width: '100%' }}>

                      <ColLabel>descricao das atividades: </ColLabel>
                      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 110 }}>
                        {funcao?.descricao?.nome}
                      </div>

                    </div>
                    <div style={{ display: 'flex', flex: 1, width: '100%' }}>

                      <ColLabel>riscos: </ColLabel>
                      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto' }}>
                        {dadosState?.riscos.filter(risco => risco.funcao === funcao?.funcao._id).filter(risco => risco.setor === funcao?.setor).sort((a,b) => compararPorNome(a,b,'risco')).map((risco, riscoIndex) => {
                          return (

                            <p key={riscoIndex} style={{ display: 'block' }}>
                              {`${funcaoIndex + 1}.${riscoIndex + 1} ${risco.risco.nome}`}
                            </p>

                          )
                        })
                        } 
                      </div>

                    </div>
                    {perigosFuncao.map((perigo, perigoIndex) => {
                      console.log(perigo.perigo.nome)
                      const riscosPerigo = dadosState?.riscos.filter(risco => risco.funcao === funcao?.funcao._id).sort((a,b) => compararPorNome(a,b,'risco'))
                      console.log(riscosPerigo)
                      return (

                        riscosPerigo.map((risco, riscoIndex) => 
                        {  
                          const agentesRisco = dadosState?.agentesRisco.filter(agenteRisco => agenteRisco.risco === risco?.risco._id)
                          console.log(agentesRisco)
                          return (
                          <div style={{ display: 'flex', flex: 1, flexDirection: 'column', marginTop: 20 }}>
                            <div style={{ display: 'flex', flex: 1, width: '100%' }}>

                              <ColLabel>agente: </ColLabel>
                              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto' }}>
                                {agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  return (

                                    <p key={agenteRiscoIndex} style={{ display: 'block' }}>
                                      {agenteRisco.agenteRisco.nome}
                                    </p>

                                  )
                                })
                                }
                              </div>
                            </div>
                            <div style={{ display: 'flex', flex: 1, width: '100%' }}>
                              <ColLabel>Fonte ou Circunstáncia: </ColLabel>
                              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto' }}>


                                <p key={perigoIndex} style={{ display: 'block' }}>
                                  {perigo.perigo.nome}<br></br>
                                </p>


                              </div>

                              <ColLabel>{`${funcaoIndex + 1}.${riscoIndex + 1}`} </ColLabel>
                              <ColLabel>risco: </ColLabel>
                              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto' }}>


                                <p key={riscoIndex} style={{ display: 'block' }}>
                                  {risco.risco.nome}
                                </p>


                              </div>
                            </div>
                            <div style={{ display: 'flex', flex: 1, width: '100%' }}>

                              <ColLabel>via absorcao: </ColLabel>
                              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto' }}>
                                {dadosState?.viasAbsorcao.filter(viaAbsorcao => viaAbsorcao.risco === risco?.risco._id).map((viaAbsorcao, viaAbsorcaoIndex) => {
                                  return (

                                    <p key={viaAbsorcaoIndex} style={{ display: 'block' }}>
                                      {viaAbsorcao.viaAbsorcao.nome}
                                    </p>

                                  )
                                })
                                }
                              </div>
                              <ColLabel>Frequencia Exposicao: </ColLabel>
                              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto' }}>
                                {dadosState?.frequenciaExposicao.filter(frequenciaExposicao => frequenciaExposicao.risco === risco?.risco._id).map((frequenciaExposicao, frequenciaExposicaoIndex) => {
                                  return (

                                    <p key={frequenciaExposicaoIndex} style={{ display: 'block' }}>
                                      {frequenciaExposicao.frequenciaExposicao.nome}
                                    </p>

                                  )
                                })
                                }
                              </div>
                              <ColLabel>Duração Exposicao: </ColLabel>
                              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto' }}>
                                {dadosState?.duracaoExposicao.filter(duracaoExposicao => duracaoExposicao.risco === risco?.risco._id).map((duracaoExposicao, duracaoExposicaoIndex) => {
                                  return (

                                    <p key={duracaoExposicaoIndex} style={{ display: 'block' }}>
                                      {duracaoExposicao.duracaoExposicao.nome}
                                    </p>

                                  )
                                })
                                }
                              </div>
                            </div>
                            <div style={{ display: 'flex', flex: 1, width: '100%' }}>

                              <ColLabel>Possiveis Lesoes: </ColLabel>
                              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto' }}>
                                {dadosState?.causas.filter(causa => causa.risco === risco?.risco._id).map((causa, causaIndex) => {
                                  return (

                                    <p key={causaIndex} style={{ display: 'block' }}>
                                      {causa.causa.nome}
                                    </p>

                                  )
                                })
                                }
                              </div>
                              <ColLabel>Medida: </ColLabel>
                              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto' }}>
                                {dadosState?.medidas.filter(medida => medida.risco === risco?.risco._id).map((medida, medidaIndex) => {
                                  return (

                                    <p key={medidaIndex} style={{ display: 'block' }}>
                                      {medida.medida.nome}
                                    </p>

                                  )
                                })
                                }
                              </div>
                              <ColLabel>Avaliação Quantitativa: </ColLabel>
                              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto' }}>
                                {dadosState?.avaliacao.filter(avaliacao => avaliacao.risco === risco?.risco._id).map((avaliacao, avaliacaoIndex) => {
                                  return (

                                    <p key={avaliacaoIndex} style={{ display: 'block' }}>
                                      {avaliacao.avaliacao.nome}
                                    </p>

                                  )
                                })
                                }
                              </div>
                            </div>
                            <div style={{ display: 'flex', flex: 1, width: '100%' }}>

                              <ColLabel>Probabilidade: </ColLabel>
                              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto' }}>
                                {dadosState?.probabilidades.filter(probabilidade => probabilidade.risco === risco?.risco._id).map((probabilidade, probabilidadeIndex) => {
                                  return (

                                    <p key={probabilidadeIndex} style={{ display: 'block' }}>
                                      {`(${probabilidade.probabilidade.valor}) ${probabilidade.probabilidade.nome}`}
                                    </p>

                                  )
                                })
                                }
                              </div>
                              <ColLabel>Severidade: </ColLabel>
                              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto' }}>
                                {dadosState?.severidades.filter(severidade => severidade.risco === risco?.risco._id).map((severidade, severidadeIndex) => {
                                  return (

                                    <p key={severidadeIndex} style={{ display: 'block' }}>
                                      {`(${severidade.severidade.valor}) ${severidade.severidade.nome}`}
                                    </p>

                                  )
                                })
                                }
                              </div>
                              <ColLabel>Nivel de risco: </ColLabel>
                              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto' }}>
                                {dadosState?.niveisRisco.filter(nivelRisco => nivelRisco.risco === risco?.risco._id).map((nivelRisco, nivelRiscoIndex) => {
                                  return (

                                    <p key={nivelRiscoIndex} style={{ display: 'block' }}>
                                      {`(${nivelRisco.nivelRisco?.probabilidadeValor}X${nivelRisco.nivelRisco?.severidadeValor}) ${nivelRisco.nivelRisco.nome}`}
                                    </p>

                                  )
                                })
                                }
                              </div>
                            </div>
                            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', marginTop: 20 }}>
                              <div style={{ backgroundColor: '#CCC', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto' }}>PLANO DE ACAO</div>
                              {dadosState?.planosAcao.filter(planoAcao => planoAcao.risco === risco?.risco._id).map((planoAcao, planoAcaoIndex) => (

                                <>
                                  <div style={{ display: 'flex', flex: 1, width: '100%' }}>

                                    <ColLabel>{planoAcaoIndex + 1} </ColLabel>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto' }}>


                                      <p key={planoAcaoIndex} style={{ display: 'block' }}>
                                        {planoAcao.planoAcao.nome}
                                      </p>


                                    </div>
                                  </div>
                                  <div style={{ display: 'flex', flex: 1, width: '100%' }}>

                                    <ColLabel>intenção: </ColLabel>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto' }}>
                                      {dadosState?.intencao.filter(intencao => intencao.planoAcao === planoAcao?.planoAcao._id).map((intencao, intencaoIndex) => {
                                        return (

                                          <p key={intencaoIndex} style={{ display: 'block' }}>
                                            {intencao.intencao.nome}
                                          </p>

                                        )
                                      })
                                      }
                                    </div>
                                    <ColLabel>prioridade: </ColLabel>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto' }}>
                                      {dadosState?.prioridade.filter(prioridade => prioridade.planoAcao === planoAcao?.planoAcao._id).map((prioridade, prioridadeIndex) => {
                                        return (

                                          <p key={prioridadeIndex} style={{ display: 'block' }}>
                                            {prioridade.prioridade.nome}
                                          </p>

                                        )
                                      })
                                      }
                                    </div>
                                    <ColLabel>prazo: </ColLabel>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto' }}>
                                      {dadosState?.prazo.filter(prazo => prazo.planoAcao === planoAcao?.planoAcao._id).map((prazo, prazoIndex) => {
                                        return (

                                          <p key={prazoIndex} style={{ display: 'block' }}>
                                            {prazo.prazo.nome}
                                          </p>

                                        )
                                      })
                                      }
                                    </div>

                                    <ColLabel>monitoramento: </ColLabel>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto' }}>
                                      {dadosState?.monitoramentos.filter(monitoramento => monitoramento.planoAcao === planoAcao?.planoAcao._id).map((monitoramento, monitoramentoIndex) => {
                                        return (

                                          <p key={monitoramentoIndex} style={{ display: 'block' }}>
                                            {monitoramento.monitoramento.nome}
                                          </p>

                                        )
                                      })
                                      }
                                    </div>
                                    <ColLabel>Status: </ColLabel>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto' }}>
                                      {dadosState?.status.filter(status => status.planoAcao === planoAcao?.planoAcao._id).map((status, statusIndex) => {
                                        return (

                                          <p key={statusIndex} style={{ display: 'block' }}>
                                            {status.status.nome}
                                          </p>

                                        )
                                      })
                                      }
                                    </div>

                                  </div>
                                </>
                              ))}

                            </div>
                          </div>
                          )
                        })

                      )
                    })
                    }
                  </div>
                )
              })
            )
          })}
        
        </ContentInfoSetorizacao>
      </ModalContent>
    </ModalWrapper>
  );
};

export default ModalInfo;


