import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm } from 'react-hook-form';
import { criarProcessosRequest, deleteProcessosRequest, listarProcessosRequest, updateProcessosRequest } from '../../store/modules/Processo/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { MdHighlightOff } from 'react-icons/md';

import * as Styled from '../styleds';
import Paginacao from '../Paginacao';

const Processo = ({ loading, processos, error, page, listarProcessos, criarProcessos, updateProcessos, deleteProcessos, confirmacao }) => {
  const formEmpty = {
    _id: '',
    nome: '',
    ativo: true,
  }

  const [processosState, setProcessosState] = useState([]);
  const [processoSelected, setProcessoSelected] = useState(formEmpty);
  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: processoSelected
      ? {
        _id: processoSelected._id,
        nome: processoSelected.nome
      } :
      {}
  });

  useEffect(() => {
    listarProcessos(page, 0);
  }, []);

  useEffect(() => {
    setProcessosState(processos);
  }, [processos]);


  useEffect(() => {
    reset({ ...processoSelected });
  }, [reset, processoSelected])


  const handleSelect = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setProcessoSelected(processos[index]);

  }

  const handleDelete = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR A PROCESSO?', () => { deleteProcessos(index) });
  }

  const handleClear = () => {
    setProcessoSelected({ ...formEmpty })
  }


  const onSubmit = (data) => {
    if (data._id) {
      updateProcessos(data._id, data);

    } else {
      criarProcessos(data);
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
          <Styled.Label>Ativo</Styled.Label>
          <Styled.Input
            type='checkbox'
            {...register('ativo')}
          />
          {errors.ativo && <span>Campo obrigatório</span>}

          <Styled.Button type="submit">Salvar</Styled.Button>
        </Styled.Form>

      </Styled.FormArea>
      <Paginacao page={page} ativo={0} listagem={listarProcessos} />
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

          {processosState?.length > 0 && processosState?.map((processo, index) => (
            <>
              <Styled.ListItem key={processo._id} onClick={(event) => handleSelect(event, index)}>
                {Object.keys(processo).map((field, index) => {
                  if (field !== '_id' && field !== '__v') {
                    if (typeof (processo[field]) === 'boolean') {
                      return (<>
                        {processo[field] ? <Styled.Ativo /> : <Styled.Inativo />}
                      </>)
                    } else {
                      return (<Styled.CampoValor>{processo[field]}</Styled.CampoValor>)
                    }
                  }


                })
                }

                <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', flex: 1 }} >
                  <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, processo._id)} style={{ height: '1em', width: '1em' }} />
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
    loading: state.processo.loading,
    processos: state.processo.processos,
    error: state.processo.error,
    page: state.processo.page,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listarProcessos: (page, ativo) => dispatch(listarProcessosRequest(page, ativo)),
    criarProcessos: (processo) => dispatch(criarProcessosRequest(processo)),
    updateProcessos: (id, processo) => dispatch(updateProcessosRequest(id, processo)),
    deleteProcessos: (id) => dispatch(deleteProcessosRequest(id)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Processo);