import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm } from 'react-hook-form';
import { criarFuncoesRequest, deleteFuncoesRequest, listarFuncoesRequest, updateFuncoesRequest } from '../../store/modules/Funcao/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { MdHighlightOff } from 'react-icons/md';

import * as Styled from '../styleds';
import Paginacao from '../Paginacao';

const Funcao = ({ loading, funcoes, error, page, listarFuncoes, criarFuncoes, updateFuncoes, deleteFuncoes, confirmacao }) => {
  const listFields = {
    nome: 'texto',
    ativo: 'boolean',
    opções: ''
  }
  const formEmpty = {
    _id: '',
    nome: '',
    descricao: '',
    ativo: true,
  }

  const [funcoesState, setFuncoesState] = useState([]);
  const [funcaoSelected, setFuncaoSelected] = useState(formEmpty);
  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: funcaoSelected
      ? {
        _id: funcaoSelected._id,
        nome: funcaoSelected.nome,
        descricao: funcaoSelected.descricao,
      } :
      {}
  });


  useEffect(() => {
    listarFuncoes(page, 0);
  }, []);

  useEffect(() => {
    setFuncoesState(funcoes);
    //updateAll();
  }, [funcoes]);


  useEffect(() => {
    reset({ ...funcaoSelected });
  }, [reset, funcaoSelected])


  const updateAll = () => {
    funcoesState.forEach((item, index) => {
      updateFuncoes(item._id, item)
    })
  }
  const handleSelect = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setFuncaoSelected(funcoes[index]);

  }

  const handleDelete = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR A FUNÇÃO?', () => { deleteFuncoes(index) });
  }

  const handleClear = () => {
    setFuncaoSelected({ ...formEmpty })
  }


  const onSubmit = (data) => {
    if (data._id) {
      updateFuncoes(data._id, data);

    } else {
      criarFuncoes(data);
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
          <Styled.Label>Nome</Styled.Label>
          <Styled.Input
            {...register('nome', { required: true })}
          />
          {errors.nome && <span>Campo obrigatório</span>}
          <Styled.Label>Descrição (CBO)</Styled.Label>
          <Styled.Input
            {...register('descricao', { required: false })}
          />
          {errors.descricao && <span>Campo obrigatório</span>}
          <Styled.Label>Ativo</Styled.Label>
          <Styled.Input
            type='checkbox'
            {...register('ativo')}
          />
          {errors.ativo && <span>Campo obrigatório</span>}

          <Styled.Button type="submit">Salvar</Styled.Button>
        </Styled.Form>

      </Styled.FormArea>
      <Paginacao page={page} ativo={0} listagem={listarFuncoes} />
      <Styled.ListArea>

        <Styled.ListHeader>
          {
            Object.keys(listFields).map((key, index) => {
              return <Styled.Coluna label={key} key={index} />
            })
          }
        </Styled.ListHeader>
        <Styled.List>

          {funcoesState?.length > 0 && funcoesState?.map((funcao, index) => (
            <>
              <Styled.ListItem key={funcao._id} onClick={(event) => handleSelect(event, index)}>
                {Object.keys(funcao).map((field, index) => {
                    if (field !== '_id' && listFields.hasOwnProperty(field)) {
                      if (typeof (funcao[field]) === 'boolean')
                        return (<>{funcao[field] ? <Styled.Ativo /> : <Styled.Inativo />}</>)
                      return (<Styled.CampoValor>{funcao[field]}</Styled.CampoValor>)

                    }
                  })
                }

                <Styled.IconeArea >
                  <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, funcao._id)} style={{ height: '1em', width: '1em' }} />
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
    loading: state.funcao.loading,
    funcoes: state.funcao.funcoes,
    error: state.funcao.error,
    page: state.funcao.page,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listarFuncoes: (page, ativo) => dispatch(listarFuncoesRequest(page, ativo)),
    criarFuncoes: (funcao) => dispatch(criarFuncoesRequest(funcao)),
    updateFuncoes: (id, funcao) => dispatch(updateFuncoesRequest(id, funcao)),
    deleteFuncoes: (id) => dispatch(deleteFuncoesRequest(id)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Funcao);