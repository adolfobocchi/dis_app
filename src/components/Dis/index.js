import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

import ModalLoading from '../ModalLoading';

import { updateDisRequest, criarDisRequest, deleteDisRequest, listarDisRequest, setDis } from '../../store/modules/Dis/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';

import { MdAdd, MdAddCircle, MdEdit, MdEditNote, MdHighlightOff, MdKeyboardArrowDown, MdKeyboardArrowUp, MdList, MdSearch, MdViewList } from 'react-icons/md';

import * as Styled from '../styleds';
import styled from 'styled-components';

import InputSearch from '../InputSearch';

import { listarEmpresasRequest, listarGruposRequest } from '../../store/modules/Empresa/actions';
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
import { showInformation } from '../../store/modules/Information/actions';
import SelectSearch from '../SelectSearch';

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
  font-size: 1.1em;
`;
const DiagnosticoItem = styled.div`
  display: flex;
  width: 300px;
  border: 1px solid #666666;
  margin: 8px;
  flex-direction: column;
  padding: 6px;
  min-height: 280px;
  font-size: 0.8em;

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

`;

const Titulo3 = styled.Titulo = styled.h3`
  font-size: 0.99;
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
  informacao,
  listarEmpresas,
  listarAreas,
  listarSetores,
  criarSetores,
  listarFuncoes,
  criarFuncoes,
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
  usuario,
  grupos,
  listarGrupos
}) => {

  const formRef = useRef(null);

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
    setores: [],
    funcoes: [],
    atividades: [],
    perigos: [],
    riscos: [],
    agentesRisco: [],
    viasAbsorcao: [],
    frequenciaExposicao: [],
    duracaoExposicao: [],
    causas: [],
    medidas: [],
    avaliacao: [],
    probabilidades: [],
    severidades: [],
    niveisRisco: [],
    planosAcao: [],
    intencao: [],
    prioridade: [],
    prazo: [],
    monitoramentos: [],
    status: []
  }

  const listFields = {
    empresa: 'json',
    data: 'data',
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
  const [showModalDescricaoSetorSelect, setShowModalDescricaoSetorSelect] = useState(false);
  const [showModalDescricaoFuncaoSelect, setShowModalDescricaoFuncaoSelect] = useState(false);

  const [disListState, setDisListState] = useState([]);

  const [gruposState, setGruposState] = useState([]);
  const [grupoSelected, setGrupoSelected] = useState(null);
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
  const [setorSelected, setSetorSelected] = useState(null);
  const [funcaoSelected, setFuncaoSelected] = useState(null);
  const [atividadeSelected, setAtividadeSelected] = useState(null);
  const [perigoSelected, setPerigoSelected] = useState(null);
  const [riscoSelected, setRiscoSelected] = useState(null);
  const [agenteRiscoSelected, setAgenteRiscoSelected] = useState({});
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

  const [quantidadeFuncaoState, setQuantidadeFuncaoState] = useState(0);

  const [inputValue, setInputValue] = useState({nome: '', ativo: 1});

  const [disSelected, setDisSelected] = useState(formEmpty);
  const { register, control, setValue, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: disSelected
  });

  const [sectionItems, setSectionItems] = useState([
    { id: 1, label: 'Cadastro', expanded: false, sections: [{ id: 1, label: 'Cadastro', expanded: false, component: 'formulario' },], icon: <MdEdit /> },
    { id: 2, label: 'Pesquisa', expanded: true, sections: [{ id: 1, label: 'Pesquisa', expanded: false, component: 'search' },], icon: <MdSearch /> },
    { id: 3, label: 'Listagem', expanded: true, sections: [{ id: 1, label: 'Listagem', expanded: false, component: 'listagem' },], icon: <MdViewList /> },
  ])

  const [sectionCadItems, setSectionCadItems] = useState([
    { id: 0, label: 'Geral', expanded: true, sections: [{ id: 1, label: 'Geral', expanded: false, component: 'geral' },], icon: <MdEdit /> },
    { id: 1, label: 'Setor', expanded: false, sections: [{ id: 1, label: 'Setor', expanded: false, component: 'setor' },], icon: <MdEdit /> },
    { id: 2, label: 'Função', expanded: false, sections: [{ id: 1, label: 'Função', expanded: false, component: 'funcao' },], icon: <MdEdit /> },
    { id: 3, label: 'Diagnóstico', expanded: false, sections: [{ id: 1, label: 'Diagnóstico', expanded: false, component: 'diagnostico' },], icon: <MdEdit /> },
  ])

  const [activeTab, setActiveTab] = useState('Geral'); // Valor padrão como 'geral'

  const [diagnosticoItems, setDiagnotiscoItems] = useState([


  ])

  const scrollPositionRef = useRef(null);

  useEffect(() => {
    listarDis(page, 1);
    listarEmpresas(0, 1);
    listarGrupos(0, 1);
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
    const handleClickOutside = (event) => {
      // if (!event.target.closest('.element-to-keep-selected')) {
      //   setSetorSelected(null);
      //   setSetorSelectedIndex(-1);
      //   setFuncaoSelected(null);
      //   setFuncaoSelectedIndex(-1);
      //   setAtividadeSelected(null);
      //   setAtividadeSelectedIndex(-1)
      //   setPerigoSelected(null);
      //   setPerigoSelectedIndex(-1)
      //   setRiscoSelected(null);
      //   setRiscoSelectedIndex(-1)
      //   setPlanoAcaoSelected(null);
      //   setPlanoAcaoSelectedIndex(-1);
      // }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setDisListState(disList);
  }, [disList]);

  useEffect(() => {
    setGruposState(grupos);
  }, [grupos]);

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
        if (chave === 'responsavel' || chave === 'funcao' || chave === 'email' || chave === 'telefone')
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
        items: disSelected.setores.map(setor => setor?.setor) || [],
        onSelect: (item) => {
          // const exists = disSelected?.setores.find((el) => el.setor?._id === item._id);
          // if (!exists || exists) {
          //   const update = [...disSelected?.setores, { setor: item, descricao: '', setorImg: '' }];
          //   setDisSelected((prevState) => ({
          //     ...prevState,
          //     setores: update,
          //   }));
          // }
          addSetor([item]);
        },
        onSelected: (event, index) => { handleClearSelecteds(); setSetorSelected(disSelected.setores.find(setor => setor?.setor?._id === index)?.setor); },
        onDelete: (event, id) => {
          const update = disSelected?.setores.filter((el) => el?.setor?._id !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            setores: update,
          }));
          const updateFuncoes = disSelected?.funcoes.filter((el) => el?.setor !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            funcoes: updateFuncoes,
          }));

          const updateAtividades = disSelected?.atividades.filter((el) => el?.setor !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            atividades: updateAtividades,
          }));

          const updatePerigos = disSelected?.perigos.filter((el) => el?.setor !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            perigos: updatePerigos,
          }));

          const updateRisco = disSelected?.riscos.filter((el) => el?.setor !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            riscos: updateRisco,
          }));

          const updateAgentesRisco = disSelected?.agentesRisco.filter((el) => el?.setor !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            agentesRisco: updateAgentesRisco,
          }));

          const updateViaAbsorcao = disSelected?.viasAbsorcao.filter((el) => el?.setor !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            viasAbsorcao: updateViaAbsorcao,
          }));
          const updateFrequenciaExposicao = disSelected?.frequenciaExposicao.filter((el) => el?.setor !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            frequenciaExposicao: updateFrequenciaExposicao,
          }));
          const updateDuracaoExposicao = disSelected?.duracaoExposicao.filter((el) => el?.setor !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            duracaoExposicao: updateDuracaoExposicao,
          }));
          const updateCausas = disSelected?.causas.filter((el) => el?.setor !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            causas: updateCausas,
          }));
          const updateMedidas = disSelected?.medidas.filter((el) => el?.setor !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            medidas: updateMedidas,
          }));
          const updateAvaliacao = disSelected?.avaliacao.filter((el) => el?.setor !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            avaliacao: updateAvaliacao,
          }));
          const updateProbabilidades = disSelected?.probabilidades.filter((el) => el?.setor !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            probabilidades: updateProbabilidades,
          }));
          const updateSeveridades = disSelected?.severidades.filter((el) => el?.setor !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            severidades: updateSeveridades,
          }));
          const updateNiveisRisco = disSelected?.niveisRisco.filter((el) => el?.setor !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            niveisRisco: updateNiveisRisco,
          }));
          const updatePlanosAcao = disSelected?.planosAcao.filter((el) => el?.setor !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            planosAcao: updatePlanosAcao,
          }));
          handleClearSelecteds();
        },
        selectedIndex: setorSelected,
        handleListSelect: () => { setShowModalSetoresListSelect(true); },
        doublelClick: () => { setorSelected && setShowModalDescricaoSetorSelect(true); },
        setValueChange: (value) => { setInputValue({nome: value})},
        addItem: () => {console.log(inputValue); criarSetores(inputValue)}
      },
      {
        id: 2,
        label: 'Funções:',
        list: funcoesState,
        items: setorSelected ? disSelected.funcoes.filter(el => el?.setor === setorSelected?._id).map(el => el?.funcao) : disSelected.funcoes.flatMap(el => el?.funcao) || [],
        onSelect: (item) => {
          // const exists = disSelected?.funcoes.find((el) => el?.funcao._id === item._id);
          // if (!exists || exists) {
          //   const update = [...disSelected?.funcoes, { funcao: item, setor: setorSelected?._id, quantidade: 0, descricao: '' }];
          //   setDisSelected((prevState) => ({
          //     ...prevState,
          //     funcoes: update,
          //   }));
          // }
          addFuncao([item])
        },
        onSelected: (event, index) => { setFuncaoSelected(disSelected.funcoes.find(funcao => funcao?.funcao?._id === index)?.funcao); },
        onDelete: (event, id) => {
          const update = disSelected?.funcoes.filter((el) => el.funcao._id !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            funcoes: update,
          }));
          const updateAtividades = disSelected?.atividades.filter((el) => el?.funcao !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            atividades: updateAtividades,
          }));

          const updatePerigos = disSelected?.perigos.filter((el) => el?.funcao !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            perigos: updatePerigos,
          }));

          const updateRisco = disSelected?.riscos.filter((el) => el?.funcao !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            riscos: updateRisco,
          }));

          const updateAgentesRisco = disSelected?.agentesRisco.filter((el) => el?.funcao !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            agentesRisco: updateAgentesRisco,
          }));

          const updateViaAbsorcao = disSelected?.viasAbsorcao.filter((el) => el?.funcao !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            viasAbsorcao: updateViaAbsorcao,
          }));
          const updateFrequenciaExposicao = disSelected?.frequenciaExposicao.filter((el) => el?.funcao !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            frequenciaExposicao: updateFrequenciaExposicao,
          }));
          const updateDuracaoExposicao = disSelected?.duracaoExposicao.filter((el) => el?.funcao !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            duracaoExposicao: updateDuracaoExposicao,
          }));
          const updateCausas = disSelected?.causas.filter((el) => el?.funcao !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            causas: updateCausas,
          }));
          const updateMedidas = disSelected?.medidas.filter((el) => el?.funcao !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            medidas: updateMedidas,
          }));
          const updateAvaliacao = disSelected?.avaliacao.filter((el) => el?.funcao !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            avaliacao: updateAvaliacao,
          }));
          const updateProbabilidades = disSelected?.probabilidades.filter((el) => el?.funcao !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            probabilidades: updateProbabilidades,
          }));
          const updateSeveridades = disSelected?.severidades.filter((el) => el?.funcao !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            severidades: updateSeveridades,
          }));
          const updateNiveisRisco = disSelected?.niveisRisco.filter((el) => el?.funcao !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            niveisRisco: updateNiveisRisco,
          }));
          const updatePlanosAcao = disSelected?.planosAcao.filter((el) => el?.funcao !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            planosAcao: updatePlanosAcao,
          }));
          //handleClearSelecteds();
        },
        selectedIndex: funcaoSelected,
        handleListSelect: () => { setorSelected && setShowModalFuncoesListSelect(true); },
        doublelClick: () => { setorSelected && funcaoSelected && setShowModalDescricaoFuncaoSelect(true); },
        setValueChange: (value) => { setInputValue({nome: value})},
        addItem: () => {console.log(inputValue); criarFuncoes(inputValue)}
      },
      // {
      //   id: 3,
      //   label: 'Atividades Realizadas:',
      //   list: atividadesState,
      //   items: setorSelected ? disSelected.atividades.filter(el => el.setor === setorSelected?._id).filter(el => el.funcao === funcaoSelected?._id).map(el => el?.atividade) : disSelected.atividades.flatMap(el => el?.atividade) || [],
      //   onSelect: (item) => {
      //     const exists = disSelected?.atividades.find((el) => el?.atividade._id === item._id);
      //     if (!exists || exists) {
      //       const update = [...disSelected?.atividades, { atividade: item, setor: setorSelected?._id, funcao: funcaoSelected?._id }];
      //       setDisSelected((prevState) => ({
      //         ...prevState,
      //         atividades: update,
      //       }));
      //     }
      //   },
      //   onSelected: (event, index) => { setAtividadeSelected(disSelected.atividades[index].atividade); setAtividadeSelectedIndex(index) },
      //   onDelete: (event, id) => {
      //     const update = disSelected?.atividades.filter((el) => el?.atividade._id !== id);
      //     setDisSelected((prevState) => ({
      //       ...prevState,
      //       atividades: update,
      //     }));
      //     const updatePerigos = disSelected?.perigos.filter((el) => el?.atividade !== id);
      //     setDisSelected((prevState) => ({
      //       ...prevState,
      //       perigos: updatePerigos,
      //     }));

      //     const updateRisco = disSelected?.riscos.filter((el) => el?.atividade !== id);
      //     setDisSelected((prevState) => ({
      //       ...prevState,
      //       riscos: updateRisco,
      //     }));

      //     const updateAgentesRisco = disSelected?.agentesRisco.filter((el) => el?.atividade !== id);
      //     setDisSelected((prevState) => ({
      //       ...prevState,
      //       agentesRisco: updateAgentesRisco,
      //     }));

      //     const updateViaAbsorcao = disSelected?.viasAbsorcao.filter((el) => el?.atividade !== id);
      //     setDisSelected((prevState) => ({
      //       ...prevState,
      //       viasAbsorcao: updateViaAbsorcao,
      //     }));
      //     const updateFrequenciaExposicao = disSelected?.frequenciaExposicao.filter((el) => el?.atividade !== id);
      //     setDisSelected((prevState) => ({
      //       ...prevState,
      //       frequenciaExposicao: updateFrequenciaExposicao,
      //     }));
      //     const updateDuracaoExposicao = disSelected?.duracaoExposicao.filter((el) => el?.atividade !== id);
      //     setDisSelected((prevState) => ({
      //       ...prevState,
      //       duracaoExposicao: updateDuracaoExposicao,
      //     }));
      //     const updateCausas = disSelected?.causas.filter((el) => el?.atividade !== id);
      //     setDisSelected((prevState) => ({
      //       ...prevState,
      //       causas: updateCausas,
      //     }));
      //     const updateMedidas = disSelected?.medidas.filter((el) => el?.atividade !== id);
      //     setDisSelected((prevState) => ({
      //       ...prevState,
      //       medidas: updateMedidas,
      //     }));
      //     const updateAvaliacao = disSelected?.avaliacao.filter((el) => el?.atividade !== id);
      //     setDisSelected((prevState) => ({
      //       ...prevState,
      //       avaliacao: updateAvaliacao,
      //     }));
      //     const updateProbabilidades = disSelected?.probabilidades.filter((el) => el?.atividade !== id);
      //     setDisSelected((prevState) => ({
      //       ...prevState,
      //       probabilidades: updateProbabilidades,
      //     }));
      //     const updateSeveridades = disSelected?.severidades.filter((el) => el?.atividade !== id);
      //     setDisSelected((prevState) => ({
      //       ...prevState,
      //       severidades: updateSeveridades,
      //     }));
      //     const updateNiveisRisco = disSelected?.niveisRisco.filter((el) => el?.atividade !== id);
      //     setDisSelected((prevState) => ({
      //       ...prevState,
      //       niveisRisco: updateNiveisRisco,
      //     }));
      //     const updatePlanosAcao = disSelected?.planosAcao.filter((el) => el?.atividade !== id);
      //     setDisSelected((prevState) => ({
      //       ...prevState,
      //       planosAcao: updatePlanosAcao,
      //     }));
      //     handleClearSelecteds();
      //   },
      //   selectedIndex: atividadeSelectedIndex,
      //   handleListSelect: () => { funcaoSelectedIndex >= 0 && setShowModalAtividadesListSelect(true); }
      // },
      {
        id: 4,
        label: 'Fonte ou Circunstância:',
        list: perigosState,
        items: setorSelected ? disSelected.perigos.filter(el => el.setor === setorSelected?._id).filter(el => el.funcao === funcaoSelected?._id).filter(el => el.atividade === atividadeSelected?._id).map(el => el?.perigo)
          : disSelected.perigos.flatMap(el => el?.perigo) || [],
        onSelect: (item) => {
          // const exists = disSelected?.perigos.find((el) => el?.perigo._id === item._id);
          // if (!exists || exists) {
          //   const update = [...disSelected?.perigos, { perigo: item, atividade: atividadeSelected?._id, setor: setorSelected?._id, funcao: funcaoSelected?._id }];
          //   setDisSelected((prevState) => ({
          //     ...prevState,
          //     perigos: update,
          //   }));
          addPerigo([item]);

        },
        onSelected: (event, index) => { setPerigoSelected(disSelected.perigos.find(perigo => perigo?.perigo?._id === index).perigo); },
        onDelete: (event, id) => {
          const update = disSelected?.perigos.filter((el) => el?.perigo._id !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            perigos: update,
          }));
          const updateRisco = disSelected?.riscos.filter((el) => el?.perigo !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            riscos: updateRisco,
          }));

          const updateAgentesRisco = disSelected?.agentesRisco.filter((el) => el?.perigo !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            agentesRisco: updateAgentesRisco,
          }));

          const updateViaAbsorcao = disSelected?.viasAbsorcao.filter((el) => el?.perigo !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            viasAbsorcao: updateViaAbsorcao,
          }));
          const updateFrequenciaExposicao = disSelected?.frequenciaExposicao.filter((el) => el?.perigo !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            frequenciaExposicao: updateFrequenciaExposicao,
          }));
          const updateDuracaoExposicao = disSelected?.duracaoExposicao.filter((el) => el?.perigo !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            duracaoExposicao: updateDuracaoExposicao,
          }));
          const updateCausas = disSelected?.causas.filter((el) => el?.perigo !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            causas: updateCausas,
          }));
          const updateMedidas = disSelected?.medidas.filter((el) => el?.perigo !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            medidas: updateMedidas,
          }));
          const updateAvaliacao = disSelected?.avaliacao.filter((el) => el?.perigo !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            avaliacao: updateAvaliacao,
          }));
          const updateProbabilidades = disSelected?.probabilidades.filter((el) => el?.perigo !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            probabilidades: updateProbabilidades,
          }));
          const updateSeveridades = disSelected?.severidades.filter((el) => el?.perigo !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            severidades: updateSeveridades,
          }));
          const updateNiveisRisco = disSelected?.niveisRisco.filter((el) => el?.perigo !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            niveisRisco: updateNiveisRisco,
          }));
          const updatePlanosAcao = disSelected?.planosAcao.filter((el) => el?.perigo !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            planosAcao: updatePlanosAcao,
          }));
          // handleClearSelecteds();
        },
        selectedIndex: perigoSelected,
        handleListSelect: () => { setorSelected && funcaoSelected && setShowModalPerigosListSelect(true); }
      },

      {
        id: 5,
        label: 'Riscos',
        list: riscosState,
        items: setorSelected ? disSelected.riscos.filter(el => el.setor === setorSelected?._id).filter(el => el.funcao === funcaoSelected?._id).filter(el => el.atividade === atividadeSelected?._id).filter(el => el.perigo === perigoSelected?._id).map(el => el?.risco)
          : disSelected.riscos.flatMap(el => el?.risco) || [],
        onSelect: (item) => {
          // const exists = disSelected?.riscos.find((el) => el?.risco._id === item._id);
          // if (!exists || exists) {
          //   const update = [...disSelected?.riscos, { risco: item, perigo: perigoSelected?._id, atividade: atividadeSelected?._id, setor: setorSelected?._id, funcao: funcaoSelected?._id }];
          //   setDisSelected((prevState) => ({
          //     ...prevState,
          //     riscos: update,
          //   }));

          // }
          addRisco([item]);
        },
        onSelected: (event, index) => { setRiscoSelected(disSelected.riscos.find(risco => risco?.risco?._id === index).risco) },
        onDelete: (event, id) => {
          const update = disSelected?.riscos.filter((el) => el?.risco._id !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            riscos: update,
          }));
          const updateAgentesRisco = disSelected?.agentesRisco.filter((el) => el?.risco !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            agentesRisco: updateAgentesRisco,
          }));

          const updateViaAbsorcao = disSelected?.viasAbsorcao.filter((el) => el?.risco !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            viasAbsorcao: updateViaAbsorcao,
          }));
          const updateFrequenciaExposicao = disSelected?.frequenciaExposicao.filter((el) => el?.risco !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            frequenciaExposicao: updateFrequenciaExposicao,
          }));
          const updateDuracaoExposicao = disSelected?.duracaoExposicao.filter((el) => el?.risco !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            duracaoExposicao: updateDuracaoExposicao,
          }));
          const updateCausas = disSelected?.causas.filter((el) => el?.risco !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            causas: updateCausas,
          }));
          const updateMedidas = disSelected?.medidas.filter((el) => el?.risco !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            medidas: updateMedidas,
          }));
          const updateAvaliacao = disSelected?.avaliacao.filter((el) => el?.risco !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            avaliacao: updateAvaliacao,
          }));
          const updateProbabilidades = disSelected?.probabilidades.filter((el) => el?.risco !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            probabilidades: updateProbabilidades,
          }));
          const updateSeveridades = disSelected?.severidades.filter((el) => el?.risco !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            severidades: updateSeveridades,
          }));
          const updateNiveisRisco = disSelected?.niveisRisco.filter((el) => el?.risco !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            niveisRisco: updateNiveisRisco,
          }));
          const updatePlanosAcao = disSelected?.planosAcao.filter((el) => el?.risco !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            planosAcao: updatePlanosAcao,
          }));
          // handleClearSelecteds();
        },
        selectedIndex: riscoSelected,
        handleListSelect: (event) => {
          event.preventDefault();
          event.stopPropagation(); perigoSelected && setShowModalRiscosListSelect(true); scrollPositionRef.current = window.scrollY; if (scrollPositionRef.current !== null) {
            window.scrollTo(0, scrollPositionRef.current);
          }
        }
      },
      {
        id: 6,
        label: 'Agentes de risco:',
        list: agentesRiscoState,
        items: setorSelected ? disSelected.agentesRisco.filter(el => el.setor === setorSelected?._id).filter(el => el.funcao === funcaoSelected?._id).filter(el => el.atividade === atividadeSelected?._id).filter(el => el.perigo === perigoSelected?._id).filter(el => el.risco === riscoSelected?._id).map(el => el?.agenteRisco)
          : disSelected.agentesRisco.flatMap(el => el?.agenteRisco) || [],
        onSelect: (item) => {
          // const exists = disSelected?.agentesRisco.find((el) => el?.agenteRisco._id === item._id);
          // if (!exists || exists) {
          //   const update = [...disSelected?.agentesRisco, { agenteRisco: item, risco: riscoSelected?._id, perigo: perigoSelected?._id, atividade: atividadeSelected?._id, setor: setorSelected?._id, funcao: funcaoSelected?._id }];
          //   setDisSelected((prevState) => ({
          //     ...prevState,
          //     agentesRisco: update,
          //   }));

          // }
          addAgenteRisco([item])
        },
        onSelected: (event, index) => { setAgenteRiscoSelected(disSelected.agentesRisco.find(el => el?.agenteRisco?._id === index).agenteRisco) },
        onDelete: (event, id) => {
          const update = disSelected?.agentesRisco.filter((el) => el?.agenteRisco._id !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            agentesRisco: update,
          }));
        },
        selectedIndex: agenteRiscoSelected,
        handleListSelect: () => { riscoSelected && setShowModalAgentesRiscoListSelect(true); }
      },
      {
        id: 7,
        label: 'Vias de absorção:',
        list: viasAbsorcaoState,
        items: setorSelected ? disSelected.viasAbsorcao.filter(el => el.setor === setorSelected?._id).filter(el => el.funcao === funcaoSelected?._id).filter(el => el.atividade === atividadeSelected?._id).filter(el => el.perigo === perigoSelected?._id).filter(el => el.risco === riscoSelected?._id).map(el => el?.viaAbsorcao)
          : disSelected.viasAbsorcao.flatMap(el => el?.viaAbsorcao) || [],
        onSelect: (item) => {
          item.risco = riscoSelected;
          // const exists = disSelected?.viasAbsorcao.find((el) => el?.viaAbsorcao._id === item._id);
          // if (!exists || exists) {
          //   const update = [...disSelected?.viasAbsorcao, { viaAbsorcao: item, risco: riscoSelected?._id, perigo: perigoSelected?._id, atividade: atividadeSelected?._id, setor: setorSelected?._id, funcao: funcaoSelected?._id }];
          //   setDisSelected((prevState) => ({
          //     ...prevState,
          //     viasAbsorcao: update,
          //   }));

          // }
          addViaAbsorcao([item])
        },
        onSelected: (event, index) => { setViaAbsorcaoSelected(disSelected.viasAbsorcao.find(el => el?.viaAbsorcao?._id === index).viaAbsorcao) },
        onDelete: (event, id) => {
          const update = disSelected?.viasAbsorcao.filter((el) => el?.viaAbsorcao._id !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            viasAbsorcao: update,
          }));
        },
        selectedIndex: viaAbsorcaoSelected,
        handleListSelect: () => { riscoSelected && setShowModalViasAbsorcaoListSelect(true); }
      },
      {
        id: 8,
        label: 'Frequência da exposição ao risco:',
        list: frequenciasExposicaoState,
        items: setorSelected ? disSelected.frequenciaExposicao.filter(el => el.setor === setorSelected?._id).filter(el => el.funcao === funcaoSelected?._id).filter(el => el.atividade === atividadeSelected?._id).filter(el => el.perigo === perigoSelected?._id).filter(el => el.risco === riscoSelected?._id).map(el => el?.frequenciaExposicao)
          : disSelected.frequenciaExposicao.flatMap(el => el?.frequenciaExposicao) || [],
        onSelect: (item) => {
          // const exists = disSelected?.frequenciaExposicao.find((el) => el?.frequenciaExposicao._id === item._id);
          // if (!exists || exists) {
          //   const update = [...disSelected?.frequenciaExposicao, { frequenciaExposicao: item, risco: riscoSelected?._id, perigo: perigoSelected?._id, atividade: atividadeSelected?._id, setor: setorSelected?._id, funcao: funcaoSelected?._id }];
          //   setDisSelected((prevState) => ({
          //     ...prevState,
          //     frequenciaExposicao: update,
          //   }));

          // }
          addFrequenciaExposicao([item]);
        },
        onSelected: (event, index) => { setFrequenciaExposicaoSelected(disSelected.frequenciaExposicao.find(el => el?.frequenciaExposicao?._id === index).frequenciaExposicao); setFrequenciaExposicaoSelectedIndex(disSelected.frequenciaExposicao.findIndex(el => el?.frequenciaExposicao?._id === index)) },
        onDelete: (event, id) => {
          const update = disSelected?.frequenciaExposicao.filter((el) => el?.frequenciaExposicao._id !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            frequenciaExposicao: update,
          }));
        },
        selectedIndex: frequenciaExposicaoSelected,
        handleListSelect: () => { riscoSelected && setShowModalFrequenciaExposicaoListSelect(true); }
      },
      {
        id: 9,
        label: 'Duração de exposição ao risco:',
        list: duracaoExposicaoState,
        items: setorSelected ? disSelected.duracaoExposicao.filter(el => el.setor === setorSelected?._id).filter(el => el.funcao === funcaoSelected?._id).filter(el => el.atividade === atividadeSelected?._id).filter(el => el.perigo === perigoSelected?._id).filter(el => el.risco === riscoSelected?._id).map(el => el?.duracaoExposicao)
          : disSelected.duracaoExposicao.flatMap(el => el?.duracaoExposicao) || [],
        onSelect: (item) => {
          // const exists = disSelected?.duracaoExposicao.find((el) => el?.duracaoExposicao._id === item._id);
          // if (!exists || exists) {
          //   const update = [...disSelected?.duracaoExposicao, { duracaoExposicao: item, risco: riscoSelected?._id, perigo: perigoSelected?._id, atividade: atividadeSelected?._id, setor: setorSelected?._id, funcao: funcaoSelected?._id }];
          //   setDisSelected((prevState) => ({
          //     ...prevState,
          //     duracaoExposicao: update,
          //   }));

          // }
          addDuracaoExposicao([item])
        },
        onSelected: (event, index) => { setDuracaoExposicaoSelected(disSelected.duracaoExposicao.find(el => el?.duracaoExposicao?._id === index).duracaoExposicao); setDuracaoExposicaoSelectedIndex(disSelected.duracaoExposicao.findIndex(el => el?.duracaoExposicao?._id === index)) },
        onDelete: (event, id) => {
          const update = disSelected?.duracaoExposicao.filter((el) => el?.duracaoExposicao._id !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            duracaoExposicao: update,
          }));
        },
        selectedIndex: duracaoExposicaoSelected,
        handleListSelect: () => { riscoSelected && setShowModalDuracaoExposicaoListSelect(true); }
      },
      {
        id: 10,
        label: 'Possiveis lesões ou agravos a saúde:',
        list: causasState,
        items: setorSelected ? disSelected.causas.filter(el => el.setor === setorSelected?._id).filter(el => el.funcao === funcaoSelected?._id).filter(el => el.atividade === atividadeSelected?._id).filter(el => el.perigo === perigoSelected?._id).filter(el => el.risco === riscoSelected?._id).map(el => el?.causa)
          : disSelected.causas.flatMap(el => el?.causa) || [],
        onSelect: (item) => {
          // const exists = disSelected?.causas.find((el) => el?.causa._id === item._id);
          // if (!exists || exists) {
          //   const update = [...disSelected?.causas, { causa: item, risco: riscoSelected?._id, perigo: perigoSelected?._id, atividade: atividadeSelected?._id, setor: setorSelected?._id, funcao: funcaoSelected?._id }];
          //   setDisSelected((prevState) => ({
          //     ...prevState,
          //     causas: update,
          //   }));

          // }
          addCausa([item])
        },
        onSelected: (event, index) => { setCausaSelected(disSelected.causas.find(el => el?.causa?._id === index).causa); setCausaSelectedIndex(disSelected.causas.findIndex(el => el?.causa?._id === index)) },
        onDelete: (event, id) => {
          const update = disSelected?.causas.filter((el) => el?.causa._id !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            causas: update,
          }));
        },
        selectedIndex: causaSelected,
        handleListSelect: () => { riscoSelected && setShowModalCausasListSelect(true); }
      },
      {
        id: 11,
        label: 'Medida de controle existente:',
        list: medidasState,
        items: setorSelected ? disSelected.medidas.filter(el => el.setor === setorSelected?._id).filter(el => el.funcao === funcaoSelected?._id).filter(el => el.atividade === atividadeSelected?._id).filter(el => el.perigo === perigoSelected?._id).filter(el => el.risco === riscoSelected?._id).map(el => el?.medida)
          : disSelected.medidas.flatMap(el => el?.medida) || [],
        onSelect: (item) => {
          // const exists = disSelected?.medidas.find((el) => el?.medida._id === item._id);
          // if (!exists || exists) {
          //   const update = [...disSelected?.medidas, { medida: item, risco: riscoSelected?._id, perigo: perigoSelected?._id, atividade: atividadeSelected?._id, setor: setorSelected?._id, funcao: funcaoSelected?._id }];
          //   setDisSelected((prevState) => ({
          //     ...prevState,
          //     medidas: update,
          //   }));

          // }
          addMedida([item])
        },
        onSelected: (event, index) => { setMedidaSelected(disSelected.medidas.find(el => el?.medida?._id === index).medida); setMedidaSelectedIndex(disSelected.medidas.findIndex(el => el?.medida?._id === index)) },
        onDelete: (event, id) => {
          const update = disSelected?.medidas.filter((el) => el?.medida._id !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            medidas: update,
          }));
        },
        selectedIndex: medidaSelected,
        handleListSelect: () => { riscoSelected && setShowModalMedidasListSelect(true); }
      },
      {
        id: 12,
        label: 'Avaliação quantitativa:',
        list: avaliacoesState,
        items: setorSelected ? disSelected.avaliacao.filter(el => el.setor === setorSelected?._id).filter(el => el.funcao === funcaoSelected?._id).filter(el => el.atividade === atividadeSelected?._id).filter(el => el.perigo === perigoSelected?._id).filter(el => el.risco === riscoSelected?._id).map(el => el?.avaliacao)
          : disSelected.avaliacao.flatMap(el => el?.avaliacao) || [],
        onSelect: (item) => {
          // const exists = disSelected?.avaliacao.find((el) => el?.avaliacao._id === item._id);
          // if (!exists || exists) {
          //   const update = [...disSelected?.avaliacao, { avaliacao: item, risco: riscoSelected?._id, perigo: perigoSelected?._id, atividade: atividadeSelected?._id, setor: setorSelected?._id, funcao: funcaoSelected?._id }];
          //   setDisSelected((prevState) => ({
          //     ...prevState,
          //     avaliacao: update,
          //   }));

          // }
          addAvaliacao([item]);
        },
        onSelected: (event, index) => { setAvaliacaoSelected(disSelected.avaliacao.find(el => el?.avaliacao?._id === index).avaliacao); setAvaliacaoSelectedIndex(disSelected.avaliacao.findIndex(el => el?.avaliacao?._id === index)) },
        onDelete: (event, id) => {
          const update = disSelected?.avaliacao.filter((el) => el?.avaliacao._id !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            avaliacao: update,
          }));
        },
        selectedIndex: avaliacaoSelected,
        handleListSelect: () => { riscoSelected && setShowModalAvaliacoesListSelect(true); }
      },
      {
        id: 13,
        label: 'Probabilidades',
        list: probabilidadesState,
        items: setorSelected ? disSelected.probabilidades.filter(el => el.setor === setorSelected?._id).filter(el => el.funcao === funcaoSelected?._id).filter(el => el.atividade === atividadeSelected?._id).filter(el => el.perigo === perigoSelected?._id).filter(el => el.risco === riscoSelected?._id).map(el => el?.probabilidade)
          : disSelected.probabilidades.flatMap(el => el?.probabilidade) || [],
        onSelect: (item) => {
          const exists = disSelected?.probabilidades.find((el) => el?.probabilidade._id === item._id);
          if (!exists || exists) {
            const update = [...disSelected?.probabilidades, { probabilidade: item, risco: riscoSelected?._id, perigo: perigoSelected?._id, atividade: atividadeSelected?._id, setor: setorSelected?._id, funcao: funcaoSelected?._id }];
            setDisSelected((prevState) => ({
              ...prevState,
              probabilidades: update,
            }));

          }
        },
        onSelected: (event, index) => { setProbabilidadeSelected(disSelected.probabilidades.find(el => el?.probabilidade?._id === index).probabilidade); setProbabilidadeSelectedIndex(disSelected.probabilidades.findIndex(el => el?.probabilidade?._id === index)) },
        onDelete: (event, id) => {
          const update = disSelected?.probabilidades.filter((el) => el?.probabilidade._id !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            probabilidades: update,
          }));
        },
        selectedIndex: probabilidadeSelected,
        handleListSelect: () => { riscoSelected && setShowModalProbabilidadesListSelect(true); }
      },
      {
        id: 14,
        label: 'Severidades',
        list: severidadesState,
        items: setorSelected ? disSelected.severidades.filter(el => el.setor === setorSelected?._id).filter(el => el.funcao === funcaoSelected?._id).filter(el => el.atividade === atividadeSelected?._id).filter(el => el.perigo === perigoSelected?._id).filter(el => el.risco === riscoSelected?._id).map(el => el?.severidade)
          : disSelected.severidades.flatMap(el => el?.severidade) || [],
        onSelect: (item) => {
          const exists = disSelected?.severidades.find((el) => el?.severidade._id === item._id);
          if (!exists || exists) {
            const update = [...disSelected?.severidades, { severidade: item, risco: riscoSelected?._id, perigo: perigoSelected?._id, atividade: atividadeSelected?._id, setor: setorSelected?._id, funcao: funcaoSelected?._id }];
            setDisSelected((prevState) => ({
              ...prevState,
              severidades: update,
            }));

          }
        },
        onSelected: (event, index) => { setSeveridadeSelected(disSelected.severidades.find(el => el?.severidade?._id === index).severidade); setSeveridadeSelectedIndex(disSelected.severidades.find(el => el?.severidade?._id === index)) },
        onDelete: (event, id) => {
          const update = disSelected?.severidades.filter((el) => el?.severidade._id !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            severidades: update,
          }));
        },
        selectedIndex: severidadeSelected,
        handleListSelect: () => { riscoSelected && probabilidadeSelected && setShowModalSeveridadesListSelect(true); }
      },
      {
        id: 15,
        label: 'Niveis de Risco',
        list: niveisRiscoState,
        items: setorSelected ? disSelected.niveisRisco.filter(el => el.setor === setorSelected?._id).filter(el => el.funcao === funcaoSelected?._id).filter(el => el.atividade === atividadeSelected?._id).filter(el => el.perigo === perigoSelected?._id).filter(el => el.risco === riscoSelected?._id).map(el => el?.nivelRisco)
          : disSelected.niveisRisco.flatMap(el => el?.nivelRisco) || [],
        onSelect: (item) => {
          // const exists = disSelected?.niveisRisco.find((el) => el?.nivelRisco._id === item._id);
          // if (!exists || exists) {
          //   const update = [...disSelected?.niveisRisco, { nivelRisco: item, risco: riscoSelected?._id, perigo: perigoSelected?._id, atividade: atividadeSelected?._id, setor: setorSelected?._id, funcao: funcaoSelected?._id }];
          //   setDisSelected((prevState) => ({
          //     ...prevState,
          //     niveisRisco: update,
          //   }));

          // }
          addNivel([item])
        },
        onSelected: (event, index) => { setNivelSelected(disSelected.niveisRisco.find(el => el?.nivelRisco?._id === index).nivelRisco); setNivelSelectedIndex(disSelected.niveisRisco.findIndex(el => el?.nivelRisco?._id === index)) },
        onDelete: (event, id) => {
          const update = disSelected?.niveisRisco.filter((el) => el?.nivelRisco._id !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            niveisRisco: update,
          }));
        },
        selectedIndex: nivelSelected,
        handleListSelect: () => { severidadeSelected && setShowModalNiveisRiscoListSelect(true); }
      },
      {
        id: 16,
        label: 'Descrição do plano de ação:',
        list: planosAcaoState,
        items: setorSelected ? disSelected.planosAcao.filter(el => el.setor === setorSelected?._id).filter(el => el.funcao === funcaoSelected?._id).filter(el => el.atividade === atividadeSelected?._id).filter(el => el.perigo === perigoSelected?._id).filter(el => el.risco === riscoSelected?._id).map(el => el?.planoAcao)
          : disSelected.planosAcao.flatMap(el => el?.planoAcao) || [],
        onSelect: (item) => {
          item.risco = riscoSelected;
          // const exists = disSelected?.planosAcao.find((el) => el?.planoAcao._id === item._id);
          // if (!exists || exists) {
          //   const update = [...disSelected?.planosAcao, { planoAcao: item, risco: riscoSelected?._id, perigo: perigoSelected?._id, atividade: atividadeSelected?._id, setor: setorSelected?._id, funcao: funcaoSelected?._id }];;
          //   setDisSelected((prevState) => ({
          //     ...prevState,
          //     planosAcao: update,
          //   }));

          // }
          addPlanoAcao([item])
        },
        onSelected: (event, index) => { setPlanoAcaoSelected(disSelected.planosAcao.find(el => el?.planoAcao?._id === index).planoAcao); setPlanoAcaoSelectedIndex(disSelected.planosAcao.findIndex(el => el?.planoAcao?._id === index)) },
        onDelete: (event, id) => {
          const update = disSelected?.planosAcao.filter((el) => el?.planoAcao._id !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            planosAcao: update,
          }));
        },
        selectedIndex: planoAcaoSelected,
        handleListSelect: () => { riscoSelected && setShowModalPlanosAcaoListSelect(true); }
      },
      {
        id: 17,
        label: 'Intenção:',
        list: intencoesState,
        items: setorSelected ? disSelected.intencao.filter(el => el.setor === setorSelected?._id).filter(el => el.funcao === funcaoSelected?._id).filter(el => el.atividade === atividadeSelected?._id).filter(el => el.perigo === perigoSelected?._id).filter(el => el.risco === riscoSelected?._id).filter(el => el.planoAcao === planoAcaoSelected?._id).map(el => el?.intencao)
          : disSelected.intencao.flatMap(el => el?.intencao) || [],
        onSelect: (item) => {
          // const exists = disSelected?.intencao.find((el) => el?.intencao._id === item._id);
          // if (!exists || exists) {
          //   const update = [...disSelected?.intencao, { intencao: item, planoAcao: planoAcaoSelected?._id, risco: riscoSelected?._id, perigo: perigoSelected, atividade: atividadeSelected?._id, setor: setorSelected?._id, funcao: funcaoSelected?._id }];
          //   setDisSelected((prevState) => ({
          //     ...prevState,
          //     intencao: update,
          //   }));

          // }
          addIntencao([item])
        },
        onSelected: (event, index) => { setIntencaoSelected(disSelected.intencao.find(el => el?.intencao?._id === index).intencao); setIntencaoSelectedIndex(disSelected.intencao.findIndex(el => el?.intencao?._id === index)) },
        onDelete: (event, id) => {
          const update = disSelected?.intencao.filter((el) => el?.intencao._id !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            intencao: update,
          }));
        },
        selectedIndex: intencaoSelected,
        handleListSelect: () => { planoAcaoSelected && setShowModalIntencoesListSelect(true); }
      },
      {
        id: 18,
        label: 'Prioridade:',
        list: prioridadesState,
        items: setorSelected ? disSelected.prioridade.filter(el => el.setor === setorSelected?._id).filter(el => el.funcao === funcaoSelected?._id).filter(el => el.atividade === atividadeSelected?._id).filter(el => el.perigo === perigoSelected?._id).filter(el => el.risco === riscoSelected?._id).filter(el => el.planoAcao === planoAcaoSelected?._id).map(el => el?.prioridade)
          : disSelected.prioridade.flatMap(el => el?.prioridade) || [],
        onSelect: (item) => {
          // const exists = disSelected?.prioridade.find((el) => el?.prioridade._id === item._id);
          // if (!exists || exists) {
          //   const update = [...disSelected?.prioridade, { prioridade: item, planoAcao: planoAcaoSelected?._id, risco: riscoSelected?._id, perigo: perigoSelected, atividade: atividadeSelected?._id, setor: setorSelected?._id, funcao: funcaoSelected?._id }];
          //   setDisSelected((prevState) => ({
          //     ...prevState,
          //     prioridade: update,
          //   }));

          // }
          addPrioridade([item])
        },
        onSelected: (event, index) => { setPrioridadeSelected(disSelected.prioridade.find(el => el?.prioridade?._id === index).prioridade); setPrioridadeSelectedIndex(disSelected.prioridade.findIndex(el => el?.prioridade?._id === index)) },
        onDelete: (event, id) => {
          const update = disSelected?.prioridade.filter((el) => el?.prioridade._id !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            prioridade: update,
          }));
        },
        selectedIndex: prioridadeSelected,
        handleListSelect: () => { planoAcaoSelected && setShowModalPrioridadesListSelect(true); }
      },
      {
        id: 19,
        label: 'Prazo:',
        list: prazosState,
        items: setorSelected ? disSelected.prazo.filter(el => el.setor === setorSelected?._id).filter(el => el.funcao === funcaoSelected?._id).filter(el => el.atividade === atividadeSelected?._id).filter(el => el.perigo === perigoSelected?._id).filter(el => el.risco === riscoSelected?._id).filter(el => el.planoAcao === planoAcaoSelected?._id).map(el => el?.prazo)
          : disSelected.prazo.flatMap(el => el?.prazo) || [],
        onSelect: (item) => {
          // const exists = disSelected?.prazo.find((el) => el?.prazo._id === item._id);
          // if (!exists || exists) {
          //   const update = [...disSelected?.prazo, { prazo: item, planoAcao: planoAcaoSelected?._id, risco: riscoSelected?._id, perigo: perigoSelected?._id, atividade: atividadeSelected?._id, setor: setorSelected?._id, funcao: funcaoSelected?._id }];
          //   setDisSelected((prevState) => ({
          //     ...prevState,
          //     prazo: update,
          //   }));

          // }
          addPrazo([item])
        },
        onSelected: (event, index) => { setPrazoSelected(disSelected.prazo.find(el => el?.prazo?._id === index).prazo); setPrazoSelectedIndex(disSelected.prazo.findIndex(el => el?.prazo?._id === index)) },
        onDelete: (event, id) => {
          const update = disSelected?.prazo.filter((el) => el?.prazo._id !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            prazo: update,
          }));
        },
        selectedIndex: prazoSelected,
        handleListSelect: () => { planoAcaoSelected && setShowModalPrazosListSelect(true); }
      },
      {
        id: 20,
        label: 'Formas de monitoramento:',
        list: monitoramentoState,
        items: setorSelected ? disSelected.monitoramentos.filter(el => el.setor === setorSelected?._id).filter(el => el.funcao === funcaoSelected?._id).filter(el => el.atividade === atividadeSelected?._id).filter(el => el.perigo === perigoSelected?._id).filter(el => el.risco === riscoSelected?._id).filter(el => el.planoAcao === planoAcaoSelected?._id).map(el => el?.monitoramento)
          : disSelected.monitoramentos.flatMap(el => el?.monitoramento) || [],
        onSelect: (item) => {
          // const exists = disSelected?.monitoramentos.find((el) => el?.monitoramento._id === item._id);
          // if (!exists || exists) {
          //   const update = [...disSelected?.monitoramentos, { monitoramento: item, planoAcao: planoAcaoSelected?._id, risco: riscoSelected?._id, perigo: perigoSelected?._id, atividade: atividadeSelected?._id, setor: setorSelected?._id, funcao: funcaoSelected?._id }];;
          //   setDisSelected((prevState) => ({
          //     ...prevState,
          //     monitoramentos: update,
          //   }));

          // }
          addMonitoramento([item])
        },
        onSelected: (event, index) => { setMonitoramentoSelected(disSelected.monitoramentos.find(el => el?.monitoramento?._id === index).monitoramento); setMonitoramentoSelectedIndex(disSelected.monitoramentos.findIndex(el => el?.monitoramento?._id === index)) },
        onDelete: (event, id) => {
          const update = disSelected?.monitoramentos.filter((el) => el?.monitoramento._id !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            monitoramentos: update,
          }));
        },
        selectedIndex: monitoramentoSelected,
        handleListSelect: () => { planoAcaoSelected && setShowModalMonitoramentosListSelect(true); }
      },
      {
        id: 21,
        label: 'Status:',
        list: statusState,
        items: setorSelected ? disSelected.status.filter(el => el.setor === setorSelected?._id).filter(el => el.funcao === funcaoSelected?._id).filter(el => el.atividade === atividadeSelected?._id).filter(el => el.perigo === perigoSelected?._id).filter(el => el.risco === riscoSelected?._id).filter(el => el.planoAcao === planoAcaoSelected?._id).map(el => el?.status)
          : disSelected.status.flatMap(el => el?.status) || [],
        onSelect: (item) => {
          // const exists = disSelected?.status.find((el) => el?.status._id === item._id);
          // if (!exists || exists) {
          //   const update = [...disSelected?.status, { status: item, planoAcao: planoAcaoSelected?._id, risco: riscoSelected?._id, perigo: perigoSelected?._id, atividade: atividadeSelected?._id, setor: setorSelected?._id, funcao: funcaoSelected?._id }];
          //   setDisSelected((prevState) => ({
          //     ...prevState,
          //     status: update,
          //   }));

          // }
          addStatus([item])
        },
        onSelected: (event, index) => { setStatusSelected(disSelected.status.find(el => el?.status?._id === index).status); setStatusSelectedIndex(disSelected.status.findIndex(el => el?.status?._id === index).status) },
        onDelete: (event, id) => {
          const update = disSelected?.status.filter((el) => el?.status._id !== id);
          setDisSelected((prevState) => ({
            ...prevState,
            status: update,
          }));
        },
        selectedIndex: statusSelected,
        handleListSelect: () => { planoAcaoSelected && setShowModalStatusListSelect(true); }
      }
    ]);
  },
    [agenteRiscoSelected, causaSelected, medidaSelected, duracaoExposicaoSelected, agenteRiscoSelectedIndex, agentesRiscoState, atividadeSelected, atividadeSelectedIndex, atividadesState, avaliacaoSelectedIndex, avaliacoesState, causaSelectedIndex, causasState, disSelected, duracaoExposicaoSelectedIndex, duracaoExposicaoState, frequenciaExposicaoSelected, frequenciaExposicaoSelectedIndex, frequenciasExposicaoState, funcaoSelected, funcaoSelectedIndex, funcoesState, intencaoSelectedIndex, intencoesState, medidaSelectedIndex, medidasState, monitoramentoSelectedIndex, monitoramentoState, niveisRiscoState, nivelSelectedIndex, perigoSelected, perigoSelectedIndex, perigosState, planoAcaoSelected, planoAcaoSelectedIndex, planosAcaoState, prazoSelectedIndex, prazosState, prioridadeSelectedIndex, prioridadesState, probabilidadeSelectedIndex, probabilidadesState, riscoSelected, riscoSelectedIndex, riscosState, setorSelected, setorSelectedIndex, setoresState, severidadeSelectedIndex, severidadesState, statusSelectedIndex, statusState, viaAbsorcaoSelected, viaAbsorcaoSelectedIndex, viasAbsorcaoState, avaliacaoSelected, probabilidadeSelected, severidadeSelected, intencaoSelected, prioridadeSelected, prazoSelected, monitoramentoSelected, statusSelected, nivelSelected]);

  useEffect(() => {
    reset({ ...disSelected });
  }, [reset, disSelected])

  const triggerSubmit = () => {
    // Disparar o submit do formulário
    //formRef.current.dispatchEvent(new Event('submit', { cancelable: true }));
  };

  const handleQuantidadeFuncao = (event) => {
    setQuantidadeFuncaoState(event.target.value);
    disSelected.funcoes[disSelected.funcoes.findIndex(funcao => funcao?.funcao?._id === funcaoSelected?._id)].quantidade = quantidadeFuncaoState;

    setDisSelected((prevState) => ({
      ...prevState,
      funcoes: [...prevState.funcoes],
    }));
  }

  const addSetor = (items) => {
    const newItem = items.filter(item => (
      !disSelected?.setores.some(el => el?.setor?._id === item._id)
    ));

    const updated = newItem.map(item => ({
      setor: item,
      descricao: '',
      setorImg: ''
    }));

    setDisSelected((prevState) => ({
      ...prevState,
      setores: [...prevState.setores, ...updated],
    }));
    triggerSubmit()
  }
  const addFuncao = (items) => {
    // const newItem = items.filter(item => {
    //   return !disSelected?.funcoes.some(el => el?.funcao._id === item._id)
    // });
    const updated = items.map(item => ({
      funcao: item,
      setor: setorSelected?._id,
      descricao: '',
      quantidade: 0
    }));
    setDisSelected((prevState) => ({
      ...prevState,
      funcoes: [...prevState.funcoes, ...updated],
    }));
  }

  const addAtividade = (items) => {
    // const newItem = items.filter(item => {
    //   return !disSelected?.atividades.some(el => el?.atividade._id === item._id)
    // });
    const updated = items.map(item => ({
      atividade: item,
      setor: setorSelected?._id,
      funcao: funcaoSelected?._id,
    }));
    setDisSelected((prevState) => ({
      ...prevState,
      atividades: [...prevState.atividades, ...updated],
    }));
  }

  const addPerigo = (items) => {
    // const newItem = items.filter(item => {
    //   return !disSelected?.perigos.some(el => el?.perigo._id === item._id)
    // });
    const updated = items.map(item => ({
      perigo: item,
      atividade: atividadeSelected?._id,
      setor: setorSelected?._id,
      funcao: funcaoSelected?._id,
    }));
    setDisSelected((prevState) => ({
      ...prevState,
      perigos: [...prevState.perigos, ...updated],
    }));
  }

  const addRisco = (items) => {
    // const newItem = items.filter(item => {
    //   return !disSelected?.riscos.some(el => el.risco?._id === item._id)
    // });
    const updated = items.map(item =>
    ({
      risco: item,
      perigo: perigoSelected?._id,
      atividade: atividadeSelected?._id,
      setor: setorSelected?._id,
      funcao: funcaoSelected?._id,
    }));

    updated.forEach(item => {
      //setRiscoSelected(item.risco);
      addAgenteRisco(item?.risco?.agentesRisco, item.risco?._id);
      addViaAbsorcao(item?.risco?.viasAbsorcao, item.risco?._id);
      addCausa(item?.risco?.causas, item.risco?._id);
      addPlanoAcao(item?.risco?.planosAcao, item.risco?._id);
    })

    setDisSelected((prevState) => ({
      ...prevState,
      riscos: [...prevState.riscos, ...updated],
    }));

  }

  const addAgenteRisco = (items, idRisco = riscoSelected) => {
    // const newItem = items.filter(item => {
    //   return !disSelected?.agentesRisco.some(el => el.agenteRisco?._id === item._id)
    // });
    const updated = items.map(item => ({
      agenteRisco: item,
      risco: idRisco,
      perigo: perigoSelected?._id,
      atividade: atividadeSelected?._id,
      setor: setorSelected?._id,
      funcao: funcaoSelected?._id,
    }));
    setDisSelected((prevState) => ({
      ...prevState,
      agentesRisco: [...prevState.agentesRisco, ...updated],
    }));
  }

  const addViaAbsorcao = (items, idRisco = riscoSelected) => {
    // const newItem = items.filter(item => {
    //   return !disSelected?.viasAbsorcao.some(el => el?.viaAbsorcao._id === item._id)
    // });
    const updated = items.map(item => ({
      viaAbsorcao: item,
      risco: idRisco,
      perigo: perigoSelected?._id,
      atividade: atividadeSelected?._id,
      setor: setorSelected?._id,
      funcao: funcaoSelected?._id,
    }));
    setDisSelected((prevState) => ({
      ...prevState,
      viasAbsorcao: [...prevState.viasAbsorcao, ...updated],
    }));
  }

  const addFrequenciaExposicao = (items) => {
    // const newItem = items.filter(item => {
    //   return !disSelected?.frequenciaExposicao.some(el => el?.frequenciaExposicao._id === item._id)
    // });
    const updated = items.map(item => ({
      frequenciaExposicao: item,
      risco: riscoSelected?._id,
      perigo: perigoSelected?._id,
      atividade: atividadeSelected?._id,
      setor: setorSelected?._id,
      funcao: funcaoSelected?._id,
    }));
    setDisSelected((prevState) => ({
      ...prevState,
      frequenciaExposicao: [...prevState.frequenciaExposicao, ...updated],
    }));
  }

  const addDuracaoExposicao = (items) => {
    // const newItem = items.filter(item => {
    //   return !disSelected?.duracaoExposicao.some(el => el?.duracaoExposicao._id === item._id)
    // });
    const updated = items.map(item => ({
      duracaoExposicao: item,
      risco: riscoSelected?._id,
      perigo: perigoSelected?._id,
      atividade: atividadeSelected?._id,
      setor: setorSelected?._id,
      funcao: funcaoSelected?._id,
    }));
    setDisSelected((prevState) => ({
      ...prevState,
      duracaoExposicao: [...prevState.duracaoExposicao, ...updated],
    }));
  }

  const addCausa = (items, idRisco = riscoSelected) => {
    // const newItem = items.filter(item => {
    //   return !disSelected?.causas.some(el => el?.causa._id === item._id)
    // });
    const updated = items.map(item => ({
      causa: item,
      risco: idRisco,
      perigo: perigoSelected?._id,
      atividade: atividadeSelected?._id,
      setor: setorSelected?._id,
      funcao: funcaoSelected?._id,
    }));
    setDisSelected((prevState) => ({
      ...prevState,
      causas: [...prevState.causas, ...updated],
    }));
  }

  const addMedida = (items) => {
    // const newItem = items.filter(item => {
    //   return !disSelected?.medidas.some(el => el?.medida._id === item._id)
    // });
    const updated = items.map(item => ({
      medida: item,
      risco: riscoSelected?._id,
      perigo: perigoSelected?._id,
      atividade: atividadeSelected?._id,
      setor: setorSelected?._id,
      funcao: funcaoSelected?._id,
    }));
    setDisSelected((prevState) => ({
      ...prevState,
      medidas: [...prevState.medidas, ...updated],
    }));
  }

  const addAvaliacao = (items) => {
    // const newItem = items.filter(item => {
    //   return !disSelected?.avaliacao.some(el => el?.avaliacao._id === item._id)
    // });
    const updated = items.map(item => ({
      avaliacao: item,
      risco: riscoSelected?._id,
      perigo: perigoSelected?._id,
      atividade: atividadeSelected?._id,
      setor: setorSelected?._id,
      funcao: funcaoSelected?._id,
    }));
    setDisSelected((prevState) => ({
      ...prevState,
      avaliacao: [...prevState.avaliacao, ...updated],
    }));
  }

  const addProbabilidade = (items) => {
    // const newItem = items.filter(item => {
    //   return !disSelected?.probabilidades.some(el => el?.probabilidade._id === item._id)
    // });
    const updated = items.map(item => ({
      probabilidade: item,
      risco: riscoSelected?._id,
      perigo: perigoSelected?._id,
      atividade: atividadeSelected?._id,
      setor: setorSelected?._id,
      funcao: funcaoSelected?._id,
    }));
    setDisSelected((prevState) => ({
      ...prevState,
      probabilidades: [...prevState.probabilidades, ...updated],
    }));
  }

  const addSeveridade = (items) => {
    const newItem = items.filter(item => {
      const nivelRisco = niveisRiscoState.filter((el) => el.probabilidadeValor === probabilidadeSelected?.valor && el.severidadeValor === item.valor);
      addNivel(nivelRisco)
      return item
    });
    const updated = newItem.map(item => ({
      severidade: item,
      risco: riscoSelected?._id,
      perigo: perigoSelected?._id,
      atividade: atividadeSelected?._id,
      setor: setorSelected?._id,
      funcao: funcaoSelected?._id,
    }));
    setDisSelected((prevState) => ({
      ...prevState,
      severidades: [...prevState.severidades, ...updated],
    }));
  }

  const addNivel = (items) => {
    // const newItem = items.filter(item => {
    //   return !disSelected?.niveisRisco.some(el => el?.nivel._id === item._id)
    // });
    const updated = items.map(item => ({
      nivelRisco: item,
      risco: riscoSelected?._id,
      perigo: perigoSelected?._id,
      atividade: atividadeSelected?._id,
      setor: setorSelected?._id,
      funcao: funcaoSelected?._id,
    }));
    setDisSelected((prevState) => ({
      ...prevState,
      niveisRisco: [...prevState.niveisRisco, ...updated],
    }));
  }

  const addPlanoAcao = (items, idRisco = riscoSelected) => {
    // const newItem = items.filter(item => {
    //   return !disSelected?.planosAcao.some(el => el?.planoAcao._id === item._id)
    // });
    const updated = items.map(item => ({
      planoAcao: item,
      risco: idRisco,
      perigo: perigoSelected?._id,
      atividade: atividadeSelected?._id,
      setor: setorSelected?._id,
      funcao: funcaoSelected?._id,
    }));
    setDisSelected((prevState) => ({
      ...prevState,
      planosAcao: [...prevState.planosAcao, ...updated],
    }));
  }

  const addIntencao = (items) => {
    // const newItem = items.filter(item => {
    //   return !disSelected?.intencao.some(el => el?.intencao._id === item._id)
    // });
    const updated = items.map(item => ({
      intencao: item,
      planoAcao: planoAcaoSelected?._id,
      risco: riscoSelected?._id,
      perigo: perigoSelected?._id,
      atividade: atividadeSelected?._id,
      setor: setorSelected?._id,
      funcao: funcaoSelected?._id,
    }));
    setDisSelected((prevState) => ({
      ...prevState,
      intencao: [...prevState.intencao, ...updated],
    }));
  }

  const addPrioridade = (items) => {
    // const newItem = items.filter(item => {
    //   return !disSelected?.prioridade.some(el => el?.prioridade._id === item._id)
    // });
    const updated = items.map(item => ({
      prioridade: item,
      planoAcao: planoAcaoSelected?._id,
      risco: riscoSelected?._id,
      perigo: perigoSelected?._id,
      atividade: atividadeSelected?._id,
      setor: setorSelected?._id,
      funcao: funcaoSelected?._id,
    }));
    setDisSelected((prevState) => ({
      ...prevState,
      prioridade: [...prevState.prioridade, ...updated],
    }));
  }

  const addPrazo = (items) => {
    // const newItem = items.filter(item => {
    //   return !disSelected?.prazo.some(el => el?.prazo._id === item._id)
    // });
    const updated = items.map(item => ({
      prazo: item,
      planoAcao: planoAcaoSelected?._id,
      risco: riscoSelected?._id,
      perigo: perigoSelected?._id,
      atividade: atividadeSelected?._id,
      setor: setorSelected?._id,
      funcao: funcaoSelected?._id,
    }));
    setDisSelected((prevState) => ({
      ...prevState,
      prazo: [...prevState.prazo, ...updated],
    }));
  }

  const addMonitoramento = (items) => {
    // const newItem = items.filter(item => {
    //   return !disSelected?.monitoramentos.some(el => el?.monitoramento._id === item._id)
    // });
    const updated = items.map(item => ({
      monitoramento: item,
      planoAcao: planoAcaoSelected?._id,
      risco: riscoSelected?._id,
      perigo: perigoSelected?._id,
      atividade: atividadeSelected?._id,
      setor: setorSelected?._id,
      funcao: funcaoSelected?._id,
    }));
    setDisSelected((prevState) => ({
      ...prevState,
      monitoramentos: [...prevState.monitoramentos, ...updated],
    }));
  }

  const addStatus = (items) => {
    // const newItem = items.filter(item => {
    //   return !disSelected?.status.some(el => el?.status._id === item._id)
    // });
    const updated = items.map(item => ({
      status: item,
      planoAcao: planoAcaoSelected?._id,
      risco: riscoSelected?._id,
      perigo: perigoSelected?._id,
      atividade: atividadeSelected?._id,
      setor: setorSelected?._id,
      funcao: funcaoSelected?._id,
    }));
    setDisSelected((prevState) => ({
      ...prevState,
      status: [...prevState.status, ...updated],
    }));
  }

  const addDescricaoSetor = (items) => {
    const setorIndex = disSelected.setores.findIndex(setor => setor?.setor?._id === setorSelected?._id);
    disSelected.setores[setorIndex].descricao = items[0];

    setDisSelected((prevState) => ({
      ...prevState,
      setores: [...prevState.setores],
    }));
  }

  const addDescricaoFuncao = (items) => {
    const funcaoIndex = disSelected.funcoes.findIndex(funcao => funcao?.funcao?._id === funcaoSelected?._id);
    disSelected.funcoes[funcaoIndex].descricao = items[0];

    setDisSelected((prevState) => ({
      ...prevState,
      funcoes: [...prevState.funcoes],
    }));
  }

  const handleSelect = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setDis(index);
    setDisSelected(disList[index]);
    setGrupoSelected(disList[index].empresa.grupo);
    setEmpresaSelected(disList[index].empresa);
    setAreaSelected(disList[index].empresa.area);
  }

  const handleDelete = (event, id) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR A DIS?', () => { deleteDis(id) });
  }

  const handleLimparBtn = (event) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('LIMPAR REGISTRO', 'VOCE REALMENTE DESEJA LIMPAR O FORMULARIO?', () => { handleClear() });
  }

  const handleClear = () => {
    setDisSelected({ ...formEmpty })
    handleClearSelecteds();

  }
  const handleClearSelecteds = () => {
    setGrupoSelected(null);
    setEmpresaSelected(null);
    setAreaSelected(null);
    setSetorSelected(null);
    setSetorSelectedIndex(-1);
    setFuncaoSelected(null);
    setFuncaoSelectedIndex(-1);
    setAtividadeSelected(null);
    setAtividadeSelectedIndex(-1);
    setPerigoSelected(null);
    setPerigoSelectedIndex(-1);
    setRiscoSelected(null);
    setRiscoSelectedIndex(-1);
    setAgenteRiscoSelected(null);
    setAgenteRiscoSelectedIndex(-1);
    setViaAbsorcaoSelected(null);
    setViaAbsorcaoSelectedIndex(-1);
    setFrequenciaExposicaoSelected(null);
    setFrequenciaExposicaoSelectedIndex(-1);
    setDuracaoExposicaoSelected(null);
    setDuracaoExposicaoSelectedIndex(-1);
    setCausaSelected(null);
    setCausaSelectedIndex(-1);
    setMedidaSelected(null);
    setMedidaSelectedIndex(-1);
    setAvaliacaoSelected(null);
    setAvaliacaoSelectedIndex(-1);
    setProbabilidadeSelected(null);
    setProbabilidadeSelectedIndex(-1);
    setSeveridadeSelected(null);
    setSeveridadeSelectedIndex(-1);
    setNivelSelected(null);
    setNivelSelectedIndex(-1);
    setPlanoAcaoSelected(null);
    setPlanoAcaoSelectedIndex(-1);
    setIntencaoSelected(null);
    setIntencaoSelectedIndex(-1);
    setPrioridadeSelected(null);
    setPrazoSelectedIndex(-1);
    setMonitoramentoSelected(null);
    setMonitoramentoSelectedIndex(-1);
    setStatusSelected(null);
    setStatusSelectedIndex(-1);

  }

  const handleShowDis = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    handleSelect(event, index)
    setShowModalInfoState(true);
  }

  const onSubmit = (data) => {
    data.usuario = usuario;
    if (!data.usuario) {
      informacao('USUARIO OBRIGATORIO! VERIFIQUE!');
      return false
    } else if (!areaSelected) {
      informacao('RAMO DE ATIVIDADE OBRIGATORIO! VERIFIQUE!');
      return false
    } else if (!empresaSelected) {
      informacao('TÉCNICO OBRIGATORIO! VERIFIQUE!');
      return false
    } else if (data.data === '') {
      informacao('DATA OBRIGATORIO! VERIFIQUE!');
      return false
    } else if (!grupoSelected) {
      informacao(' GRUPO OBRIGATORIO! VERIFIQUE!');
      return false
    } else {
      data.empresa = empresaSelected;
      data.area = areaSelected;
      const formData = new FormData();
      if (data.files)
        formData.append("imagens", data?.files[0]);
      formData.append('dis', JSON.stringify(data));
      if (data._id) {
        updateDis(data._id, formData);
      } else {
        criarDis(formData);
      }
      if (error === '') {
        handleClear();
        handleClearSelecteds();
      }
    }
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

  const toggleSectionCad = (itemId, event) => {
    event.stopPropagation();
    setSectionCadItems((prevState) =>
      prevState.map((item) => {
        if (item.id === itemId) {
          if (item.label === 'Geral')
            setActiveTab('Geral')
          if (item.label === 'Setor')
            setActiveTab('Setor')
          if (item.label === 'Função')
            setActiveTab('Função')
          if (item.label === 'Diagnóstico')
            setActiveTab('Diagnóstico')
          return { ...item, expanded: !item.expanded };
        }
        return item;
      })
    );
  };

  const toggleSectionCadExpand = (itemId, event) => {
    event.stopPropagation();
    setSectionCadItems((prevState) =>
      prevState.map((item) => {
        if (item.id === itemId) {
          return { ...item, expanded: true };
        }
        return item;
      })
    );
  };


  const handleSetorChange = (event) => {
    setSetorSelected(disSelected.setores.find(setor => setor?.setor?._id === event.target.value).setor);
  }

  const handleFuncaoChange = (event) => {
    setFuncaoSelected(disSelected.funcoes.find(funcao => funcao?.funcao?._id === event.target.value).funcao);
  }

  if (loading || !areasState || !setoresState) {
    return <ModalLoading />
  }

  if (showModalInfoState) {
    return <ModalInfo dados={disSelected} close={setShowModalInfoState} />
  }
  if (showModalSetoresListSelect) {
    return <ModalListSelect dados={setoresState} close={setShowModalSetoresListSelect}
      setItensSelected={(items) => addSetor(items)} />
  }
  if (showModalFuncoesListSelect) {
    return <ModalListSelect dados={funcoesState} close={setShowModalFuncoesListSelect}
      setItensSelected={(items) => addFuncao(items)} />
  }
  if (showModalAtividadesListSelect) {
    return <ModalListSelect dados={atividadesState} close={setShowModalAtividadesListSelect}
      setItensSelected={(items) => addAtividade(items)} />
  }
  if (showModalPerigosListSelect) {
    return <ModalListSelect dados={perigosState} close={setShowModalPerigosListSelect}
      setItensSelected={(items) => addPerigo(items)} />
  }
  if (showModalRiscosListSelect) {
    scrollPositionRef.current = window.scrollY;
    return <ModalListSelect dados={riscosState} close={setShowModalRiscosListSelect}
      setItensSelected={(items) => { addRisco(items) }} />
  }
  if (showModalAgentesRiscoListSelect) {
    return <ModalListSelect dados={agentesRiscoState} close={setShowModalAgentesRiscoListSelect}
      setItensSelected={(items) => addAgenteRisco(items)} />
  }
  if (showModalViasAbsorcaoListSelect) {
    return <ModalListSelect dados={viasAbsorcaoState} close={setShowModalViasAbsorcaoListSelect}
      setItensSelected={(items) => addViaAbsorcao(items)} />
  }
  if (showModalFrequenciaExposicaoListSelect) {
    return <ModalListSelect dados={frequenciasExposicaoState} close={setShowModalFrequenciaExposicaoListSelect}
      setItensSelected={(items) => addFrequenciaExposicao(items)} />
  }
  if (showModalDuracaoExposicaoListSelect) {
    return <ModalListSelect dados={duracaoExposicaoState} close={setShowModalDuracaoExposicaoListSelect}
      setItensSelected={(items) => addDuracaoExposicao(items)} />
  }
  if (showModalCausasListSelect) {
    return <ModalListSelect dados={causasState} close={setShowModalCausasListSelect}
      setItensSelected={(items) => addCausa(items)} />
  }
  if (showModalMedidasListSelect) {
    return <ModalListSelect dados={medidasState} close={setShowModalMedidasListSelect}
      setItensSelected={(items) => addMedida(items)} />
  }
  if (showModalAvaliacoesListSelect) {
    return <ModalInput dados={avaliacoesState} close={setShowModalAvaliacoesListSelect}
      setItensSelected={(items) => addAvaliacao(items)} />
  }
  if (showModalProbabilidadesListSelect) {
    return <ModalListSelect dados={probabilidadesState} close={setShowModalProbabilidadesListSelect}
      setItensSelected={(items) => addProbabilidade(items)} />
  }
  if (showModalSeveridadesListSelect) {
    return <ModalListSelect dados={severidadesState} close={setShowModalSeveridadesListSelect}
      setItensSelected={(items) => addSeveridade(items)} />
  }
  if (showModalNiveisRiscoListSelect) {
    return <ModalListSelect dados={niveisRiscoState} close={setShowModalNiveisRiscoListSelect}
      setItensSelected={(items) => addNivel(items)} />
  }
  if (showModalPlanosAcaoListSelect) {
    return <ModalListSelect dados={planosAcaoState} close={setShowModalPlanosAcaoListSelect}
      setItensSelected={(items) => addPlanoAcao(items)} />
  }
  if (showModalIntencoesListSelect) {
    return <ModalListSelect dados={intencoesState} close={setShowModalIntencoesListSelect}
      setItensSelected={(items) => addIntencao(items)} />
  }
  if (showModalPrioridadesListSelect) {
    return <ModalListSelect dados={prioridadesState} close={setShowModalPrioridadesListSelect}
      setItensSelected={(items) => addPrioridade(items)} />
  }
  if (showModalPrazosListSelect) {
    return <ModalListSelect dados={prazosState} close={setShowModalPrazosListSelect}
      setItensSelected={(items) => addPrazo(items)} />
  }
  if (showModalMonitoramentosListSelect) {
    return <ModalListSelect dados={monitoramentoState} close={setShowModalMonitoramentosListSelect}
      setItensSelected={(items) => addMonitoramento(items)} />
  }
  if (showModalStatusListSelect) {
    return <ModalListSelect dados={statusState} close={setShowModalStatusListSelect}
      setItensSelected={(items) => addStatus(items)} />
  }

  if (showModalDescricaoSetorSelect) {
    return <ModalInput label={'Descrição do setor'} dados={[disSelected.setores.map(setor => setor.setor._id === setorSelected._id)[0].descricao]} close={setShowModalDescricaoSetorSelect}
      setItensSelected={(items) => addDescricaoSetor(items)} />
  }
  if (showModalDescricaoFuncaoSelect) {
    return <ModalInput label={'Descrição da Função'} dados={[disSelected.funcoes.map(funcao => funcao.funcao._id === funcaoSelected._id)[0].descricao]} close={setShowModalDescricaoFuncaoSelect}
      setItensSelected={(items) => addDescricaoFuncao(items)} />
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
                  <Styled.FormArea className="element-to-keep-selected">
                    <Styled.Form ref={formRef} onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                      <Styled.Label>{empresaSelected?.razaoSocial && 'Empresa: ' + empresaSelected.razaoSocial}</Styled.Label>
                      <div style={{ display: 'flex' }}>
                        {sectionCadItems.map((sectionCadItem) => (
                          <>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <Styled.SectionArea
                                style={{ margin: 0, background: activeTab === sectionCadItem.label ? '#EBF0F7' : '#FFF', border: activeTab === sectionCadItem.label ? '2px solid #DDD' : '1px solid #DDD', cursor: 'pointer' }}
                                key={sectionCadItem.id}
                                onClick={(event) => toggleSectionCad(sectionCadItem.id, event)}
                              >
                                <Styled.AreaFlex>{sectionCadItem.label}</Styled.AreaFlex>
                                {/* <Styled.AreaWidth style={{ width: 20, justifyContent: 'flex-end' }} >
                                  {sectionCadItem.expanded ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                                </Styled.AreaWidth> */}
                              </Styled.SectionArea>

                            </div>
                          </>
                        ))}
                      </div>


                      <div style={{ display: 'flex', flexDirection: 'column', border: '2px solid #DDD' }}>

                        {
                          activeTab === 'Geral' &&
                          (<>
                            <Styled.Input
                              hidden
                              {...register('_id')}
                            />
                            <Styled.Label>Grupo: </Styled.Label>
                            <InputSearch items={gruposState} onSelect={(item) => setGrupoSelected(item)} valueSelected={grupoSelected?.nome} field={'nome'} />
                            {errors.grupo && <span>Campo obrigatório</span>}

                            <Styled.Label>Empresa: </Styled.Label>
                            <SelectSearch items={empresasState.filter(el => el.grupo?._id === grupoSelected?._id) || []} onSelect={(item) => setEmpresaSelected(item)} valueSelected={empresaSelected} field={'nomeFantasia'} />

                            {errors.empresa && <span>Campo obrigatório</span>}

                            <Styled.Label>Data: </Styled.Label>
                            <DataPicker name="data" control={control} setValue={setValue} defaultValue={disSelected?.data} showTimeSelect={false} />
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

                            <Styled.Label>Observação</Styled.Label>
                            <Styled.Input
                              placeholder=''
                              {...register('observacaoAmbiente', { required: false })}
                            />
                            {errors.observacaoAmbiente && <span>Campo obrigatório</span>}
                          </>)
                        }
                        {activeTab === 'Setor' &&
                          (<>
                            <ScrollableContainer>
                              <DiagnosticoContent >
                                <DiagnosticoItemArea key={diagnosticoItems[0].id} className="element-to-keep-selected" >
                                  <Titulo3>{diagnosticoItems[0].label}</Titulo3>
                                  <DiagnosticoItem  >
                                    <DiagnosticoSearchArea>
                                      <InputSearch items={diagnosticoItems[0].list} onSelect={diagnosticoItems[0].onSelect} setValueChange={diagnosticoItems[0].setValueChange} /> 
                                      <MdList onClick={diagnosticoItems[0].handleListSelect} style={{ height: '2em', width: '2em', cursor: 'pointer' }} />
                                      <MdAdd onClick={diagnosticoItems[0].addItem} style={{ height: '2em', width: '2em', cursor: 'pointer' }} />
                                    </DiagnosticoSearchArea >
                                    {
                                      diagnosticoItems[0].items && diagnosticoItems[0].items.map((item, index) =>
                                      (
                                        <DignosticoItemSelectedArea key={index} onClick={(event) => diagnosticoItems[0].onSelected(event, item._id)} style={{ background: item._id === diagnosticoItems[0].selectedIndex?._id ? '#CCC' : '#FFF' }}   >
                                          <p>{item?.nome}</p>
                                          <MdHighlightOff color='#F00' onClick={(event) => diagnosticoItems[0].onDelete(event, item._id)} style={{ height: '1em', width: '1em' }} />
                                        </DignosticoItemSelectedArea>
                                      )
                                      )
                                    }
                                  </DiagnosticoItem>

                                </DiagnosticoItemArea>
                                <DiagnosticoItemArea>
                                  <div style={{ display: 'flex', alignItems: 'center' }}><Titulo3>Descrição</Titulo3><MdAddCircle onClick={diagnosticoItems[0].doublelClick} style={{ height: '2em', width: '2em', cursor: 'pointer' }} /></div>
                                  <p style={{ fontSize: '0.8em' }}>{disSelected.setores[disSelected.setores.findIndex(setor => setor?.setor?._id === setorSelected?._id)]?.descricao ? disSelected.setores[disSelected.setores.findIndex(setor => setor?.setor?._id === setorSelected?._id)]?.descricao?.nome : 'Selecione um setor e adicione uma descricao'}</p>
                                </DiagnosticoItemArea>
                                <DiagnosticoItemArea>
                                  <Titulo3>Imagem Setor: </Titulo3>
                                  <Styled.Input type='file' multiple name='files' {...register('files', { required: false })} />
                                </DiagnosticoItemArea>
                              </DiagnosticoContent>
                            </ScrollableContainer>
                          </>)
                        }
                        {activeTab === 'Função' &&
                          (<>
                            <ScrollableContainer>
                              <div style={{ height: 50, display: 'flex', justifyContent: 'center', marginBottom: 10, alignItems: 'center' }}>
                                <Titulo3>Setor:</Titulo3>
                                <select style={{ width: '30%', padding: '8px' }} value={setorSelected?._id} onChange={handleSetorChange} >
                                  <option key="0" value={-1}>SELECIONE UM SETOR</option>
                                  {disSelected.setores.map((setor, index) => (
                                    <option key={index} value={setor?.setor?._id}>{setor?.setor?.nome}</option>
                                  ))}
                                </select>
                              </div>
                              <DiagnosticoContent >

                                <DiagnosticoItemArea key={diagnosticoItems[1].id} className="element-to-keep-selected" >
                                  <Titulo3>{diagnosticoItems[1].label}</Titulo3>
                                  <DiagnosticoItem  >
                                    <DiagnosticoSearchArea>
                                      <InputSearch items={diagnosticoItems[1].list} onSelect={diagnosticoItems[1].onSelect} /> <MdList onClick={diagnosticoItems[1].handleListSelect} style={{ height: '2em', width: '2em', cursor: 'pointer' }} />
                                    </DiagnosticoSearchArea >

                                    {

                                      diagnosticoItems[1].items && diagnosticoItems[1].items.map((item, index) =>
                                      (

                                        <DignosticoItemSelectedArea key={index} onClick={(event) => diagnosticoItems[1].onSelected(event, item._id)} style={{ background: item._id === diagnosticoItems[1].selectedIndex?._id ? '#CCC' : '#FFF' }}   >
                                          <p>{item?.nome}</p>
                                          <MdHighlightOff color='#F00' onClick={(event) => diagnosticoItems[1].onDelete(event, item._id)} style={{ height: '1em', width: '1em' }} />
                                        </DignosticoItemSelectedArea>
                                      )
                                      )
                                    }
                                  </DiagnosticoItem>
                                </DiagnosticoItemArea>
                                <DiagnosticoItemArea>
                                  <div style={{ display: 'flex', alignItems: 'center' }}><Titulo3>Descrição</Titulo3><MdAddCircle onClick={diagnosticoItems[1].doublelClick} style={{ height: '2em', width: '2em', cursor: 'pointer' }} /></div>
                                  <p>{disSelected.funcoes[disSelected.funcoes.findIndex(funcao => funcao?.funcao?._id === funcaoSelected?._id)]?.descricao ? disSelected.funcoes[disSelected.funcoes.findIndex(funcao => funcao?.funcao?._id === funcaoSelected?._id)]?.descricao?.nome : 'Selecione uma função e adicione uma descricao'}</p>
                                </DiagnosticoItemArea>
                                <DiagnosticoItemArea>
                                  <Titulo3>Quantidade:</Titulo3>
                                  <input id='quantidade' name='quantidade' type='number' value={disSelected.funcoes[disSelected.funcoes.findIndex(funcao => funcao?.funcao?._id === funcaoSelected?._id)]?.quantidade || 0} onChange={handleQuantidadeFuncao} />
                                </DiagnosticoItemArea>
                              </DiagnosticoContent>
                            </ScrollableContainer>
                          </>)
                        }
                        {activeTab === 'Diagnóstico' &&
                          (<>
                            <ScrollableContainer>
                              <div style={{ height: 50, display: 'flex', justifyContent: 'center', marginBottom: 10, alignItems: 'center' }}>
                                <Titulo3>Setor:</Titulo3>
                                <select style={{ width: '30%', padding: '8px', marginRight: '6px' }} value={setorSelected?._id} onChange={handleSetorChange} >
                                  <option key="0" value={-1}>SELECIONE UM SETOR</option>
                                  {disSelected.setores.map((setor, index) => (
                                    <option key={index} value={setor?.setor?._id}>{setor?.setor?.nome}</option>
                                  ))}
                                </select>
                                <Titulo3>Função:</Titulo3>
                                <select style={{ width: '30%', padding: '8px', marginRight: '6px' }} value={funcaoSelected?._id} onChange={handleFuncaoChange} >
                                  <option key="0" value={-1}>SELECIONE UMA FUNCAO</option>
                                  {setorSelected && disSelected.funcoes.filter(el => el?.setor === setorSelected?._id).map((funcao, index) => (
                                    <option key={index} value={funcao?.funcao?._id}>{funcao?.funcao?.nome}</option>
                                  ))}
                                </select>
                              </div>
                              <DiagnosticoContent >
                                {diagnosticoItems?.map((diagnosticoItem, index) => {
                                  if (diagnosticoItem.id >= 3) {
                                    return (<DiagnosticoItemArea  >
                                      <Titulo3>{diagnosticoItem.label}</Titulo3>
                                      <DiagnosticoItem  >
                                        <DiagnosticoSearchArea>
                                          <InputSearch items={diagnosticoItem.list} onSelect={diagnosticoItem.onSelect} /> <MdList onClick={diagnosticoItem.handleListSelect} style={{ height: '2em', width: '2em', cursor: 'pointer' }} />
                                        </DiagnosticoSearchArea >
                                        {
                                          diagnosticoItem.items && diagnosticoItem.items.map((item, index) =>
                                          (

                                            <DignosticoItemSelectedArea key={index} onClick={(event) => diagnosticoItem.onSelected(event, item._id)} style={{ background: item?._id === diagnosticoItem.selectedIndex?._id ? '#CCC' : '#FFF' }}   >
                                              <p>{item?.nome}</p>
                                              <MdHighlightOff color='#F00' onClick={(event) => diagnosticoItem.onDelete(event, item._id)} style={{ height: '1em', width: '1em' }} />
                                            </DignosticoItemSelectedArea>
                                          )
                                          )
                                        }
                                      </DiagnosticoItem>
                                    </DiagnosticoItemArea>)
                                  }
                                })
                                }
                              </DiagnosticoContent>
                            </ScrollableContainer>
                          </>)
                        }


                      </div>
                      <Styled.Button type="submit" style={{ marginBottom: 10 }}>Salvar</Styled.Button>
                      <Styled.Button type="button" style={{ background: '#FBAF3A' }} onClick={(event) => handleLimparBtn(event)}>Limpar</Styled.Button>
                    </Styled.Form >
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
                          <Styled.ColunaValor>
                            <Styled.IconeArea >
                              <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, dis._id)} style={{ height: '1.2em', width: '1.2em' }} />
                            </Styled.IconeArea>
                            <Styled.IconeArea >
                              <MdEditNote color='#005' onClick={(event) => { toggleSectionExpand(1, event); handleSelect(event, index) }} style={{ height: '1.2em', width: '1.2em' }} />
                            </Styled.IconeArea>
                          </Styled.ColunaValor>


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
    grupos: state.empresa.grupos,
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
    informacao: (text) => dispatch(showInformation(text)),

    listarEmpresas: (page, ativo) => dispatch(listarEmpresasRequest(page, ativo)),

    listarGrupos: (page, ativo) => dispatch(listarGruposRequest(page, ativo)),

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

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dis);