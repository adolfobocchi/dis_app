import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm } from 'react-hook-form';
import { criarSetoresRequest, deleteSetoresRequest, listarSetoresRequest, updateSetoresRequest } from '../../store/modules/Setor/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { MdHighlightOff } from 'react-icons/md';

import * as Styled from '../styleds';
import Paginacao from '../Paginacao';

const Setor = ({ loading, setores, error, page, listarSetores, criarSetores, updateSetores, deleteSetores, confirmacao }) => {
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

  const [setoresState, setSetoresState] = useState([]);
  const [setorSelected, setSetorSelected] = useState(formEmpty);
  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: setorSelected
      ? {
        _id: setorSelected._id,
        nome: setorSelected.nome
      } :
      {}
  });

  useEffect(() => {
    listarSetores(page, 0);
  }, []);

  useEffect(() => {
    setSetoresState(setores);
  }, [setores]);


  useEffect(() => {
    reset({ ...setorSelected });
  }, [reset, setorSelected])


  const handleSelect = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setSetorSelected(setores[index]);

  }

  const handleDelete = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR A AREA?', () => { deleteSetores(index) });
  }

  const handleClear = () => {
    setSetorSelected({ ...formEmpty })
  }

  const onSubmit = (data) => {
    if (data._id) {
      updateSetores(data._id, data);

    } else {
      criarSetores(data);
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
      <Paginacao page={page} ativo={0} listagem={listarSetores} />
      <Styled.ListArea>
        <Styled.ListHeader>
          {
             Object.keys(listFields).map((key, index) => {
              return <Styled.Coluna label={key} key={index} />
            })
          }
        </Styled.ListHeader>
        <Styled.List>
          {setoresState?.length > 0 && setoresState?.map((setor, index) => (
            <>
              <Styled.ListItem key={setor._id} onClick={(event) => handleSelect(event, index)}>
                {Object.keys(listFields).map((field, index) => {
                  if (field !== '_id' && field !== 'opção') {
                    if (listFields[field] === 'boolean')
                      return (<>
                        {listFields[field] ? <Styled.Ativo /> : <Styled.Inativo />}
                      </>);
                    return (<Styled.CampoValor>{setor[field] && `${setor[field]}`}</Styled.CampoValor>)
                  }


                })
                }
                <Styled.IconeArea >
                  <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, setor._id)} style={{ height: '1em', width: '1em' }} />
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
    loading: state.setor.loading,
    setores: state.setor.setores,
    error: state.setor.error,
    page: state.setor.page,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listarSetores: (page, ativo) => dispatch(listarSetoresRequest(page, ativo)),
    criarSetores: (setor) => dispatch(criarSetoresRequest(setor)),
    updateSetores: (id, setor) => dispatch(updateSetoresRequest(id, setor)),
    deleteSetores: (id) => dispatch(deleteSetoresRequest(id)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Setor);