import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm } from 'react-hook-form';
import { criarPlanosAcaoRequest, deletePlanosAcaoRequest, listarPlanosAcaoRequest, updatePlanosAcaoRequest } from '../../store/modules/PlanoAcao/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { MdHighlightOff } from 'react-icons/md';

import * as Styled from '../styleds';
import Paginacao from '../Paginacao';

const PlanoAcao = ({ loading, planosAcao, error, page, listarPlanosAcao, criarPlanosAcao, updatePlanosAcao, deletePlanosAcao, confirmacao }) => {
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

  const [planosAcaoState, setPlanosAcaoState] = useState([]);
  const [planoAcaoSelected, setPlanoAcaoSelected] = useState(formEmpty);
  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: planoAcaoSelected
      ? {
        _id: planoAcaoSelected._id,
        nome: planoAcaoSelected.nome
      } :
      {}
  });

  useEffect(() => {
    listarPlanosAcao(page, 0);
  }, []);

  useEffect(() => {
    setPlanosAcaoState(planosAcao);
  }, [planosAcao]);


  useEffect(() => {
    reset({ ...planoAcaoSelected });
  }, [reset, planoAcaoSelected])


  const handleSelect = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setPlanoAcaoSelected(planosAcao[index]);

  }

  const handleDelete = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR A PROCESSO?', () => { deletePlanosAcao(index) });
  }

  const handleClear = () => {
    setPlanoAcaoSelected({ ...formEmpty })
  }


  const onSubmit = (data) => {
    if (data._id) {
      updatePlanosAcao(data._id, data);

    } else {
      criarPlanosAcao(data);
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
      <Paginacao page={page} ativo={0} listagem={listarPlanosAcao} />
      <Styled.ListArea>

        <Styled.ListHeader>
          {
            Object.keys(listFields).map((key, index) => {
              return <Styled.Coluna label={key} key={index} />
            })
          }
        </Styled.ListHeader>
        <Styled.List>

          {planosAcaoState?.length > 0 && planosAcaoState?.map((planoAcao, index) => (
            <>
              <Styled.ListItem key={planoAcao._id} onClick={(event) => handleSelect(event, index)}>
                {Object.keys(listFields).map((field, index) => {
                  if (field !== '_id' && field !== 'opção') {
                    if (listFields[field] === 'boolean')
                      return (<>
                        {listFields[field] ? <Styled.Ativo /> : <Styled.Inativo />}
                      </>);
                    return (<Styled.CampoValor>{planoAcao[field] && `${planoAcao[field]}`}</Styled.CampoValor>)
                  }


                })
                }

                <Styled.IconeArea >
                  <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, planoAcao._id)} style={{ height: '1em', width: '1em' }} />
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
    loading: state.planoAcao.loading,
    planosAcao: state.planoAcao.planosAcao,
    error: state.planoAcao.error,
    page: state.planoAcao.page,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listarPlanosAcao: (page, ativo) => dispatch(listarPlanosAcaoRequest(page, ativo)),
    criarPlanosAcao: (planoAcao) => dispatch(criarPlanosAcaoRequest(planoAcao)),
    updatePlanosAcao: (id, planoAcao) => dispatch(updatePlanosAcaoRequest(id, planoAcao)),
    deletePlanosAcao: (id) => dispatch(deletePlanosAcaoRequest(id)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanoAcao);