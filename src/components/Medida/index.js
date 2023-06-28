import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm } from 'react-hook-form';
import { criarMedidasRequest, deleteMedidasRequest, listarMedidasRequest, updateMedidasRequest } from '../../store/modules/Medida/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { MdHighlightOff } from 'react-icons/md';

import * as Styled from '../styleds';

const Medidas = ({ loading, medidas, error, page, listarMedidas, criarMedidas, updateMedidas, deleteMedidas, confirmacao }) => {
  const formEmpty = {
    _id: '',
    nome: '',
    ativo: true,
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

          {medidasState?.length > 0 && medidasState?.map((medida, index) => (
            <>
              <Styled.ListItem key={medida._id} onClick={(event) => handleSelect(event, index)}>
                {Object.keys(medida).map((field, index) => {
                  if (field !== '_id' && field !== '__v') {
                    if (typeof (medida[field]) === 'boolean') {
                      return (<>
                        {medida[field] ? <Styled.Ativo /> : <Styled.Inativo />}
                      </>)
                    } else {
                      return (<Styled.CampoValor>{medida[field]}</Styled.CampoValor>)
                    }
                  }


                })
                }

                <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', flex: 1 }} >
                  <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, medida._id)} style={{ height: '1em', width: '1em' }} />
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