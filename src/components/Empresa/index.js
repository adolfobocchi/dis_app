import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';

import { criarEmpresasRequest, deleteEmpresasRequest, listarEmpresasRequest, updateEmpresasRequest } from '../../store/modules/Empresa/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { MdEdit, MdHighlightOff, MdKeyboardArrowDown, MdKeyboardArrowUp, MdSearch, MdViewList } from 'react-icons/md';

import * as Styled from '../styleds';
import Paginacao from '../Paginacao';
import InputSearch from '../InputSearch';
import { listarAreasRequest } from '../../store/modules/Area/actions';
import { listarUsuariosRequest } from '../../store/modules/Usuario/actions';

const Empresas = ({ loading, usuario, usuarios, listarUsuarios, areas, listarAreas, empresas, error, page, listarEmpresas, criarEmpresas, updateEmpresas, deleteEmpresas, confirmacao }) => {
  const estados = [
    'acre', 'alagoas', 'amapa', 'amazonia', 'bahia', 'ceara', 'distrito federal', 'espirito santo', 'goias', 'maranhão',
    'mato grosso', 'mato grosso do sul', 'minas gerais', 'para', 'paraiba', 'parana', 'pernanbuco', 'piaui', 'rio de janeiro', 'rio grande do norte',
    'rio grande do sul', 'rondonia', 'roraima', 'santa catarina', 'são paulo', 'sergipe', 'tocantis',
  ];

  const formEmpty = {
    razaoSocial: '',
    nomeFantasia: '',
    cnpj: '',
    cnae: '',
    endereco: '',
    numero: 0,
    cep: '',
    bairro: '',
    cidade: '',
    estado: '',
    funcionarios: 0,
    responsavel: '',
    funcao: '',
    telefone: '',
    email: '',
    usuario: '',
    tecnico: '',
    area: '',
    observacao: '',
    inclusao: '',
    ativo: true,
  }

  const listFields = {
    nomeFantasia: 'texto',
    cnpj: 'texto',
    responsavel: 'texto',
    telefone: 'texto',
    email: 'texto',
  }

  const [sectionItems, setSectionItems] = useState([
    { id: 1, label: 'Cadastro', expanded: false, sections: [{ id: 1, label: 'Cadastro', expanded: false, component: 'formulario' },], icon: <MdEdit /> },
    { id: 2, label: 'Pesquisa', expanded: true, sections: [{ id: 1, label: 'Pesquisa', expanded: false, component: 'search' },], icon: <MdSearch /> },
    { id: 3, label: 'Listagem', expanded: true, sections: [{ id: 1, label: 'Listagem', expanded: false, component: 'listagem' },], icon: <MdViewList /> },
  ]);

  const [areasState, setAreasState] = useState([]);
  const [areaSelected, setAreaSelected] = useState({});

  const [tecnicoState, setTecnicoState] = useState([]);
  const [tecnicoSelected, setTecnicoSelected] = useState({});

  const [empresasState, setEmpresasState] = useState([]);
  const [empresaSelected, setEmpresaselected] = useState(formEmpty);

  const { register, control, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: empresaSelected
      ? {
        _id: empresaSelected._id,
        razaoSocial: empresaSelected.razaoSocial,
        nomeFantasia: empresaSelected.nomeFantasia,
        cnpj: empresaSelected.cnpj,
        cnae: empresaSelected.cnae,
        endereco: empresaSelected.endereco,
        numero: empresaSelected.numero,
        cep: empresaSelected.cep,
        bairro: empresaSelected.bairro,
        cidade: empresaSelected.cidade,
        estado: empresaSelected.estado,
        funcionarios: empresaSelected.funcionarios,
        responsavel: empresaSelected.responsavel,
        funcao: empresaSelected.funcao,
        telefone: empresaSelected.telefone,
        email: empresaSelected.email,
        usuario: empresaSelected.usuario,
        tecnico: empresaSelected.tecnico,
        area: empresaSelected.area,
        observacao: empresaSelected.observacao,
        inclusao: empresaSelected.inclusao,
        ativo: empresaSelected.ativo,
      } :
      {}
  });

  useEffect(() => {
    listarEmpresas(page, 0);
    listarAreas(0, 1);
    listarUsuarios(0, 1);
  }, []);
  useEffect(() => {
    setEmpresasState(empresas);
  }, [empresas]);

  useEffect(() => {
    setAreasState(areas);
  }, [areas]);

  useEffect(() => {
    setTecnicoState(usuarios.filter(usuario => usuario.tipo === 'técnico'));
  }, [usuarios]);


  useEffect(() => {
    reset({ ...empresaSelected });
  }, [reset, empresaSelected]);

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
    setEmpresaselected(empresas[index]);
    setTecnicoSelected(empresas[index].tecnico);
    setAreaSelected(empresas[index].area);

  }

  const handleDelete = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR O USUARIO?', () => { deleteEmpresas(index) });
  }

  const handleClear = () => {
    setEmpresaselected({ ...formEmpty })
  }


  const onSubmit = (data) => {
    data.usuario = usuario;
    data.area = areaSelected;
    data.tecnico = tecnicoSelected;

    if (data._id) {
      updateEmpresas(data._id, data);

    } else {
      criarEmpresas(data);
    }
    handleClear();
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
                      <Styled.Input
                        hidden
                        {...register('id')}
                      />
                      <Styled.Label>Nome Fantasia:</Styled.Label>
                      <Styled.Input
                        {...register('nomeFantasia', { required: true })}
                      />
                      {errors.nomeFantasia && <span>Campo obrigatório</span>}
                      <Styled.Label>Razão Social:</Styled.Label>
                      <Styled.Input
                        {...register('razaoSocial', { required: false })}
                      />
                      <Styled.Label>Cnpj:</Styled.Label>
                      <Controller
                        control={control}
                        name="cnpj"
                        render={({ field }) => (
                          <InputMask mask="99.999.999/9999-99" {...field}>
                            {(inputProps) => <Styled.Input {...inputProps} />}
                          </InputMask>
                        )}
                      />
                      <Styled.Label>CNAE:</Styled.Label>
                      <Styled.Input
                        {...register('cnae', { required: false })}
                      />
                      <Styled.Label>Ramo de atividade</Styled.Label>
                      <InputSearch items={areasState} onSelect={(item) => setAreaSelected(item)} valueSelected={areaSelected?.nome} />
                      {errors.area && <span>Campo obrigatório</span>}

                      <Styled.Label>Endereço:</Styled.Label>
                      <Styled.Input
                        {...register('endereco', { required: false })}
                      />
                      <Styled.Label>Numero:</Styled.Label>
                      <Styled.Input type='number'
                        {...register('numero', { required: false })}
                      />
                      <Styled.Label>Cep:</Styled.Label>
                      <Controller
                        control={control}
                        name="cep"
                        render={({ field }) => (
                          <InputMask mask="99999-999" {...field}>
                            {(inputProps) => <Styled.Input {...inputProps} />}
                          </InputMask>
                        )}
                      />
                      <Styled.Label>Bairro:</Styled.Label>
                      <Styled.Input
                        {...register('bairro', { required: false })}
                      />
                      <Styled.Label>Cidade:</Styled.Label>
                      <Styled.Input
                        {...register('cidade', { required: false })}
                      />
                      <Styled.Label>Estado: </Styled.Label>
                      <Controller
                        name="estado"
                        control={control}
                        rules={{ required: 'Campo obrigatório' }}
                        render={({ field }) => (
                          <select style={{ padding: 8 }} {...field}>
                            <option value="">Selecione o estado</option>
                            {estados.map((estado) => (
                              <option key={estado} value={estado}>{estado}</option>
                            ))}
                          </select>
                        )}
                      />
                      <Styled.Label>Funcionarios:</Styled.Label>
                      <Styled.Input type='number'
                        {...register('funcionarios', { required: false })}
                      />
                      <Styled.Label>Responsavel: </Styled.Label>
                      <Styled.Input
                        {...register('responsavel', { required: false })}
                      />
                      <Styled.Label>Função: </Styled.Label>
                      <Styled.Input
                        {...register('funcao', { required: false })}
                      />
                      <Styled.Label>Telefone: </Styled.Label>
                      <Controller
                        control={control}
                        name="telefone"
                        render={({ field }) => (
                          <InputMask mask="(99) 99999-9999" {...field}>
                            {(inputProps) => <Styled.Input {...inputProps} />}
                          </InputMask>
                        )}
                      />
                      <Styled.Label>Email: </Styled.Label>
                      <Styled.Input type='email'
                        {...register('email', { required: false })}
                      />
                      <Styled.Label>Técnico Responsavel: </Styled.Label>
                      <InputSearch items={tecnicoState} onSelect={(item) => setTecnicoSelected(item)} valueSelected={tecnicoSelected?.nome} />
                      <Styled.Label>Observação: </Styled.Label>
                      <Styled.Input
                        {...register('observacao', { required: false })}
                      />
                      <Styled.Label>Ativo</Styled.Label>
                      <Styled.Input
                        type='checkbox'
                        {...register('ativo')}
                      />
                      {errors.ativo && <span>Campo obrigatório</span>}
                      <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                        <p>{`Usuário: ${empresaSelected?.usuario?.nome && empresaSelected?.usuario?.nome}`}</p>
                        <p>{`Ultima alteração: ${empresaSelected?.inclusao}`}</p>
                      </div>
                      <Styled.Button type="submit">Salvar</Styled.Button>
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
                      <Styled.Coluna label='' />
                    </Styled.ListHeader>
                    <Styled.List>

                      {empresasState?.length > 0 && empresasState?.map((empresa, index) => (
                        <>
                          <Styled.ListItem key={empresa._id} onClick={(event) => handleSelect(event, index)}>
                            {
                              Object.keys(empresa).map((field, index) => {
                                if (field !== '_id' && listFields.hasOwnProperty(field)) {
                                  return (<Styled.CampoValor>{`${empresa[field]}`}</Styled.CampoValor>)
                                }
                              })
                            }

                            <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', flex: 1 }} >
                              <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, empresa._id)} style={{ height: '1em', width: '1em' }} />
                            </div>

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
    empresas: state.empresa.empresas,
    error: state.empresa.error,
    page: state.empresa.page,

    areas: state.area.areas,
    usuario: state.usuario.usuario,
    usuarios: state.usuario.usuarios,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    listarEmpresas: (page, ativo) => dispatch(listarEmpresasRequest(page, ativo)),
    criarEmpresas: (empresa) => dispatch(criarEmpresasRequest(empresa)),
    updateEmpresas: (id, empresa) => dispatch(updateEmpresasRequest(id, empresa)),
    deleteEmpresas: (id) => dispatch(deleteEmpresasRequest(id)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm)),

    listarAreas: (page, ativo) => dispatch(listarAreasRequest(page, ativo)),
    listarUsuarios: (page, ativo) => dispatch(listarUsuariosRequest(page, ativo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Empresas);