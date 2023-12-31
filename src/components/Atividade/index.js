import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm } from 'react-hook-form';
import { criarAtividadesRequest, deleteAtividadesRequest, listarAtividadesRequest, updateAtividadesRequest } from '../../store/modules/Atividade/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { MdHighlightOff } from 'react-icons/md';

import * as Styled from '../styleds';
import Paginacao from '../Paginacao';

const Atividade = ({ loading, atividades, error, page, listarAtividades, criarAtividades, updateAtividades, deleteAtividades, confirmacao }) => {
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

  const [atividadesState, setAtividadesState] = useState([]);
  const [atividadeSelected, setAtividadeSelected] = useState(formEmpty);
  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: atividadeSelected
      ? {
        _id: atividadeSelected._id,
        nome: atividadeSelected.nome
      } :
      {}
  });

  useEffect(() => {
    listarAtividades(page, 0);
  }, []);

  useEffect(() => {
    setAtividadesState(atividades);
  }, [atividades]);


  useEffect(() => {
    reset({ ...atividadeSelected });
  }, [reset, atividadeSelected])


  const handleSelect = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setAtividadeSelected(atividades[index]);

  }

  const handleDelete = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR A ATIVIDADE?', () => { deleteAtividades(index) });
  }

  const handleClear = () => {
    setAtividadeSelected({ ...formEmpty })
  }


  const onSubmit = (data) => {
    if (data._id) {
      updateAtividades(data._id, data);

    } else {
      criarAtividades(data);
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
      <Paginacao page={page} ativo={0} listagem={listarAtividades} />
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

          {atividadesState?.length > 0 && atividadesState?.map((atividade, index) => (
            <>
              <Styled.ListItem key={atividade._id} onClick={(event) => handleSelect(event, index)}>
                {Object.keys(listFields).map((field, index) => {
                  if (field !== '_id' && field !== 'opção') {
                    if (listFields[field] === 'boolean')
                      return (<>
                        {listFields[field] ? <Styled.Ativo /> : <Styled.Inativo />}
                      </>);
                    return (<Styled.CampoValor>{atividade[field] && `${atividade[field]}`}</Styled.CampoValor>)
                  }


                })
                }

                <Styled.IconeArea >
                  <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, atividade._id)} style={{ height: '1em', width: '1em' }} />
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
    loading: state.atividade.loading,
    atividades: state.atividade.atividades,
    error: state.atividade.error,
    page: state.atividade.page,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listarAtividades: (page, ativo) => dispatch(listarAtividadesRequest(page, ativo)),
    criarAtividades: (atividade) => dispatch(criarAtividadesRequest(atividade)),
    updateAtividades: (id, atividade) => dispatch(updateAtividadesRequest(id, atividade)),
    deleteAtividades: (id) => dispatch(deleteAtividadesRequest(id)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Atividade);