import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm } from 'react-hook-form';

import { criarDisRequest, deleteDisRequest, listarDisRequest, updateDisRequest } from '../../store/modules/Dis/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { MdEdit, MdHighlightOff, MdKeyboardArrowDown, MdKeyboardArrowUp, MdSearch, MdViewList } from 'react-icons/md';
import * as Styled from '../styleds';
import styled from 'styled-components';
import InputSearch from '../InputSearch';
import { criarAreasRequest, listarAreasRequest } from '../../store/modules/Area/actions';
import { criarCausasRequest, listarCausasRequest } from '../../store/modules/Causa/actions';
import { criarFuncoesRequest, listarFuncoesRequest } from '../../store/modules/Funcao/actions';
import { criarSeveridadesRequest, listarSeveridadesRequest } from '../../store/modules/Severidade/actions';
import { criarSetoresRequest, listarSetoresRequest } from '../../store/modules/Setor/actions';
import { criarRiscosRequest, listarRiscosRequest } from '../../store/modules/Risco/actions';
import { criarRecursosRequest, listarRecursosRequest } from '../../store/modules/Recurso/actions';
import { criarPropostasRequest, listarPropostasRequest } from '../../store/modules/Proposta/actions';
import { criarProcessosRequest, listarProcessosRequest } from '../../store/modules/Processo/actions';
import { criarProbabilidadesRequest, listarProbabilidadesRequest } from '../../store/modules/Probabilidade/actions';
import { criarNivelriscosRequest, listarNivelriscosRequest } from '../../store/modules/NivelRisco/actions';
import { criarMedidasRequest, listarMedidasRequest } from '../../store/modules/Medida/actions';


const SectionArea = styled.div`
  background: #EBF0F7;
  display: flex;
  height: 40px;
  font-size: 1.3em;
  font-weight: 400;
  align-items: center;
  margin-bottom: 12px;
  margin-top: 12px;
`
const ScrollableContainer = styled.div`
  width: calc(100vw - 247px);
        overflow-x: auto;
        overflow-y: hidden;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const DiagnosticoContent = styled.div`
  display: flex;
  min-height: 280px;

`
const DiagnosticoItem = styled.div`
  display: flex;
  min-width: 300px;
  border: 1px solid #666666;
  margin: 8px;
  flex-direction: column;
  flex: 1;
  padding: 6px;
`

const DiagnosticoItemArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`

const DignosticoItemSelectedArea = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px;
  &:hover {
    background: #CCC;
  }
  cursor: pointer;
