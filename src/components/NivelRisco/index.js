import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm } from 'react-hook-form';
import { criarNivelriscosRequest, deleteNivelriscosRequest, listarNivelriscosRequest, updateNivelriscosRequest } from '../../store/modules/NivelRisco/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { MdHighlightOff } from 'react-icons/md';

import * as Styled from '../styleds';
import Paginacao from '../Paginacao';

const Nivelriscos = ({ loading, nivelriscos, error, page, listarNivelriscos, criarNivelriscos, updateNivelriscos, deleteNivelriscos, confirmacao }) => {
  const formEmpty = {
    _id: '',
    nome: '',
    probabilidadeValor: 0,
    severidadeValor: 0,
    ativo: true,
  }

  const listFields = {
    nome: 'texto'
  }

  const [nivelriscosState, setNivelriscosState] = useState([]);
  const [nivelriscoSelected, setNivelriscoselected] = useState(formEmpty);
  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: nivelriscoSelected
      ? {
        _id: nivelriscoSelected._id,
        nome: nivelriscoSelected.nome,
        severidadeValor: nivelriscoSelected.severidadeValor,
        probabilidadeValor: nivelriscoSelected.probabilidadeValor,
      } :
      {}
  });

  useEffect(() => {
    listarNivelriscos(page, 0);
  }, []);

  useEffect(() => {
    setNivelriscosState(nivelriscos);
  }, [nivelriscos]);


  useEffect(() => {
    reset({ ...nivelriscoSelected });
  }, [reset, nivelriscoSelected])


  const handleSelect = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setNivelriscoselected(nivelriscos[index]);

  }

  const handleDelete = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR A NIVELRISCO?', () => { deleteNivelriscos(index) });
  }

  const handleClear = () => {
    setNivelriscoselected({ ...formEmpty })
  }


  const onSubmit = (data) => {
    if (data._id) {
      updateNivelriscos(data._id, data);

    } else {
      criarNivelriscos(data);
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
          <Styled.Label>{`Probabilidade (Valor):`} </Styled.Label>
          <Styled.Input type='number'
            {...register('probabilidadeValor', { required: true })}
          />
          <Styled.Label>{`Severidade (Valor):`}</Styled.Label>
          <Styled.Input type='number'
            {...register('severidadeValor', { required: true })}
          />
          <Styled.Label>Ativo</Styled.Label>
          <Styled.Input
            type='checkbox'
            {...register('ativo')}
          />
          {errors.ativo && <span>Campo obrigatório</span>}

          <Styled.Button type="submit">Salvar</Styled.Button>
        </Styled.Form>

      </Styled.FormArea>
      <Paginacao page={page} ativo={0} listagem={listarNivelriscos} />
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

          {nivelriscosState?.length > 0 && nivelriscosState?.map((nivelrisco, index) => (
            <>
              <Styled.ListItem key={nivelrisco._id} onClick={(event) => handleSelect(event, index)}>
                {
                  Object.keys(nivelrisco).map((field, index) => {
                    if (field !== '_id' && listFields.hasOwnProperty(field)) {
                      return (<Styled.CampoValor>{`(${nivelrisco.probabilidadeValor} X ${nivelrisco.severidadeValor}) ${nivelrisco[field]}`}</Styled.CampoValor>)
                    }
                  })
                }

                <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', flex: 1 }} >
                  <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, nivelrisco._id)} style={{ height: '1em', width: '1em' }} />
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
    loading: state.nivelrisco.loading,
    nivelriscos: state.nivelrisco.nivelriscos,
    error: state.nivelrisco.error,
    page: state.nivelrisco.page,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listarNivelriscos: (page, ativo) => dispatch(listarNivelriscosRequest(page, ativo)),
    criarNivelriscos: (nivelrisco) => dispatch(criarNivelriscosRequest(nivelrisco)),
    updateNivelriscos: (id, nivelrisco) => dispatch(updateNivelriscosRequest(id, nivelrisco)),
    deleteNivelriscos: (id) => dispatch(deleteNivelriscosRequest(id)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nivelriscos);