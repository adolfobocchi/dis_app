import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm } from 'react-hook-form';
import { addAgenteRisco, criarRiscosRequest, deleteRiscosRequest, listarRiscosRequest, updateRiscosRequest } from '../../store/modules/Risco/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { MdChevronLeft, MdChevronRight, MdHighlightOff, MdList } from 'react-icons/md';

import * as Styled from '../styleds';
import Paginacao from '../Paginacao';
import AgentesRisco from '../../models/AgentesRisco';
import ViasAbsorcao from '../../models/ViasAbsorcao';
import { listarCausasRequest } from '../../store/modules/Causa/actions';
import { listarPlanosAcaoRequest } from '../../store/modules/PlanoAcao/actions';
import ModalListSelect from '../ModalListSelect';
import styled from 'styled-components';
import InputSearch from '../InputSearch';

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

const Riscos = ({ loading, riscos, error, page, listarRiscos, criarRiscos, updateRiscos, deleteRiscos, confirmacao, causas, listarCausas, planosAcao, listarPlanosAcao }) => {

  const API_URL = process.env.REACT_APP_URL_API;

  const ativo = 0;

  const listFields = {
    nome: 'texto',
    ativo: 'boolean',
    opções: ''
  }

  const formEmpty = {
    _id: '',
    nome: '',
    agentesRisco: [],
    viasAbsorcao: [],
    causas: [],
    planosAcao: [],
    ativo: true,
  }

  const [riscosState, setRiscosState] = useState([]);
  const [riscoSelected, setRiscoselected] = useState(formEmpty);
  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: riscoSelected
      ? {
        _id: riscoSelected._id,
        nome: riscoSelected.nome,
        agentesRisco: riscoSelected.agentesRisco,
        viasAbsorcao: riscoSelected.viasAbsorcao,
        causas: riscoSelected.causas,
        planosAcao: riscoSelected.planosAcao,
      } :
      {}
  });

  const [agentesRiscoState, setAgentesRiscoState] = useState(AgentesRisco);
  const [viasAbsorcaoState, setViasAbsorcaoState] = useState(ViasAbsorcao);
  const [causasState, setCausasState] = useState([]);
  const [planosAcaoState, setPlanosAcaoState] = useState([]);

  const [agenteRiscoSelected, setAgenteRiscoSelected] = useState({});
  const [viaAbsorcaoSelected, setViaAbsorcaoSelected] = useState({});
  const [causaSelected, setCausaSelected] = useState({});
  const [planoAcaoSelected, setPlanoAcaoSelected] = useState({});

  const [agenteRiscoSelectedIndex, setAgenteRiscoSelectedIndex] = useState(-1);
  const [viaAbsorcaoSelectedIndex, setViaAbsorcaoSelectedIndex] = useState(-1);
  const [causaSelectedIndex, setCausaSelectedIndex] = useState(-1);
  const [planoAcaoSelectedIndex, setPlanoAcaoSelectedIndex] = useState(-1);

  const [showModalAgentesRiscoListSelect, setShowModalAgentesRiscoListSelect] = useState(false);
  const [showModalViasAbsorcaoListSelect, setShowModalViasAbsorcaoListSelect] = useState(false);
  const [showModalCausasListSelect, setShowModalCausasListSelect] = useState(false);
  const [showModalPlanosAcaoListSelect, setShowModalPlanosAcaoListSelect] = useState(false);

  const [diagnosticoItems, setDiagnotiscoItems] = useState([


  ])
  //   const dados = [
  // 'Calor, ',
  // 'Frio, ',
  // 'Pressão Anormais, ',
  // 'Radiação Ionizante, ',
  // 'Radiação Não Ionizante, ',
  // 'Ruído,',
  // 'Temperaturas Extremas, ',
  // 'Umidade, ',
  // 'Vibração, ',
  // 'Fumos Metálicos, ',
  // 'Gases, ',
  // 'Neblinas, ',
  // 'Névoas, ',
  // 'Poeiras,',
  // 'Produtos Químicos em Geral, ',
  // 'Vapores, ',
  // 'Bacilos, ',
  // 'Bactérias, ',
  // 'Fungos, ',
  // 'Parasitas, ',
  // 'Protozoários, ',
  // 'Vírus, ',
  // 'Ambientes com risco de afogamento,',
  // 'Ambientes com risco de engolfamento,',
  // 'Ambientes com risco de soterramento,',
  // 'Animais domésticos,',
  // 'Animais peçonhentos,',
  // 'Animais selvagens,',
  // 'Áreas classificadas,',
  // 'Áreas de movimentação de materiais sem demarcação,',
  // 'Áreas de trânsito de pedestres sem demarcação,',
  // 'Áreas de trânsito de veículos sem demarcação,',
  // 'Armazenamento inadequado,',
  // 'Arranjo físico deficiente ou inadequado,',
  // 'Condições ou procedimentos que possam provocar contato com eletricidade,',
  // 'Condução de veículos de qualquer natureza em vias públicas,',
  // 'Diferença de nível maior que dois metros,',
  // 'Diferença de nível menor ou igual a dois metros,',
  // 'Escadas e rampas inadequadas,',
  // 'Ferramentas inadequadas,',
  // 'Ferramentas necessitando de ajustes e manutenção,',
  // 'Iluminação diurna inadequada,',
  // 'Iluminação noturna inadequada,',
  // 'Intempéries,',
  // 'Máquinas e equipamentos necessitando ajustes e manutenção,',
  // 'Máquinas e equipamentos sem proteção,',
  // 'Mobiliário e/ou superfícies com quinas vivas, rebarbas ou elementos de fixação expostos,',
  // 'Movimentação de materiais,',
  // 'Objetos cortantes e/ou perfurocortantes,',
  // 'Pisos, passagens, passarelas, plataformas, rampas e corredores com saliências, descontinuidades, aberturas ou obstruções, ou escorregadios,',
  // 'Procedimentos de ajuste, limpeza, manutenção e inspeção deficientes ou inexistentes,',
  // 'Queda de objetos,',
  // 'Superfícies e/ou materiais aquecidos expostos,',
  // 'Superfícies e/ou materiais em baixa temperatura expostos,',
  // 'Assédio de qualquer natureza no trabalho,',
  // 'Assento inadequado,',
  // 'Cadência do trabalho imposta por um equipamento,',
  // 'Compressão de partes do corpo por superfícies rígidas ou com quinas,',
  // 'Condições de trabalho com índice de temperatura efetiva fora dos parâmetros de conforto,',
  // 'Condições de trabalho com Iluminação diurna inadequada,',
  // 'Condições de trabalho com Iluminação noturna inadequada,',
  // 'Condições de trabalho com níveis de pressão sonora fora dos parâmetros de conforto,',
  // 'Condições de trabalho com umidade do ar fora dos parâmetros de conforto,',
  // 'Condições de trabalho com velocidade do ar fora dos parâmetros de conforto,',
  // 'Desequilíbrio entre tempo de trabalho e tempo de repouso,',
  // 'Encosto do assento inadequado ou ausente,',
  // 'Equipamentos e/ou máquinas sem meios de regulagem de ajuste ou sem condições de uso,',
  // 'Equipamentos ou mobiliários não adaptados à antropometria do trabalhador,',
  // 'Excesso de conflitos hierárquicos no trabalho,',
  // 'Excesso de demandas emocionais/afetivas no trabalho,',
  // 'Excesso de situações de estresse,',
  // 'Exigência de alto nível de concentração, atenção e memória,',
  // 'Exigência de elevação frequente de membros superiores,',
  // 'Exigência de flexões de coluna vertebral frequentes,',
  // 'Exigência de realização de múltiplas tarefas, com alta demanda cognitiva,',
  // 'Exigência de uso frequente de força, pressão, preensão, flexão, extensão ou torção dos segmentos corporais,',
  // 'Exposição a vibração de corpo inteiro,',
  // 'Exposição a vibrações localizadas (mão-braço),',
  // 'Falta de autonomia no trabalho,',
  // 'Frequente ação de puxar/empurrar cargas ou volumes,',
  // 'Frequente deslocamento a pé durante a jornada de trabalho,',
  // 'Frequente execução de movimentos repetitivos,',
  // 'Insatisfação no trabalho,',
  // 'Insuficiência de capacitação para execução da tarefa,',
  // 'Levantamento e transporte manual de cargas ou volumes,',
  // 'Manuseio de ferramentas e/ou objetos pesados por longos períodos,',
  // 'Manuseio ou movimentação de cargas e volumes sem pega ou com “pega pobre”,',
  // 'Mobiliário ou equipamento sem espaço para movimentação de segmentos corporais,',
  // 'Mobiliário sem meios de regulagem de ajuste,',
  // 'Monotonia,',
  // 'Necessidade de manter ritmos intensos de trabalho,',
  // 'Piso escorregadio e/ou irregular,',
  // 'Posto de trabalho improvisado,',
  // 'Posto de trabalho não planejado/adaptado para a posição sentada,',
  // 'Postura de pé por longos períodos,',
  // 'Postura sentada por longos períodos,',
  // 'Presença de reflexos em telas, painéis, vidros, monitores ou qualquer superfície, que causem desconforto ou prejudiquem a visualização,',
  // 'Situações de sobrecarga de trabalho mental,',
  // 'Trabalho com necessidade de alcançar objetos, documentos, controles ou qualquer ponto além das zonas de alcance ideais para as características antropométricas do trabalhador,',
  // 'Trabalho com demandas divergentes (ordens divergentes, metas incompatíveis entre si, exigência de qualidade X quantidade, entre outras),',
  // 'Trabalho com esforço físico intenso,',
  // 'Trabalho com necessidade de variação de turnos,',
  // 'Trabalho com utilização rigorosa de metas de produção,',
  // 'Trabalho em condições de difícil comunicação,',
  // 'Trabalho em posturas incômodas ou pouco confortáveis por longos períodos,',
  // 'Trabalho intensivo com teclado ou outros dispositivos de entrada de dados,',
  // 'Trabalho noturno,',
  // 'Trabalho realizado sem pausas pré-definidas para descanso,',
  // 'Trabalho remunerado por produção,',
  // 'Uso frequente de alavancas,',
  // 'Uso frequente de escadas,',
  // 'Uso frequente de pedais,',]




  useEffect(() => {
    listarRiscos(page, ativo);
    listarCausas(0, 1);
    listarPlanosAcao(0, 1);
  }, []);

  useEffect(() => {
    setRiscosState(riscos);
  }, [riscos]);

  useEffect(() => {
    setCausasState(causas);
  }, [causas]);

  useEffect(() => {
    setPlanosAcaoState(planosAcao);
  }, [planosAcao]);


  useEffect(() => {
    reset({ ...riscoSelected });
  }, [reset, riscoSelected]);

  useEffect(() => {
    setDiagnotiscoItems([
      {
        id: 5,
        label: 'Agentes de risco:',
        list: agentesRiscoState,
        items: riscoSelected?.agentesRisco || [],
        onSelect: (item) => {
          const exists = riscoSelected?.agentesRisco.find((agenteRisco) => agenteRisco._id === item._id);
          if (!exists) {
            const updatedAgenteRisco = [...riscoSelected?.agentesRisco, item];
            setRiscoselected((prevState) => ({
              ...prevState,
              agentesRisco: updatedAgenteRisco,
            }));
          }
        },
        onSelected: (event, index) => { setAgenteRiscoSelected(riscoSelected?.agentesRisco[index]); setAgenteRiscoSelectedIndex(index)},
        onDelete: (event, id) => { 
          const updatedAgenteRisco = riscoSelected?.agentesRisco.filter((agenteRisco) => agenteRisco._id !== id);
          setRiscoselected((prevState) => ({
            ...prevState,
            agentesRisco: updatedAgenteRisco,
          }));
        },
        selectedIndex: agenteRiscoSelectedIndex,
        handleListSelect: () => { setShowModalAgentesRiscoListSelect(true); }
      },
      {
        id: 7,
        label: 'Vias de absorção:',
        list: viasAbsorcaoState,
        items: riscoSelected?.viasAbsorcao || [],
        onSelect: (item) => {
          const exists = riscoSelected?.viasAbsorcao.find((viaAbsorcao) => viaAbsorcao._id === item._id);
          if (!exists) {
            const updatedViaAbsorcao = [...riscoSelected?.viasAbsorcao, item];
            setRiscoselected((prevState) => ({
              ...prevState,
              viasAbsorcao: updatedViaAbsorcao,
            }));
          }
        },
        onSelected: (event, index) => {setViaAbsorcaoSelected(riscoSelected.viasAbsorcao[index]); setViaAbsorcaoSelectedIndex(index) },
        onDelete: (event, id) => {
          const updatedViaAbsorcao = riscoSelected?.viasAbsorcao.filter((viaAbsorcao) => viaAbsorcao._id !== id);
          setRiscoselected((prevState) => ({
            ...prevState,
            viasAbsorcao: updatedViaAbsorcao,
          }));
        },
        selectedIndex: viaAbsorcaoSelectedIndex,
        handleListSelect: () => { setShowModalViasAbsorcaoListSelect(true); }
      },
       {
        id: 10,
        label: 'Possiveis lesões ou agravos a saúde:',
        list: causasState,
        items: riscoSelected?.causas || [],
        onSelect: (item) => {
          const exists = riscoSelected?.causas.find((causa) => causa._id === item._id);
          if (!exists) {
            const updatedCausa = [...riscoSelected?.causas, item];
            setRiscoselected((prevState) => ({
              ...prevState,
              causas: updatedCausa,
            }));
          }
        },
        onSelected: (event, index) => { setCausaSelected(riscoSelected?.causas[index]); setCausaSelectedIndex(index) },
        onDelete: (event, id) => {
          const updatedCausa = riscoSelected?.causas.filter((causa) => causa._id !== id);
          setRiscoselected((prevState) => ({
            ...prevState,
            causas: updatedCausa,
          }));
        },
        selectedIndex: causaSelectedIndex,
        handleListSelect: () => {setShowModalCausasListSelect(true);  }
      },
      {
        id: 16,
        label: 'Descrição do plano de ação:',
        list: planosAcaoState,
        items: riscoSelected?.planosAcao || [],
        onSelect: (item) => {
          const exists = riscoSelected?.planosAcao.find((planoAcao) => planoAcao._id === item._id);
          if (!exists) {
            const updatedPlanoAcao = [...riscoSelected?.planosAcao, item];
            setRiscoselected((prevState) => ({
              ...prevState,
              planosAcao: updatedPlanoAcao,
            }));
          }
        },
        onSelected: (event, index) => { setPlanoAcaoSelected(riscoSelected?.planosAcao[index]); setPlanoAcaoSelectedIndex(index) },
        onDelete: (event, id) => {
          const updatedPlanoAcao = riscoSelected?.planosAcao.filter((planoAcao) => planoAcao._id !== id);
          setRiscoselected((prevState) => ({
            ...prevState,
            planosAcao: updatedPlanoAcao,
          }));
        },
        selectedIndex: planoAcaoSelectedIndex,
        handleListSelect: () => setShowModalPlanosAcaoListSelect(true)
      },
    ])
  }, [agenteRiscoSelectedIndex, agentesRiscoState, causaSelectedIndex, causasState, planoAcaoSelectedIndex, planosAcaoState, riscoSelected, viaAbsorcaoSelectedIndex, viasAbsorcaoState]);

  console.log(riscoSelected);

  const handleSelect = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setRiscoselected(riscos[index]);

  }

  const handleDelete = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR A RISCO?', () => { deleteRiscos(index) });
  }

  const handleClear = () => {
    setRiscoselected({ ...formEmpty })
  }


  const onSubmit = (data) => {
    console.log(data);
    if (data._id) {
      updateRiscos(data._id, data);

    } else {
      criarRiscos(data);
    }
    handleClear();
  };

  const addViaAbsorcao = (items) => {
    const newViasAbsorcao = items.filter(item => (
      !riscoSelected?.viasAbsorcao.some(viaAbsorcao => viaAbsorcao._id === item._id)
    ));
    
    setRiscoselected((prevState) => ({
      ...prevState,
      viasAbsorcao: [...prevState.viasAbsorcao, ...newViasAbsorcao],
    }));
  }

  const addAgenteRisco = (items) => {
    const newAgentesRisco = items.filter(item => (
      !riscoSelected?.agentesRisco.some(agente => agente._id === item._id)
    ));
    
    setRiscoselected((prevState) => ({
      ...prevState,
      agentesRisco: [...prevState.agentesRisco, ...newAgentesRisco],
    }));
  }
  const addCausa = (items) => {
    const newCausa = items.filter(item => (
      !riscoSelected?.causas.some(causa => causa._id === item._id)
    ));
    
    setRiscoselected((prevState) => ({
      ...prevState,
      causas: [...prevState.causas, ...newCausa],
    }));
  }
  const addPlanoAcao = (items) => {
    const newPlanosAcao = items.filter(item => (
      !riscoSelected?.planosAcao.some(planoAcao => planoAcao._id === item._id)
    ));
    
    setRiscoselected((prevState) => ({
      ...prevState,
      planosAcao: [...prevState.planosAcao, ...newPlanosAcao],
    }));
  }
  // const handleAddDados = () => {
  //   dados.map(async nome => await criarRiscos({_id: '', nome: nome, ativo: true}))
  // }

  if (loading) {
    return <ModalLoading />
  }
  if (showModalAgentesRiscoListSelect) {
    return <ModalListSelect dados={agentesRiscoState} close={setShowModalAgentesRiscoListSelect}
    setItensSelected={(items) => addAgenteRisco(items)} />
  }
  if (showModalViasAbsorcaoListSelect) {
    return <ModalListSelect dados={viasAbsorcaoState} close={setShowModalViasAbsorcaoListSelect}
      setItensSelected={(items) => addViaAbsorcao(items)} />
  }
  if (showModalCausasListSelect) {
    return <ModalListSelect dados={causasState} close={setShowModalCausasListSelect}
      setItensSelected={(items) => addCausa(items)} />
  }
  if (showModalPlanosAcaoListSelect) {
    return <ModalListSelect dados={planosAcaoState} close={setShowModalPlanosAcaoListSelect}
      setItensSelected={(items) => addPlanoAcao(items)} />
  }
  return (
    <Styled.Container>
      {/*<button type='button' value='EXECUTAR' onClick={() => handleAddDados()} />*/}
      <Styled.FormArea>
        <Styled.Form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
          <Styled.Input
            hidden
            {...register('id')}
          />
          <Styled.Label>Nome</Styled.Label>
          <Styled.Input
            {...register('nome', { required: true })}
          />
          {errors.nome && <span>Campo obrigatório</span>}
          <Styled.Label>Ativo</Styled.Label>
          <Styled.Input
            type='checkbox'
            {...register('ativo')}
          />
          {errors.ativo && <span>Campo obrigatório</span>}
          <DiagnosticoContent>
            {diagnosticoItems?.map((diagnosticoItem, index) => (
              <DiagnosticoItemArea key={diagnosticoItem.id} >
                <h3>{diagnosticoItem.label}</h3>
                <DiagnosticoItem>
                  <DiagnosticoSearchArea>
                    <InputSearch items={diagnosticoItem.list} onSelect={diagnosticoItem.onSelect} /> <MdList onClick={diagnosticoItem.handleListSelect} style={{ height: '2em', width: '2em', cursor: 'pointer' }} />
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

          <Styled.Button type="submit">Salvar</Styled.Button>
        </Styled.Form>

      </Styled.FormArea>
      <Paginacao page={page} ativo={ativo} listagem={listarRiscos} />
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

          {riscosState?.length > 0 && riscosState?.map((risco, index) => (
            <>
              <Styled.ListItem key={risco._id} onClick={(event) => handleSelect(event, index)}>
                {
                  Object.keys(risco).map((field, index) => {
                    if (field !== '_id' && listFields.hasOwnProperty(field)) {
                      if (listFields[field] === 'imagem')
                        return (<Styled.CampoImg src={`${API_URL}/images/${risco[field]}`} />);
                      if (listFields[field] === 'json')
                        return (<Styled.CampoValor>{risco[field].nome || risco[field].razaoSocial}</Styled.CampoValor>)
                      if (typeof (risco[field]) === 'boolean')
                        return (<>{risco[field] ? <Styled.Ativo /> : <Styled.Inativo />}</>)
                      return (<Styled.CampoValor>{risco[field]}</Styled.CampoValor>)

                    }
                  })
                }
                <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', flex: 1 }} >
                  <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, risco._id)} style={{ height: '1em', width: '1em' }} />
                </div>

              </Styled.ListItem>
            </>
          ))}
        </Styled.List>
      </Styled.ListArea>
    </Styled.Container>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.risco.loading,
    riscos: state.risco.riscos,
    error: state.risco.error,
    page: state.risco.page,
    causas: state.causa.causas,
    planosAcao: state.planoAcao.planosAcao,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listarRiscos: (page, ativo) => dispatch(listarRiscosRequest(page, ativo)),
    criarRiscos: (risco) => dispatch(criarRiscosRequest(risco)),
    updateRiscos: (id, risco) => dispatch(updateRiscosRequest(id, risco)),
    deleteRiscos: (id) => dispatch(deleteRiscosRequest(id)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm)),
    listarCausas: (page, ativo) => dispatch(listarCausasRequest(page, ativo)),
    listarPlanosAcao: (page, ativo) => dispatch(listarPlanosAcaoRequest(page, ativo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Riscos);