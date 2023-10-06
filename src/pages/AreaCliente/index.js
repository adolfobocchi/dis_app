import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as Styled from '../../components/styleds';
import SelectSearch from '../../components/SelectSearch';
import Navbar from '../../components/Navbar';
import { logoutEmpresaRequest } from '../../store/modules/Empresa/actions';

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
function AreaClientePage({ grupo, logoutEmpresa }) {
  const API_URL = process.env.REACT_APP_URL_API;

  const [grupoState, setGrupoState] = useState(null);

  const [empresasState, setEmpresasState] = useState([]);

  const [empresaSelected, setEmpresaSelected] = useState('');

  const comunicadoListFields = {
    descricao: 'texto',
    data: 'texto',
    aceite: 'texto',
    aceiteID: 'texto',
  }

  const documentoListFields = {
    descricao: 'texto',
    data: 'texto',
    documento: 'link',
    validade: 'texto',
    dataDownload: 'texto',
    dataDownloadID: 'texto',
  }

  const solicitacaoListFields = {
    descricao: 'texto',
    abertura: 'texto',
    status: 'texto',
    encerramento: 'texto',
    responsavel: 'texto',
    opção: ''
  }

  const historicoAcaoListFields = {
    descricao: 'texto',
    data: 'texto',
    etapa: 'texto',
    responsavel: 'texto',
  }

  const planoAcaoListFields = {
    descricao: 'texto',
    inicio: 'texto',
    prazo: 'texto',
    encerramento: 'texto',
    documento: 'link',
  }

  useEffect(() => {
    setGrupoState(grupo);
    setEmpresasState(grupo?.empresas || [])
  }, [grupo]);

  const handleLogout = () => {
    logoutEmpresa()
  }


  const comunicados = empresaSelected?.comunicados || [];
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
          <Styled.ListHeader>
              <Styled.Coluna label={'Empresa'} />

            </Styled.ListHeader>

          </Section>
          <Section id="comunicados" >
            <Styled.ListHeader>
              <Styled.Coluna label={'comunicados'} />

            </Styled.ListHeader>
            <Styled.ListArea>
              <Styled.ListHeader>
                {
                  Object.keys(comunicadoListFields).map((key, index) => {
                    return <Styled.Coluna label={key} key={index} />
                  })
                }
              </Styled.ListHeader>
              <Styled.List>
                {comunicados.map((comunicado, index) => (
                  <Styled.ListItem key={comunicado._id}>
                    {
                      Object.keys(comunicadoListFields).map((field, index) => {
                        if (field !== '_id' && field !== 'opção') {
                          return (
                            <Styled.CampoValor key={index}>
                              {comunicado[field] && `${comunicado[field]}`}
                            </Styled.CampoValor>
                          );
                        }
                      })
                    }
                  </Styled.ListItem>
                ))}
              </Styled.List>
            </Styled.ListArea>
          </Section>

          <Section id="documentos">
            <Styled.ListHeader>
              <Styled.Coluna label={'documentos'} />

            </Styled.ListHeader>
            <Styled.ListArea>

              <Styled.ListHeader>
                {
                  Object.keys(documentoListFields).map((key, index) => {
                    return <Styled.Coluna label={key} key={index} />
                  })
                }

              </Styled.ListHeader>
              <Styled.List>

                {documentos.map((documento, index) => (
                  <Styled.ListItem key={documento._id}>
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
                      })
                    }
                  </Styled.ListItem>
                ))}
              </Styled.List>
            </Styled.ListArea>
          </Section>

          <Section id="solicitacoes">
            <Styled.ListHeader>
              <Styled.Coluna label={'solicitações'} />

            </Styled.ListHeader>
            <Styled.ListArea>
              <Styled.ListHeader>
                {
                  Object.keys(solicitacaoListFields).map((key, index) => {
                    return <Styled.Coluna label={key} key={index} />
                  })
                }
              </Styled.ListHeader>
              <Styled.List>

                {solicitacoes.map((solicitacao, index) => (
                  <Styled.ListItem key={solicitacao._id}>
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
            <Styled.ListHeader>
              <Styled.Coluna label={'Historico de Ações'} />

            </Styled.ListHeader>
            <Styled.ListArea>
              <Styled.ListHeader>
                {
                  Object.keys(historicoAcaoListFields).map((key, index) => {
                    return <Styled.Coluna label={key} key={index} />
                  })
                }
              </Styled.ListHeader>
              <Styled.List>

                {historicoAcoes.map((historico, index) => (
                  <Styled.ListItem key={historico._id}>
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
            <Styled.ListHeader>
              <Styled.Coluna label={'Plano de Ação'} />

            </Styled.ListHeader>
            <Styled.ListArea>
              <Styled.ListHeader>
                {
                  Object.keys(planoAcaoListFields).map((key, index) => {
                    return <Styled.Coluna label={key} key={index} />
                  })
                }
              </Styled.ListHeader>
              <Styled.List>

                {planosAcoes.map((planoAcao, index) => (
                  <Styled.ListItem key={planoAcao._id}>
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
    logoutEmpresa: () => dispatch(logoutEmpresaRequest()) 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AreaClientePage);