`


const Dis = ({
  loading,
  disList,
  error,
  page,
  listarDis,
  criarDis,
  updateDis,
  deleteDis,
  confirmacao,
  listarAreas,
  listarSetores,
  listarFuncoes,
  listarProcessos,
  listarRecursos,
  listarRiscos,
  listarCausas,
  listarMedidas,
  listarProbabilidades,
  listarSeveridades,
  listarNivelriscos,
  listarPropostas,
  areas,
  setores,
  funcoes,
  processos,
  recursos,
  riscos,
  causas,
  medidas,
  probabildiades,
  severidades,
  nivelriscos,
  propostas

}) => {

  const formEmpty = {
    _id: '',
    empresa: '',
    data: '',
    fotoFachada: '',
    responsavel: '',
    telefone: '',
    email: '',
    localizacao: '',
    usuarioLogado: '',

    ativo: true,
  }

  const [disListState, setDisListState] = useState([]);
  const [areasState, setAreasState] = useState([]);
  const [setoresState, setSetoresState] = useState([]);
  const [funcoesState, setFuncoesState] = useState([]);
  const [processosState, setProcessosState] = useState([]);
  const [recursosState, setRecursosState] = useState([]);
  const [riscosState, setRiscosState] = useState([]);
  const [causasState, setCausasState] = useState([]);
  const [medidasState, setMedidasState] = useState([]);
  const [probabilidadesState, setProbabilidadesState] = useState([]);
  const [severidadesState, setSeveridadesState] = useState([]);
  const [niveisRiscoState, setNiveisRiscoState] = useState([]);
  const [propostasState, setPropostasState] = useState([]);

  const [areasSelectedsState, setAreasSelectedsState] = useState([]);
  const [setoresSelectedsState, setSetoresSelectedsState] = useState([]);
  const [funcoesSelectedsState, setFuncoesSelectedsState] = useState([]);
  const [processosSelectedsState, setProcessosSelectedsState] = useState([]);
  const [recursosSelectedsState, setRecursosSelectedsState] = useState([]);
  const [riscosSelectedsState, setRiscosSelectedsState] = useState([]);
  const [causasSelectedsState, setCausasSelectedsState] = useState([]);
  const [medidasSelectedsState, setMedidasSelectedsState] = useState([]);
  const [probabilidadesSelectedsState, setProbabilidadesSelectedsState] = useState([]);
  const [severidadesSelectedsState, setSeveridadesSelectedsState] = useState([]);
  const [niveisRiscoSelectedsState, setNiveisRiscoSelectedsState] = useState([]);
  const [propostasSelectedsState, setPropostasSelectedsState] = useState([]);

  const [disSelected, setDisSelected] = useState(formEmpty);
  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: disSelected
      ? {
        _id: disSelected._id,
        nome: disSelected.nome
      } :
      {}
  });

  const [sectionItems, setSectionItems] = useState([
    { id: 1, label: 'Cadastro', expanded: false, sections: [{ id: 1, label: 'Areas', expanded: false, component: 'formulario' },], icon: <MdEdit /> },
    { id: 2, label: 'Pesquisa', expanded: true, sections: [{ id: 1, label: 'Areas', expanded: false, component: 'search' },], icon: <MdSearch /> },
    { id: 3, label: 'Listagem', expanded: true, sections: [{ id: 1, label: 'Areas', expanded: false, component: 'listagem' },], icon: <MdViewList /> },
  ])

  const [diagnosticoItems, setDiagnotiscoItems] = useState([
    { id: 1, label: 'Areas', list: [], items: [], onSelect: (item) => setAreasSelectedsState([...areasSelectedsState, item]) },
    { id: 2, label: 'Setores', list: [], items: [], onSelect: (item) => setSetoresSelectedsState([...setoresSelectedsState, item]) },
    { id: 3, label: 'Funções', list: [], items: [], },
    { id: 4, label: 'Processos', list: [], items: [], },
    { id: 5, label: 'Recursos', list: [], items: [], },
    { id: 6, label: 'Riscos', list: [], items: [], },
    { id: 7, label: 'Causas', list: [], items: [], },
    { id: 8, label: 'Medidas', list: [], items: [], },
    { id: 9, label: 'Probabilidades', list: [], items: [], },
    { id: 10, label: 'Severidades', list: [], items: [], },
    { id: 11, label: 'Niveis de Risco', list: [], items: [], },
    { id: 12, label: 'Propostas de Controle', list: [], items: [], },
  ])

  useEffect(() => {
    listarDis(page, 0);
    listarAreas(page, 0);
    listarSetores(page, 0);
    listarFuncoes(page, 0);
    listarProcessos(page, 0);
    listarRecursos(page, 0);
    listarRiscos(page, 0);
    listarCausas(page, 0);
    listarMedidas(page, 0);
    listarProbabilidades(page, 0);
    listarSeveridades(page, 0);
    listarNivelriscos(page, 0);
    listarPropostas(page, 0);
  }, []);

  useEffect(() => {
    setDisListState(disList);
  }, [disList]);

  useEffect(() => {
    setAreasState(areas);
  }, [areas]);

  useEffect(() => {
    setSetoresState(setores);
  }, [setores]);

  useEffect(() => {
    setFuncoesState(funcoes);
  }, [funcoes]);
  useEffect(() => {
    setProcessosState(processos);
  }, [processos]);
  useEffect(() => {
    setRecursosState(recursos);
  }, [recursos]);
  useEffect(() => {
    setRiscosState(riscos);
  }, [riscos]);
  useEffect(() => {
    setCausasState(causas);
  }, [causas]);
  useEffect(() => {
    setMedidasState(medidas);
  }, [medidas]);
  useEffect(() => {
    setProbabilidadesState(probabildiades);
  }, [probabildiades]);
  useEffect(() => {
    setSeveridadesState(severidades);
  }, [severidades]);
  useEffect(() => {
    setNiveisRiscoState(nivelriscos);
  }, [nivelriscos]);
  useEffect(() => {
    setPropostasState(propostas);
  }, [propostas]);
  useEffect(() => {
    setDiagnotiscoItems([
      { id: 1, label: 'Areas', list: areasState, items: areasSelectedsState, onSelect: (item) => setAreasSelectedsState([...areasSelectedsState, item]) },
      { id: 2, label: 'Setores', list: setoresState, items: setoresSelectedsState, onSelect: (item) => setSetoresSelectedsState([...setoresSelectedsState, item]) },
      { id: 3, label: 'Funções', list: funcoesState, items: funcoesSelectedsState, onSelect: (item) => setFuncoesSelectedsState([...funcoesSelectedsState, item]) },
      { id: 4, label: 'Processos', list: processosState, items: processosSelectedsState, onSelect: (item) => setProcessosSelectedsState([...processosSelectedsState, item]) },
      { id: 5, label: 'Recursos', list: recursosState, items: recursosSelectedsState, onSelect: (item) => setRecursosSelectedsState([...recursosSelectedsState, item]) },
      { id: 6, label: 'Riscos', list: riscosState, items: riscosSelectedsState, onSelect: (item) => setRiscosSelectedsState([...riscosSelectedsState, item]) },
      { id: 7, label: 'Causas', list: causasState, items: causasSelectedsState, onSelect: (item) => setCausasSelectedsState([...causasSelectedsState, item]) },
      { id: 8, label: 'Medidas', list: medidasState, items: medidasSelectedsState, onSelect: (item) => setMedidasSelectedsState([...medidasSelectedsState, item]) },
      { id: 9, label: 'Probabilidades', list: probabilidadesState, items: probabilidadesSelectedsState, onSelect: (item) => setProbabilidadesSelectedsState([...probabilidadesSelectedsState, item]) },
      { id: 10, label: 'Severidades', list: severidadesState, items: severidadesSelectedsState, onSelect: (item) => setSeveridadesSelectedsState([...severidadesSelectedsState, item]) },
      { id: 11, label: 'Niveis de Risco', list: niveisRiscoState, items: niveisRiscoSelectedsState, onSelect: (item) => setNiveisRiscoSelectedsState([...niveisRiscoSelectedsState, item]) },
      { id: 12, label: 'Propostas de Controle', list: propostasState, items: propostasSelectedsState, onSelect: (item) => setPropostasSelectedsState([...propostasSelectedsState, item]) },
    ]);
  }, 
  [
    areasState, 
    areasSelectedsState, 
    setoresState, 
    setoresSelectedsState, 
    funcoesState, 
    funcoesSelectedsState, 
    processosState, 
    processosSelectedsState,
    recursosState, 
    recursosSelectedsState,
    riscosState, 
    riscosSelectedsState,
    causasState, 
    causasSelectedsState,
    medidasState, 
    medidasSelectedsState,
    probabilidadesState, 
    probabilidadesSelectedsState,
    severidadesState, 
    severidadesSelectedsState,
    niveisRiscoState, 
    niveisRiscoSelectedsState,
    propostasState,
    propostasSelectedsState
  ]);


  useEffect(() => {
    reset({ ...disSelected });
  }, [reset, disSelected])


  const handleSelect = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setDisSelected(disList[index]);

  }

  const handleDelete = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR A DIS?', () => { deleteDis(index) });
  }

  const handleClear = () => {
    setDisSelected({ ...formEmpty })
  }

  const onSubmit = (data) => {
    if (data._id) {
      updateDis(data._id, data);

    } else {
      criarDis(data);
    }
    handleClear();
  };

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

  if (loading || !areasState || !setoresState) {
    return <ModalLoading />
  }
  return (
    <Styled.Container>
      {sectionItems.map((sectionItem) => (
        <>
          <SectionArea
            key={sectionItem.id}
            onClick={(event) => toggleSection(sectionItem.id, event)}
          >
            <Styled.AreaWidth style={{ width: 20 }}>{sectionItem.icon}</Styled.AreaWidth>
            <Styled.AreaFlex>{sectionItem.label}</Styled.AreaFlex>
            <Styled.AreaWidth style={{ width: 20, justifyContent: 'flex-end' }} >
              {sectionItem.expanded ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </Styled.AreaWidth>
          </SectionArea>
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
                      <Styled.Label>Empresa</Styled.Label>
                      <Styled.Input
                        placeholder='Nome da empresa'
                        {...register('empresa', { required: true })}
                      />
                      {errors.empresa && <span>Campo obrigatório</span>}

                      <Styled.Label>Data</Styled.Label>
                      <Styled.Input
                        type='date'
                        {...register('data', { required: true })}
                      />
                      {errors.data && <span>Campo obrigatório</span>}

                      <Styled.Label>Foto da Fachada</Styled.Label>
                      <Styled.Input type='file' multiple name='files' {...register('files', { required: false })} />

                      <Styled.Label>Responsavel</Styled.Label>
                      <Styled.Input
                        placeholder='Nome do responsavel'
                        {...register('responsavel', { required: true })}
                      />
                      {errors.responsavel && <span>Campo obrigatório</span>}

                      <Styled.Label>telefone</Styled.Label>
                      <Styled.Input
                        placeholder='Telefone'
                        {...register('telefone', { required: true })}
                      />
                      {errors.telefone && <span>Campo obrigatório</span>}

                      <Styled.Label>E-mail</Styled.Label>
                      <Styled.Input
                        type='email'
                        placeholder='E-mail'
                        {...register('email', { required: true })}
                      />
                      {errors.email && <span>Campo obrigatório</span>}

                      <Styled.Label>Endereço</Styled.Label>
                      <Styled.Input
                        placeholder='Endereço completo'
                        {...register('localizacao', { required: true })}
                      />
                      {errors.localizacao && <span>Campo obrigatório</span>}
                      <ScrollableContainer>
                        <DiagnosticoContent>
                          {diagnosticoItems?.map((diagnosticoItem) => (
                            <DiagnosticoItemArea >
                              <h3>{diagnosticoItem.label}</h3>
                              <DiagnosticoItem >
                                <InputSearch items={diagnosticoItem.list} onSelect={diagnosticoItem.onSelect} />
                                {
                                  diagnosticoItem.items.map((item) =>
                                  (
                                    <DignosticoItemSelectedArea>
                                      <p>{item.nome}</p>
                                      <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, item._id)} style={{ height: '1em', width: '1em' }} />
                                    </DignosticoItemSelectedArea>
                                  )
                                  )
                                }
                              </DiagnosticoItem>
                            </DiagnosticoItemArea>
                          ))
                          }
                        </DiagnosticoContent>
                      </ScrollableContainer>
                      <Styled.Button type="submit">Salvar</Styled.Button>
                    </Styled.Form>

                  </Styled.FormArea>
                )
              }
              if (section.component === 'search') {
                return (<Styled.FormArea>
                  <Styled.Form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                    <Styled.Input
                      hidden
                      {...register('id')}
                    />
                    <Styled.Label>Empresa</Styled.Label>
                    <Styled.Input
                      placeholder='Nome da empresa'
                      {...register('empresa', { required: false })}
                    />
                    {errors.empresa && <span>Campo obrigatório</span>}

                    <Styled.Label>Data</Styled.Label>
                    <Styled.Input
                      type='date'
                      {...register('data', { required: false })}
                    />
                    {errors.data && <span>Campo obrigatório</span>}

                    <Styled.Button type="submit">Pesquisar</Styled.Button>
                  </Styled.Form>

                </Styled.FormArea>)
              }
              if (section.component === 'listagem') {
                return (<Styled.ListArea>

                  <Styled.ListHeader>
                    {
                      Object.keys(formEmpty).map((key, index) => {
                        if (key !== '_id' && key !== '__v')
                          return <Styled.Coluna label={key} />
                      })
                    }
                    <Styled.Coluna label='' />
                  </Styled.ListHeader>
                  <Styled.List>

                    {/*{disListState?.length > 0 && disListState?.map((dis, index) => (
                      <>
                        <Styled.ListItem key={dis._id} onClick={(event) => handleSelect(event, index)}>
                          {Object.keys(dis).map((field, index) => {
                            if (field !== '_id' && field !== '__v') {
                              if (typeof (dis[field]) === 'boolean') {
                                return (<>
                                  {dis[field] ? <Styled.Ativo /> : <Styled.Inativo />}
                                </>)
                              } else {
                                return (<Styled.CampoValor>{dis[field]}</Styled.CampoValor>)
                              }
                            }
            
            
                          })
                          }
            
                          <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', flex: 1 }} >
                            <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, dis._id)} style={{ height: '1em', width: '1em' }} />
                          </div>
            
                        </Styled.ListItem>
                      </>
                        ))}*/}
                  </Styled.List>
                </Styled.ListArea>)
              }
            })}

        </>
      ))}



    </Styled.Container>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.dis.loading,
    disList: state.dis.disList,
    error: state.dis.error,
    page: state.dis.page,

    areas: state.area.areas,
    causas: state.causa.causas,
    funcoes: state.funcao.funcoes,
    medidas: state.medida.medidas,
    nivelriscos: state.nivelrisco.nivelriscos,
    probabilidades: state.probabilidade.probabilidades,
    processos: state.processo.processos,
    propostas: state.proposta.propostas,
    recursos: state.recurso.recursos,
    riscos: state.risco.riscos,
    setores: state.setor.setores,
    severidades: state.severidade.severidades,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listarDis: (page, ativo) => dispatch(listarDisRequest(page, ativo)),
    criarDis: (dis) => dispatch(criarDisRequest(dis)),
    updateDis: (id, dis) => dispatch(updateDisRequest(id, dis)),
    deleteDis: (id) => dispatch(deleteDisRequest(id)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm)),
    listarAreas: (page, ativo) => dispatch(listarAreasRequest(page, ativo)),
    criarAreas: (area) => dispatch(criarAreasRequest(area)),
    listarCausas: (page, ativo) => dispatch(listarCausasRequest(page, ativo)),
    criarCausas: (causa) => dispatch(criarCausasRequest(causa)),
    listarFuncoes: (page, ativo) => dispatch(listarFuncoesRequest(page, ativo)),
    criarFuncoes: (funcao) => dispatch(criarFuncoesRequest(funcao)),
    listarMedidas: (page, ativo) => dispatch(listarMedidasRequest(page, ativo)),
    criarMedidas: (medida) => dispatch(criarMedidasRequest(medida)),
    listarNivelriscos: (page, ativo) => dispatch(listarNivelriscosRequest(page, ativo)),
    criarNivelriscos: (nivelrisco) => dispatch(criarNivelriscosRequest(nivelrisco)),
    listarProbabilidades: (page, ativo) => dispatch(listarProbabilidadesRequest(page, ativo)),
    criarProbabilidades: (probabilidade) => dispatch(criarProbabilidadesRequest(probabilidade)),
    listarProcessos: (page, ativo) => dispatch(listarProcessosRequest(page, ativo)),
    criarProcessos: (processo) => dispatch(criarProcessosRequest(processo)),
    listarPropostas: (page, ativo) => dispatch(listarPropostasRequest(page, ativo)),
    criarPropostas: (proposta) => dispatch(criarPropostasRequest(proposta)),
    listarRecursos: (page, ativo) => dispatch(listarRecursosRequest(page, ativo)),
    criarRecursos: (risco) => dispatch(criarRecursosRequest(risco)),
    listarRiscos: (page, ativo) => dispatch(listarRiscosRequest(page, ativo)),
    criarRiscos: (risco) => dispatch(criarRiscosRequest(risco)),
    listarSetores: (page, ativo) => dispatch(listarSetoresRequest(page, ativo)),
    criarSetores: (setor) => dispatch(criarSetoresRequest(setor)),
    listarSeveridades: (page, ativo) => dispatch(listarSeveridadesRequest(page, ativo)),
    criarSeveridades: (severidade) => dispatch(criarSeveridadesRequest(severidade)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dis);