import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as Styled from '../../components/styleds';
import SelectSearch from '../../components/SelectSearch';
import { logoutEmpresaRequest, updateComunicadoRequest, updateDocumentoRequest } from '../../store/modules/Empresa/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { dataAtualFormatada } from '../../utils';


const Container = styled.div`
  background: #FFF;
  display: flex;
  min-height: 100vh;
  width: 100vw;
  justify-content: center;
`;

const Content = styled.div`
  width: 85%;
  overflow-y: auto;
`;

const Section = styled.section`
  min-height: 300px;
  border: 4px solid #f8f9fd;
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  height: 80px;
  display: flex;
  
  div {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    button {
      height: 40px;
      width: 80px;
    }
  }
`;

const EmpresaContent = styled.div`

  display: flex;
  flex: 1;
  height: 100%;
  background-color: #f0f0f0;
`;
const EmpresaContentLeft = styled.div`

  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 8px;
`;
const EmpresaContentRight = styled.div`

width: 200px;
height: auto;
margin: 8px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: #F8CBAD;
`;
const Row = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;


const NavSection = styled.nav`
  display: flex;
  width: 100%;
  height: 80px;

  ul {
    display: flex;
    height: 100%;
    list-style: none;
    flex: 1;
    align-items: center;
    
    li {
      flex: 1;
      height: 90%;
      background-color: #6E65AD;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 4px;

      a {
        color: #FFF;
        display: flex;
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;
        text-decoration: none;
      }
    }
  }

`


