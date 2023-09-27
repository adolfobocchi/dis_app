import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm } from 'react-hook-form';

import { addHistoricoAcaoRequest, listarEmpresasRequest, listarGruposRequest, removeHistoricoAcaoRequest, updateHistoricoAcaoRequest } from '../../store/modules/Empresa/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { showInformation } from '../../store/modules/Information/actions';
import { MdEdit, MdEditNote, MdHighlightOff, MdKeyboardArrowDown, MdKeyboardArrowUp, MdSearch, MdViewList } from 'react-icons/md';

import * as Styled from '../styleds';
import Paginacao from '../Paginacao';
import InputSearch from '../InputSearch';
import DataPicker from '../DataPicker';
import SelectSearch from '../SelectSearch';

const Empresas = ({ loading, usuario, empresas, error, page, addHistoricoAcao, updateHistoricoAcao, listarEmpresas, removeHistoricoAcao, confirmacao, informacao, grupos, listarGrupos }) => {

  const API_URL = process.env.REACT_APP_URL_API;

  const formEmpty = {
    data: '',
    descricao: '',
    etapa: '',
    responsavel: '',
    usuario: ''
  }

  const listFields = {
    empresa: 'texto',
    descricao: 'texto',
    data: 'texto',
    etapa: 'texto',
    responsavel: 'texto',
    opção: ''
  }

  const [sectionItems, setSectionItems] = useState([
    { id: 1, label: 'Cadastro', expanded: false, sections: [{ id: 1, label: 'Cadastro', expanded: false, component: 'formulario' },], icon: <MdEdit /> },
    { id: 2, label: 'Pesquisa', expanded: true, sections: [{ id: 1, label: 'Pesquisa', expanded: false, component: 'search' },], icon: <MdSearch /> },
    { id: 3, label: 'Listagem', expanded: true, sections: [{ id: 1, label: 'Listagem', expanded: false, component: 'listagem' },], icon: <MdViewList /> },
  ]);

  const [gruposState, setGruposState] = useState([]);
  const [grupoSelected, setGrupoSelected] = useState(null);

  const [empresasState, setEmpresasState] = useState([]);
  const [empresaSelected, setEmpresaSelected] = useState(null);

  const [historicoAcaoState, setHistoricoAcaoState] = useState([]);
  const [historicoAcaoSelected, setHistoricoAcaoSelected] = useState(formEmpty);

  const { register, control, setValue, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: historicoAcaoSelected
      ? {
        data: historicoAcaoSelected.data,
        descricao: historicoAcaoSelected.descricao,
        responsavel: historicoAcaoSelected.responsavel,
        etapa: historicoAcaoSelected.etapa,
        usuario: historicoAcaoSelected.usuario,
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
    reset({ ...historicoAcaoSelected });
  }, [reset, historicoAcaoSelected]);

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
    setHistoricoAcaoSelected(empresasState[empresaIndex]?.historicoAcao[index])
  }

  const handleDelete = (event, empresaId, historicoAcaoId) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR O HISTORICO DE ACAO?', () => { removeHistoricoAcao(empresaId, historicoAcaoId) });
  }

  const handleClear = () => {
    setGrupoSelected({});
    setEmpresaSelected({})

    setHistoricoAcaoSelected({ ...formEmpty })
  }

  const onSubmit = (data) => {

    data.usuario = usuario;

    if (data._id) {
      updateHistoricoAcao(empresaSelected._id, data);

    } else {
      addHistoricoAcao(empresaSelected._id, data);

    }
    if (error === '') {
      handleClear();
    }

  };

  if (loading) {
    return <ModalLoading />
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

                      <Styled.Label>Data: </Styled.Label>
                      <DataPicker name="data" control={control} setValue={setValue} defaultValue={historicoAcaoSelected?.data} showTimeSelect={false} />
                      {errors.data && <span>Campo obrigatório</span>}

                      <Styled.Label>Descricao:</Styled.Label>
                      <Styled.Input
                        {...register('descricao', { required: true })}
                      />
                      {errors.descricao && <span>Campo obrigatório</span>}
                      <Styled.Label>Etapa:</Styled.Label>
                      <Styled.Input
                        {...register('etapa', { required: true })}
                      />
                      {errors.descricao && <span>Campo obrigatório</span>}
                      <Styled.Label>Responsavel:</Styled.Label>
                      <Styled.Input
                        {...register('responsavel', { required: true })}
                      />
                      {errors.responsavel && <span>Campo obrigatório</span>}

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
                          const historicoAcaos = empresa?.historicoAcao || [];

                          return (
                            <React.Fragment key={empresaIndex}>
                              {historicoAcaos.map((historicoAcao, index) => (
                                <Styled.ListItem key={historicoAcao._id}>

                                  {
                                    Object.keys(listFields).map((field, index) => {
                                      if (field !== '_id' && field !== 'opção') {
                                        if(field === 'empresa') {
                                          return (
                                            <Styled.CampoValor key={index}>
                                              {empresa?.nomeFantasia && `${empresa?.nomeFantasia}`}
                                            </Styled.CampoValor>
                                          );
                                        }
                                        if (listFields[field] === 'link') {
                                          return (
                                            <Styled.CampoValor key={index}>
                                              <a href={`${API_URL}/images/${historicoAcao[field]}`} target="_blank" rel="noreferrer"> Arquivo </a>
                                            </Styled.CampoValor>
                                          )
                                        } else {
                                          return (
                                            <Styled.CampoValor key={index}>
                                              {historicoAcao[field] && `${historicoAcao[field]}`}
                                            </Styled.CampoValor>
                                          );
                                        }

                                      }
                                    })
                                  }
                                  {/* {Object.keys(historicoAcao).map((field, index) => {
                                    if (field !== '_id' && listFields.hasOwnProperty(field)) {
                                      return (
                                        <Styled.CampoValor key={field}>
                                          {`${historicoAcao[field]}`}
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
                                        onClick={(event) => handleDelete(event, empresa._id, historicoAcao._id)}
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
    addHistoricoAcao: (id, historicoAcao) => dispatch(addHistoricoAcaoRequest(id, historicoAcao)),
    updateHistoricoAcao: (id, historicoAcao) => dispatch(updateHistoricoAcaoRequest(id, historicoAcao)),
    removeHistoricoAcao: (id, historicoAcaoId) => dispatch(removeHistoricoAcaoRequest(id, historicoAcaoId)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm)),
    informacao: (text) => dispatch(showInformation(text)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Empresas);