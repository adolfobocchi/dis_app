import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm } from 'react-hook-form';
import { criarRiscosRequest, deleteRiscosRequest, listarRiscosRequest, updateRiscosRequest } from '../../store/modules/Risco/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { MdChevronLeft, MdChevronRight, MdHighlightOff } from 'react-icons/md';

import * as Styled from '../styleds';
import Paginacao from '../Paginacao';

const Riscos= ({ loading, riscos, error, page, listarRiscos, criarRiscos, updateRiscos, deleteRiscos, confirmacao }) => {
  
  const ativo = 0;

  const formEmpty = {
    _id: '',
    nome: '',
    ativo: true,
  }

  const [riscosState, setRiscosState] = useState([]);
  const [riscoSelected, setRiscoselected] = useState(formEmpty);
  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: riscoSelected
      ? {
        _id: riscoSelected._id,
        nome: riscoSelected.nome
      } :
      {}
  });

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
  }, []);

  useEffect(() => {
    setRiscosState(riscos);
  }, [riscos]);


  useEffect(() => {
    reset({ ...riscoSelected });
  }, [reset, riscoSelected])


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
    if (data._id) {
      updateRiscos(data._id, data);

    } else {
      criarRiscos(data);
    }
    handleClear();
  };

  // const handleAddDados = () => {
  //   dados.map(async nome => await criarRiscos({_id: '', nome: nome, ativo: true}))
  // }

  if (loading) {
    return <ModalLoading />
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

          <Styled.Button type="submit">Salvar</Styled.Button>
        </Styled.Form>

      </Styled.FormArea>
      <Paginacao page={page} ativo={ativo} listagem={listarRiscos} />
      <Styled.ListArea>

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

          {riscosState?.length > 0 && riscosState?.map((risco, index) => (
            <>
              <Styled.ListItem key={risco._id} onClick={(event) => handleSelect(event, index)}>
                {Object.keys(risco).map((field, index) => {
                  if (field !== '_id' && field !== '__v') {
                    if (typeof (risco[field]) === 'boolean') {
                      return (<>
                        {risco[field] ? <Styled.Ativo /> : <Styled.Inativo />}
                      </>)
                    } else {
                      return (<Styled.CampoValor>{risco[field]}</Styled.CampoValor>)
                    }
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listarRiscos: (page, ativo) => dispatch(listarRiscosRequest(page, ativo)),
    criarRiscos: (risco) => dispatch(criarRiscosRequest(risco)),
    updateRiscos: (id, risco) => dispatch(updateRiscosRequest(id, risco)),
    deleteRiscos: (id) => dispatch(deleteRiscosRequest(id)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Riscos);