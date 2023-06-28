import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm } from 'react-hook-form';
import { criarCausasRequest, deleteCausasRequest, listarCausasRequest, updateCausasRequest } from '../../store/modules/Causa/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { MdHighlightOff } from 'react-icons/md';

import * as Styled from '../styleds';

const Causas = ({ loading, causas, error, page, listarCausas, criarCausas, updateCausas, deleteCausas, confirmacao }) => {
  const formEmpty = {
    _id: '',
    nome: '',
    ativo: true,
  }

  const [causasState, setCausasState] = useState([]);
  const [causaSelected, setCausaselected] = useState(formEmpty);
  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: causaSelected
      ? {
        _id: causaSelected._id,
        nome: causaSelected.nome
      } :
      {}
  });

  useEffect(() => {
    listarCausas(page, 0);
  }, []);

  useEffect(() => {
    setCausasState(causas);
  }, [causas]);


  useEffect(() => {
    reset({ ...causaSelected });
  }, [reset, causaSelected])


  const handleSelect = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setCausaselected(causas[index]);

  }

  const handleDelete = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR A CAUSA?', () => { deleteCausas(index) });
  }

  const handleClear = () => {
    setCausaselected({ ...formEmpty })
  }


  const onSubmit = (data) => {
    if (data._id) {
      updateCausas(data._id, data);

    } else {
      criarCausas(data);
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

          {causasState?.length > 0 && causasState?.map((causa, index) => (
            <>
              <Styled.ListItem key={causa._id} onClick={(event) => handleSelect(event, index)}>
                {Object.keys(causa).map((field, index) => {
                  if (field !== '_id' && field !== '__v') {
                    if (typeof (causa[field]) === 'boolean') {
                      return (<>
                        {causa[field] ? <Styled.Ativo /> : <Styled.Inativo />}
                      </>)
                    } else {
                      return (<Styled.CampoValor>{causa[field]}</Styled.CampoValor>)
                    }
                  }


                })
                }

                <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', flex: 1 }} >
                  <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, causa._id)} style={{ height: '1em', width: '1em' }} />
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
    loading: state.causa.loading,
    causas: state.causa.causas,
    error: state.causa.error,
    page: state.causa.page,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listarCausas: (page, ativo) => dispatch(listarCausasRequest(page, ativo)),
    criarCausas: (causa) => dispatch(criarCausasRequest(causa)),
    updateCausas: (id, causa) => dispatch(updateCausasRequest(id, causa)),
    deleteCausas: (id) => dispatch(deleteCausasRequest(id)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Causas);