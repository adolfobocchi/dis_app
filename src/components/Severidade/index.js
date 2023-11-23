import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm } from 'react-hook-form';
import { criarSeveridadesRequest, deleteSeveridadesRequest, listarSeveridadesRequest, updateSeveridadesRequest } from '../../store/modules/Severidade/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { MdHighlightOff } from 'react-icons/md';

import * as Styled from '../styleds';
import Paginacao from '../Paginacao';

const Severidades = ({ loading, severidades, error, page, listarSeveridades, criarSeveridades, updateSeveridades, deleteSeveridades, confirmacao }) => {
  const formEmpty = {
    _id: '',
    nome: '',
    valor: 0,
    ativo: true,
  }

  const listFields = {
    nome: 'texto',
    ativo: 'boolean',
    opção: ''
  }

  const [severidadesState, setSeveridadesState] = useState([]);
  const [severidadeSelected, setSeveridadeselected] = useState(formEmpty);
  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: severidadeSelected
      ? {
        _id: severidadeSelected._id,
        nome: severidadeSelected.nome,
        valor: severidadeSelected.valor,
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
          <Styled.Label>Nome: </Styled.Label>
          <Styled.Input
            {...register('nome', { required: true })}
          />
          {errors.nome && <span>Campo obrigatório</span>}
          <Styled.Label>Valor: </Styled.Label>
          <Styled.Input type='number'
            {...register('valor', { required: true })}
          />
          {errors.valor && <span>Campo obrigatório</span>}
          <Styled.Label>Ativo</Styled.Label>
          <Styled.Input
            type='checkbox'
            {...register('ativo')}
          />
          {errors.ativo && <span>Campo obrigatório</span>}

          <Styled.Button type="submit">Salvar</Styled.Button>
        </Styled.Form>

      </Styled.FormArea>
      <Paginacao page={page} ativo={0} listagem={listarSeveridades} />
      <Styled.ListArea>

        <Styled.ListHeader>
          {
             Object.keys(listFields).map((key, index) => {
              return <Styled.Coluna label={key} key={index} />
            })
          }
        </Styled.ListHeader>
        <Styled.List>

          {severidadesState?.length > 0 && severidadesState?.map((severidade, index) => (
            <>
              <Styled.ListItem key={severidade._id} onClick={(event) => handleSelect(event, index)}>
                {
                  Object.keys(listFields).map((field, index) => {
                    if (field !== '_id' && field !== 'opção') {
                      if (listFields[field] === 'boolean')
                        return (<>
                          {listFields[field] ? <Styled.Ativo /> : <Styled.Inativo />}
                        </>);
                      return (<Styled.CampoValor>{severidade[field] && `${severidade[field]}`}</Styled.CampoValor>)
                    }
  
  
                  })
                }
                

                <Styled.IconeArea >
                  <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, severidade._id)} style={{ height: '1em', width: '1em' }} />
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