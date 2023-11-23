import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm } from 'react-hook-form';

import { criarGruposRequest, deleteGruposRequest, listarGruposRequest, searchGruposRequest, updateGruposRequest } from '../../store/modules/Empresa/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { showInformation } from '../../store/modules/Information/actions';
import { MdEdit, MdEditNote, MdHighlightOff, MdKeyboardArrowDown, MdKeyboardArrowUp, MdSearch, MdViewList } from 'react-icons/md';

import * as Styled from '../styleds';
import Paginacao from '../Paginacao';

const Grupo = ({ loading, usuario, grupos, error, page, listarGrupos, searchGrupos, criarGrupos, updateGrupos, deleteGrupos, confirmacao, informacao }) => {

  const formEmpty = {
    nome: '',
    email: '',
    password: '',
    responsavel: '',
    empresas: [],
    ativo: true,
  }

  const listFields = {
    nome: 'texto',
    responsavel: 'texto',
    ativo: 'boolean',
    opção: ''
  }

  const fieldsSearchData = {
    nome: ''
  }

  const [sectionItems, setSectionItems] = useState([
    { id: 1, label: 'Cadastro', expanded: false, sections: [{ id: 1, label: 'Cadastro', expanded: false, component: 'formulario' },], icon: <MdEdit /> },
    { id: 2, label: 'Pesquisa', expanded: true, sections: [{ id: 1, label: 'Pesquisa', expanded: false, component: 'search' },], icon: <MdSearch /> },
    { id: 3, label: 'Listagem', expanded: true, sections: [{ id: 1, label: 'Listagem', expanded: false, component: 'listagem' },], icon: <MdViewList /> },
  ]);

  const [gruposState, setGruposState] = useState([]);
  const [grupoSelected, setGrupoSelected] = useState(formEmpty);
  
  const [fieldSearch, setFieldSearch] = useState(fieldsSearchData);

  const { register, control, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: grupoSelected
      ? {
        _id: grupoSelected._id,
        nome: grupoSelected.nome,
        email: grupoSelected.email,
        password: grupoSelected.password,
        responsavel: grupoSelected.responsavel,
        ativo: grupoSelected.ativo,
      } :
      {}
  });

  useEffect(() => {
    listarGrupos(page, 0);
  }, []);
  useEffect(() => {
    setGruposState(grupos);
  }, [grupos]);


  useEffect(() => {
    reset({ ...grupoSelected });
  }, [reset, grupoSelected]);

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



  const handleSelect = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setGrupoSelected(grupos[index]);

  }

  const handleDelete = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR O USUARIO?', () => { deleteGrupos(index) });
  }

  const handleClear = () => {
    setGrupoSelected({ ...formEmpty })
  }

  const handleSearch = (event) => {
    setFieldSearch({...fieldSearch, [event.target.name]: event.target.value})
   
  
  };

  const searchTimerRef = useRef(null);

  const handleFetchSearch = (event) => {
    event.preventDefault();
    event.stopPropagation();
    clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      searchGrupos(fieldSearch);
      setFieldSearch(fieldsSearchData)
    }, 500);
    
  }


  const onSubmit = (data) => {

    data.usuario = usuario;

    if (data._id) {
      updateGrupos(data._id, data);

    } else {
      criarGrupos(data);
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
                    <Styled.Form id='formCad' onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                      <Styled.Input
                        hidden
                        {...register('id')}
                      />
                      <Styled.Label>Grupo:</Styled.Label>
                      <Styled.Input
                        {...register('nome', { required: true })}
                      />
                      {errors.nome && <span>Campo obrigatório</span>}

                      <Styled.Label>Email: </Styled.Label>
                      <Styled.Input type='email'
                        {...register('email', { required: true })}
                      />
                      {errors.email && <span>Campo obrigatório</span>}
                      <Styled.Label>Senha: </Styled.Label>
                      <Styled.Input type='password'
                        {...register('password', { required: false })}
                      />
                      {errors.password && <span>Campo obrigatório</span>}
                      <Styled.Label>Responsavel: </Styled.Label>
                      <Styled.Input type='responsavel'
                        {...register('responsavel', { required: true })}
                      />
                      {errors.responsavel && <span>Campo obrigatório</span>}
                      <Styled.Label>Ativo</Styled.Label>
                      <Styled.Input
                        type='checkbox'
                        {...register('ativo')}
                      />
                      {errors.ativo && <span>Campo obrigatório</span>}
                      <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                        <p>{`Usuário: ${grupoSelected?.usuario?.nome || usuario.nome}`}</p>
                      </div>
                      <Styled.Button type="submit">Salvar</Styled.Button>
                      <Styled.Button type="button" style={{ background: '#FBAF3A' }} onClick={(event) => handleClear(event)}>Limpar</Styled.Button>
                    </Styled.Form>

                  </Styled.FormArea>

                )
              }
              if (section.component === 'search') {
                return (<React.Fragment>
                  <Styled.Label>Nome:</Styled.Label>
                      <Styled.Input
                        type='search' name='nome' onChange={handleSearch} 
                      />
                      <Styled.Button type="button" onClick={(event) => handleFetchSearch(event)}>Pesquisar</Styled.Button>
                </React.Fragment>)
              }
              if (section.component === 'listagem') {
                return (<>
                  <Paginacao page={page} ativo={0} listagem={listarGrupos} />
                  <Styled.ListArea>

                    <Styled.ListHeader>
                      {
                        Object.keys(listFields).map((key, index) => {
                          return <Styled.Coluna label={key} key={index} />
                        })
                      }

                    </Styled.ListHeader>
                    <Styled.List>

                      {gruposState?.length > 0 && gruposState?.map((grupo, index) => (
                        <>
                          <Styled.ListItem key={grupo._id} >
                            {


                              Object.keys(listFields).map((field, index) => {
                                if (field !== '_id' && field !== 'opção') {
                                  if (listFields[field] === 'boolean')
                                    return (<>
                                      {listFields[field] ? <Styled.Ativo /> : <Styled.Inativo />}
                                    </>);
                                  return (<Styled.CampoValor>{grupo[field] && `${grupo[field]}`}</Styled.CampoValor>)
                                }


                              })
                            }
                            <Styled.ColunaValor>
                                  <Styled.IconeArea >
                                    <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, grupo._id)} style={{ height: '1em', width: '1em' }} />
                                  </Styled.IconeArea>
                                  <Styled.IconeArea >
                                    <MdEditNote color='#005' onClick={(event) => { toggleSectionExpand(1, event); handleSelect(event, index) }} style={{ height: '1.2em', width: '1.2em' }} />
                                  </Styled.IconeArea>
                                </Styled.ColunaValor>


                          </Styled.ListItem>
                        </>
                      ))}
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
    grupos: state.empresa.grupos,
    error: state.empresa.error,
    page: state.empresa.page,
    usuario: state.usuario.usuario,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listarGrupos: (page, ativo) => dispatch(listarGruposRequest(page, ativo)),
    searchGrupos: (query) => dispatch(searchGruposRequest(query)),
    criarGrupos: (grupo) => dispatch(criarGruposRequest(grupo)),
    updateGrupos: (id, grupo) => dispatch(updateGruposRequest(id, grupo)),
    deleteGrupos: (id) => dispatch(deleteGruposRequest(id)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm)),
    informacao: (text) => dispatch(showInformation(text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Grupo);