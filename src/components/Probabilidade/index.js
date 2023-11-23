import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm } from 'react-hook-form';
import { criarProbabilidadesRequest, deleteProbabilidadesRequest, listarProbabilidadesRequest, updateProbabilidadesRequest } from '../../store/modules/Probabilidade/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { MdHighlightOff } from 'react-icons/md';

import * as Styled from '../styleds';
import Paginacao from '../Paginacao';

const Probabilidades = ({ loading, probabilidades, error, page, listarProbabilidades, criarProbabilidades, updateProbabilidades, deleteProbabilidades, confirmacao }) => {
  const formEmpty = {
    _id: '',
    nome: '',
    valor: 0,
    ativo: true,
  }

  const listFields = {
    nome: 'texto',
    ativo: 'boolean',
    opção: ''
  }

  const [probabilidadesState, setProbabilidadesState] = useState([]);
  const [probabilidadeSelected, setProbabilidadeselected] = useState(formEmpty);
  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: probabilidadeSelected
      ? {
        _id: probabilidadeSelected._id,
        nome: probabilidadeSelected.nome,
        valor: probabilidadeSelected.valor
      } :
      {}
  });

  useEffect(() => {
    listarProbabilidades(page, 0);
  }, []);

  useEffect(() => {
    setProbabilidadesState(probabilidades);
  }, [probabilidades]);


  useEffect(() => {
    reset({ ...probabilidadeSelected });
  }, [reset, probabilidadeSelected])


  const handleSelect = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setProbabilidadeselected(probabilidades[index]);

  }

  const handleDelete = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR A PROBABILIDADE?', () => { deleteProbabilidades(index) });
  }

  const handleClear = () => {
    setProbabilidadeselected({ ...formEmpty })
  }


  const onSubmit = (data) => {
    if (data._id) {
      updateProbabilidades(data._id, data);

    } else {
      criarProbabilidades(data);
    }
    handleClear();
  };

  if (loading) {
    return <ModalLoading />
  }
  return (
    <Styled.Container>
      <Styled.FormArea>
        <Styled.Form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
          <Styled.Input
            hidden
            {...register('id')}
          />
          <Styled.Label>Nome:</Styled.Label>
          <Styled.Input
            {...register('nome', { required: true })}
          />
          {errors.nome && <span>Campo obrigatório</span>}
          <Styled.Label>Valor: </Styled.Label>
          <Styled.Input type='number'
            {...register('valor', { required: true })}
          />
          {errors.valor && <span>Campo obrigatório</span>}
          <Styled.Label>Ativo</Styled.Label>
          <Styled.Input
            type='checkbox'
            {...register('ativo')}
          />
          {errors.ativo && <span>Campo obrigatório</span>}

          <Styled.Button type="submit">Salvar</Styled.Button>
        </Styled.Form>

      </Styled.FormArea>
      <Paginacao page={page} ativo={0} listagem={listarProbabilidades} />
      <Styled.ListArea>

        <Styled.ListHeader>
          {
            Object.keys(listFields).map((key, index) => {
              return <Styled.Coluna label={key} key={index} />
            })
          }
        </Styled.ListHeader>
        <Styled.List>

          {probabilidadesState?.length > 0 && probabilidadesState?.map((probabilidade, index) => (
            <>
              <Styled.ListItem key={probabilidade._id} onClick={(event) => handleSelect(event, index)}>
                {
                  Object.keys(listFields).map((field, index) => {
                    if (field !== '_id' && field !== 'opção') {
                      if (listFields[field] === 'boolean')
                        return (<>
                          {listFields[field] ? <Styled.Ativo /> : <Styled.Inativo />}
                        </>);
                      return (<Styled.CampoValor>{probabilidade[field] && `${probabilidade[field]}`}</Styled.CampoValor>)
                    }
  
  
                  })
                }

                <Styled.IconeArea >
                  <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, probabilidade._id)} style={{ height: '1em', width: '1em' }} />
                </Styled.IconeArea>

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
    loading: state.probabilidade.loading,
    probabilidades: state.probabilidade.probabilidades,
    error: state.probabilidade.error,
    page: state.probabilidade.page,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listarProbabilidades: (page, ativo) => dispatch(listarProbabilidadesRequest(page, ativo)),
    criarProbabilidades: (probabilidade) => dispatch(criarProbabilidadesRequest(probabilidade)),
    updateProbabilidades: (id, probabilidade) => dispatch(updateProbabilidadesRequest(id, probabilidade)),
    deleteProbabilidades: (id) => dispatch(deleteProbabilidadesRequest(id)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Probabilidades);