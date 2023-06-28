import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm } from 'react-hook-form';
import { criarSeveridadesRequest, deleteSeveridadesRequest, listarSeveridadesRequest, updateSeveridadesRequest } from '../../store/modules/Severidade/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { MdHighlightOff } from 'react-icons/md';

import * as Styled from '../styleds';

const Severidades = ({ loading, severidades, error, page, listarSeveridades, criarSeveridades, updateSeveridades, deleteSeveridades, confirmacao }) => {
  const formEmpty = {
    _id: '',
    nome: '',
    ativo: true,
  }

  const [severidadesState, setSeveridadesState] = useState([]);
  const [severidadeSelected, setSeveridadeselected] = useState(formEmpty);
  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: severidadeSelected
      ? {
        _id: severidadeSelected._id,
        nome: severidadeSelected.nome
      } :
      {}
  });

  useEffect(() => {
    listarSeveridades(page, 0);
  }, []);

  useEffect(() => {
    setSeveridadesState(severidades);
  }, [severidades]);


  useEffect(() => {
    reset({ ...severidadeSelected });
  }, [reset, severidadeSelected])


  const handleSelect = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setSeveridadeselected(severidades[index]);

  }

  const handleDelete = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR A SEVERIDADE?', () => { deleteSeveridades(index) });
  }

  const handleClear = () => {
    setSeveridadeselected({ ...formEmpty })
  }


  const onSubmit = (data) => {
    if (data._id) {
      updateSeveridades(data._id, data);

    } else {
      criarSeveridades(data);
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

          {severidadesState?.length > 0 && severidadesState?.map((severidade, index) => (
            <>
              <Styled.ListItem key={severidade._id} onClick={(event) => handleSelect(event, index)}>
                {Object.keys(severidade).map((field, index) => {
                  if (field !== '_id' && field !== '__v') {
                    if (typeof (severidade[field]) === 'boolean') {
                      return (<>
                        {severidade[field] ? <Styled.Ativo /> : <Styled.Inativo />}
                      </>)
                    } else {
                      return (<Styled.CampoValor>{severidade[field]}</Styled.CampoValor>)
                    }
                  }


                })
                }

                <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', flex: 1 }} >
                  <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, severidade._id)} style={{ height: '1em', width: '1em' }} />
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
    loading: state.severidade.loading,
    severidades: state.severidade.severidades,
    error: state.severidade.error,
    page: state.severidade.page,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listarSeveridades: (page, ativo) => dispatch(listarSeveridadesRequest(page, ativo)),
    criarSeveridades: (severidade) => dispatch(criarSeveridadesRequest(severidade)),
    updateSeveridades: (id, severidade) => dispatch(updateSeveridadesRequest(id, severidade)),
    deleteSeveridades: (id) => dispatch(deleteSeveridadesRequest(id)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Severidades);