import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';

import { criarEmpresasRequest, deleteEmpresasRequest, listarEmpresasRequest, listarGruposRequest, updateEmpresasRequest, updateGruposRequest } from '../../store/modules/Empresa/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { showInformation } from '../../store/modules/Information/actions';
import { MdEdit, MdEditNote, MdHighlightOff, MdKeyboardArrowDown, MdKeyboardArrowUp, MdSearch, MdViewList } from 'react-icons/md';

import * as Styled from '../styleds';
import Paginacao from '../Paginacao';
import InputSearch from '../InputSearch';
import { listarAreasRequest } from '../../store/modules/Area/actions';
import { listarUsuariosRequest } from '../../store/modules/Usuario/actions';
import DataPicker from '../DataPicker';

const Empresas = ({ loading, usuario, usuarios, listarUsuarios, areas, listarAreas, empresas, error, page, listarEmpresas, criarEmpresas, updateEmpresas, deleteEmpresas, confirmacao, informacao, grupos, listarGrupos }) => {
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
    grupo: '',
    observacao: '',
    inclusao: '',
    ativo: true,
    tipoContrato: '',
    inicioContrato: '',
    vencimentoContrato: '',
    contrato: '',
    comunicados: [],
    solicitacoes: [],
    historicoAcao: [],
    documentos: [

    ],
    planoAcao: [

    ]
  }

  const listFields = {
    nomeFantasia: 'texto',
    cnpj: 'texto',
    responsavel: 'texto',
    telefone: 'texto',
    email: 'texto',
    opção: ''
  }

  const fieldsSearchData = {
    nomeFantasia: '',
    cnpj: ''
  }

  const [sectionItems, setSectionItems] = useState([
    { id: 1, label: 'Cadastro', expanded: false, sections: [{ id: 1, label: 'Cadastro', expanded: false, component: 'formulario' },], icon: <MdEdit /> },
    { id: 2, label: 'Pesquisa', expanded: true, sections: [{ id: 1, label: 'Pesquisa', expanded: false, component: 'search' },], icon: <MdSearch /> },
    { id: 3, label: 'Listagem', expanded: true, sections: [{ id: 1, label: 'Listagem', expanded: false, component: 'listagem' },], icon: <MdViewList /> },
  ]);

  const [areasState, setAreasState] = useState([]);
  const [areaSelected, setAreaSelected] = useState(null);

  const [tecnicoState, setTecnicoState] = useState([]);
  const [tecnicoSelected, setTecnicoSelected] = useState(null);


  const [gruposState, setGruposState] = useState([]);
  const [grupoSelected, setGrupoSelected] = useState(null);

  const [empresasState, setEmpresasState] = useState([]);
  const [empresaSelected, setEmpresaselected] = useState(formEmpty);

  const [fieldSearch, setFieldSearch] = useState(fieldsSearchData);

  const { register, control, setValue, formState: { errors }, handleSubmit, reset } = useForm({
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
        tipoContrato: empresaSelected.tipoContrato,
        inicioContrato: empresaSelected.inicioContrato,
        vencimentoContrato: empresaSelected.vencimentoContrato,
        contrato: empresaSelected.contrato,
        grupo: empresaSelected.grupo,
        ativo: empresaSelected.ativo,
      } :
      {}
  });

  useEffect(() => {
    listarEmpresas(page, 0);
    listarAreas(0, 1);
    listarUsuarios(0, 1);
    listarGrupos(0, 1);
  }, []);

  useEffect(() => {
    setEmpresasState(empresas);
  }, [empresas]);

  useEffect(() => {
    setGruposState(grupos);
  }, [grupos]);

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
    setGrupoSelected(empresas[index].grupo);
  }

  const handleDelete = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR O USUARIO?', () => { deleteEmpresas(index) });
  }

  const handleClear = () => {
    setAreaSelected({});
    setTecnicoSelected({});
    setGrupoSelected({});
    setEmpresaselected({ ...formEmpty })
  }

  const handleSearch = (event) => {
    setFieldSearch({...fieldSearch, [event.target.name]: event.target.value})
   
  
  };

  const onSubmit = (data) => {
    data.usuario = usuario;
    if (!grupoSelected) {
      informacao('GRUPO OBRIGATORIO! VERIFIQUE!');
      return false
    } else if (!data.usuario) {
      informacao('USUARIO OBRIGATORIO! VERIFIQUE!');
      return false
    } else if (!areaSelected) {
      informacao('RAMO DE ATIVIDADE OBRIGATORIO! VERIFIQUE!');
      return false
    } else if (!tecnicoSelected) {
      informacao('TÉCNICO OBRIGATORIO! VERIFIQUE!');
      return false
    } else if (data.razaoSocial === '') {
      informacao('RAZAO SOCIAL OBRIGATORIO! VERIFIQUE!');
      return false
    } else if (data.nomeFantasia === '') {
      informacao('NOME FANTASIA OBRIGATORIO! VERIFIQUE!');
      return false
    } else if (data.estado === '') {
      informacao('ESTADO OBRIGATORIO! VERIFIQUE!');
      return false
    } else {
      data.tecnico = tecnicoSelected;
      data.area = areaSelected;
      data.grupo = grupoSelected;
      if (data._id) {
        updateEmpresas(data._id, data);

      } else {
        criarEmpresas(data);
        
      }
      if (error === '') {
        handleClear();
      }
    }
  };

  if (loading) {
    return <ModalLoading />
  }
  console.log(empresaSelected);
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
                        rules={{ required: true }}
                        render={({ field }) => (
                          <select style={{ padding: 8 }} {...field}>
                            <option value="">Selecione o estado</option>
                            {estados.map((estado) => (
                              <option key={estado} value={estado}>{estado}</option>
                            ))}
                          </select>
                        )}
                      />
                      {errors.estado && <span>Campo obrigatório</span>}
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
                      <Styled.Label>Tipo de contrato: </Styled.Label>
                      <Styled.Input
                        {...register('tipoContrato', { required: false })}
                      />
                      <Styled.Label>Inicio do contrato: </Styled.Label>
                      <DataPicker name="inicioContrato" control={control} setValue={setValue} defaultValue={empresaSelected?.inicioContratoa} showTimeSelect={false} />
                      {errors.inicioContrato && <span>Campo obrigatório</span>}
                      <Styled.Label>Vencimento do contrato: </Styled.Label>
                      <DataPicker name="vencimentoContrato" control={control} setValue={setValue} defaultValue={empresaSelected?.vencimentoContrato} showTimeSelect={false} />
                      {errors.vencimentoContrato && <span>Campo obrigatório</span>}
                      <Styled.Label>Numero do contrato: </Styled.Label>
                      <Styled.Input
                        {...register('contrato', { required: false })}
                      />
                      <Styled.Label>Total de etapas: </Styled.Label>
                      <Styled.Input
                        {...register('etapas', { required: false })}
                      />
                      <Styled.Label>Etapa Atual: </Styled.Label>
                      <Styled.Input
                        {...register('etapaAtual', { required: false })}
                      />
                      <Styled.Label>Percentual Plano Ação: </Styled.Label>
                      <Styled.Input
                        {...register('planoAcaoDesenvolvido', { required: false })}
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
                      <Styled.Label>Logo: </Styled.Label>
                      <Styled.Input type='file' multiple name='logoFile' {...register('logoFile', { required: false })} />

                      <Styled.Label>Ativo</Styled.Label>
                      <Styled.Input
                        type='checkbox'
                        {...register('ativo')}
                      />
                      {errors.ativo && <span>Campo obrigatório</span>}
                      <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                        <p>{`Usuário: ${empresaSelected?.usuario?.nome || usuario.nome}`}</p>
                        <p>{`Ultima alteração: ${empresaSelected?.inclusao}`}</p>
                      </div>
                      <Styled.Button type="submit">Salvar</Styled.Button>
                      <Styled.Button type="button" style={{ background: '#FBAF3A' }} onClick={(event) => handleClear(event)}>Limpar</Styled.Button>
                    </Styled.Form>

                  </Styled.FormArea>

                )
              }
              if (section.component === 'search') {
                return (<React.Fragment>
                  <Styled.Label>Nome Fantasia:</Styled.Label>
                      <Styled.Input
                        type='search' name='nomeFantasia' onChange={handleSearch} 
                      />
                  <Styled.Label>Cnpj:</Styled.Label>
                      <Styled.Input
                        type='search' name='cnpj' onChange={handleSearch} 
                      />
                </React.Fragment>)
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
                      empresasState?.filter((empresa) => 
                        empresa?.nomeFantasia.includes(fieldSearch.nomeFantasia)
                      
                      ).filter(empresa => 
                        empresa?.cnpj.includes(fieldSearch.cnpj)
                        ).map((empresa, index) => (
                        <>
                          <Styled.ListItem key={empresa._id} >
                            {
                              Object.keys(empresa).map((field, index) => {
                                if (field !== '_id' && listFields.hasOwnProperty(field)) {
                                  return (<Styled.CampoValor>{`${empresa[field]}`}</Styled.CampoValor>)
                                }
                              })
                            }
                            <Styled.ColunaValor>
                              <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', flex: 1 }} >
                                <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, empresa._id)} style={{ height: '1em', width: '1em' }} />
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', width: '6em' }} >
                                <MdEditNote color='#005' onClick={(event) => { toggleSectionExpand(1, event); handleSelect(event, index) }} style={{ height: '1.2em', width: '1.2em' }} />
                              </div>
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
    empresas: state.empresa.empresas,
    grupos: state.empresa.grupos,
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
    listarGrupos: (page, ativo) => dispatch(listarGruposRequest(page, ativo)),
    criarEmpresas: (empresa) => dispatch(criarEmpresasRequest(empresa)),
    updateEmpresas: (id, empresa) => dispatch(updateEmpresasRequest(id, empresa)),
    deleteEmpresas: (id) => dispatch(deleteEmpresasRequest(id)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm)),
    informacao: (text) => dispatch(showInformation(text)),

    listarAreas: (page, ativo) => dispatch(listarAreasRequest(page, ativo)),
    listarUsuarios: (page, ativo) => dispatch(listarUsuariosRequest(page, ativo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Empresas);