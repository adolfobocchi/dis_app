import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

import ModalLoading from '../ModalLoading';

import { addAtividade, addCausa, addFuncao, addMedida, addNivel, addProbabilidade, addProcesso, addProposta, addRecurso, addRisco, addSetor, addSeveridade, criarDisRequest, deleteDisRequest, listarDisRequest, removeAtividade, removeCausa, removeFuncao, removeMedida, removeNivel, removeProbabilidade, removeProcesso, removeProposta, removeRecurso, removeRisco, removeSetor, removeSeveridade, setDis, updateDisRequest } from '../../store/modules/Dis/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';

import { MdEdit, MdEditNote, MdHighlightOff, MdKeyboardArrowDown, MdKeyboardArrowUp, MdSearch, MdViewList } from 'react-icons/md';

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
import { criarAtividadesRequest, listarAtividadesRequest } from '../../store/modules/Atividade/actions';
import ModalInfo from '../ModalInfo';

//riscos,probabilidade e severidade = marcar/selecionar/ticar

const SectionArea = styled.div`
  background: #EBF0F7;
  display: flex;
  height: 40px;
  font-size: 1.3em;
  font-weight: 400;
  align-items: center;
  margin-bottom: 12px;
  margin-top: 12px;
  padding: 6px;
`;
const ScrollableContainer = styled.div`
  width: calc(100vw - 247px);
        overflow-x: auto;
        overflow-y: hidden;
  margin-bottom: 10px;
  margin-top: 10px;
`;
const DiagnosticoContent = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;
const DiagnosticoItem = styled.div`
  display: flex;
  width: 300px;
  border: 1px solid #666666;
  margin: 8px;
  flex-direction: column;
  padding: 6px;
  min-height: 280px;

`;
const DiagnosticoItemArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;
const DignosticoItemSelectedArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
  &:hover {
    background: #CCC;
  }
  cursor: pointer;
