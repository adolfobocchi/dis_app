import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm } from 'react-hook-form';
import { criarCausasRequest, deleteCausasRequest, listarCausasRequest, updateCausasRequest } from '../../store/modules/Causa/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { MdHighlightOff } from 'react-icons/md';

import * as Styled from '../styleds';
import Paginacao from '../Paginacao';
import InputSearch from '../InputSearch';
import { listarRiscosRequest } from '../../store/modules/Risco/actions';

const Causas = ({ loading, causas, listarRiscos, riscos, error, page, listarCausas, criarCausas, updateCausas, deleteCausas, confirmacao }) => {
  
  const listFields = {
    nome: 'texto',
    risco: 'json',
    ativo: 'boolean',
  }
  const formEmpty = {
    _id: '',
    nome: '',
    risco: '',
    ativo: true,
  }
  const [riscosState, setRiscosState] = useState([]);
  const [riscoSelected, setRiscoSelected] = useState({});

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
    listarRiscos(0, 1);
  }, []);

  useEffect(() => {
    setRiscosState(riscos);
  }, [riscos]);

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
    setRiscoSelected(causas[index].risco)
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
    data.risco = riscoSelected;
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
          <Styled.Label>Risco: </Styled.Label>
          <InputSearch items={riscosState} onSelect={(item) => setRiscoSelected(item)} valueSelected={riscoSelected?.nome} field={'nome'} />

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
      <Paginacao page={page} ativo={0} listagem={listarCausas} />
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
          {causasState?.length > 0 && causasState?.map((causa, index) => (
            <>
              <Styled.ListItem key={causa._id} onClick={(event) => handleSelect(event, index)}>
                {
                  Object.keys(causa).map((field, index) => {
                    if (field !== '_id' && listFields.hasOwnProperty(field)) {
                      if (listFields[field] === 'json')
                        return (<Styled.CampoValor>{causa[field].nome}</Styled.CampoValor>);
                      if (listFields[field] === 'boolean') 
                        return (<>
                          {causa[field] ? <Styled.Ativo /> : <Styled.Inativo />}
                        </>);
                      return (<Styled.CampoValor>{causa[field]}</Styled.CampoValor>)

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
    riscos: state.risco.riscos,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listarCausas: (page, ativo) => dispatch(listarCausasRequest(page, ativo)),
    criarCausas: (causa) => dispatch(criarCausasRequest(causa)),
    updateCausas: (id, causa) => dispatch(updateCausasRequest(id, causa)),
    deleteCausas: (id) => dispatch(deleteCausasRequest(id)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm)),
    listarRiscos: (page, ativo) => dispatch(listarRiscosRequest(page, ativo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Causas);