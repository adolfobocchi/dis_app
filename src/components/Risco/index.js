import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm } from 'react-hook-form';
import { criarRiscosRequest, deleteRiscosRequest, listarRiscosRequest, updateRiscosRequest } from '../../store/modules/Risco/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { MdHighlightOff } from 'react-icons/md';

import * as Styled from '../styleds';

const Riscos= ({ loading, riscos, error, page, listarRiscos, criarRiscos, updateRiscos, deleteRiscos, confirmacao }) => {
  const formEmpty = {
    _id: '',
    nome: '',
    ativo: true,
  }

  const [riscosState, setRiscosState] = useState([]);
  const [riscoSelected, setRiscoselected] = useState(formEmpty);
  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: riscoSelected
      ? {
        _id: riscoSelected._id,
        nome: riscoSelected.nome
      } :
      {}
  });

  useEffect(() => {
    listarRiscos(page, 0);
  }, []);

  useEffect(() => {
    setRiscosState(riscos);
  }, [riscos]);


  useEffect(() => {
    reset({ ...riscoSelected });
  }, [reset, riscoSelected])


  const handleSelect = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setRiscoselected(riscos[index]);

  }

  const handleDelete = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR A RISCO?', () => { deleteRiscos(index) });
  }

  const handleClear = () => {
    setRiscoselected({ ...formEmpty })
  }


  const onSubmit = (data) => {
    if (data._id) {
      updateRiscos(data._id, data);

    } else {
      criarRiscos(data);
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

          {riscosState?.length > 0 && riscosState?.map((risco, index) => (
            <>
              <Styled.ListItem key={risco._id} onClick={(event) => handleSelect(event, index)}>
                {Object.keys(risco).map((field, index) => {
                  if (field !== '_id' && field !== '__v') {
                    if (typeof (risco[field]) === 'boolean') {
                      return (<>
                        {risco[field] ? <Styled.Ativo /> : <Styled.Inativo />}
                      </>)
                    } else {
                      return (<Styled.CampoValor>{risco[field]}</Styled.CampoValor>)
                    }
                  }


                })
                }

                <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', flex: 1 }} >
                  <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, risco._id)} style={{ height: '1em', width: '1em' }} />
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
    loading: state.risco.loading,
    riscos: state.risco.riscos,
    error: state.risco.error,
    page: state.risco.page,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listarRiscos: (page, ativo) => dispatch(listarRiscosRequest(page, ativo)),
    criarRiscos: (risco) => dispatch(criarRiscosRequest(risco)),
    updateRiscos: (id, risco) => dispatch(updateRiscosRequest(id, risco)),
    deleteRiscos: (id) => dispatch(deleteRiscosRequest(id)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Riscos);