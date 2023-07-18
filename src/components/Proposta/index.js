import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm } from 'react-hook-form';
import { criarPropostasRequest, deletePropostasRequest, listarPropostasRequest, updatePropostasRequest } from '../../store/modules/Proposta/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { MdHighlightOff } from 'react-icons/md';

import * as Styled from '../styleds';
import Paginacao from '../Paginacao';

const Proposta = ({ loading, propostas, error, page, listarPropostas, criarPropostas, updatePropostas, deletePropostas, confirmacao }) => {
  const formEmpty = {
    _id: '',
    nome: '',
    ativo: true,
  }

  const [propostasState, setPropostasState] = useState([]);
  const [propostaSelected, setPropostaSelected] = useState(formEmpty);
  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: propostaSelected
      ? {
        _id: propostaSelected._id,
        nome: propostaSelected.nome
      } :
      {}
  });

  useEffect(() => {
    listarPropostas(page, 0);
  }, []);

  useEffect(() => {
    setPropostasState(propostas);
  }, [propostas]);


  useEffect(() => {
    reset({ ...propostaSelected });
  }, [reset, propostaSelected])


  const handleSelect = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setPropostaSelected(propostas[index]);

  }

  const handleDelete = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR A PROCESSO?', () => { deletePropostas(index) });
  }

  const handleClear = () => {
    setPropostaSelected({ ...formEmpty })
  }


  const onSubmit = (data) => {
    if (data._id) {
      updatePropostas(data._id, data);

    } else {
      criarPropostas(data);
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
      <Paginacao page={page} ativo={0} listagem={listarPropostas} />
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

          {propostasState?.length > 0 && propostasState?.map((proposta, index) => (
            <>
              <Styled.ListItem key={proposta._id} onClick={(event) => handleSelect(event, index)}>
                {Object.keys(proposta).map((field, index) => {
                  if (field !== '_id' && field !== '__v') {
                    if (typeof (proposta[field]) === 'boolean') {
                      return (<>
                        {proposta[field] ? <Styled.Ativo /> : <Styled.Inativo />}
                      </>)
                    } else {
                      return (<Styled.CampoValor>{proposta[field]}</Styled.CampoValor>)
                    }
                  }


                })
                }

                <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', flex: 1 }} >
                  <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, proposta._id)} style={{ height: '1em', width: '1em' }} />
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
    loading: state.proposta.loading,
    propostas: state.proposta.propostas,
    error: state.proposta.error,
    page: state.proposta.page,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listarPropostas: (page, ativo) => dispatch(listarPropostasRequest(page, ativo)),
    criarPropostas: (proposta) => dispatch(criarPropostasRequest(proposta)),
    updatePropostas: (id, proposta) => dispatch(updatePropostasRequest(id, proposta)),
    deletePropostas: (id) => dispatch(deletePropostasRequest(id)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Proposta);