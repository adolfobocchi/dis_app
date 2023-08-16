import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm } from 'react-hook-form';
import { criarPerigosRequest, deletePerigosRequest, listarPerigosRequest, updatePerigosRequest } from '../../store/modules/Perigo/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { MdHighlightOff } from 'react-icons/md';

import * as Styled from '../styleds';
import Paginacao from '../Paginacao';

const Perigo = ({ loading, perigos, error, page, listarPerigos, criarPerigos, updatePerigos, deletePerigos, confirmacao }) => {
  const formEmpty = {
    _id: '',
    nome: '',
    ativo: true,
  }

  const [perigosState, setPerigosState] = useState([]);
  const [perigoSelected, setPerigoSelected] = useState(formEmpty);
  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: perigoSelected
      ? {
        _id: perigoSelected._id,
        nome: perigoSelected.nome
      } :
      {}
  });

  useEffect(() => {
    listarPerigos(page, 0);
  }, []);

  useEffect(() => {
    setPerigosState(perigos);
  }, [perigos]);


  useEffect(() => {
    reset({ ...perigoSelected });
  }, [reset, perigoSelected])


  const handleSelect = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setPerigoSelected(perigos[index]);

  }

  const handleDelete = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR A PERIGO?', () => { deletePerigos(index) });
  }

  const handleClear = () => {
    setPerigoSelected({ ...formEmpty })
  }


  const onSubmit = (data) => {
    if (data._id) {
      updatePerigos(data._id, data);

    } else {
      criarPerigos(data);
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
      <Paginacao page={page} ativo={0} listagem={listarPerigos} />
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

          {perigosState?.length > 0 && perigosState?.map((perigo, index) => (
            <>
              <Styled.ListItem key={perigo._id} onClick={(event) => handleSelect(event, index)}>
                {Object.keys(perigo).map((field, index) => {
                  if (field !== '_id' && field !== '__v') {
                    if (typeof (perigo[field]) === 'boolean') {
                      return (<>
                        {perigo[field] ? <Styled.Ativo /> : <Styled.Inativo />}
                      </>)
                    } else {
                      return (<Styled.CampoValor>{perigo[field]}</Styled.CampoValor>)
                    }
                  }


                })
                }

                <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', flex: 1 }} >
                  <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, perigo._id)} style={{ height: '1em', width: '1em' }} />
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
    loading: state.perigo.loading,
    perigos: state.perigo.perigos,
    error: state.perigo.error,
    page: state.perigo.page,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listarPerigos: (page, ativo) => dispatch(listarPerigosRequest(page, ativo)),
    criarPerigos: (perigo) => dispatch(criarPerigosRequest(perigo)),
    updatePerigos: (id, perigo) => dispatch(updatePerigosRequest(id, perigo)),
    deletePerigos: (id) => dispatch(deletePerigosRequest(id)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Perigo);