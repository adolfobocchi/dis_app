import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

import ModalLoading from '../ModalLoading';

import { addAtividade, addCausa, addFuncao, addMedida, addNivel, addProbabilidade, addPerigo, addPlanoAcao, addMonitoramento, addRisco, addSetor, addSeveridade, criarDisRequest, deleteDisRequest, listarDisRequest, removeAtividade, removeCausa, removeFuncao, removeMedida, removeNivel, removeProbabilidade, removePerigo, removePlanoAcao, removeMonitoramento, removeRisco, removeSetor, removeSeveridade, setDis, updateDisRequest, addAgenteRisco, removeAgenteRiscoo, removeAgenteRisco, addViasAbsorcao, removeViasAbsorcao, addViaAbsorcao, removeViaAbsorcao, addFrequenciaExposicao, removeFrequenciaExposicao, addDuracaoExposicao, removeDuracaoExposicao, addAvaliacao, removeAvaliacao, addIntencao, removeIntencao, addPrioridade, removePrioridade, addPrazo, removePrazo, addStatus, removeStatus } from '../../store/modules/Dis/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';

import { MdEdit, MdEditNote, MdHighlightOff, MdKeyboardArrowDown, MdKeyboardArrowUp, MdList, MdSearch, MdViewList } from 'react-icons/md';

import * as Styled from '../styleds';
import styled from 'styled-components';

import InputSearch from '../InputSearch';

import { listarEmpresasRequest } from '../../store/modules/Empresa/actions';
import { listarAreasRequest } from '../../store/modules/Area/actions';

import { criarSetoresRequest, listarSetoresRequest } from '../../store/modules/Setor/actions';
import { criarFuncoesRequest, listarFuncoesRequest } from '../../store/modules/Funcao/actions';
import { criarAtividadesRequest, listarAtividadesRequest } from '../../store/modules/Atividade/actions';
import { criarPerigosRequest, listarPerigosRequest } from '../../store/modules/Perigo/actions';
import { criarRiscosRequest, listarRiscosRequest } from '../../store/modules/Risco/actions';
import { criarCausasRequest, listarCausasRequest } from '../../store/modules/Causa/actions';
import { criarMedidasRequest, listarMedidasRequest } from '../../store/modules/Medida/actions';
import { criarProbabilidadesRequest, listarProbabilidadesRequest } from '../../store/modules/Probabilidade/actions';
import { criarSeveridadesRequest, listarSeveridadesRequest } from '../../store/modules/Severidade/actions';
import { criarNivelriscosRequest, listarNivelriscosRequest } from '../../store/modules/NivelRisco/actions';
import { criarPlanosAcaoRequest, listarPlanosAcaoRequest } from '../../store/modules/PlanoAcao/actions';
import { criarMonitoramentosRequest, listarMonitoramentosRequest } from '../../store/modules/Monitoramento/actions';

import ModalInfo from '../ModalInfo';
import Paginacao from '../Paginacao';
import DataPicker from '../DataPicker';
import ModalListSelect from '../ModalListSelect';
import AgentesRisco from '../../models/AgentesRisco';
import ViasAbsorcao from '../../models/ViasAbsorcao';
import FrequenciaExposicao from '../../models/FrequenciaExposicao';
import DuracaoExposicao from '../../models/DuracaoExposicao';
import Intencao from '../../models/Intencao';
import Prioridade from '../../models/Prioridade';
import Prazo from '../../models/Prazo';
import Status from '../../models/Status';
import ModalInput from '../ModalInput';

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