function AreaClientePage({ grupo, logoutEmpresa, confirmacao, updateComunicado, updateDocumento}) {
  const API_URL = process.env.REACT_APP_URL_VIDEOS;

  const [grupoState, setGrupoState] = useState(null);

  const [empresasState, setEmpresasState] = useState([]);

  const [empresaSelected, setEmpresaSelected] = useState('');
  
  const [comunicados, setComunicados] = useState([]);

  const comunicadoListFields = {
    data: 'texto',
    descricao: 'texto',
    aceite: 'texto',
    opção: 'texto'
  }

  const documentoListFields = {
    data: 'texto',
    descricao: 'texto',
    observacao: 'texto',
    validade: 'texto',
    dataDownload: 'texto',
    opção: 'texto'
  }

  const solicitacaoListFields = {
    abertura: 'texto',
    descricao: 'texto',
    status: 'texto',
    encerramento: 'texto',
    responsavel: 'texto',
  }

  const historicoAcaoListFields = {
    data: 'texto',
    descricao: 'texto',
    etapa: 'texto',
    responsavel: 'texto',
  }

  const planoAcaoListFields = {
    descricao: 'texto',
    inicio: 'texto',
    prazo: 'texto',
    acao: 'texto',
    status: 'texto',
    encerramento: 'texto',
    documento: 'link',
  }

  useEffect(() => {
    setGrupoState(grupo);
    setEmpresasState(grupo?.empresas || [])
  }, [grupo]);

  useEffect(() =>{
    setEmpresasState(grupo?.empresas || [])
    
  }, [grupo.empresas])

  useEffect(() => {
    setComunicados( empresaSelected?.comunicados || [])
  }, [empresaSelected]);

  const handleLogout = () => {
    logoutEmpresa()
  }

  const handleAceitarComunicado = (event, comunicadoIndex) => {
    event.preventDefault();
    event.stopPropagation();
    const comunicado = empresaSelected?.comunicados[comunicadoIndex];
    comunicado.aceite = dataAtualFormatada();
    confirmacao('CONFIRMAÇÃO', 'VOCE CONFIRMA QUE LEU E RECEBEU O COMUNICADO?', () => { updateComunicado(empresaSelected?._id, comunicado )});
  }

  const handleDownloadDocumento = async (event, documentoIndex) => {
    event.preventDefault();
    event.stopPropagation();
    const documento = empresaSelected?.documentos[documentoIndex];
    
    documento.dataDownload = dataAtualFormatada();
    console.log(documento)
    const formData = new FormData();
    
    formData.append('documento', JSON.stringify(documento));
    await confirmacao('CONFIRMAÇÃO', 'VOCE CONFIRMA O DOWNLOAD DO DOCUMENTO?', async () => {
      
      await updateDocumento(empresaSelected?._id, formData )
      const link = document.createElement('a');
      link.setAttribute('target', '_blank')
      link.href = `${API_URL}/images/${documento.documento}`;
      link.click();
    });
   
      
    
    
  }


  //const comunicados = empresaSelected?.comunicados || [];
  const documentos = empresaSelected?.documentos || [];
  const solicitacoes = empresaSelected?.solicitacoes || [];
  const historicoAcoes = empresaSelected?.historicoAcao || [];
  const planosAcoes = empresaSelected?.planoAcao || [];

  return (
    <React.Fragment>
      <Container>
        <Content>
          <Header>
            <div>
              <Styled.Label>Selecione a Empresa: </Styled.Label>
              <SelectSearch items={empresasState} onSelect={(item) => setEmpresaSelected(item)} valueSelected={empresaSelected} field={'nomeFantasia'} />
            </div>
            <div>
              <button onClick={handleLogout} value="Logout"> Logout</button>
            </div>
          </Header>

          <Section id="empresa">
            <Styled.ListHeader style={{backgroundColor: '#F79616'}}>
              <Styled.Coluna label={'Empresa'} color='#FFF' />

            </Styled.ListHeader>
            <EmpresaContent>
              <EmpresaContentLeft>
                <Row>
                  <Styled.Label>{`Empresa: ${empresaSelected.razaoSocial && empresaSelected.razaoSocial}`}</Styled.Label>
                </Row>
                <Row>
                  <Styled.Label>{`Tipo contrato: ${empresaSelected.tipoContrato && empresaSelected.tipoContrato}`}</Styled.Label>
                </Row>
                <Row>
                  <Styled.Label>{`Inicio do contrato: ${empresaSelected.inicioContrato && empresaSelected.inicioContrato}`}</Styled.Label>
                  <Styled.Label>{`Vencimento do contrato: ${empresaSelected.vencimentoContrato && empresaSelected.vencimentoContrato}`}</Styled.Label>
                </Row>
                <Row>
                  <Styled.Label>{`Contrato: ${empresaSelected.contrato && empresaSelected.contrato}`}</Styled.Label>
                </Row>
                <Row>
                  <Styled.Label>{`Total de etapas: ${empresaSelected.etapas && empresaSelected.etapas}`}</Styled.Label>
                  <Styled.Label>{`Etapa Atual: ${empresaSelected.etapaAtual && empresaSelected.etapaAtual}`}</Styled.Label>
                </Row>
              </EmpresaContentLeft>
              <EmpresaContentRight>
                <Styled.Label>Implementação</Styled.Label>
                <Styled.Label>do Plano de Ação</Styled.Label>
                <span style={{color: '#F00', fontSize: '2em'}}>{`${empresaSelected.planoAcaoDesenvolvido}%`}</span>
              </EmpresaContentRight>
            </EmpresaContent>

          </Section>
          <NavSection>
            <ul>
              <li><a href='#comunicados'>Comunicados</a></li>
              <li><a href='#documentos'>Documentos</a></li>
              <li><a href='#solicitacoes'>Solicitações</a></li>
              <li><a href='#historicoacao'>Histórico de Ações</a></li>
              <li><a href='#planoacao'>Plano de Ação</a></li>
              <li><a href='areadocliente/videos' target='_blank'>Videos Informativos</a></li>
            </ul>
          </NavSection>
          <Section id="comunicados" >
            <Styled.ListHeader style={{backgroundColor: '#F79616'}}>
              <Styled.Coluna label={'comunicados'} color='#FFF' />

            </Styled.ListHeader>
            <Styled.ListArea>
              <Styled.ListHeader style={{backgroundColor: "#59AE53"}} >
                {
                  Object.keys(comunicadoListFields).map((key, index) => {
                    return <Styled.Coluna label={key} key={index} color='#FFF' />
                  })
                }
              </Styled.ListHeader>
              <Styled.List>
                {comunicados.map((comunicado, comunicadoIndex) => (
                  <Styled.ListItem key={comunicado._id} className={comunicadoIndex % 2 === 0 ? 'par' : 'impar'}>
                    {
                      Object.keys(comunicadoListFields).map((field, index) => {
                        if (field !== '_id' && field !== 'opção') {
                          return (
                            <Styled.CampoValor key={index}>
                              {comunicado[field] && `${comunicado[field]}`}
                            </Styled.CampoValor>
                          );
                        }
                        if (field === 'opção') {
                        return(  <Styled.ColunaValor>
                            <div style={{ display: 'flex', flex: 1, justifyContent: 'center', cursor: 'pointer', height: '90%' }} >
                              <button style={{width: '60%', height: '100%', backgroundColor: '#6E65AD'}} onClick={(event) => handleAceitarComunicado(event,comunicadoIndex )}>ACEITAR</button>
                            </div>

                          </Styled.ColunaValor>)
                        }
                      })
                    }

                  </Styled.ListItem>
                ))}
              </Styled.List>
            </Styled.ListArea>
          </Section>

          <Section id="documentos">
            <Styled.ListHeader style={{backgroundColor: '#F79616'}}>
              <Styled.Coluna label={'documentos'} color='#FFF'/>

            </Styled.ListHeader>
            <Styled.ListArea>

              <Styled.ListHeader  style={{backgroundColor: "#59AE53"}}>
                {
                  Object.keys(documentoListFields).map((key, index) => {
                    return <Styled.Coluna label={key} key={index} color='#FFF'/>
                  })
                }

              </Styled.ListHeader>
              <Styled.List>

                {documentos.map((documento, documentoIndex) => (
                  <Styled.ListItem key={documento._id} className={documentoIndex % 2 === 0 ? 'par' : 'impar'}>
                    {
                      Object.keys(documentoListFields).map((field, index) => {
                        if (field !== '_id' && field !== 'opção') {
                          if (documentoListFields[field] === 'link') {
                            return (
                              <Styled.CampoValor key={index}>
                                <a href={`${API_URL}/images/${documento[field]}`} target="_blank" rel="noreferrer"> Arquivo </a>
                              </Styled.CampoValor>
                            )
                          } else {
                            return (
                              <Styled.CampoValor key={index}>
                                {documento[field] && `${documento[field]}`}
                              </Styled.CampoValor>
                            );
                          }

                        }
                        if (field === 'opção') {
                          return(  <Styled.ColunaValor>
                              <div style={{ display: 'flex', flex: 1, justifyContent: 'center', cursor: 'pointer', height: '90%' }} >
                                <button style={{width: '60%', height: '100%', backgroundColor: '#6E65AD'}} onClick={(event) => handleDownloadDocumento(event,documentoIndex )}>DOWNLOAD</button>
                              </div>
  
                            </Styled.ColunaValor>)
                          }
                      })
                    }
                  </Styled.ListItem>
                ))}
              </Styled.List>
            </Styled.ListArea>
          </Section>

          <Section id="solicitacoes">
            <Styled.ListHeader style={{backgroundColor: '#F79616'}}>
              <Styled.Coluna label={'solicitações'} color='#FFF'/>

            </Styled.ListHeader>
            <Styled.ListArea>
              <Styled.ListHeader style={{backgroundColor: "#59AE53"}}>
                {
                  Object.keys(solicitacaoListFields).map((key, index) => {
                    return <Styled.Coluna label={key} key={index} color='#FFF'/>
                  })
                }
              </Styled.ListHeader>
              <Styled.List>

                {solicitacoes.map((solicitacao, index) => (
                  <Styled.ListItem key={solicitacao._id} className={index % 2 === 0 ? 'par' : 'impar'}>
                    {
                      Object.keys(solicitacaoListFields).map((field, index) => {
                        if (field !== '_id' && field !== 'opção') {
                          if (solicitacaoListFields[field] === 'link') {
                            return (
                              <Styled.CampoValor key={index}>
                                <a href={`${API_URL}/images/${solicitacao[field]}`} target="_blank" rel="noreferrer"> Arquivo </a>
                              </Styled.CampoValor>
                            )
                          } else {
                            return (
                              <Styled.CampoValor key={index}>
                                {solicitacao[field] && `${solicitacao[field]}`}
                              </Styled.CampoValor>
                            );
                          }

                        }
                      })
                    }
                  </Styled.ListItem>
                ))}
              </Styled.List>
            </Styled.ListArea>
          </Section>

          <Section id="historicoacao">
            <Styled.ListHeader style={{backgroundColor: '#F79616'}}>
              <Styled.Coluna label={'Historico de Ações'} color='#FFF'/>

            </Styled.ListHeader>
            <Styled.ListArea>
              <Styled.ListHeader style={{backgroundColor: "#59AE53"}}>
                {
                  Object.keys(historicoAcaoListFields).map((key, index) => {
                    return <Styled.Coluna label={key} key={index} color='#FFF'/>
                  })
                }
              </Styled.ListHeader>
              <Styled.List>

                {historicoAcoes.map((historico, index) => (
                  <Styled.ListItem key={historico._id} className={index % 2 === 0 ? 'par' : 'impar'}>
                    {
                      Object.keys(solicitacaoListFields).map((field, index) => {
                        if (field !== '_id' && field !== 'opção') {
                          if (solicitacaoListFields[field] === 'link') {
                            return (
                              <Styled.CampoValor key={index}>
                                <a href={`${API_URL}/images/${historico[field]}`} target="_blank" rel="noreferrer"> Arquivo </a>
                              </Styled.CampoValor>
                            )
                          } else {
                            return (
                              <Styled.CampoValor key={index}>
                                {historico[field] && `${historico[field]}`}
                              </Styled.CampoValor>
                            );
                          }

                        }
                      })
                    }
                  </Styled.ListItem>
                ))}
              </Styled.List>
            </Styled.ListArea>
          </Section>

          <Section id="planoacao">
            <Styled.ListHeader style={{backgroundColor: '#F79616'}}>
              <Styled.Coluna label={'Plano de Ação'} color='#FFF'/>

            </Styled.ListHeader >
            <Styled.ListArea>
              <Styled.ListHeader style={{backgroundColor: "#59AE53"}}>
                {
                  Object.keys(planoAcaoListFields).map((key, index) => {
                    return <Styled.Coluna label={key} key={index} color='#FFF'/>
                  })
                }
              </Styled.ListHeader>
              <Styled.List>

                {planosAcoes.map((planoAcao, index) => (
                  <Styled.ListItem key={planoAcao._id} className={index % 2 === 0 ? 'par' : 'impar'}>
                    {
                      Object.keys(planoAcaoListFields).map((field, index) => {
                        if (field !== '_id' && field !== 'opção') {
                          if (planoAcaoListFields[field] === 'link') {
                            return (
                              <Styled.CampoValor key={index}>
                                <a href={`${API_URL}/images/${planoAcao[field]}`} target="_blank" rel="noreferrer"> Arquivo </a>
                              </Styled.CampoValor>
                            )
                          } else {
                            return (
                              <Styled.CampoValor key={index}>
                                {planoAcao[field] && `${planoAcao[field]}`}
                              </Styled.CampoValor>
                            );
                          }

                        }
                      })
                    }
                  </Styled.ListItem>
                ))}
              </Styled.List>
            </Styled.ListArea>
          </Section>

        </Content>
      </Container>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    grupo: state.empresa.grupoLogado,
    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutEmpresa: () => dispatch(logoutEmpresaRequest()),
    updateComunicado: (id, comunicado) => dispatch(updateComunicadoRequest(id, comunicado)),
    updateDocumento: (id, documento) => dispatch(updateDocumentoRequest(id, documento)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AreaClientePage);