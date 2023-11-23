import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm } from 'react-hook-form';
import { criarMedidasRequest, deleteMedidasRequest, listarMedidasRequest, updateMedidasRequest } from '../../store/modules/Medida/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { MdHighlightOff } from 'react-icons/md';

import * as Styled from '../styleds';
import Paginacao from '../Paginacao';

const Medidas = ({ loading, medidas, error, page, listarMedidas, criarMedidas, updateMedidas, deleteMedidas, confirmacao }) => {
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
  const [medidasState, setMedidasState] = useState([]);
  const [medidaSelected, setMedidaselected] = useState(formEmpty);
  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: medidaSelected
      ? {
        _id: medidaSelected._id,
        nome: medidaSelected.nome
      } :
      {}
  });

  useEffect(() => {
    listarMedidas(page, 0);
  }, []);

  useEffect(() => {
    setMedidasState(medidas);
  }, [medidas]);


  useEffect(() => {
    reset({ ...medidaSelected });
  }, [reset, medidaSelected])


  const handleSelect = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setMedidaselected(medidas[index]);

  }

  const handleDelete = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR A MEDIDA?', () => { deleteMedidas(index) });
  }

  const handleClear = () => {
    setMedidaselected({ ...formEmpty })
  }


  const onSubmit = (data) => {
    if (data._id) {
      updateMedidas(data._id, data);

    } else {
      criarMedidas(data);
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
      <Paginacao page={page} ativo={0} listagem={listarMedidas} />
      <Styled.ListArea>

        <Styled.ListHeader>
          {
            Object.keys(listFields).map((key, index) => {
              return <Styled.Coluna label={key} key={index} />
            })
          }
        </Styled.ListHeader>
        <Styled.List>

          {medidasState?.length > 0 && medidasState?.map((medida, index) => (
            <>
              <Styled.ListItem key={medida._id} onClick={(event) => handleSelect(event, index)}>
                {Object.keys(listFields).map((field, index) => {
                  if (field !== '_id' && field !== 'opção') {
                    if (listFields[field] === 'boolean')
                      return (<>
                        {listFields[field] ? <Styled.Ativo /> : <Styled.Inativo />}
                      </>);
                    return (<Styled.CampoValor>{medida[field] && `${medida[field]}`}</Styled.CampoValor>)
                  }


                })
                }

                <Styled.IconeArea >
                  <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, medida._id)} style={{ height: '1em', width: '1em' }} />
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
    loading: state.medida.loading,
    medidas: state.medida.medidas,
    error: state.medida.error,
    page: state.medida.page,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listarMedidas: (page, ativo) => dispatch(listarMedidasRequest(page, ativo)),
    criarMedidas: (medida) => dispatch(criarMedidasRequest(medida)),
    updateMedidas: (id, medida) => dispatch(updateMedidasRequest(id, medida)),
    deleteMedidas: (id) => dispatch(deleteMedidasRequest(id)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Medidas);