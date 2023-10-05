import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { Controller, useForm } from 'react-hook-form';

import { addPlanoAcaoRequest, listarEmpresasRequest, listarGruposRequest, removePlanoAcaoRequest, updatePlanoAcaoRequest } from '../../store/modules/Empresa/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { showInformation } from '../../store/modules/Information/actions';
import { MdEdit, MdEditNote, MdHighlightOff, MdKeyboardArrowDown, MdKeyboardArrowUp, MdSearch, MdViewList } from 'react-icons/md';

import * as Styled from '../styleds';
import Paginacao from '../Paginacao';
import InputSearch from '../InputSearch';
import DataPicker from '../DataPicker';
import SelectSearch from '../SelectSearch';

const Empresas = ({ loading, usuario, empresas, error, page, addPlanoAcao, updatePlanoAcao, listarEmpresas, removePlanoAcao, confirmacao, informacao, grupos, listarGrupos }) => {

  const API_URL = process.env.REACT_APP_URL_API;

  const status = [
    'aberta', 'em andamento', 'encerrada'
  ];

  const formEmpty = {
    codigo: '',
    descricao: '',
    inicio: '',
    encerramento: '',
    prazo: '',
    documento: '',
    acao: '',
    usuario: ''
  }

  const listFields = {
    empresa: 'text',
    descricao: 'texto',
    inicio: 'texto',
    prazo: 'texto',
    encerramento: 'texto',
    documento: 'link',
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

  const [planoAcaoState, setPlanoAcaoState] = useState([]);
  const [planoAcaoSelected, setPlanoAcaoSelected] = useState(formEmpty);

  const { register, control, setValue, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: planoAcaoSelected
      ? {
        data: planoAcaoSelected.data,
        descricao: planoAcaoSelected.descricao,
        codigo: planoAcaoSelected.codigo,
        documento: planoAcaoSelected.documento,
        inicio: planoAcaoSelected.inicio,
        encerramento: planoAcaoSelected.encerramento,
        acao: planoAcaoSelected.acao,
        usuario: planoAcaoSelected.usuario,
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
    reset({ ...planoAcaoSelected });
  }, [reset, planoAcaoSelected]);

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
    setPlanoAcaoSelected(empresasState[empresaIndex]?.planoAcao[index])
  }

  const handleDelete = (event, empresaId, planoAcaoId) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR O HISTORICO DE ACAO?', () => { removePlanoAcao(empresaId, planoAcaoId) });
  }

  const handleClear = () => {
    setGrupoSelected({});
    setEmpresaSelected('')

    setPlanoAcaoSelected({ ...formEmpty })
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
      const formData = new FormData();
      formData.append("documentoFile", data.documentoFile[0]);
      formData.append('planoAcao', JSON.stringify(data));
      if (data._id) {
        updatePlanoAcao(empresaSelected._id, formData);

      } else {
        addPlanoAcao(empresaSelected._id, formData);

      }
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

                      <Styled.Label>Inico: </Styled.Label>
                      <DataPicker name="inicio" control={control} setValue={setValue} defaultValue={planoAcaoSelected?.inicio} showTimeSelect={false} />
                      {errors.inicio && <span>Campo obrigatório</span>}

                      <Styled.Label>Descricao:</Styled.Label>
                      <Styled.Input
                        {...register('descricao', { required: true })}
                      />
                      {errors.descricao && <span>Campo obrigatório</span>}
                      <Styled.Label>Prazo:</Styled.Label>
                      <Styled.Input type='number'
                        {...register('prazo', { required: true })}
                      />
                      {errors.prazo && <span>Campo obrigatório</span>}

                      <Styled.Label>Anexar documento:</Styled.Label>
                      <Styled.Input type='file' name='documentoFile' {...register('documentoFile', { required: false })} />
                      {errors.acordoFile && <span>Campo obrigatório</span>}
                      {planoAcaoSelected?.documento &&
                        <a href={`${API_URL}/images/${planoAcaoSelected.documento}`} target="_blank" rel="noreferrer"> Arquivo </a>
                      }

                      <Styled.Label>Ação: </Styled.Label>
                      <Controller
                        name="acao"
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
                      {errors.estado && <span>Campo obrigatório</span>}

                      <Styled.Label>Encerramento: </Styled.Label>
                      <DataPicker name="encerramento" control={control} setValue={setValue} defaultValue={planoAcaoSelected?.inicio} showTimeSelect={false} />
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
                          const planoAcaos = empresa?.planoAcao || [];

                          return (
                            <React.Fragment key={empresaIndex}>
                              {planoAcaos.map((planoAcao, index) => (
                                <Styled.ListItem key={planoAcao._id}>

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
                                  {/* {Object.keys(planoAcao).map((field, index) => {
                                    if (field !== '_id' && listFields.hasOwnProperty(field)) {
                                      return (
                                        <Styled.CampoValor key={field}>
                                          {`${planoAcao[field]}`}
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
                                        onClick={(event) => handleDelete(event, empresa._id, planoAcao._id, planoAcao.documento)}
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
    addPlanoAcao: (id, planoAcao) => dispatch(addPlanoAcaoRequest(id, planoAcao)),
    updatePlanoAcao: (id, planoAcao) => dispatch(updatePlanoAcaoRequest(id, planoAcao)),
    removePlanoAcao: (id, planoAcaoId, documentoNome) => dispatch(removePlanoAcaoRequest(id, planoAcaoId, documentoNome)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm)),
    informacao: (text) => dispatch(showInformation(text)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Empresas);