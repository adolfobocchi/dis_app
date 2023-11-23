import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm } from 'react-hook-form';

import { addDocumentoRequest, listarEmpresasRequest, listarGruposRequest, removeDocumentoRequest, updateDocumentoRequest } from '../../store/modules/Empresa/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { showInformation } from '../../store/modules/Information/actions';
import { MdEdit, MdEditNote, MdHighlightOff, MdKeyboardArrowDown, MdKeyboardArrowUp, MdSearch, MdViewList } from 'react-icons/md';

import * as Styled from '../styleds';
import Paginacao from '../Paginacao';
import InputSearch from '../InputSearch';
import DataPicker from '../DataPicker';
import SelectSearch from '../SelectSearch';

const Empresas = ({ loading, usuario, empresas, error, page, addDocumento, updateDocumento, listarEmpresas, removeDocumento, confirmacao, informacao, grupos, listarGrupos }) => {

  const API_URL = process.env.REACT_APP_URL_API;

  const formEmpty = {
    codigo: '',
    data: '',
    descricao: '',
    observacao: '',
    documento: '',
    validade: '',
    ativo: true,
    dataDownload: '',
    dataDownloadID: '',
    usuario: ''
  }

  const listFields = {
    empresa: 'texto',
    descricao: 'texto',
    data: 'texto',
    documento: 'link',
    validade: 'texto',
    dataDownload: 'texto',
    dataDownloadID: 'texto',
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

  const [documentoState, setDocumentoState] = useState([]);
  const [documentoSelected, setDocumentoSelected] = useState(formEmpty);

  const { register, control, setValue, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: documentoSelected
      ? {
        codigo: documentoSelected.codigo,
        data: documentoSelected.data,
        descricao: documentoSelected.descricao,
        observacao: documentoSelected.observacao,
        documento: documentoSelected.documento,
        dataDownload: documentoSelected.dataDownload,
        dataDownloadID: documentoSelected.dataDownloadID,
        usuario: documentoSelected.usuario,
        ativo: documentoSelected.ativo,
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
    reset({ ...documentoSelected });
  }, [reset, documentoSelected]);

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
    setDocumentoSelected(empresasState[empresaIndex]?.documentos[index])
  }

  const handleDelete = (event, empresaId, documentoId, documentoNome) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR O DOCUMENTO?', () => { removeDocumento(empresaId, documentoId, documentoNome) });
  }

  const handleClear = () => {
    setGrupoSelected({});
    setEmpresaSelected('');

    setDocumentoSelected({ ...formEmpty })
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
      formData.append('documento', JSON.stringify(data));

      if (data._id) {
        updateDocumento(empresaSelected._id, formData);

      } else {
        addDocumento(empresaSelected._id, formData);

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

                      <Styled.Label>Data: </Styled.Label>
                      <DataPicker name="data" control={control} setValue={setValue} defaultValue={documentoSelected?.data} showTimeSelect={false} />
                      {errors.data && <span>Campo obrigatório</span>}

                      <Styled.Label>Descricao:</Styled.Label>
                      <Styled.Input
                        {...register('descricao', { required: true })}
                      />
                      {errors.descricao && <span>Campo obrigatório</span>}
                      <Styled.Label>Validade do documento: </Styled.Label>
                      <DataPicker name="validade" control={control} setValue={setValue} defaultValue={documentoSelected?.validade} showTimeSelect={false} />
                      {errors.validade && <span>Campo obrigatório</span>}
                      <Styled.Label>Observação:</Styled.Label>
                      <Styled.Input
                        {...register('observacao', { required: false })}
                      />
                      {errors.observacao && <span>Campo obrigatório</span>}

                      <Styled.Label>Anexar documento:</Styled.Label>
                      <Styled.Input type='file' name='documentoFile' {...register('documentoFile', { required: false })} />
                      {errors.acordoFile && <span>Campo obrigatório</span>}
                      {documentoSelected?.documento &&
                        <a href={`${API_URL}/images/${documentoSelected.documento}`} target="_blank" rel="noreferrer"> Arquivo </a>
                      }

                      <Styled.Label>Download:</Styled.Label>
                      <Styled.Input
                        disabled
                        {...register('download', { required: false })}
                      />
                      {errors.download && <span>Campo obrigatório</span>}

                      <Styled.Label>DownloadID:</Styled.Label>
                      <Styled.Input
                        disabled
                        {...register('downloadID', { required: false })}
                      />
                      {errors.downloadID && <span>Campo obrigatório</span>}
                      <Styled.Label>Ativo</Styled.Label>
                      <Styled.Input
                        type='checkbox'
                        {...register('ativo')}
                      />
                      {errors.ativo && <span>Campo obrigatório</span>}

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
                          const documentos = empresa?.documentos || [];

                          return (
                            <React.Fragment key={empresaIndex}>
                              {documentos.map((documento, index) => (
                                <Styled.ListItem key={documento._id}>

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
                                  {/* {Object.keys(documento).map((field, index) => {
                                    if (field !== '_id' && listFields.hasOwnProperty(field)) {
                                      return (
                                        <Styled.CampoValor key={field}>
                                          {`${documento[field]}`}
                                        </Styled.CampoValor>
                                      );
                                    }
                                  })} */}
                                  <Styled.ColunaValor>
                                    <Styled.IconeArea
                                    >
                                      <MdHighlightOff
                                        color='#F00'
                                        onClick={(event) => handleDelete(event, empresa._id, documento._id, documento.documento)}
                                        style={{ height: '1em', width: '1em' }}
                                      />
                                    </Styled.IconeArea>
                                    <Styled.IconeArea
                                    >
                                      <MdEditNote
                                        color='#005'
                                        onClick={(event) => {
                                          toggleSectionExpand(1, event);
                                          handleSelect(event, empresaIndex, index);
                                        }}
                                        style={{ height: '1.2em', width: '1.2em' }}
                                      />
                                    </Styled.IconeArea>
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
    addDocumento: (id, documento) => dispatch(addDocumentoRequest(id, documento)),
    updateDocumento: (id, documento) => dispatch(updateDocumentoRequest(id, documento)),
    removeDocumento: (id, documentoId, documentoNome) => dispatch(removeDocumentoRequest(id, documentoId, documentoNome)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm)),
    informacao: (text) => dispatch(showInformation(text)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Empresas);