const DiagnosticoSearchArea = styled.div`
  display: flex;
  height: 40px;
  align-items: center;

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
  setDis,
  confirmacao,
  listarEmpresas,
  listarAreas,
  listarSetores,
  listarFuncoes,
  listarAtividades,
  listarPerigos,
  listarRiscos,
  listarCausas,
  listarMedidas,
  listarProbabilidades,
  listarSeveridades,
  listarNivelriscos,
  listarPlanosAcao,
  listarMonitoramentos,
  empresas,
  areas,
  setores,
  funcoes,
  atividades,
  perigos,
  riscos,
  causas,
  medidas,
  probabilidades,
  severidades,
  nivelriscos,
  planosAcao,
  monitoramentos,
  addSetor,
  removeSetor,
  addFuncao,
  removeFuncao,
  addAtividade,
  removeAtividade,
  addPerigo,
  removePerigo,
  addAgenteRisco,
  removeAgenteRisco,
  addRisco,
  removeRisco,
  addViaAbsorcao,
  removeViaAbsorcao,
  addFrequenciaExposicao,
  removeFrequenciaExposicao,
  addDuracaoExposicao,
  removeDuracaoExposicao,
  addCausa,
  removeCausa,
  addMedida,
  removeMedida,
  addAvaliacao,
  removeAvaliacao,
  addProbabilidade,
  removeProbabilidade,
  addSeveridade,
  removeSeveridade,
  addNivel,
  removeNivel,
  addPlanoAcao,
  removePlanoAcao,
  addIntencao,
  removeIntencao,
  addPrioridade,
  removePrioridade,
  addPrazo,
  removePrazo,
  addMonitoramento,
  removeMonitoramento,
  addStatus,
  removeStatus,
  setoresDis,
  usuario,
}) => {

  const API_URL = process.env.REACT_APP_URL_API;

  const formEmpty = {
    _id: '',
    empresa: '',
    data: '',
    fachada: '',
    responsavel: '',
    funcao: '',
    telefone: '',
    email: '',
    usuario: '',
    area: '',
    ambiente: '',
    observacaoAmbiente: '',
    setores: [{
      setor: '',
      funcoes: [{
        funcao: '',
        funcionarios: 0,
        atividades: [{
          atividade: '',
          perigos: [{
            perigo: '',
            agentesRisco: [{
              agenteRisco: '',
              riscos: [{
                risco: '',
                viaAbsorcao: '',
                frequenciaExposicao: '',
                duracaoExposicao: '',  
                causa: '',
                medida: '',
                avaliacao: '',
                probabilidade: '',
                severidade: '',
                nivelRisco: '',
                planosAcao: [{
                  planoAcao: '',
                  intencao: '',
                  prioridade: '',
                  prazo: '',
                  monitoramento: '',
                  status: '',
                }]
              }]
            }]
          }]
        }]
      }]
    }]
  }

  const listFields = {
    empresa: 'json',
    data: 'data',
    fachada: 'imagem',
    responsavel: 'texto',
    telefone: 'telefone',
    opções: ''
  }

  const [showModalInfoState, setShowModalInfoState] = useState(false);
  const [showModalSetoresListSelect, setShowModalSetoresListSelect] = useState(false);
  const [showModalFuncoesListSelect, setShowModalFuncoesListSelect] = useState(false);
  const [showModalAtividadesListSelect, setShowModalAtividadesListSelect] = useState(false);
  const [showModalPerigosListSelect, setShowModalPerigosListSelect] = useState(false);
  const [showModalAgentesRiscoListSelect, setShowModalAgentesRiscoListSelect] = useState(false);
  const [showModalRiscosListSelect, setShowModalRiscosListSelect] = useState(false);
  const [showModalViasAbsorcaoListSelect, setShowModalViasAbsorcaoListSelect] = useState(false);
  const [showModalFrequenciaExposicaoListSelect, setShowModalFrequenciaExposicaoListSelect] = useState(false);
  const [showModalDuracaoExposicaoListSelect, setShowModalDuracaoExposicaoListSelect] = useState(false);
  const [showModalCausasListSelect, setShowModalCausasListSelect] = useState(false);
  const [showModalMedidasListSelect, setShowModalMedidasListSelect] = useState(false);
  const [showModalAvaliacoesListSelect, setShowModalAvaliacoesListSelect] = useState(false);
  const [showModalProbabilidadesListSelect, setShowModalProbabilidadesListSelect] = useState(false);
  const [showModalSeveridadesListSelect, setShowModalSeveridadesListSelect] = useState(false);
  const [showModalNiveisRiscoListSelect, setShowModalNiveisRiscoListSelect] = useState(false);
  const [showModalPlanosAcaoListSelect, setShowModalPlanosAcaoListSelect] = useState(false);
  const [showModalIntencoesListSelect, setShowModalIntencoesListSelect] = useState(false);
  const [showModalPrioridadesListSelect, setShowModalPrioridadesListSelect] = useState(false);
  const [showModalPrazosListSelect, setShowModalPrazosListSelect] = useState(false);
  const [showModalMonitoramentosListSelect, setShowModalMonitoramentosListSelect] = useState(false);
  const [showModalStatusListSelect, setShowModalStatusListSelect] = useState(false);

  const [disListState, setDisListState] = useState([]);

  const [empresasState, setEmpresasState] = useState([]);
  const [areasState, setAreasState] = useState([]);
  const [setoresState, setSetoresState] = useState([]);
  const [funcoesState, setFuncoesState] = useState([]);
  const [atividadesState, setAtividadesState] = useState([]);
  const [perigosState, setPerigosState] = useState([]);
  const [agentesRiscoState, setAgentesRiscoState] = useState(AgentesRisco);
  const [riscosState, setRiscosState] = useState([]);
  const [viasAbsorcaoState, setViasAbsorcaoState] = useState(ViasAbsorcao);
  const [frequenciasExposicaoState, setFrequenciasExposicaoState] = useState(FrequenciaExposicao);
  const [duracaoExposicaoState, setDuracaoExposicaoState] = useState(DuracaoExposicao);
  const [causasState, setCausasState] = useState([]);
  const [medidasState, setMedidasState] = useState([]);
  const [avaliacoesState, setAvaliacoesState] = useState([]);
  const [probabilidadesState, setProbabilidadesState] = useState([]);
  const [severidadesState, setSeveridadesState] = useState([]);
  const [niveisRiscoState, setNiveisRiscoState] = useState([]);
  const [planosAcaoState, setPlanosAcaoState] = useState([]);
  const [intencoesState, setIntencoesState] = useState(Intencao);
  const [prioridadesState, setPrioridadesState] = useState(Prioridade);
  const [prazosState, setPrazosState] = useState(Prazo);
  const [monitoramentoState, setMonitoramentosState] = useState([]);
  const [statusState, setStatusState] = useState(Status);

  const [empresaSelected, setEmpresaSelected] = useState({});
  const [areaSelected, setAreaSelected] = useState({});
  const [setorSelected, setSetorSelected] = useState({});
  const [funcaoSelected, setFuncaoSelected] = useState({});
  const [atividadeSelected, setAtividadeSelected] = useState({});
  const [perigoSelected, setPerigoSelected] = useState({});
  const [agenteRiscoSelected, setAgenteRiscoSelected] = useState({});
  const [riscoSelected, setRiscoSelected] = useState({});
  const [viaAbsorcaoSelected, setViaAbsorcaoSelected] = useState({});
  const [frequenciaExposicaoSelected, setFrequenciaExposicaoSelected] = useState({});
  const [duracaoExposicaoSelected, setDuracaoExposicaoSelected] = useState({});
  const [causaSelected, setCausaSelected] = useState({});
  const [medidaSelected, setMedidaSelected] = useState({});
  const [avaliacaoSelected, setAvaliacaoSelected] = useState({});
  const [probabilidadeSelected, setProbabilidadeSelected] = useState({});
  const [severidadeSelected, setSeveridadeSelected] = useState({});
  const [nivelSelected, setNivelSelected] = useState({});
  const [planoAcaoSelected, setPlanoAcaoSelected] = useState({});
  const [intencaoSelected, setIntencaoSelected] = useState({});
  const [prioridadeSelected, setPrioridadeSelected] = useState({});
  const [prazoSelected, setPrazoSelected] = useState({});
  const [monitoramentoSelected, setMonitoramentoSelected] = useState({});
  const [statusSelected, setStatusSelected] = useState({});
  
  const [setorSelectedIndex, setSetorSelectedIndex] = useState(-1);
  const [funcaoSelectedIndex, setFuncaoSelectedIndex] = useState(-1);
  const [atividadeSelectedIndex, setAtividadeSelectedIndex] = useState(-1);
  const [perigoSelectedIndex, setPerigoSelectedIndex] = useState(-1);
  const [agenteRiscoSelectedIndex, setAgenteRiscoSelectedIndex] = useState(-1);
  const [riscoSelectedIndex, setRiscoSelectedIndex] = useState(-1);
  const [viaAbsorcaoSelectedIndex, setViaAbsorcaoSelectedIndex] = useState(-1);
  const [frequenciaExposicaoSelectedIndex, setFrequenciaExposicaoSelectedIndex] = useState(-1);
  const [duracaoExposicaoSelectedIndex, setDuracaoExposicaoSelectedIndex] = useState(-1);
  const [causaSelectedIndex, setCausaSelectedIndex] = useState(-1);
  const [medidaSelectedIndex, setMedidaSelectedIndex] = useState(-1);
  const [avaliacaoSelectedIndex, setAvaliacaoSelectedIndex] = useState(-1);
  const [probabilidadeSelectedIndex, setProbabilidadeSelectedIndex] = useState(-1);
  const [severidadeSelectedIndex, setSeveridadeSelectedIndex] = useState(-1);
  const [nivelSelectedIndex, setNivelSelectedIndex] = useState(-1);
  const [planoAcaoSelectedIndex, setPlanoAcaoSelectedIndex] = useState(-1);
  const [intencaoSelectedIndex, setIntencaoSelectedIndex] = useState(-1);
  const [prioridadeSelectedIndex, setPrioridadeSelectedIndex] = useState(-1);
  const [prazoSelectedIndex, setPrazoSelectedIndex] = useState(-1);
  const [monitoramentoSelectedIndex, setMonitoramentoSelectedIndex] = useState(-1);
  const [statusSelectedIndex, setStatusSelectedIndex] = useState(-1);
  
  const [disSelected, setDisSelected] = useState(formEmpty);
  const { register, control, setValue, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: disSelected
      ? {
        _id: disSelected._id,
        empresa: disSelected.empresa,
        data: disSelected.data,
        fachada: disSelected.fachada,
        responsavel: disSelected.responsavel,
        funcao: disSelected.funcao,
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
    

  ])

  useEffect(() => {
    listarDis(page, 1);
    listarEmpresas(0,1);
    listarAreas(0, 1);
    listarSetores(0, 1);
    listarFuncoes(0, 1);
    listarAtividades(0, 1);
    listarPerigos(0, 1);
    listarRiscos(0, 1);
    listarCausas(0, 1);
    listarMedidas(0, 1);
    listarProbabilidades(0, 1);
    listarSeveridades(0, 1);
    listarNivelriscos(0, 1);
    listarPlanosAcao(0, 1);
    listarMonitoramentos(0, 1);
  }, []);

  useEffect(() => {
    setDisListState(disList);
  }, [disList]);

  useEffect(() => {
    setEmpresasState(empresas);
  }, [empresas]);

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
    setAtividadesState(atividades);
  }, [atividades]);

  useEffect(() => {
    setPerigosState(perigos);
  }, [perigos]);

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
    setPlanosAcaoState(planosAcao);
  }, [planosAcao]);

  useEffect(() => {
    setMonitoramentosState(monitoramentos);
  }, [monitoramentos]);

 
  useEffect(() => {
    if (empresaSelected && Object.keys(empresaSelected).length > 0) {
      Object.keys(empresaSelected).forEach((chave) => {
        if(chave === 'responsavel' || chave === 'funcao' || chave === 'email' || chave === 'telefone')
        setValue(chave, empresaSelected[chave]);
      });
    }
  }, [empresaSelected, setValue]);

  useEffect(() => {
    setDiagnotiscoItems([
      {
        id: 1,
        label: 'Setores:',
        list: setoresState,
        items: setoresDis.map(setor => setor.setor),
        onSelect: (item) => addSetor({ setor: item }),
        onSelected: (event, index) => { setSetorSelected(setoresDis[index].setor); setSetorSelectedIndex(index) },
        onDelete: (event, id) => { removeSetor(id) },
        selectedIndex: setorSelectedIndex,
        handleListSelect: () => {  setShowModalSetoresListSelect(true);  }
      },
      {
        id: 2,
        label: 'Funções:',
        list: funcoesState,
        items: setorSelectedIndex >= 0 ? 
               setoresDis[setorSelectedIndex]?.funcoes.map(funcao => funcao?.funcao) : 
               setoresDis.flatMap(setor => setor?.funcoes).map(funcao => funcao?.funcao) || [],
        onSelect: (item) => setorSelectedIndex >= 0 && addFuncao(setorSelectedIndex, { funcao: item }),
        onSelected: (event, index) => { setFuncaoSelected(setoresDis[setorSelectedIndex].funcoes[index]); setFuncaoSelectedIndex(index) },
        onDelete: (event, id) => { removeFuncao(setorSelectedIndex, id) },
        selectedIndex: funcaoSelectedIndex,
        handleListSelect: () => { setorSelectedIndex >= 0 && setShowModalFuncoesListSelect(true);  }
      },
      {
        id: 3,
        label: 'Atividades Realizadas:',
        list: atividadesState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 ? 
               setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.atividades.map(atividade => atividade?.atividade) : 
               setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.atividades).map(atividade => atividade?.atividade) || [],
        onSelect: (item) => funcaoSelectedIndex >= 0 && addAtividade(setorSelectedIndex, funcaoSelectedIndex, { atividade: item }),
        onSelected: (event, index) => { setAtividadeSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].atividades[index]); setAtividadeSelectedIndex(index) },
        onDelete: (event, id) => removeAtividade(setorSelectedIndex, funcaoSelectedIndex, id),
        selectedIndex: atividadeSelectedIndex,
        handleListSelect: () => { funcaoSelectedIndex >= 0 && setShowModalAtividadesListSelect(true);  }
      },
      {
        id: 4,
        label: 'Condição de perigo:',
        list: perigosState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 && atividadeSelectedIndex >= 0  ? 
               setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.atividades[atividadeSelectedIndex]?.perigos.map(perigo => perigo?.perigo) : 
               setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.atividades).flatMap(atividade => atividade?.perigos).map(perigo => perigo?.perigo) || [],
        onSelect: (item) => atividadeSelectedIndex >= 0 && addPerigo(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, { perigo: item }),
        onSelected: (event, index) => { setPerigoSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].atividades[atividadeSelectedIndex].perigos[index]); setPerigoSelectedIndex(index) },
        onDelete: (event, id) => removePerigo(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, id),
        selectedIndex: perigoSelectedIndex,
        handleListSelect: () => {atividadeSelectedIndex >= 0 && setShowModalPerigosListSelect(true);  }
      },
      {
        id: 5,
        label: 'Agentes de risco:',
        list: agentesRiscoState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 && atividadeSelectedIndex >= 0 && perigoSelectedIndex >= 0 ? 
               setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.atividades[atividadeSelectedIndex]?.perigos[perigoSelectedIndex]?.agentesRisco.map(agenteRisco => agenteRisco?.agenteRisco) : 
               setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.atividades).flatMap(atividade => atividade?.perigos).flatMap(perigo => perigo?.agentesRisco).map(agenteRisco => agenteRisco?.agenteRisco) || [],
        onSelect: (item) => perigoSelectedIndex >= 0 && addAgenteRisco(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, { agenteRisco: item }),
        onSelected: (event, index) => { setAgenteRiscoSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].atividades[atividadeSelectedIndex].perigos[perigoSelectedIndex].agentesRisco[index]); setAgenteRiscoSelectedIndex(index) },
        onDelete: (event, id) => removeAgenteRisco(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, id),
        selectedIndex: agenteRiscoSelectedIndex,
        handleListSelect: () => {perigoSelectedIndex >= 0 && setShowModalAgentesRiscoListSelect(true);  }
      },
      {
        id: 6,
        label: 'Riscos',
        list: riscosState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 && atividadeSelectedIndex >= 0 && perigoSelectedIndex >= 0 && agenteRiscoSelectedIndex > 0 ? 
               setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.atividades[atividadeSelectedIndex]?.perigos[perigoSelectedIndex]?.agentesRisco[agenteRiscoSelectedIndex]?.riscos.map(risco => risco?.risco) : 
               setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.atividades).flatMap(atividade => atividade?.perigos).flatMap(perigo => perigo?.agentesRisco).flatMap(agenteRisco => agenteRisco?.riscos).map(risco => risco?.risco) || [],
        onSelect: (item) => agenteRiscoSelectedIndex >= 0 && addRisco(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, { risco: item }),
        onSelected: (event, index) => { setRiscoSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].atividades[atividadeSelectedIndex].perigos[perigoSelectedIndex].agentesRisco[agenteRiscoSelectedIndex].riscos[index]); setRiscoSelectedIndex(index) },
        onDelete: (event, id) => removeRisco(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, id),
        selectedIndex: riscoSelectedIndex,
        handleListSelect: () => {agenteRiscoSelectedIndex >= 0 && setShowModalRiscosListSelect(true);  }
      }, 
      {
         id: 7,
         label: 'Vias de absorção:',
         list: viasAbsorcaoState,
         items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 && atividadeSelectedIndex >= 0 && perigoSelectedIndex >= 0 && agenteRiscoSelectedIndex >= 0 && riscoSelectedIndex >= 0 ? 
                setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.atividades[atividadeSelectedIndex]?.perigos[perigoSelectedIndex]?.agentesRisco[agenteRiscoSelectedIndex]?.riscos[riscoSelectedIndex]?.viaAbsorcao : 
                setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.atividades).flatMap(atividade => atividade?.perigos).flatMap(perigo => perigo?.agentesRisco).flatMap(agenteRisco => agenteRisco?.riscos).flatMap(risco => risco?.viaAbsorcao) || [],
         onSelect: (item) => riscoSelectedIndex >= 0 && addViaAbsorcao(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, item ),
         onSelected: (event, index) => { setViaAbsorcaoSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].atividades[atividadeSelectedIndex].perigos[perigoSelectedIndex].agentesRisco[agenteRiscoSelectedIndex].riscos[riscoSelectedIndex].viaAbsorcao); setViaAbsorcaoSelectedIndex(index) },
         onDelete: (event, id) => removeViaAbsorcao(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, id),
         selectedIndex: viaAbsorcaoSelectedIndex,
         handleListSelect: () => {riscoSelectedIndex >= 0 && setShowModalViasAbsorcaoListSelect(true);  }
      },
      {
        id: 8,
        label: 'Frequência da exposição ao risco:',
        list: frequenciasExposicaoState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 && atividadeSelectedIndex >= 0 && perigoSelectedIndex >= 0 && agenteRiscoSelectedIndex >= 0 && riscoSelectedIndex >= 0  ? 
               setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.atividades[atividadeSelectedIndex]?.perigos[perigoSelectedIndex]?.agentesRisco[agenteRiscoSelectedIndex]?.riscos[riscoSelectedIndex]?.frequenciaExposicao : 
               setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.atividades).flatMap(atividade => atividade?.perigos).flatMap(perigo => perigo?.agentesRisco).flatMap(agenteRisco => agenteRisco?.riscos).flatMap(risco => risco?.frequenciaExposicao) || [],
        onSelect: (item) => riscoSelectedIndex >= 0 && addFrequenciaExposicao(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex,  item ),
        onSelected: (event, index) => { setFrequenciaExposicaoSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].atividades[atividadeSelectedIndex].perigos[perigoSelectedIndex].agentesRisco[agenteRiscoSelectedIndex].riscos[riscoSelectedIndex].frequenciaExposicao); setFrequenciaExposicaoSelectedIndex(index) },
        onDelete: (event, id) => removeFrequenciaExposicao(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, id),
        selectedIndex: frequenciaExposicaoSelectedIndex,
        handleListSelect: () => {riscoSelectedIndex >= 0 && setShowModalFrequenciaExposicaoListSelect(true);  }
      },
      {
        id: 9,
        label: 'Duração de exposição ao risco:',
        list: duracaoExposicaoState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 && atividadeSelectedIndex >= 0 && perigoSelectedIndex >= 0 && agenteRiscoSelectedIndex >= 0 && riscoSelectedIndex >= 0 ? 
               setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.atividades[atividadeSelectedIndex]?.perigos[perigoSelectedIndex]?.agentesRisco[agenteRiscoSelectedIndex]?.riscos[riscoSelectedIndex]?.duracaoExposicao : 
               setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.atividades).flatMap(atividade => atividade?.perigos).flatMap(perigo => perigo?.agentesRisco).flatMap(agenteRisco => agenteRisco?.riscos).flatMap(risco => risco?.duracaoExposicao) || [],
        onSelect: (item) => riscoSelectedIndex >= 0 && addDuracaoExposicao(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, item),
        onSelected: (event, index) => { setDuracaoExposicaoSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].atividades[atividadeSelectedIndex].perigos[perigoSelectedIndex].agentesRisco[agenteRiscoSelectedIndex].riscos[riscoSelectedIndex].duracaoExposicao); setDuracaoExposicaoSelectedIndex(index) },
        onDelete: (event, id) => removeDuracaoExposicao(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, id),
        selectedIndex: duracaoExposicaoSelectedIndex,
        handleListSelect: () => {riscoSelectedIndex >= 0 && setShowModalDuracaoExposicaoListSelect(true);  }
      },
      {
        id: 10,
        label: 'Possiveis lesões ou agravos a saúde:',
        list: causasState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 && atividadeSelectedIndex >= 0 && perigoSelectedIndex >= 0 && agenteRiscoSelectedIndex >= 0 && riscoSelectedIndex >= 0 ? 
               setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.atividades[atividadeSelectedIndex]?.perigos[perigoSelectedIndex]?.agentesRisco[agenteRiscoSelectedIndex]?.riscos[riscoSelectedIndex]?.causa.flatMap(causa => causa?.causa) : 
               setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.atividades).flatMap(atividade => atividade?.perigos).flatMap(perigo => perigo?.agentesRisco).flatMap(agenteRisco => agenteRisco?.riscos).flatMap(risco => risco?.causa) || [],
        onSelect: (item) => riscoSelectedIndex >= 0 && addCausa(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, item ),
        onSelected: (event, index) => { setCausaSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].atividades[atividadeSelectedIndex].perigos[perigoSelectedIndex].agentesRisco[agenteRiscoSelectedIndex].riscos[riscoSelectedIndex].causa); setCausaSelectedIndex(index) },
        onDelete: (event, id) => removeCausa(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, id),
        selectedIndex: causaSelectedIndex,
        handleListSelect: () => {riscoSelectedIndex >= 0 && setShowModalCausasListSelect(true);  }
      },
      {
        id: 11,
        label: 'Medida de controle existente:',
        list: medidasState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 && atividadeSelectedIndex >= 0 && perigoSelectedIndex >= 0 && agenteRiscoSelectedIndex >= 0 && riscoSelectedIndex >= 0  ? 
               setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.atividades[atividadeSelectedIndex]?.perigos[perigoSelectedIndex]?.agentesRisco[agenteRiscoSelectedIndex]?.riscos[riscoSelectedIndex]?.medida.map(medida => medida?.medida) : 
               setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.atividades).flatMap(atividade => atividade?.perigos).flatMap(perigo => perigo?.agentesRisco).flatMap(agenteRisco => agenteRisco?.riscos).flatMap(risco => risco?.medida) || [],
        onSelect: (item) => riscoSelectedIndex >= 0 && addMedida(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, item ),
        onSelected: (event, index) => { setMedidaSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].atividades[atividadeSelectedIndex].perigos[perigoSelectedIndex].agentesRisco[agenteRiscoSelectedIndex].riscos[riscoSelectedIndex].medida); setMedidaSelectedIndex(index) },
        onDelete: (event, id) => removeMedida(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, id),
        selectedIndex: medidaSelectedIndex,
        handleListSelect: () => {riscoSelectedIndex >= 0 && setShowModalMedidasListSelect(true);  }
      },
      {
        id: 12,
        label: 'Avaliação quantitativa:',
        list: avaliacoesState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 && atividadeSelectedIndex >= 0 && perigoSelectedIndex >= 0 && agenteRiscoSelectedIndex >= 0 && riscoSelectedIndex >= 0 ? 
               setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.atividades[atividadeSelectedIndex]?.perigos[perigoSelectedIndex]?.agentesRisco[agenteRiscoSelectedIndex]?.riscos[riscoSelectedIndex]?.avaliacao : 
               setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.atividades).flatMap(atividade => atividade?.perigos).flatMap(perigo => perigo?.agentesRisco).flatMap(agenteRisco => agenteRisco?.riscos).flatMap(risco => risco?.avaliacao) || [],
        onSelect: (item) => riscoSelectedIndex >= 0 && addAvaliacao(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, item),
        onSelected: (event, index) => { setAvaliacaoSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].atividades[atividadeSelectedIndex].perigos[perigoSelectedIndex].agentesRisco[agenteRiscoSelectedIndex].riscos[riscoSelectedIndex].avaliacao); setAvaliacaoSelectedIndex(index) },
        onDelete: (event, id) => removeAvaliacao(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, id),
        selectedIndex: avaliacaoSelectedIndex,
        handleListSelect: () => {riscoSelectedIndex >= 0 && setShowModalAvaliacoesListSelect(true);  }
      },
      {
        id: 13,
        label: 'Probabilidades',
        list: probabilidadesState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 && atividadeSelectedIndex >= 0 && perigoSelectedIndex >= 0 && agenteRiscoSelectedIndex >= 0 && riscoSelectedIndex >= 0 ? 
               setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.atividades[atividadeSelectedIndex]?.perigos[perigoSelectedIndex]?.agentesRisco[agenteRiscoSelectedIndex]?.riscos[riscoSelectedIndex]?.probabilidade.map(probabilidade => probabilidade?.probabilidade) : 
               setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.atividades).flatMap(atividade => atividade?.perigos).flatMap(perigo => perigo?.agentesRisco).flatMap(agenteRisco => agenteRisco?.riscos).flatMap(risco => risco?.probabilidade) || [],
        onSelect: (item) => riscoSelectedIndex >= 0 && addProbabilidade(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, item),
        onSelected: (event, index) => { setProbabilidadeSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].atividades[atividadeSelectedIndex].perigos[perigoSelectedIndex].agentesRisco[agenteRiscoSelectedIndex].riscos[riscoSelectedIndex].probabilidade); setProbabilidadeSelectedIndex(index) },
        onDelete: (event, id) => removeProbabilidade(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, id),
        selectedIndex: probabilidadeSelectedIndex,
        handleListSelect: () => {riscoSelectedIndex >= 0 && setShowModalProbabilidadesListSelect(true);  }
      },
      {
        id: 14,
        label: 'Severidades',
        list: severidadesState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 && atividadeSelectedIndex >= 0 && perigoSelectedIndex >= 0 && agenteRiscoSelectedIndex >= 0 && riscoSelectedIndex >= 0 ? 
               setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.atividades[atividadeSelectedIndex]?.perigos[perigoSelectedIndex]?.agentesRisco[agenteRiscoSelectedIndex]?.riscos[riscoSelectedIndex]?.severidade.map(severidade => severidade?.severidade) : 
               setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.atividades).flatMap(atividade => atividade?.perigos).flatMap(perigo => perigo?.agentesRisco).flatMap(agenteRisco => agenteRisco?.riscos).flatMap(risco => risco?.severidade) || [],
        onSelect: (item) => probabilidadeSelectedIndex >= 0 && addSeveridade(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, item),
        onSelected: (event, index) => { setSeveridadeSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].atividades[atividadeSelectedIndex].perigos[perigoSelectedIndex].agentesRisco[agenteRiscoSelectedIndex].riscos[riscoSelectedIndex].severidade); setSeveridadeSelectedIndex(index) },
        onDelete: (event, id) => removeSeveridade(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, id),
        selectedIndex: severidadeSelectedIndex,
        handleListSelect: () => {probabilidadeSelectedIndex >= 0 && setShowModalSeveridadesListSelect(true);  }
      },
      {
        id: 15,
        label: 'Niveis de Risco',
        list: niveisRiscoState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 && atividadeSelectedIndex >= 0 && perigoSelectedIndex >= 0 && agenteRiscoSelectedIndex >= 0 && riscoSelectedIndex >= 0 ? 
               setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.atividades[atividadeSelectedIndex]?.perigos[perigoSelectedIndex]?.agentesRisco[agenteRiscoSelectedIndex]?.riscos[riscoSelectedIndex]?.nivelRisco.map(nivelRisco => nivelRisco?.nivelRisco) : 
               setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.atividades).flatMap(atividade => atividade?.perigos).flatMap(perigo => perigo?.agentesRisco).flatMap(agenteRisco => agenteRisco?.riscos).flatMap(risco => risco?.nivelRisco) || [],
        onSelect: (item) => severidadeSelectedIndex >= 0 && addNivel(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, item),
        onSelected: (event, index) => { setNivelSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].atividades[atividadeSelectedIndex].perigos[perigoSelectedIndex].agentesRisco[agenteRiscoSelectedIndex].riscos[riscoSelectedIndex].nivelRisco); setNivelSelectedIndex(index) },
        onDelete: (event, id) => removeNivel(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, id),
        selectedIndex: nivelSelectedIndex,
        handleListSelect: () => {severidadeSelectedIndex >= 0 && setShowModalNiveisRiscoListSelect(true);  }
      },
      {
        id: 16,
        label: 'Descrição do plano de ação:',
        list: planosAcaoState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 && atividadeSelectedIndex >= 0 && perigoSelectedIndex >= 0 && agenteRiscoSelectedIndex >= 0 && riscoSelectedIndex >= 0 ? 
               setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.atividades[atividadeSelectedIndex]?.perigos[perigoSelectedIndex]?.agentesRisco[agenteRiscoSelectedIndex]?.riscos[riscoSelectedIndex]?.planosAcao.map(planoAcao => planoAcao?.planoAcao) : 
               setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.atividades).flatMap(atividade => atividade?.perigos).flatMap(perigo => perigo?.agentesRisco).flatMap(agenteRisco => agenteRisco?.riscos).flatMap(risco => risco?.planosAcao).flatMap(planoAcao => planoAcao?.planoAcao) || [],
        onSelect: (item) => riscoSelectedIndex >= 0 && addPlanoAcao(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, { planoAcao: item }),
        onSelected: (event, index) => { setPlanoAcaoSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].atividades[atividadeSelectedIndex].perigos[perigoSelectedIndex].agentesRisco[agenteRiscoSelectedIndex].riscos[riscoSelectedIndex].planosAcao[index]); setPlanoAcaoSelectedIndex(index) },
        onDelete: (event, id) => removePlanoAcao(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, id),
        selectedIndex: planoAcaoSelectedIndex,
        handleListSelect: () => {riscoSelectedIndex >= 0 && setShowModalPlanosAcaoListSelect(true);  }
      },
      {
        id: 17,
        label: 'Intenção:',
        list: intencoesState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 && atividadeSelectedIndex >= 0 && perigoSelectedIndex >= 0 && agenteRiscoSelectedIndex >= 0 && riscoSelectedIndex >= 0 && planoAcaoSelectedIndex >= 0 ? 
               setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.atividades[atividadeSelectedIndex]?.perigos[perigoSelectedIndex]?.agentesRisco[agenteRiscoSelectedIndex]?.riscos[riscoSelectedIndex]?.planosAcao[planoAcaoSelectedIndex]?.intencao : 
               setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.atividades).flatMap(atividade => atividade?.perigos).flatMap(perigo => perigo?.agentesRisco).flatMap(agenteRisco => agenteRisco?.riscos).flatMap(risco => risco?.planosAcao).flatMap(planoAcao => planoAcao?.intencao) || [],
        onSelect: (item) => planoAcaoSelectedIndex >= 0 && addIntencao(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, planoAcaoSelectedIndex, item ),
        onSelected: (event, index) => { setIntencaoSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].atividades[atividadeSelectedIndex].perigos[perigoSelectedIndex].agentesRisco[agenteRiscoSelectedIndex].riscos[riscoSelectedIndex].planosAcao[planoAcaoSelectedIndex].intencao); setIntencaoSelectedIndex(index) },
        onDelete: (event, id) => removeIntencao(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, planoAcaoSelectedIndex, id),
        selectedIndex: intencaoSelectedIndex,
        handleListSelect: () => {planoAcaoSelectedIndex >= 0 && setShowModalIntencoesListSelect(true);  }
      },
      {
        id: 18,
        label: 'Prioridade:',
        list: prioridadesState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 && atividadeSelectedIndex >= 0 && perigoSelectedIndex >= 0 && agenteRiscoSelectedIndex >= 0 && riscoSelectedIndex >= 0 && planoAcaoSelectedIndex >= 0 ? 
               setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.atividades[atividadeSelectedIndex]?.perigos[perigoSelectedIndex]?.agentesRisco[agenteRiscoSelectedIndex]?.riscos[riscoSelectedIndex]?.planosAcao[planoAcaoSelectedIndex]?.prioridade : 
               setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.atividades).flatMap(atividade => atividade?.perigos).flatMap(perigo => perigo?.agentesRisco).flatMap(agenteRisco => agenteRisco?.riscos).flatMap(risco => risco?.planosAcao).flatMap(planoAcao => planoAcao?.prioridade) || [],
        onSelect: (item) => planoAcaoSelectedIndex >= 0 && addPrioridade(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, planoAcaoSelectedIndex, item ),
        onSelected: (event, index) => { setPrioridadeSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].atividades[atividadeSelectedIndex].perigos[perigoSelectedIndex].agentesRisco[agenteRiscoSelectedIndex].riscos[riscoSelectedIndex].planosAcao[planoAcaoSelectedIndex].prioridade); setPrioridadeSelectedIndex(index) },
        onDelete: (event, id) => removePrioridade(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, planoAcaoSelectedIndex, id),
        selectedIndex: prioridadeSelectedIndex,
        handleListSelect: () => {planoAcaoSelectedIndex >= 0 && setShowModalPrioridadesListSelect(true);  }
      },
      {
        id: 19,
        label: 'Prazo:',
        list: prazosState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 && atividadeSelectedIndex >= 0 && perigoSelectedIndex >= 0 && agenteRiscoSelectedIndex >= 0 && riscoSelectedIndex >= 0 && planoAcaoSelectedIndex >= 0 ? 
               setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.atividades[atividadeSelectedIndex]?.perigos[perigoSelectedIndex]?.agentesRisco[agenteRiscoSelectedIndex]?.riscos[riscoSelectedIndex]?.planosAcao[planoAcaoSelectedIndex]?.prazo : 
               setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.atividades).flatMap(atividade => atividade?.perigos).flatMap(perigo => perigo?.agentesRisco).flatMap(agenteRisco => agenteRisco?.riscos).flatMap(risco => risco?.planosAcao).flatMap(planoAcao => planoAcao?.prazo) || [],
        onSelect: (item) => planoAcaoSelectedIndex >= 0 && addPrazo(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, planoAcaoSelectedIndex, item ),
        onSelected: (event, index) => { setPrazoSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].atividades[atividadeSelectedIndex].perigos[perigoSelectedIndex].agentesRisco[agenteRiscoSelectedIndex].riscos[riscoSelectedIndex].planosAcao[planoAcaoSelectedIndex].prazo); setPrazoSelectedIndex(index) },
        onDelete: (event, id) => removePrazo(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, planoAcaoSelectedIndex, id),
        selectedIndex: prazoSelectedIndex,
        handleListSelect: () => {planoAcaoSelectedIndex >= 0 && setShowModalPrazosListSelect(true);  }
      },
      {
        id: 20,
        label: 'Formas de monitoramento:',
        list: monitoramentoState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 && atividadeSelectedIndex >= 0 && perigoSelectedIndex >= 0 && agenteRiscoSelectedIndex >= 0 && riscoSelectedIndex >= 0 && planoAcaoSelectedIndex >= 0 ? 
               setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.atividades[atividadeSelectedIndex]?.perigos[perigoSelectedIndex]?.agentesRisco[agenteRiscoSelectedIndex]?.riscos[riscoSelectedIndex]?.planosAcao[planoAcaoSelectedIndex]?.monitoramento.map(monitoramento => monitoramento?.monitoramento) : 
               setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.atividades).flatMap(atividade => atividade?.perigos).flatMap(perigo => perigo?.agentesRisco).flatMap(agenteRisco => agenteRisco?.riscos).flatMap(risco => risco?.planosAcao).flatMap(planoAcao => planoAcao?.monitoramento) || [],
        onSelect: (item) => planoAcaoSelectedIndex >= 0 && addMonitoramento(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, planoAcaoSelectedIndex, { monitoramento: item }),
        onSelected: (event, index) => { setMonitoramentoSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].atividades[atividadeSelectedIndex].perigos[perigoSelectedIndex].agentesRisco[agenteRiscoSelectedIndex].riscos[riscoSelectedIndex].planosAcao[planoAcaoSelectedIndex].monitoramento); setMonitoramentoSelectedIndex(index) },
        onDelete: (event, id) => removeMonitoramento(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, planoAcaoSelectedIndex, id),
        selectedIndex: monitoramentoSelectedIndex,
        handleListSelect: () => {planoAcaoSelectedIndex >= 0 && setShowModalMonitoramentosListSelect(true);  }
      },
      {
        id: 21,
        label: 'Status:',
        list: statusState,
        items: setorSelectedIndex >= 0 && funcaoSelectedIndex >= 0 && atividadeSelectedIndex >= 0 && perigoSelectedIndex >= 0 && agenteRiscoSelectedIndex >= 0 && riscoSelectedIndex >= 0 && planoAcaoSelectedIndex >= 0 ? 
               setoresDis[setorSelectedIndex]?.funcoes[funcaoSelectedIndex]?.atividades[atividadeSelectedIndex]?.perigos[perigoSelectedIndex]?.agentesRisco[agenteRiscoSelectedIndex]?.riscos[riscoSelectedIndex]?.planosAcao[planoAcaoSelectedIndex]?.status : 
               setoresDis.flatMap(setor => setor?.funcoes).flatMap(funcao => funcao?.atividades).flatMap(atividade => atividade?.perigos).flatMap(perigo => perigo?.agentesRisco).flatMap(agenteRisco => agenteRisco?.riscos).flatMap(risco => risco?.planosAcao).flatMap(planoAcao => planoAcao?.status) || [],
        onSelect: (item) => planoAcaoSelectedIndex >= 0 && addStatus(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, planoAcaoSelectedIndex, item ),
        onSelected: (event, index) => { setStatusSelected(setoresDis[setorSelectedIndex].funcoes[funcaoSelectedIndex].atividades[atividadeSelectedIndex].perigos[perigoSelectedIndex].agentesRisco[agenteRiscoSelectedIndex].riscos[riscoSelectedIndex].planosAcao[planoAcaoSelectedIndex].status); setStatusSelectedIndex(index) },
        onDelete: (event, id) => removeStatus(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, planoAcaoSelectedIndex, id),
        selectedIndex: planoAcaoSelectedIndex,
        handleListSelect: () => {monitoramentoSelectedIndex >= 0 && setShowModalStatusListSelect(true);  }
      }
    ]);
  },
    [addAtividade, addCausa, addFuncao, addMedida, addNivel, addProbabilidade, addPerigo, addPlanoAcao, addMonitoramento, addRisco, addSetor, addSeveridade, removeAtividade, removeCausa, removeFuncao, removeMedida, removeNivel, removeProbabilidade, removePerigo, removePlanoAcao, removeMonitoramento, removeRisco, removeSetor, removeSeveridade, addAgenteRisco, removeAgenteRisco, addViaAbsorcao, removeViaAbsorcao, addFrequenciaExposicao, removeFrequenciaExposicao, addDuracaoExposicao, removeDuracaoExposicao, addAvaliacao, removeAvaliacao, addIntencao, removeIntencao, addPrioridade, removePrioridade, addPrazo, removePrazo, addStatus, removeStatus, atividadeSelectedIndex, atividadesState, causaSelectedIndex, causasState, disSelected.area, funcaoSelectedIndex, funcoesState, medidaSelectedIndex, medidasState, niveisRiscoState, nivelSelectedIndex, probabilidadeSelectedIndex, probabilidadesState, perigoSelectedIndex, planoAcaoSelectedIndex, planosAcaoState, monitoramentoSelectedIndex, monitoramentoState, riscoSelectedIndex, riscosState, setorSelectedIndex, setoresDis, setoresState, severidadeSelectedIndex, severidadesState, agentesRiscoState, agenteRiscoSelectedIndex, viasAbsorcaoState, viaAbsorcaoSelectedIndex, frequenciasExposicaoState, frequenciaExposicaoSelectedIndex, duracaoExposicaoState, duracaoExposicaoSelectedIndex, avaliacoesState, avaliacaoSelectedIndex, intencoesState, intencaoSelectedIndex, prioridadesState, prioridadeSelectedIndex, prazosState, prazoSelectedIndex, statusState, setorSelected, funcaoSelected, atividadeSelected, perigoSelected, agenteRiscoSelected, riscoSelected, viaAbsorcaoSelected, frequenciaExposicaoSelected, duracaoExposicaoSelected, causaSelected, medidaSelected, avaliacaoSelected, probabilidadeSelected, severidadeSelected, nivelSelected, planoAcaoSelected, intencaoSelected, prioridadeSelected, prazoSelected, monitoramentoSelected, statusSelected, perigosState]);

  useEffect(() => {
    reset({ ...disSelected });
  }, [reset, disSelected])

  const handleSelect = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setDis(index);
    setDisSelected(disList[index]);
    setEmpresaSelected(disList[index].empresa)
    setAreaSelected(disList[index].empresa.area);
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

  const handleShowDis = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    handleSelect(event, index)
    setShowModalInfoState(true);
  }

  const onSubmit = (data) => {
    data.empresa = empresaSelected;
    data.usuario = usuario;
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
    //handleClear();
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

  if (showModalInfoState) {
    return <ModalInfo dados={disSelected} close={setShowModalInfoState} />
  }
  if (showModalSetoresListSelect) {
    return <ModalListSelect dados={setoresState} close={setShowModalSetoresListSelect} 
    setItensSelected={(items) => items.map(item => addSetor({setor: item}))} />
  }
  if (showModalFuncoesListSelect) {
    return <ModalListSelect dados={funcoesState} close={setShowModalFuncoesListSelect} 
    setItensSelected={(items) => items.map(item => addFuncao(setorSelectedIndex, { funcao: item }))} />
  }
  if (showModalAtividadesListSelect) {
    return <ModalListSelect dados={atividadesState} close={setShowModalAtividadesListSelect} 
    setItensSelected={(items) => items.map(item => addAtividade(setorSelectedIndex, funcaoSelectedIndex, { atividade: item }))} />
  }
  if (showModalPerigosListSelect) {
    return <ModalListSelect dados={perigosState} close={setShowModalPerigosListSelect} 
    setItensSelected={(items) => items.map(item => addPerigo(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, { perigo: item }))} />
  }
  if (showModalAgentesRiscoListSelect) {
    return <ModalListSelect dados={agentesRiscoState} close={setShowModalAgentesRiscoListSelect} 
    setItensSelected={(items) => items.map(item => addAgenteRisco(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, { agenteRisco: item }))} />
  }
  if (showModalRiscosListSelect) {
    return <ModalListSelect dados={riscosState} close={setShowModalRiscosListSelect} 
    setItensSelected={(items) => items.map(item => addRisco(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, { risco: item }))} />
  }
  if (showModalViasAbsorcaoListSelect) {
    return <ModalListSelect dados={viasAbsorcaoState} close={setShowModalViasAbsorcaoListSelect} 
    setItensSelected={(items) => items.map(item => addViaAbsorcao(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, item))} />
  }
  if (showModalFrequenciaExposicaoListSelect) {
    return <ModalListSelect dados={frequenciasExposicaoState} close={setShowModalFrequenciaExposicaoListSelect} 
    setItensSelected={(items) => items.map(item => addFrequenciaExposicao(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, item))} />
  }
  if (showModalDuracaoExposicaoListSelect) {
    return <ModalListSelect dados={duracaoExposicaoState} close={setShowModalDuracaoExposicaoListSelect} 
    setItensSelected={(items) => items.map(item => addDuracaoExposicao(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, item))} />
  }
  if (showModalCausasListSelect) {
    return <ModalListSelect dados={causasState} close={setShowModalCausasListSelect} 
    setItensSelected={(items) => items.map(item => addCausa(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, {causa: item} ))} />
  }
  if (showModalMedidasListSelect) {
    return <ModalListSelect dados={medidasState} close={setShowModalMedidasListSelect} 
    setItensSelected={(items) => items.map(item => addMedida(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, {medida: item} ))} />
  }
  if (showModalAvaliacoesListSelect) {
    return <ModalInput dados={avaliacoesState} close={setShowModalAvaliacoesListSelect} 
    setItensSelected={(items) => items.map(item => addAvaliacao(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, item ))} />
  }
  if (showModalProbabilidadesListSelect) {
    return <ModalListSelect dados={probabilidadesState} close={setShowModalProbabilidadesListSelect} 
    setItensSelected={(items) => items.map(item => addProbabilidade(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, {probabilidade: item} ))} />
  }
  if (showModalSeveridadesListSelect) {
    return <ModalListSelect dados={severidadesState} close={setShowModalSeveridadesListSelect} 
    setItensSelected={(items) => items.map(item => addSeveridade(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, {severidade: item} ))} />
  }
  if (showModalNiveisRiscoListSelect) {
    return <ModalListSelect dados={niveisRiscoState} close={setShowModalNiveisRiscoListSelect} 
    setItensSelected={(items) => items.map(item => addNivel(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, {nivelRisco: item} ))} />
  }
  if (showModalPlanosAcaoListSelect) {
    return <ModalListSelect dados={planosAcaoState} close={setShowModalPlanosAcaoListSelect} 
    setItensSelected={(items) => items.map(item => addPlanoAcao(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, { planoAcao: item }))} />
  }
  if (showModalIntencoesListSelect) {
    return <ModalListSelect dados={intencoesState} close={setShowModalIntencoesListSelect} 
    setItensSelected={(items) => items.map(item => addIntencao(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, planoAcaoSelectedIndex, item ))} />
  }
  if (showModalPrioridadesListSelect) {
    return <ModalListSelect dados={prioridadesState} close={setShowModalPrioridadesListSelect} 
    setItensSelected={(items) => items.map(item => addPrioridade(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, planoAcaoSelectedIndex, item ))} />
  }
  if (showModalPrazosListSelect) {
    return <ModalListSelect dados={prazosState} close={setShowModalPrazosListSelect} 
    setItensSelected={(items) => items.map(item => addPrazo(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, planoAcaoSelectedIndex, item ))} />
  }
  if (showModalMonitoramentosListSelect) {
    return <ModalListSelect dados={monitoramentoState} close={setShowModalMonitoramentosListSelect} 
    setItensSelected={(items) => items.map(item => addMonitoramento(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, planoAcaoSelectedIndex, {monitoramento: item} ))} />
  }
  if (showModalStatusListSelect) {
    return <ModalListSelect dados={statusState} close={setShowModalStatusListSelect} 
    setItensSelected={(items) => items.map(item => addStatus(setorSelectedIndex, funcaoSelectedIndex, atividadeSelectedIndex, perigoSelectedIndex, agenteRiscoSelectedIndex, riscoSelectedIndex, planoAcaoSelectedIndex, item ))} />
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
                        {...register('_id')}
                      />
                      <Styled.Label>Empresa: </Styled.Label>
                      <InputSearch items={empresasState} onSelect={(item) => setEmpresaSelected(item)} valueSelected={empresaSelected?.razaoSocial} field={'razaoSocial'} />
          
                      {errors.empresa && <span>Campo obrigatório</span>}

                      <Styled.Label>Data: </Styled.Label>
                      <DataPicker name="data" control={control} setValue={setValue} defaultValue={disSelected?.data} showTimeSelect={false}/>
                      {errors.data && <span>Campo obrigatório</span>}

                      <Styled.Label>Foto da Fachada: </Styled.Label>
                      <Styled.Input type='file' multiple name='files' {...register('files', { required: false })} />

                      <Styled.Label>Responsavel: </Styled.Label>
                      <Styled.Input
                        placeholder='Nome do responsavel'
                        {...register('responsavel', { required: false })}
                      />
                      {errors.responsavel && <span>Campo obrigatório</span>}
                      <Styled.Label>Função: </Styled.Label>
                      <Styled.Input
                        placeholder='Função do responsavel'
                        {...register('funcao', { required: false })}
                      />
                      {errors.responsavel && <span>Campo obrigatório</span>}
                      <Styled.Label>Telefone: </Styled.Label>
                      <Styled.Input
                        placeholder='Telefone do responsavel'
                        {...register('telefone', { required: false })}
                      />
                      {errors.telefone && <span>Campo obrigatório</span>}

                      <Styled.Label>E-mail: </Styled.Label>
                      <Styled.Input
                        type='email'
                        placeholder='E-mail'
                        {...register('email', { required: false })}
                      />
                      {errors.email && <span>Campo obrigatório</span>}

                      <Styled.Label>Ramo de atividade: </Styled.Label>
                      <Styled.Input
                        disabled
                        value={empresaSelected?.area?.nome}
                      />
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
                        {...register('observacaoAmbiente', { required: false })}
                      />
                      {errors.observacaoAmbiente && <span>Campo obrigatório</span>}

                      <ScrollableContainer>
                        <DiagnosticoContent>
                          {diagnosticoItems?.map((diagnosticoItem, index) => (
                            <DiagnosticoItemArea key={diagnosticoItem.id} >
                              <h3>{diagnosticoItem.label}</h3>
                              <DiagnosticoItem>
                                <DiagnosticoSearchArea>
                                <InputSearch items={diagnosticoItem.list} onSelect={diagnosticoItem.onSelect} /> <MdList  onClick={diagnosticoItem.handleListSelect} style={{height: '2em', width: '2em', cursor: 'pointer'}} />
                                </DiagnosticoSearchArea>
                                
                                {

                                  diagnosticoItem.items && diagnosticoItem.items.map((item, index) =>
                                  (

                                    <DignosticoItemSelectedArea key={index} onClick={(event) => diagnosticoItem.onSelected(event, index)} style={{ background: index === diagnosticoItem.selectedIndex ? '#CCC' : '#FFF' }}   >
                                      <p>{item?.nome}</p>
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
                  <Paginacao page={page} ativo={0} listagem={listarDis} />
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
                        <Styled.ListItem key={dis._id} onClick={(event) => handleShowDis(event, index)}>
                          {
                            Object.keys(dis).map((field, index) => {
                              if (field !== '_id' && listFields.hasOwnProperty(field)) {
                                if (listFields[field] === 'imagem')
                                  return (<Styled.CampoImg src={`${API_URL}/images/${dis[field]}`} />);
                                if (listFields[field] === 'json')
                                  return (<Styled.CampoValor>{dis[field].nome || dis[field].razaoSocial}</Styled.CampoValor>)
                                return (<Styled.CampoValor>{dis[field]}</Styled.CampoValor>)

                              }
                            })
                          }

                          <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', flex: 1 }} >
                            <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, dis._id)} style={{ height: '1.2em', width: '1.2em' }} />
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', flex: 1 }} >
                            <MdEditNote color='#005' onClick={(event) => { toggleSectionExpand(1, event); handleSelect(event, index) }} style={{ height: '1.2em', width: '1.2em' }} />
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
    empresas: state.empresa.empresas,
    areas: state.area.areas,
    causas: state.causa.causas,
    funcoes: state.funcao.funcoes,
    medidas: state.medida.medidas,
    nivelriscos: state.nivelrisco.nivelriscos,
    probabilidades: state.probabilidade.probabilidades,
    perigos: state.perigo.perigos,
    atividades: state.atividade.atividades,
    planosAcao: state.planoAcao.planosAcao,
    monitoramentos: state.monitoramento.monitoramentos,
    riscos: state.risco.riscos,
    setores: state.setor.setores,
    severidades: state.severidade.severidades,
    usuario: state.usuario.usuario,
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

    listarEmpresas: (page, ativo) => dispatch(listarEmpresasRequest(page, ativo)),

    listarAreas: (page, ativo) => dispatch(listarAreasRequest(page, ativo)),

    listarSetores: (page, ativo) => dispatch(listarSetoresRequest(page, ativo)),
    criarSetores: (setor) => dispatch(criarSetoresRequest(setor)),

    listarFuncoes: (page, ativo) => dispatch(listarFuncoesRequest(page, ativo)),
    criarFuncoes: (funcao) => dispatch(criarFuncoesRequest(funcao)),

    listarAtividades: (page, ativo) => dispatch(listarAtividadesRequest(page, ativo)),
    criarAtividades: (atividades) => dispatch(criarAtividadesRequest(atividades)),

    listarPerigos: (page, ativo) => dispatch(listarPerigosRequest(page, ativo)),
    criarPerigos: (perigo) => dispatch(criarPerigosRequest(perigo)),

    listarRiscos: (page, ativo) => dispatch(listarRiscosRequest(page, ativo)),
    criarRiscos: (risco) => dispatch(criarRiscosRequest(risco)),

    listarCausas: (page, ativo) => dispatch(listarCausasRequest(page, ativo)),
    criarCausas: (causa) => dispatch(criarCausasRequest(causa)),

    listarMedidas: (page, ativo) => dispatch(listarMedidasRequest(page, ativo)),
    criarMedidas: (medida) => dispatch(criarMedidasRequest(medida)),

    listarProbabilidades: (page, ativo) => dispatch(listarProbabilidadesRequest(page, ativo)),
    criarProbabilidades: (probabilidade) => dispatch(criarProbabilidadesRequest(probabilidade)),

    listarSeveridades: (page, ativo) => dispatch(listarSeveridadesRequest(page, ativo)),
    criarSeveridades: (severidade) => dispatch(criarSeveridadesRequest(severidade)),

    listarNivelriscos: (page, ativo) => dispatch(listarNivelriscosRequest(page, ativo)),
    criarNivelriscos: (nivelrisco) => dispatch(criarNivelriscosRequest(nivelrisco)),

    listarPlanosAcao: (page, ativo) => dispatch(listarPlanosAcaoRequest(page, ativo)),
    criarPlanosAcao: (planoAcao) => dispatch(criarPlanosAcaoRequest(planoAcao)),

    listarMonitoramentos: (page, ativo) => dispatch(listarMonitoramentosRequest(page, ativo)),
    criarMonitoramentos: (risco) => dispatch(criarMonitoramentosRequest(risco)),

    addSetor: (setor) => dispatch(addSetor(setor)),
    removeSetor: (setorId) => dispatch(removeSetor(setorId)),

    addFuncao: (setorIndex, funcao) => dispatch(addFuncao(setorIndex, funcao)),
    removeFuncao: (setorIndex, funcaoId) => dispatch(removeFuncao(setorIndex, funcaoId)),

    addAtividade: (setorIndex, funcaoIndex, atividade) => dispatch(addAtividade(setorIndex, funcaoIndex, atividade)),
    removeAtividade: (setorIndex, funcaoIndex, atividadeId) => dispatch(removeAtividade(setorIndex, funcaoIndex, atividadeId)),

    addPerigo: (setorIndex, funcaoIndex, atividadeIndex, perigo) => dispatch(addPerigo(setorIndex, funcaoIndex, atividadeIndex, perigo)),
    removePerigo: (setorIndex, funcaoIndex, atividadeIndex, perigoId) => dispatch(removePerigo(setorIndex, funcaoIndex, atividadeIndex, perigoId)),

    addAgenteRisco: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRisco) => dispatch(addAgenteRisco(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRisco)),
    removeAgenteRisco: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRisco) => dispatch(removeAgenteRisco(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRisco)),

    addRisco: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, risco) => dispatch(addRisco(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, risco)),
    removeRisco: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoId) => dispatch(removeRisco(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoId)),

    addViaAbsorcao: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, viaAbsorcao) => dispatch(addViaAbsorcao(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, viaAbsorcao)),
    removeViaAbsorcao: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, viaAbsorcaoId) => dispatch(removeViaAbsorcao(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, viaAbsorcaoId)),
    
    addFrequenciaExposicao: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, frequenciaExposicao) => dispatch(addFrequenciaExposicao(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, frequenciaExposicao)),
    removeFrequenciaExposicao: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, frequenciaExposicaoId) => dispatch(removeFrequenciaExposicao(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, frequenciaExposicaoId)),
    
    addDuracaoExposicao: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, duracaoExposicao) => dispatch(addDuracaoExposicao(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, duracaoExposicao)),
    removeDuracaoExposicao: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, duracaoExposicaoId) => dispatch(removeDuracaoExposicao(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, duracaoExposicaoId)),
    
    addCausa: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, causa) => dispatch(addCausa(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, causa)),
    removeCausa: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, causaId) => dispatch(removeCausa(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, causaId)),
    
    addMedida: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, medida) => dispatch(addMedida(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, medida)),
    removeMedida: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, medidaId) => dispatch(removeMedida(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, medidaId)),
   
    addAvaliacao: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, avaliacao) => dispatch(addAvaliacao(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, avaliacao)),
    removeAvaliacao: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, avaliacaoId) => dispatch(removeAvaliacao(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, avaliacaoId)),
    
    addProbabilidade: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, probabilidade) => dispatch(addProbabilidade(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, probabilidade)),
    removeProbabilidade: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, probabilidadeId) => dispatch(removeProbabilidade(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, probabilidadeId)),
    
    addSeveridade: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, severidade) => dispatch(addSeveridade(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, severidade)),
    removeSeveridade: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, severidadeId) => dispatch(removeSeveridade(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, severidadeId)),
    
    addNivel: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, nivel) => dispatch(addNivel(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, nivel)),
    removeNivel: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, nivelId) => dispatch(removeNivel(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, nivelId)),

    addPlanoAcao: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcao) => dispatch(addPlanoAcao(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcao)),
    removePlanoAcao: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoId) => dispatch(removePlanoAcao(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoId)),

    addIntencao: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, intencao) => dispatch(addIntencao(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, intencao)),
    removeIntencao: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, intencaoId) => dispatch(removeIntencao(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, intencaoId)),

    addPrioridade: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, prioridade) => dispatch(addPrioridade(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, prioridade)),
    removePrioridade: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, prioridadeId) => dispatch(removePrioridade(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, prioridadeId)),

    addPrazo: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, prazo) => dispatch(addPrazo(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, prazo)),
    removePrazo: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, prazoId) => dispatch(removePrazo(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, prazoId)),

    addMonitoramento: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, monitoramento) => dispatch(addMonitoramento(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, monitoramento)),
    removeMonitoramento: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, monitoramentoId) => dispatch(removeMonitoramento(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, monitoramentoId)),

    addStatus: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, status) => dispatch(addStatus(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, status)),
    removeStatus: (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, statusId) => dispatch(removeStatus(setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, statusId)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dis);