`;

const Dis = ({
  loading,
  disList,
  error,
  page,
  listarDis,
  criarDis,
  updateDis,
  deleteDis,
  setDis,
  confirmacao,
  listarAreas,
  listarSetores,
  listarFuncoes,
  listarProcessos,
  listarAtividades,
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
  atividades,
  recursos,
  riscos,
  causas,
  medidas,
  probabilidades,
  severidades,
  nivelriscos,
  propostas,
  addSetor,
  removeSetor,
  addFuncao,
  removeFuncao,
  addProcesso,
  removeProcesso,
  addAtividade,
  removeAtividade,
  addRecurso,
  removeRecurso,
  addRisco,
  removeRisco,
  addCausa,
  removeCausa,
  addMedida,
  removeMedida,
  addProbabilidade,
  removeProbabilidade,
  addSeveridade,
  removeSeveridade,
  addNivel,
  removeNivel,
  addProposta,
  removeProposta,
  setoresDis,
}) => {

  const API_URL = process.env.REACT_APP_URL_API;

  const formEmpty = {
    _id: '',
    empresa: '',
    data: '',
    fachada: '',
    responsavel: '',
    telefone: '',
    email: '',
    localizacao: '',
    usuarioLogado: '',
    area: '',
    ambiente: '',
    observacao: '',
    setores: [{
      setor: '',
      funcoes: [{
        funcao: '',
        processos: [{
          processo: '',
          atividades: [{
            atividade: '',
            recursos: [{
              recursos: '',
              riscos: [{
                risco: '',
                causas: [{
                  causa: '',
                  medidas: [{
                    medida: '',
                    probabilidades: [{
                      probabilidade: '',
                      severidades: [{
                        severidade: '',
                        niveisRisco: [{
                          nivelRisco: '',
                          propostas: [{
                            proposta: ''
                          }]
                        }]
                      }]
                    }]
                  }]
                }]
              }]
            }]
          }]
        }]
      }]
    }]
  }

  const listFields = {
    empresa: 'texto',
    data: 'data',
    fachada: 'imagem',
    responsavel: 'texto',
    telefone: 'telefone',
    area: 'json',
    opções: ''
  }

  const [showModalInfoState, setShowModalInfoState] = useState(false);

  const [disListState, setDisListState] = useState([]);

  const [areasState, setAreasState] = useState([]);
  const [setoresState, setSetoresState] = useState([]);
  const [funcoesState, setFuncoesState] = useState([]);
  const [processosState, setProcessosState] = useState([]);
  const [atividadesState, setAtividadesState] = useState([]);
  const [recursosState, setRecursosState] = useState([]);
  const [riscosState, setRiscosState] = useState([]);
  const [causasState, setCausasState] = useState([]);
  const [medidasState, setMedidasState] = useState([]);
  const [probabilidadesState, setProbabilidadesState] = useState([]);
  const [severidadesState, setSeveridadesState] = useState([]);
  const [niveisRiscoState, setNiveisRiscoState] = useState([]);
  const [propostasState, setPropostasState] = useState([]);

  const [areaSelected, setAreaSelected] = useState({});
  const [setorSelected, setSetorSelected] = useState({});
  const [funcaoSelected, setFuncaoSelected] = useState({});
  const [processoSelected, setProcessoSelected] = useState({});
  const [atividadeSelected, setAtividadeSelected] = useState({});
  const [recursoSelected, setRecursoSelected] = useState({});
  const [riscoSelected, setRiscoSelected] = useState({});
  const [causaSelected, setCausaSelected] = useState({});
  const [medidaSelected, setMedidaSelected] = useState({});
  const [probabilidadeSelected, setProbabilidadeSelected] = useState({});
  const [severidadeSelected, setSeveridadeSelected] = useState({});
  const [nivelSelected, setNivelSelected] = useState({});
  const [propostaSelected, setPropostaSelected] = useState({});

  const [setorSelectedIndex, setSetorSelectedIndex] = useState(-1);
  const [funcaoSelectedIndex, setFuncaoSelectedIndex] = useState(-1);
  const [processoSelectedIndex, setProcessoSelectedIndex] = useState(-1);
  const [atividadeSelectedIndex, setAtividadeSelectedIndex] = useState(-1);
  const [recursoSelectedIndex, setRecursoSelectedIndex] = useState(-1);
  const [riscoSelectedIndex, setRiscoSelectedIndex] = useState(-1);
  const [causaSelectedIndex, setCausaSelectedIndex] = useState(-1);
  const [medidaSelectedIndex, setMedidaSelectedIndex] = useState(-1);
  const [probabilidadeSelectedIndex, setProbabilidadeSelectedIndex] = useState(-1);
  const [severidadeSelectedIndex, setSeveridadeSelectedIndex] = useState(-1);
  const [nivelSelectedIndex, setNivelSelectedIndex] = useState(-1);
  const [propostaSelectedIndex, setPropostaSelectedIndex] = useState(-1);

  const [disSelected, setDisSelected] = useState(formEmpty);
  const { register, control, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: disSelected
      ? {
        _id: disSelected._id,
        empresa: disSelected.empresa,
        data: disSelected.data,
        fachada: disSelected.fachada,
        responsavel: disSelected.responsavel,
        telefone: disSelected.telefone,
        email: disSelected.email,
        localizacao: disSelected.localizacao,
        usuarioLogado: disSelected.usuarioLogado,
        area: disSelected.area,
        ambiente: disSelected.ambiente,
        observacao: disSelected.observacao,
        setorizacao: disSelected.setorizacao,
      } :
      {}
  });

  const [sectionItems, setSectionItems] = useState([
    { id: 1, label: 'Cadastro', expanded: false, sections: [{ id: 1, label: 'Cadastro', expanded: false, component: 'formulario' },], icon: <MdEdit /> },
    { id: 2, label: 'Pesquisa', expanded: true, sections: [{ id: 1, label: 'Pesquisa', expanded: false, component: 'search' },], icon: <MdSearch /> },
    { id: 3, label: 'Listagem', expanded: true, sections: [{ id: 1, label: 'Listagem', expanded: false, component: 'listagem' },], icon: <MdViewList /> },
  ])

  const [diagnosticoItems, setDiagnotiscoItems] = useState([
    {
      id: 1,
      label: 'Setores',
      list: setoresState,
      items: [],
    },
    {
      id: 2,
      label: 'Funções',
      list: funcoesState,
      items: [],
    },
    {
      id: 3,
      label: 'Processos',
      list: processosState,
      items: [],
    },
    {
      id: 4,
      label: 'Atividades',
      list: atividadesState,
      items: [],
    },
    {
      id: 5,
      label: 'Recursos',
      list: recursosState,
      items: [],
    },
    {
      id: 6,
      label: 'Riscos',
      list: riscosState,
      items: [],
    },
    {
      id: 7,
      label: 'Causas',
      list: causasState,
      items: [],
    },
    {
      id: 8,
      label: 'Medidas',
      list: medidasState,
      items: [],
    },
    {
      id: 9,
      label: 'Probabilidades',
      list: probabilidadesState,
      items: [],
    },
    {
      id: 10,
      label: 'Severidades',
      list: severidadesState,
      items: [],
    },
    {
      id: 11,
      label: 'Niveis',
      list: niveisRiscoState,
      items: [],
    },
    {
      id: 12,
      label: 'Propostas',
      list: propostasState,
      items: [],
    }

  ])

  useEffect(() => {
    listarDis(page, 1);
    listarAreas(page, 1);
    listarSetores(page, 1);
    listarFuncoes(page, 1);
    listarProcessos(page, 1);
    listarAtividades(page, 1);
    listarRecursos(page, 1);
    listarRiscos(page, 1);
    listarCausas(page, 1);
    listarMedidas(page, 1);
    listarProbabilidades(page, 1);
    listarSeveridades(page, 1);
    listarNivelriscos(page, 1);
    listarPropostas(page, 1);
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
    setAtividadesState(atividades);
  }, [atividades]);

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
    setProbabilidadesState(probabilidades);
  }, [probabilidades]);

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
      {
        id: 1,
        label: 'Setores',
        list: setoresState,
        items: setoresDis.map(setor => setor.setor),
        onSelect: (item) => addSetor({ setor: item }),
        onSelected: (event, index) => { setSetorSelected(setoresDis[index].setor); setSetorSelectedIndex(index) },
        onDelete: (event, id) => { removeSetor(id) },
        selectedIndex: setorSelectedIndex
      },
      {
        id: 2,
        label: 'Funções',
        list: funcoesState,
        items: setorSelectedIndex >= 0 ? setoresDis[setorSelectedIndex]?.funcoes.map(funcao => funcao?.funcao) : setoresDis.flatMap(setor => setor?.funcoes).map(funcao => funcao?.funcao) || [],
        onSelect: (item) => addFuncao(setorSelectedIndex, { funcao: item }),
        onSelected: (event, index) => { setFuncaoSelected(setoresDis[setorSelectedIndex].funcoes[index]); setFuncaoSelectedIndex(index) },
        onDelete: (event, id) => { removeFuncao(setorSelectedIndex, id) },
        selectedIndex: funcaoSelectedIndex
      },
      {
        id: 3,
        label: 'Processos',
        list: processosState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 ? setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.processos.map(processo => processo?.processo) : setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.processos).map(processo => processo?.processo) || [],
        onSelect: (item) => addProcesso(setorSelectedIndex, funcaoSelectedIndex, { processo: item }),
        onSelected: (event, index) => { setProcessoSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].processos[index]); setProcessoSelectedIndex(index) },
        onDelete: (event, id) => removeProcesso(setorSelectedIndex, funcaoSelectedIndex, id),
        selectedIndex: processoSelectedIndex
      },
      {
        id: 4,
        label: 'Atividades',
        list: atividadesState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 && processoSelectedIndex >= 0 ? setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.processos[processoSelectedIndex]?.atividades.map(atividade => atividade?.atividade) : setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.processos).flatMap(processo => processo?.atividades).map(atividade => atividade?.atividade) || [],
        onSelect: (item) => addAtividade(setorSelectedIndex, funcaoSelectedIndex, processoSelectedIndex, { atividade: item }),
        onSelected: (event, index) => { setAtividadeSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].processos[processoSelectedIndex].atividades[index]); setAtividadeSelectedIndex(index) },
        onDelete: (event, id) => removeAtividade(setorSelectedIndex, funcaoSelectedIndex, processoSelectedIndex, id),
        selectedIndex: atividadeSelectedIndex
      },
      {
        id: 5,
        label: 'Maquinas/Equipamentos',
        list: recursosState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 && processoSelectedIndex >= 0 && atividadeSelectedIndex >= 0 ? setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.processos[processoSelectedIndex]?.atividades[atividadeSelectedIndex]?.recursos.map(recurso => recurso?.recurso) : setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.processos).flatMap(processo => processo?.atividades).flatMap(atividade => atividade?.recursos).map(recurso => recurso?.recurso) || [],
        onSelect: (item) => addRecurso(setorSelectedIndex, funcaoSelectedIndex, processoSelectedIndex, atividadeSelectedIndex, { recurso: item }),
        onSelected: (event, index) => { setRecursoSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].processos[processoSelectedIndex].atividades[atividadeSelectedIndex].recursos[index]); setRecursoSelectedIndex(index) },
        onDelete: (event, id) => removeRecurso(setorSelectedIndex, funcaoSelectedIndex, processoSelectedIndex, atividadeSelectedIndex, id),
        selectedIndex: recursoSelectedIndex
      },
      {
        id: 6,
        label: 'Riscos',
        list: riscosState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 && processoSelectedIndex >= 0 && atividadeSelectedIndex >= 0 && recursoSelectedIndex >= 0 ? setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.processos[processoSelectedIndex]?.atividades[atividadeSelectedIndex]?.recursos[recursoSelectedIndex]?.riscos.map(risco => risco?.risco) : setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.processos).flatMap(processo => processo?.atividades).flatMap(atividade => atividade?.recursos).flatMap(recurso => recurso?.riscos).map(risco => risco?.risco) || [],
        onSelect: (item) => addRisco(setorSelectedIndex, funcaoSelectedIndex, processoSelectedIndex, atividadeSelectedIndex, recursoSelectedIndex, { risco: item }),
        onSelected: (event, index) => { setRiscoSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].processos[processoSelectedIndex].atividades[atividadeSelectedIndex].recursos[recursoSelectedIndex].riscos[index]); setRiscoSelectedIndex(index) },
        onDelete: (event, id) => removeRisco(setorSelectedIndex, funcaoSelectedIndex, processoSelectedIndex, atividadeSelectedIndex, recursoSelectedIndex, id),
        selectedIndex: riscoSelectedIndex
      },
      {
        id: 7,
        label: 'Causas',
        list: causasState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 && processoSelectedIndex >= 0 && atividadeSelectedIndex >= 0 && recursoSelectedIndex >= 0 && riscoSelectedIndex >= 0 ? setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.processos[processoSelectedIndex]?.atividades[atividadeSelectedIndex]?.recursos[recursoSelectedIndex]?.riscos[riscoSelectedIndex]?.causas.map(causa => causa?.causa) : setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.processos).flatMap(processo => processo?.atividades).flatMap(atividade => atividade?.recursos).flatMap(recurso => recurso?.riscos).flatMap(risco => risco?.causas).map(causa => causa?.causa) || [],
        onSelect: (item) => addCausa(setorSelectedIndex, funcaoSelectedIndex, processoSelectedIndex, atividadeSelectedIndex, recursoSelectedIndex, riscoSelectedIndex, { causa: item }),
        onSelected: (event, index) => { setCausaSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].processos[processoSelectedIndex].atividades[atividadeSelectedIndex].recursos[recursoSelectedIndex].riscos[riscoSelectedIndex].causas[index]); setCausaSelectedIndex(index) },
        onDelete: (event, id) => removeCausa(setorSelectedIndex, funcaoSelectedIndex, processoSelectedIndex, atividadeSelectedIndex, recursoSelectedIndex, riscoSelectedIndex, id),
        selectedIndex: causaSelectedIndex
      },
      {
        id: 8,
        label: 'Medidas',
        list: medidasState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 && processoSelectedIndex >= 0 && atividadeSelectedIndex >= 0 && recursoSelectedIndex >= 0 && riscoSelectedIndex >= 0 && causaSelectedIndex >= 0 ? setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.processos[processoSelectedIndex]?.atividades[atividadeSelectedIndex]?.recursos[recursoSelectedIndex]?.riscos[riscoSelectedIndex]?.causas[causaSelectedIndex]?.medidas.map(medida => medida?.medida) : setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.processos).flatMap(processo => processo?.atividades).flatMap(atividade => atividade?.recursos).flatMap(recurso => recurso?.riscos).flatMap(risco => risco?.causas).flatMap(causa => causa?.medidas).map(medida => medida?.medida) || [],
        onSelect: (item) => addMedida(setorSelectedIndex, funcaoSelectedIndex, processoSelectedIndex, atividadeSelectedIndex, recursoSelectedIndex, riscoSelectedIndex, causaSelectedIndex, { medida: item }),
        onSelected: (event, index) => { setMedidaSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].processos[processoSelectedIndex].atividades[atividadeSelectedIndex].recursos[recursoSelectedIndex].riscos[riscoSelectedIndex].causas[causaSelectedIndex].medidas[index]); setMedidaSelectedIndex(index) },
        onDelete: (event, id) => removeMedida(setorSelectedIndex, funcaoSelectedIndex, processoSelectedIndex, atividadeSelectedIndex, recursoSelectedIndex, riscoSelectedIndex, causaSelectedIndex, id),
        selectedIndex: medidaSelectedIndex
      },
      {
        id: 9,
        label: 'Probabilidades',
        list: probabilidadesState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 && processoSelectedIndex >= 0 && atividadeSelectedIndex >= 0 && recursoSelectedIndex >= 0 && riscoSelectedIndex >= 0 && causaSelectedIndex >= 0 ? setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.processos[processoSelectedIndex]?.atividades[atividadeSelectedIndex]?.recursos[recursoSelectedIndex]?.riscos[riscoSelectedIndex]?.causas[causaSelectedIndex]?.medidas[medidaSelectedIndex]?.probabilidades.map(probabilidade => probabilidade?.probabilidade) : setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.processos).flatMap(processo => processo?.atividades).flatMap(atividade => atividade?.recursos).flatMap(recurso => recurso?.riscos).flatMap(risco => risco?.causas).flatMap(causa => causa?.medidas).flatMap(medida => medida?.probabilidades).map(probabilidade => probabilidade?.probabilidade) || [],
        onSelect: (item) => addProbabilidade(setorSelectedIndex, funcaoSelectedIndex, processoSelectedIndex, atividadeSelectedIndex, recursoSelectedIndex, riscoSelectedIndex, causaSelectedIndex, medidaSelectedIndex, { probabilidade: item }),
        onSelected: (event, index) => { setProbabilidadeSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].processos[processoSelectedIndex].atividades[atividadeSelectedIndex].recursos[recursoSelectedIndex].riscos[riscoSelectedIndex].causas[causaSelectedIndex].medidas[medidaSelectedIndex].probabilidades[index]); setProbabilidadeSelectedIndex(index) },
        onDelete: (event, id) => removeProbabilidade(setorSelectedIndex, funcaoSelectedIndex, processoSelectedIndex, atividadeSelectedIndex, recursoSelectedIndex, riscoSelectedIndex, causaSelectedIndex, medidaSelectedIndex, id),
        selectedIndex: probabilidadeSelectedIndex
      },
      {
        id: 10,
        label: 'Severidades',
        list: severidadesState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 && processoSelectedIndex >= 0 && atividadeSelectedIndex >= 0 && recursoSelectedIndex >= 0 && riscoSelectedIndex >= 0 && causaSelectedIndex >= 0 && probabilidadeSelectedIndex >= 0 ? setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.processos[processoSelectedIndex]?.atividades[atividadeSelectedIndex]?.recursos[recursoSelectedIndex]?.riscos[riscoSelectedIndex]?.causas[causaSelectedIndex]?.medidas[medidaSelectedIndex]?.probabilidades[probabilidadeSelectedIndex]?.severidades.map(severidade => severidade?.severidade) : setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.processos).flatMap(processo => processo?.atividades).flatMap(atividade => atividade?.recursos).flatMap(recurso => recurso?.riscos).flatMap(risco => risco?.causas).flatMap(causa => causa?.medidas).flatMap(medida => medida?.probabilidades).flatMap(probabilidade => probabilidade?.severidades).map(severidade => severidade?.severidade) || [],
        onSelect: (item) => addSeveridade(setorSelectedIndex, funcaoSelectedIndex, processoSelectedIndex, atividadeSelectedIndex, recursoSelectedIndex, riscoSelectedIndex, causaSelectedIndex, medidaSelectedIndex, probabilidadeSelectedIndex, { severidade: item }),
        onSelected: (event, index) => { setSeveridadeSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].processos[processoSelectedIndex].atividades[atividadeSelectedIndex].recursos[recursoSelectedIndex].riscos[riscoSelectedIndex].causas[causaSelectedIndex].medidas[medidaSelectedIndex].probabilidades[probabilidadeSelectedIndex].severidades[index]); setSeveridadeSelectedIndex(index) },
        onDelete: (event, id) => removeSeveridade(setorSelectedIndex, funcaoSelectedIndex, processoSelectedIndex, atividadeSelectedIndex, recursoSelectedIndex, riscoSelectedIndex, causaSelectedIndex, medidaSelectedIndex, probabilidadeSelectedIndex, id),
        selectedIndex: severidadeSelectedIndex
      },
      {
        id: 11,
        label: 'Niveis de Risco',
        list: niveisRiscoState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 && processoSelectedIndex >= 0 && atividadeSelectedIndex >= 0 && recursoSelectedIndex >= 0 && riscoSelectedIndex >= 0 && causaSelectedIndex >= 0 && probabilidadeSelectedIndex >= 0 && severidadeSelectedIndex >= 0 ? setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.processos[processoSelectedIndex]?.atividades[atividadeSelectedIndex]?.recursos[recursoSelectedIndex]?.riscos[riscoSelectedIndex]?.causas[causaSelectedIndex]?.medidas[medidaSelectedIndex]?.probabilidades[probabilidadeSelectedIndex]?.severidades[severidadeSelectedIndex]?.niveisRisco.map(nivelRisco => nivelRisco?.nivelRisco) : setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.processos).flatMap(processo => processo?.atividades).flatMap(atividade => atividade?.recursos).flatMap(recurso => recurso?.riscos).flatMap(risco => risco?.causas).flatMap(causa => causa?.medidas).flatMap(medida => medida?.probabilidades).flatMap(probabilidade => probabilidade?.severidades).flatMap(severidade => severidade?.niveisRisco).map(nivelRisco => nivelRisco?.nivelRisco) || [],
        onSelect: (item) => addNivel(setorSelectedIndex, funcaoSelectedIndex, processoSelectedIndex, atividadeSelectedIndex, recursoSelectedIndex, riscoSelectedIndex, causaSelectedIndex, medidaSelectedIndex, probabilidadeSelectedIndex, severidadeSelectedIndex, { nivelRisco: item }),
        onSelected: (event, index) => { setNivelSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].processos[processoSelectedIndex].atividades[atividadeSelectedIndex].recursos[recursoSelectedIndex].riscos[riscoSelectedIndex].causas[causaSelectedIndex].medidas[medidaSelectedIndex].probabilidades[probabilidadeSelectedIndex].severidades[severidadeSelectedIndex].niveisRisco[index]); setNivelSelectedIndex(index) },
        onDelete: (event, id) => removeNivel(setorSelectedIndex, funcaoSelectedIndex, processoSelectedIndex, atividadeSelectedIndex, recursoSelectedIndex, riscoSelectedIndex, causaSelectedIndex, medidaSelectedIndex, probabilidadeSelectedIndex, severidadeSelectedIndex, id),
        selectedIndex: nivelSelectedIndex
      },
      {
        id: 12,
        label: 'Propostas',
        list: propostasState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 && processoSelectedIndex >= 0 && atividadeSelectedIndex >= 0 && recursoSelectedIndex >= 0 && riscoSelectedIndex >= 0 && causaSelectedIndex >= 0 && probabilidadeSelectedIndex >= 0 && severidadeSelectedIndex >= 0 && nivelSelectedIndex >= 0 ? setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.processos[processoSelectedIndex]?.atividades[atividadeSelectedIndex]?.recursos[recursoSelectedIndex]?.riscos[riscoSelectedIndex]?.causas[causaSelectedIndex]?.medidas[medidaSelectedIndex]?.probabilidades[probabilidadeSelectedIndex]?.severidades[severidadeSelectedIndex]?.niveisRisco[nivelSelectedIndex]?.propostas.map(proposta => proposta?.proposta) : setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.processos).flatMap(processo => processo?.atividades).flatMap(atividade => atividade?.recursos).flatMap(recurso => recurso?.riscos).flatMap(risco => risco?.causas).flatMap(causa => causa?.medidas).flatMap(medida => medida?.probabilidades).flatMap(probabilidade => probabilidade?.severidades).flatMap(severidade => severidade?.niveisRisco).flatMap(nivelRisco => nivelRisco?.propostas).map(proposta => proposta?.proposta) || [],
        onSelect: (item) => addProposta(setorSelectedIndex, funcaoSelectedIndex, processoSelectedIndex, atividadeSelectedIndex, recursoSelectedIndex, riscoSelectedIndex, causaSelectedIndex, medidaSelectedIndex, probabilidadeSelectedIndex, severidadeSelectedIndex, nivelSelectedIndex, { proposta: item }),
        onSelected: (event, index) => { setPropostaSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].processos[processoSelectedIndex].atividades[atividadeSelectedIndex].recursos[recursoSelectedIndex].riscos[riscoSelectedIndex].causas[causaSelectedIndex].medidas[medidaSelectedIndex].probabilidades[probabilidadeSelectedIndex].severidades[severidadeSelectedIndex].niveisRisco[nivelSelectedIndex].propostas[index]); setPropostaSelectedIndex(index) },
        onDelete: (event, id) => removeProposta(setorSelectedIndex, funcaoSelectedIndex, processoSelectedIndex, atividadeSelectedIndex, recursoSelectedIndex, riscoSelectedIndex, causaSelectedIndex, medidaSelectedIndex, probabilidadeSelectedIndex, severidadeSelectedIndex, nivelSelectedIndex, id),
        selectedIndex: propostaSelectedIndex
      }
    ]);
  },
    [addAtividade, addCausa, addFuncao, addMedida, addNivel, addProbabilidade, addProcesso, addProposta, addRecurso, addRisco, addSetor, addSeveridade, atividadeSelected, atividadeSelectedIndex, atividadesState, causaSelected, causaSelectedIndex, causasState, disSelected.area, funcaoSelected, funcaoSelectedIndex, funcoesState, medidaSelected, medidaSelectedIndex, medidasState, niveisRiscoState, nivelSelected, nivelSelectedIndex, probabilidadeSelected, probabilidadeSelectedIndex, probabilidadesState, processoSelected, processoSelectedIndex, processosState, propostaSelectedIndex, propostasState, recursoSelected, recursoSelectedIndex, recursosState, removeAtividade, removeCausa, removeFuncao, removeMedida, removeNivel, removeProbabilidade, removeProcesso, removeProposta, removeRecurso, removeRisco, removeSetor, removeSeveridade, riscoSelected, riscoSelectedIndex, riscosState, setorSelected, setorSelectedIndex, setoresDis, setoresState, severidadeSelected, severidadeSelectedIndex, severidadesState]);

  useEffect(() => {
    reset({ ...disSelected });
  }, [reset, disSelected])

  const handleSelect = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setDis(index);
    setDisSelected(disList[index]);
    setAreaSelected(disList[index].area);

  }

  const handleDelete = (event, id) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR A DIS?', () => { deleteDis(id) });
  }

  const handleClear = () => {
    setDisSelected({ ...formEmpty });
    setAreaSelected(null);
    setSetorSelected(null);
  }

  const handleShowDis = (event,index) => {
    event.preventDefault();
    event.stopPropagation();
    handleSelect(event,index)
    setShowModalInfoState(true);
  }

  const onSubmit = (data) => {
    data.setores = setoresDis;
    data.area = areaSelected;
    const formData = new FormData();
    formData.append("imagens", data.files[0]);
    formData.append('dis', JSON.stringify(data));
    if (data._id) {
      updateDis(data._id, formData);
    } else {
      criarDis(formData);
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

  if (loading || !areasState || !setoresState) {
    return <ModalLoading />
  }

  if(showModalInfoState) {
    return <ModalInfo dados={disSelected} close={setShowModalInfoState} />
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
                        {...register('_id')}
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
                        {...register('email', { required: false })}
                      />
                      {errors.email && <span>Campo obrigatório</span>}

                      <Styled.Label>Endereço</Styled.Label>
                      <Styled.Input
                        placeholder='Endereço completo'
                        {...register('localizacao', { required: true })}
                      />
                      {errors.localizacao && <span>Campo obrigatório</span>}

                      <Styled.Label>Ramo de atividade</Styled.Label>
                      <InputSearch items={areasState} onSelect={(item) => setAreaSelected(item)} valueSelected={areaSelected?.nome} />
                      {errors.area && <span>Campo obrigatório</span>}

                      <Styled.Label>Caracterização do ambiente</Styled.Label>
                      <Styled.Input
                        placeholder=''
                        {...register('ambiente', { required: true })}
                      />
                      {errors.ambiente && <span>Campo obrigatório</span>}

                      <Styled.Label>Observação</Styled.Label>
                      <Styled.Input
                        placeholder=''
                        {...register('observacao', { required: false })}
                      />
                      {errors.observacao && <span>Campo obrigatório</span>}

                      <ScrollableContainer>
                        <DiagnosticoContent>
                          {diagnosticoItems?.map((diagnosticoItem, index) => (
                            <DiagnosticoItemArea key={diagnosticoItem.id} >
                              <h3>{diagnosticoItem.label}</h3>
                              <DiagnosticoItem>
                                <InputSearch items={diagnosticoItem.list} onSelect={diagnosticoItem.onSelect} />
                                {

                                  diagnosticoItem.items && diagnosticoItem.items.map((item, index) =>
                                  (

                                    <DignosticoItemSelectedArea key={index} onClick={(event) => diagnosticoItem.onSelected(event, index)} style={{ background: index === diagnosticoItem.selectedIndex ? '#CCC' : '#FFF' }}   >
                                      <p>{item.nome}</p>
                                      <MdHighlightOff color='#F00' onClick={(event) => diagnosticoItem.onDelete(event, item._id)} style={{ height: '1em', width: '1em' }} />
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
                  {/*<Styled.Form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                    <Styled.Input
                      hidden
                      {...register('id')}
                    />
                    <Styled.Label>Empresa</Styled.Label>
                    <Styled.Input
                      placeholder='Nome da empresa'
                      {...register('empresaSearch', { required: false })}
                    />
                    {errors.empresa && <span>Campo obrigatório</span>}

                    <Styled.Label>Data</Styled.Label>
                    <Styled.Input
                      type='date'
                      {...register('dataSearch', { required: false })}
                    />
                    {errors.data && <span>Campo obrigatório</span>}

                    <Styled.Button type="submit">Pesquisar</Styled.Button>
                </Styled.Form>*/}
                </Styled.FormArea>)
              }
              if (section.component === 'listagem') {
                return (<Styled.ListArea>
                  <Styled.ListHeader>
                    {
                      Object.keys(listFields).map((key, index) => {
                        return <Styled.Coluna label={key} key={index} />
                      })
                    }
                    <Styled.Coluna label='' />
                  </Styled.ListHeader>
                  <Styled.List>
                    {disListState?.length > 0 && disListState?.map((dis, index) => (
                      <>
                        <Styled.ListItem key={dis._id} onClick={(event)=> handleShowDis(event, index)}>
                          {
                            Object.keys(dis).map((field, index) => {
                              if (field !== '_id' && listFields.hasOwnProperty(field)) {
                                if (listFields[field] === 'imagem')
                                  return (<Styled.CampoImg src={`${API_URL}/images/${dis[field]}`} />);
                                if (listFields[field] === 'json')
                                  return (<Styled.CampoValor>{dis[field].nome}</Styled.CampoValor>)
                                return (<Styled.CampoValor>{dis[field]}</Styled.CampoValor>)

                              }
                            })
                          }

                          <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', flex: 1 }} >
                            <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, dis._id)} style={{ height: '1.4em', width: '1.4em' }} />
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', flex: 1 }} >
                            <MdEditNote color='#005' onClick={(event) => {toggleSectionExpand(1, event); handleSelect(event, index)}} style={{ height: '1.4em', width: '1.4em' }} />
                          </div>

                        </Styled.ListItem>
                      </>
                    ))}
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
    setoresDis: state.dis.setores,
    areas: state.area.areas,
    causas: state.causa.causas,
    funcoes: state.funcao.funcoes,
    medidas: state.medida.medidas,
    nivelriscos: state.nivelrisco.nivelriscos,
    probabilidades: state.probabilidade.probabilidades,
    processos: state.processo.processos,
    atividades: state.atividade.atividades,
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
    setDis: (index) => dispatch(setDis(index)),
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

    listarAtividades: (page, ativo) => dispatch(listarAtividadesRequest(page, ativo)),
    criarAtividades: (atividades) => dispatch(criarAtividadesRequest(atividades)),

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

    addSetor: (setor) => dispatch(addSetor(setor)),
    removeSetor: (setor) => dispatch(removeSetor(setor)),

    addFuncao: (setorIndex, funcao) => dispatch(addFuncao(setorIndex, funcao)),
    removeFuncao: (setorIndex, funcao) => dispatch(removeFuncao(setorIndex, funcao)),
    
    addProcesso: (setorIndex, funcaoIndex, processo) => dispatch(addProcesso(setorIndex, funcaoIndex, processo)),
    removeProcesso: (setorIndex, funcaoIndex, processo) => dispatch(removeProcesso(setorIndex, funcaoIndex, processo)),

    addAtividade: (setorIndex, funcaoIndex, processoIndex, atividade) => dispatch(addAtividade(setorIndex, funcaoIndex, processoIndex, atividade)),
    removeAtividade: (setorIndex, funcaoIndex, processoIndex, atividade) => dispatch(removeAtividade(setorIndex, funcaoIndex, processoIndex, atividade)),

    addRecurso: (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recurso) => dispatch(addRecurso(setorIndex, funcaoIndex, processoIndex, atividadeIndex, recurso)),
    removeRecurso: (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recurso) => dispatch(removeRecurso(setorIndex, funcaoIndex, processoIndex, atividadeIndex, recurso)),

    addRisco: (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, risco) => dispatch(addRisco(setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, risco)),
    removeRisco: (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, risco) => dispatch(removeRisco(setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, risco)),

    addCausa: (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causa) => dispatch(addCausa(setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causa)),
    removeCausa: (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causa) => dispatch(removeCausa(setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causa)),

    addMedida: (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medida) => dispatch(addMedida(setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medida)),
    removeMedida: (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medida) => dispatch(removeMedida(setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medida)),

    addProbabilidade: (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidade) => dispatch(addProbabilidade(setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidade)),
    removeProbabilidade: (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidade) => dispatch(removeProbabilidade(setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidade)),

    addSeveridade: (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidadeIndex, severidade) => dispatch(addSeveridade(setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidadeIndex, severidade)),
    removeSeveridade: (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidadeIndex, severidade) => dispatch(removeSeveridade(setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidadeIndex, severidade)),

    addNivel: (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidadeIndex, severidadeIndex, nivel) => dispatch(addNivel(setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidadeIndex, severidadeIndex, nivel)),
    removeNivel: (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidadeIndex, severidadeIndex, nivel) => dispatch(removeNivel(setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidadeIndex, severidadeIndex, nivel)),

    addProposta: (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidadeIndex, severidadeIndex, nivelIndex, proposta) => dispatch(addProposta(setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidadeIndex, severidadeIndex, nivelIndex, proposta)),
    removeProposta: (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidadeIndex, severidadeIndex, nivelRiscoIndex, propostaId) => dispatch(removeProposta(setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidadeIndex, severidadeIndex, nivelRiscoIndex, propostaId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dis);