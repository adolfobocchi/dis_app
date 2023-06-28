import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm } from 'react-hook-form';
import { criarRecursosRequest, deleteRecursosRequest, listarRecursosRequest, updateRecursosRequest } from '../../store/modules/Recurso/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { MdHighlightOff } from 'react-icons/md';

import * as Styled from '../styleds';

const Recursos= ({ loading, recursos, error, page, listarRecursos, criarRecursos, updateRecursos, deleteRecursos, confirmacao }) => {
  const formEmpty = {
    _id: '',
    nome: '',
    ativo: true,
  }

  const [recursosState, setRecursosState] = useState([]);
  const [recursoSelected, setRecursoselected] = useState(formEmpty);
  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: recursoSelected
      ? {
        _id: recursoSelected._id,
        nome: recursoSelected.nome
      } :
      {}
  });

  useEffect(() => {
    listarRecursos(page, 0);
  }, []);

  useEffect(() => {
    setRecursosState(recursos);
  }, [recursos]);


  useEffect(() => {
    reset({ ...recursoSelected });
  }, [reset, recursoSelected])


  const handleSelect = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setRecursoselected(recursos[index]);

  }

  const handleDelete = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR A RECURSO?', () => { deleteRecursos(index) });
  }

  const handleClear = () => {
    setRecursoselected({ ...formEmpty })
  }


  const onSubmit = (data) => {
    if (data._id) {
      updateRecursos(data._id, data);

    } else {
      criarRecursos(data);
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

          {recursosState?.length > 0 && recursosState?.map((recurso, index) => (
            <>
              <Styled.ListItem key={recurso._id} onClick={(event) => handleSelect(event, index)}>
                {Object.keys(recurso).map((field, index) => {
                  if (field !== '_id' && field !== '__v') {
                    if (typeof (recurso[field]) === 'boolean') {
                      return (<>
                        {recurso[field] ? <Styled.Ativo /> : <Styled.Inativo />}
                      </>)
                    } else {
                      return (<Styled.CampoValor>{recurso[field]}</Styled.CampoValor>)
                    }
                  }


                })
                }

                <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', flex: 1 }} >
                  <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, recurso._id)} style={{ height: '1em', width: '1em' }} />
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
    loading: state.recurso.loading,
    recursos: state.recurso.recursos,
    error: state.recurso.error,
    page: state.recurso.page,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listarRecursos: (page, ativo) => dispatch(listarRecursosRequest(page, ativo)),
    criarRecursos: (risco) => dispatch(criarRecursosRequest(risco)),
    updateRecursos: (id, risco) => dispatch(updateRecursosRequest(id, risco)),
    deleteRecursos: (id) => dispatch(deleteRecursosRequest(id)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recursos);