import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm } from 'react-hook-form';
import { criarMonitoramentosRequest, deleteMonitoramentosRequest, listarMonitoramentosRequest, updateMonitoramentosRequest } from '../../store/modules/Monitoramento/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { MdHighlightOff } from 'react-icons/md';

import * as Styled from '../styleds';
import Paginacao from '../Paginacao';

const Monitoramentos= ({ loading, monitoramentos, error, page, listarMonitoramentos, criarMonitoramentos, updateMonitoramentos, deleteMonitoramentos, confirmacao }) => {
  const formEmpty = {
    _id: '',
    nome: '',
    ativo: true,
  }
  const listFields = {
    nome: 'texto',
    ativo: 'boolean',
    opção: ''
  }

  const [monitoramentosState, setMonitoramentosState] = useState([]);
  const [monitoramentoSelected, setMonitoramentoselected] = useState(formEmpty);
  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: monitoramentoSelected
      ? {
        _id: monitoramentoSelected._id,
        nome: monitoramentoSelected.nome
      } :
      {}
  });

  useEffect(() => {
    listarMonitoramentos(page, 0);
  }, []);

  useEffect(() => {
    setMonitoramentosState(monitoramentos);
  }, [monitoramentos]);


  useEffect(() => {
    reset({ ...monitoramentoSelected });
  }, [reset, monitoramentoSelected])


  const handleSelect = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setMonitoramentoselected(monitoramentos[index]);

  }

  const handleDelete = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR A MONITORAMENTO?', () => { deleteMonitoramentos(index) });
  }

  const handleClear = () => {
    setMonitoramentoselected({ ...formEmpty })
  }


  const onSubmit = (data) => {
    if (data._id) {
      updateMonitoramentos(data._id, data);

    } else {
      criarMonitoramentos(data);
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
      <Paginacao page={page} ativo={0} listagem={listarMonitoramentos} />
      <Styled.ListArea>

        <Styled.ListHeader>
          {
            Object.keys(listFields).map((key, index) => {
              return <Styled.Coluna label={key} key={index} />
            })
          }
        </Styled.ListHeader>
        <Styled.List>

          {monitoramentosState?.length > 0 && monitoramentosState?.map((monitoramento, index) => (
            <>
              <Styled.ListItem key={monitoramento._id} onClick={(event) => handleSelect(event, index)}>
                {Object.keys(listFields).map((field, index) => {
                  if (field !== '_id' && field !== 'opção') {
                    if (listFields[field] === 'boolean')
                      return (<>
                        {listFields[field] ? <Styled.Ativo /> : <Styled.Inativo />}
                      </>);
                    return (<Styled.CampoValor>{monitoramento[field] && `${monitoramento[field]}`}</Styled.CampoValor>)
                  }


                })
                }

                <Styled.IconeArea>
                  <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, monitoramento._id)} style={{ height: '1em', width: '1em' }} />
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
    loading: state.monitoramento.loading,
    monitoramentos: state.monitoramento.monitoramentos,
    error: state.monitoramento.error,
    page: state.monitoramento.page,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listarMonitoramentos: (page, ativo) => dispatch(listarMonitoramentosRequest(page, ativo)),
    criarMonitoramentos: (risco) => dispatch(criarMonitoramentosRequest(risco)),
    updateMonitoramentos: (id, risco) => dispatch(updateMonitoramentosRequest(id, risco)),
    deleteMonitoramentos: (id) => dispatch(deleteMonitoramentosRequest(id)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Monitoramentos);