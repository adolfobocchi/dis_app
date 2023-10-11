import React, { useEffect, useState } from 'react';
import { MdClose, MdEditNote, MdHighlightOff } from 'react-icons/md';
import styled from 'styled-components';
import * as Styled from '../styleds';
import ModalLoading from '../ModalLoading';
import { Controller, useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { showInformation } from '../../store/modules/Information/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { addRespostaSolicitacaoRequest, removeRespostaSolicitacaoRequest, updateRespostaSolicitacaoRequest } from '../../store/modules/Empresa/actions';
import DataPicker from '../DataPicker';
import { format } from 'date-fns';

const ModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  height: auto;
  height: calc(100vh);
  display: flex;
  flex-direction: column;
  z-index: 2;
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
  flex-direction: column;
  padding: 6px;
`;

const ContentHeaderArea = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
`

const ContentHeaderTitulo = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;

  h1 {
    font-size: 20px;
  }
  
`
const ContentHeaderDetalhesArea = styled.div`
 display: flex;
`;
const ContentHeaderDetalhesLeft = styled.div`
display: flex;
  flex-direction: column;
  flex: 1;

  label {
    font-weight: bold;
    font-size: 16px; /* Altere o tamanho da fonte conforme necessário */
    color: #333; /* Altere a cor do texto conforme necessário */
  }

  span {
    font-size: 14px; /* Altere o tamanho da fonte conforme necessário */
    color: #777; /* Altere a cor do texto conforme necessário */
  }
`;
const ContentHeaderDetalhesRight = styled.div`
display: flex;
  flex-direction: column;
  flex: 1;

  label {
    font-weight: bold;
    font-size: 16px; /* Altere o tamanho da fonte conforme necessário */
    color: #333; /* Altere a cor do texto conforme necessário */
  }

  span {
    font-size: 14px; /* Altere o tamanho da fonte conforme necessário */
    color: #777; /* Altere a cor do texto conforme necessário */
  }
`;
const ContentComentariosArea = styled.div``;

const API_URL = process.env.REACT_APP_URL_API;

const ModalSolicitacao = ({ dados, empresa, empresas, close, error, confirmacao, informacao, usuario, addRespostaSolicitacao, updateRespostaSolicitacao, removeRespostaSolicitacao }) => {
  const formEmpty = {
    data: '',
    descricao: '',
    usuario: ''
  }
  const listFields = {
    data: 'texto',
    descricao: 'texto',
    opção: ''
  }

  const [dadosState, setDadosState] = useState(null);
  const [empresasState, setEmpresasState] = useState([]);
  const [empresaSelected, setEmpresaSelected] = useState(null);

  const [sectionCadItems, setSectionCadItems] = useState([
    { id: 0, label: 'Respostas', expanded: true, sections: [{ id: 1, label: 'Respostas', expanded: false, component: 'Respostas' },] },

  ])

  const [activeTab, setActiveTab] = useState('Respostas');
  const [respostaSelected, setRespostaSelected] = useState(formEmpty);

  const { register, control, setValue, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: respostaSelected
      ? {
        data: respostaSelected.data,
        descricao: respostaSelected.descricao,
        usuario: respostaSelected.usuario,
      } :
      {}
  });
  
  useEffect(() => {
    setEmpresasState(empresas);
  }, [empresas]);

  useEffect(() => {
    setEmpresaSelected(empresa);
  }, [empresa]);

  useEffect(() => {
    setDadosState(dados);
  }, [dados])

  useEffect(() => {
    reset({ ...respostaSelected });
  }, [reset, respostaSelected]);

  const fetchRespostas = async () => {
    const empresasFind = await empresasState.find(item => empresa?._id === item?._id); 
    const solicitacaoFind = await empresasFind?.solicitacoes.find(item => dadosState?._id === item?._id)
    console.log(solicitacaoFind);
    setDadosState(solicitacaoFind);
  };


  const toggleSectionCad = (itemId, event) => {
    event.stopPropagation();
    setSectionCadItems((prevState) =>
      prevState.map((item) => {
        if (item.id === itemId) {
          if (item.label === 'Respostas')
            setActiveTab('Respostas')
          return { ...item, expanded: !item.expanded };
        }
        return item;
      })
    );
  };


  const handleSelect = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setRespostaSelected(dadosState?.respostas[index])
  }

  const handleDelete = (event, respostaSolicitacaoId) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR O HISTORICO DE ACAO?', () => { removeRespostaSolicitacao(empresa?._id, dadosState._id, respostaSolicitacaoId) });
    close(false);

  }

  const onSubmit = async (data) => {

    data.usuario = usuario;
    console.log(data)
    if (data._id) {
      await updateRespostaSolicitacao(empresa?._id, dadosState._id, respostaSelected._id, data);
      fetchRespostas();
    } else {
      await addRespostaSolicitacao(empresa?._id, dadosState._id, data);
      fetchRespostas();
    }
    if (error === '') {
      handleClear();
    }

  };

  const handleClear = () => {
    console.log('aqui')
    setRespostaSelected({ ...formEmpty })
  }

  if (!dadosState) {
    return <ModalLoading />
  }

  return (
    <ModalWrapper>
      <ModalContent>
        <ModalHeader>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}><h2>SOLICITAÇÃO</h2></div>
          <MdClose onClick={() => close(false)} color='#F00' style={{ cursor: 'pointer', height: '3em', width: '3em', marginRight: 8 }} />
        </ModalHeader>
        <ContentInfoBasic>
          <ContentHeaderArea>
            <ContentHeaderTitulo>
              <h1>{`Solicitação: ${dadosState.codigo}`}</h1>
            </ContentHeaderTitulo>
            <ContentHeaderDetalhesArea>
              <ContentHeaderDetalhesLeft>
                <div style={{ display: 'flex', flexDirection: 'column' }} >
                  <label>Status</label>
                  <span>{dadosState.status}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }} >
                  <label>Descrição</label>
                  <span>{dadosState.descricao}</span>
                </div>
              </ContentHeaderDetalhesLeft>
              <ContentHeaderDetalhesRight>
                <div style={{ display: 'flex', flexDirection: 'column' }} >
                  <label>Abertura</label>
                  <span>{dadosState.abertura}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }} >
                  <label>Responsavel</label>
                  <span>{dadosState.responsavel}</span>
                </div>
              </ContentHeaderDetalhesRight>
            </ContentHeaderDetalhesArea>
          </ContentHeaderArea>
          <ContentComentariosArea>
            <div style={{ display: 'flex' }}>
              {sectionCadItems.map((sectionCadItem) => (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Styled.SectionArea
                      style={{ margin: 0, background: activeTab === sectionCadItem.label ? '#EBF0F7' : '#FFF', border: activeTab === sectionCadItem.label ? '2px solid #DDD' : '1px solid #DDD', cursor: 'pointer' }}
                      key={sectionCadItem.id}
                      onClick={(event) => toggleSectionCad(sectionCadItem.id, event)}
                    >
                      <Styled.AreaFlex>{sectionCadItem.label}</Styled.AreaFlex>
                      {/* <Styled.AreaWidth style={{ width: 20, justifyContent: 'flex-end' }} >
                                  {sectionCadItem.expanded ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                                </Styled.AreaWidth> */}
                    </Styled.SectionArea>
                  </div>
                </>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', border: '2px solid #DDD' }}>
              {activeTab === 'Respostas' && (<React.Fragment>
                <Styled.FormArea>
                  <Styled.Form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                    <Styled.Label>Data: </Styled.Label>
                    <DataPicker name="data" control={control} setValue={setValue} defaultValue={respostaSelected?.data} showTimeSelect={false} />
                    {errors.data && <span>Campo obrigatório</span>}
                    <Styled.Label>Descricao:</Styled.Label>
                    <textarea rows={5}
                      {...register('descricao', { required: false })}
                    />
                    {errors.descricao && <span>Campo obrigatório</span>}
                    <Styled.Label>Encerrar?</Styled.Label>
                    <Styled.Input
                      type='checkbox'
                      {...register('encerrar')}
                    />
                    <Styled.Button type="submit">Salvar</Styled.Button>
                    <Styled.Button type="button" style={{ background: '#FBAF3A' }} onClick={(event) => handleClear(event)}>Limpar</Styled.Button>
                  </Styled.Form>
                </Styled.FormArea>
                <Styled.ListArea>
                  <Styled.ListHeader>
                    {
                      Object.keys(listFields).map((key, index) => {
                        return <Styled.Coluna label={key} key={index} />
                      })
                    }
                  </Styled.ListHeader>
                  <Styled.List>
                    <React.Fragment>
                      {dadosState?.respostas.length > 0 &&
                        dadosState?.respostas.map((resposta, index) => {

                          return (
                            <Styled.ListItem key={resposta._id} >

                              {
                                Object.keys(listFields).map((field, index) => {
                                  if (field !== '_id' && field !== 'opção') {
                                    return (
                                      <Styled.CampoValor key={index}>
                                        {resposta[field] && `${resposta[field]}`}
                                      </Styled.CampoValor>
                                    );
                                  }


                                })
                              }
                              <Styled.ColunaValor>
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    flex: 1,
                                  }}
                                >
                                  <MdHighlightOff
                                    color='#F00'
                                    onClick={(event) => handleDelete(event, resposta._id)}
                                    style={{ height: '1em', width: '1em' }}
                                  />
                                </div>
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    width: '6em',
                                  }}
                                >
                                  <MdEditNote
                                    color='#005'
                                    onClick={(event) => {
                                      handleSelect(event, index);
                                    }}
                                    style={{ height: '1.2em', width: '1.2em' }}
                                  />
                                </div>
                              </Styled.ColunaValor>
                            </Styled.ListItem>
                          )
                        })
                      }
                    </React.Fragment>
                  </Styled.List>
                </Styled.ListArea>

              </React.Fragment>)}
            </div>
          </ContentComentariosArea>
        </ContentInfoBasic>
      </ModalContent>
    </ModalWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.empresa.loading,
    empresas: state.empresa.empresas,
    error: state.empresa.error,
    page: state.empresa.page,
    usuario: state.usuario.usuario,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addRespostaSolicitacao: (id, solicitacaoId, respostaSolicitacao) => dispatch(addRespostaSolicitacaoRequest(id, solicitacaoId, respostaSolicitacao)),
    updateRespostaSolicitacao: (id, solicitacaoId, repostaSolicitacaoId, respostaSolicitacao) => dispatch(updateRespostaSolicitacaoRequest(id, solicitacaoId, repostaSolicitacaoId, respostaSolicitacao)),
    removeRespostaSolicitacao: (id, solicitacaoId, repostaSolicitacaoId) => dispatch(removeRespostaSolicitacaoRequest(id, solicitacaoId, repostaSolicitacaoId)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm)),
    informacao: (text) => dispatch(showInformation(text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalSolicitacao);
