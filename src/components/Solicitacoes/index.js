import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { Controller, useForm } from 'react-hook-form';

import { addSolicitacaoRequest, listarEmpresasRequest, listarGruposRequest, removeSolicitacaoRequest, updateSolicitacaoRequest } from '../../store/modules/Empresa/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { showInformation } from '../../store/modules/Information/actions';
import { MdEdit, MdEditNote, MdHighlightOff, MdKeyboardArrowDown, MdKeyboardArrowUp, MdSearch, MdViewList } from 'react-icons/md';

import * as Styled from '../styleds';
import Paginacao from '../Paginacao';
import InputSearch from '../InputSearch';
import DataPicker from '../DataPicker';
import SelectSearch from '../SelectSearch';
import ModalSolicitacao from '../ModalSolicitacao';

const Empresas = ({ loading, usuario, empresas, error, page, addSolicitacao, updateSolicitacao, listarEmpresas, removeSolicitacao, confirmacao, informacao, grupos, listarGrupos }) => {

  const API_URL = process.env.REACT_APP_URL_API;

  const status = [
    'aberta', 'em andamento', 'encerrada'
  ];

  const formEmpty = {
    codigo: '',
    responsavel: '',
    abertura: '',
    descricao: '',
    status: '',
    encerramento: '',
    respostas: '',
    usuario: ''
  }

  const listFields = {
    empresa: 'texto',
    descricao: 'texto',
    abertura: 'texto',
    status: 'texto',
    encerramento: 'texto',
    responsavel: 'texto',
    opção: ''
  }

  const [sectionItems, setSectionItems] = useState([
    { id: 1, label: 'Cadastro', expanded: false, sections: [{ id: 1, label: 'Cadastro', expanded: false, component: 'formulario' },], icon: <MdEdit /> },
    { id: 2, label: 'Pesquisa', expanded: true, sections: [{ id: 1, label: 'Pesquisa', expanded: false, component: 'search' },], icon: <MdSearch /> },
    { id: 3, label: 'Listagem', expanded: true, sections: [{ id: 1, label: 'Listagem', expanded: false, component: 'listagem' },], icon: <MdViewList /> },
  ]);

  const [showModalState, setShowModalState] = useState(false);

  const [gruposState, setGruposState] = useState([]);
  const [grupoSelected, setGrupoSelected] = useState(null);

  const [empresasState, setEmpresasState] = useState([]);
  const [empresaSelected, setEmpresaSelected] = useState(null);

  const [solicitacaoState, setSolicitacaoState] = useState([]);
  const [solicitacaoSelected, setSolicitacaoSelected] = useState(formEmpty);

  const { register, control, setValue, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: solicitacaoSelected
      ? {
        codigo: solicitacaoSelected.codigo,
        responsavel: solicitacaoSelected.responsavel,
        abertura: solicitacaoSelected.abertura,
        descricao: solicitacaoSelected.descricao,
        status: solicitacaoSelected.status,
        encerramento: solicitacaoSelected.encerramento,
        respostas: solicitacaoSelected.respostas,
        usuario: solicitacaoSelected.usuario,
      } :
      {}
  });

  useEffect(() => {
    listarEmpresas(0, 1);
    listarGrupos(0, 1);
  }, []);

  useEffect(() => {
    setEmpresasState(empresas);
  }, [empresas]);

  useEffect(() => {
    setGruposState(grupos);
  }, [grupos]);


  useEffect(() => {
    reset({ ...solicitacaoSelected });
  }, [reset, solicitacaoSelected]);

  const toggleSection = (itemId, event) => {
    event.stopPropagation();
    setSectionItems((prevState) =>
      prevState.map((item) => {
        if (item.id === itemId) {
          return { ...item, expanded: !item.expanded };
        }
        return item;
      })
    );
  };

  const toggleSectionExpand = (itemId, event) => {
    event.stopPropagation();
    setSectionItems((prevState) =>
      prevState.map((item) => {
        if (item.id === itemId) {
          return { ...item, expanded: true };
        }
        return item;
      })
    );
  };
  const handleSelect = (event, empresaIndex, index) => {
    event.preventDefault();
    event.stopPropagation();
    setGrupoSelected(empresasState[empresaIndex]?.grupo)
    setEmpresaSelected(empresasState[empresaIndex]);
    setSolicitacaoSelected(empresasState[empresaIndex]?.solicitacoes[index])
  }

  const handleDelete = (event, empresaId, solicitacaoId) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR O HISTORICO DE ACAO?', () => { removeSolicitacao(empresaId, solicitacaoId) });
  }

  const handleClear = () => {
    setGrupoSelected({});
    setEmpresaSelected('')

    setSolicitacaoSelected({ ...formEmpty })
  }

  const handleShow = (event, empresaIndex, index) => {
    event.preventDefault();
    event.stopPropagation();
    handleSelect(event, empresaIndex, index)
    console.log(empresaSelected);
    setShowModalState(true);
  }
  const onSubmit = (data) => {

    data.usuario = usuario;
    if (!grupoSelected) {
      informacao('GRUPO OBRIGATORIO! VERIFIQUE!');
      return false
    } else if (!empresaSelected) {
      informacao('EMPRESA OBRIGATORIO! VERIFIQUE!');
      return false
    } else {
      if (data._id) {
        updateSolicitacao(empresaSelected._id, data);

      } else {
        addSolicitacao(empresaSelected._id, data);

      }
    }
    if (error === '') {
      handleClear();
    }

  };

  
  if (loading) {
    return <ModalLoading />
  }

  if (showModalState) {
    return <ModalSolicitacao empresa={empresaSelected} dados={solicitacaoSelected} close={setShowModalState} />
  }
  return (
    <Styled.Container>
      {sectionItems.map((sectionItem) => (
        <>
          <Styled.SectionArea
            key={sectionItem.id}
            onClick={(event) => toggleSection(sectionItem.id, event)}
          >
            <Styled.AreaWidth style={{ width: 20 }}>{sectionItem.icon}</Styled.AreaWidth>
            <Styled.AreaFlex>{sectionItem.label}</Styled.AreaFlex>
            <Styled.AreaWidth style={{ width: 20, justifyContent: 'flex-end' }} >
              {sectionItem.expanded ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </Styled.AreaWidth>
          </Styled.SectionArea>
          {sectionItem.expanded &&
            sectionItem.sections.map((section) => {
              if (section.component === 'formulario') {
                return (
                  <Styled.FormArea>
                    <Styled.Form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>

                      <Styled.Label>Grupo: </Styled.Label>
                      <InputSearch items={gruposState} onSelect={(item) => setGrupoSelected(item)} valueSelected={grupoSelected?.nome} field={'nome'} />
                      {errors.grupo && <span>Campo obrigatório</span>}

                      <Styled.Label>Empresa: </Styled.Label>
                      <SelectSearch items={empresasState.filter(el => el.grupo?._id === grupoSelected?._id) || []} onSelect={(item) => setEmpresaSelected(item)} valueSelected={empresaSelected} field={'nomeFantasia'} />

                      {errors.empresa && <span>Campo obrigatório</span>}

                      <Styled.Label>Abertura: </Styled.Label>
                      <DataPicker name="abertura" control={control} setValue={setValue} defaultValue={solicitacaoSelected?.abertura} showTimeSelect={false} />
                      {errors.abertura && <span>Campo obrigatório</span>}

                      <Styled.Label>Descricao:</Styled.Label>
                      <Styled.Input
                        {...register('descricao', { required: true })}
                      />
                      {errors.descricao && <span>Campo obrigatório</span>}
                      <Styled.Label>Responsavel:</Styled.Label>
                      <Styled.Input
                        {...register('responsavel', { required: true })}
                      />
                      {errors.responsavel && <span>Campo obrigatório</span>}

                      <Styled.Label>Status: </Styled.Label>
                      <Controller
                        name="status"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <select style={{ padding: 8 }} {...field}>
                            <option value="">Selecione status da acao</option>
                            {status.map((status) => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                        )}
                      />
                      {errors.status && <span>Campo obrigatório</span>}

                      <Styled.Label>Encerramento: </Styled.Label>
                      <DataPicker name="encerramento" control={control} setValue={setValue} defaultValue={solicitacaoSelected?.inicio} showTimeSelect={false} />
                      {errors.encerramento && <span>Campo obrigatório</span>}

                      <Styled.Button type="submit">Salvar</Styled.Button>
                      <Styled.Button type="button" style={{ background: '#FBAF3A' }} onClick={(event) => handleClear(event)}>Limpar</Styled.Button>
                    </Styled.Form>

                  </Styled.FormArea>

                )
              }
              if (section.component === 'search') {
                return (<Styled.FormArea>
                  { }
                </Styled.FormArea>)
              }
              if (section.component === 'listagem') {
                return (<>
                  <Paginacao page={page} ativo={0} listagem={listarEmpresas} />
                  <Styled.ListArea>

                    <Styled.ListHeader>
                      {
                        Object.keys(listFields).map((key, index) => {
                          return <Styled.Coluna label={key} key={index} />
                        })
                      }

                    </Styled.ListHeader>
                    <Styled.List>

                      {empresasState?.length > 0 &&
                        empresasState?.map((empresa, empresaIndex) => {
                          const solicitacaos = empresa?.solicitacoes || [];

                          return (
                            <React.Fragment key={empresaIndex}>
                              {solicitacaos.map((solicitacao, index) => (
                                <Styled.ListItem key={solicitacao._id} onClick={(event) => handleShow(event, empresaIndex, index)} >

                                  {
                                    Object.keys(listFields).map((field, index) => {
                                      if (field !== '_id' && field !== 'opção') {
                                        if (field === 'empresa') {
                                          return (
                                            <Styled.CampoValor key={index}>
                                              {empresa?.nomeFantasia && `${empresa?.nomeFantasia}`}
                                            </Styled.CampoValor>
                                          );
                                        }
                                        if (listFields[field] === 'link') {
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
                                  {/* {Object.keys(solicitacao).map((field, index) => {
                                    if (field !== '_id' && listFields.hasOwnProperty(field)) {
                                      return (
                                        <Styled.CampoValor key={field}>
                                          {`${solicitacao[field]}`}
                                        </Styled.CampoValor>
                                      );
                                    }
                                  })} */}
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
                                        onClick={(event) => handleDelete(event, empresa._id, solicitacao._id)}
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
                                          toggleSectionExpand(1, event);
                                          handleSelect(event, empresaIndex, index);
                                        }}
                                        style={{ height: '1.2em', width: '1.2em' }}
                                      />
                                    </div>
                                  </Styled.ColunaValor>
                                </Styled.ListItem>
                              ))}
                            </React.Fragment>
                          );
                        })}
                    </Styled.List>
                  </Styled.ListArea>
                </>)
              }
            })}
        </>
      ))}


    </Styled.Container>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.empresa.loading,
    empresas: state.empresa.empresas,
    grupos: state.empresa.grupos,
    error: state.empresa.error,
    page: state.empresa.page,
    usuario: state.usuario.usuario,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    listarEmpresas: (page, ativo) => dispatch(listarEmpresasRequest(page, ativo)),
    listarGrupos: (page, ativo) => dispatch(listarGruposRequest(page, ativo)),
    addSolicitacao: (id, solicitacao) => dispatch(addSolicitacaoRequest(id, solicitacao)),
    updateSolicitacao: (id, solicitacao) => dispatch(updateSolicitacaoRequest(id, solicitacao)),
    removeSolicitacao: (id, solicitacaoId) => dispatch(removeSolicitacaoRequest(id, solicitacaoId)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm)),
    informacao: (text) => dispatch(showInformation(text)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Empresas);