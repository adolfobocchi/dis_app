import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm } from 'react-hook-form';

import { criarAreasRequest, deleteAreasRequest, listarAreasRequest, updateAreasRequest } from '../../store/modules/Area/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { MdHighlightOff } from 'react-icons/md';
import * as Styled from '../styleds';

const Area = ({ loading, areas, error, page, listarAreas, criarAreas, updateAreas, deleteAreas, confirmacao }) => {
  const formEmpty = {
    _id: '',
    nome: '',
    ativo: true,
  }

  const [areasState, setAreasState] = useState([]);
  const [areaSelected, setAreaSelected] = useState(formEmpty);
  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: areaSelected
      ? {
        _id: areaSelected._id,
        nome: areaSelected.nome
      } :
      {}
  });

  useEffect(() => {
    listarAreas(page, 0);
  }, []);

  useEffect(() => {
    setAreasState(areas);
  }, [areas]);


  useEffect(() => {
    reset({ ...areaSelected });
  }, [reset, areaSelected])


  const handleSelect = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setAreaSelected(areas[index]);

  }

  const handleDelete = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR A AREA?', () => { deleteAreas(index) });
  }

  const handleClear = () => {
    setAreaSelected({ ...formEmpty })
  }


  const onSubmit = (data) => {
    if (data._id) {
      updateAreas(data._id, data);

    } else {
      criarAreas(data);
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
            placeholder='Nome da area'
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

          {areasState?.length > 0 && areasState?.map((area, index) => (
            <>
              <Styled.ListItem key={area._id} onClick={(event) => handleSelect(event, index)}>
                {Object.keys(area).map((field, index) => {
                  if (field !== '_id' && field !== '__v') {
                    if (typeof (area[field]) === 'boolean') {
                      return (<>
                        {area[field] ? <Styled.Ativo /> : <Styled.Inativo />}
                      </>)
                    } else {
                      return (<Styled.CampoValor>{area[field]}</Styled.CampoValor>)
                    }
                  }


                })
                }

                <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', flex: 1 }} >
                  <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, area._id)} style={{ height: '1em', width: '1em' }} />
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
    loading: state.area.loading,
    areas: state.area.areas,
    error: state.area.error,
    page: state.area.page,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listarAreas: (page, ativo) => dispatch(listarAreasRequest(page, ativo)),
    criarAreas: (area) => dispatch(criarAreasRequest(area)),
    updateAreas: (id, area) => dispatch(updateAreasRequest(id, area)),
    deleteAreas: (id) => dispatch(deleteAreasRequest(id)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Area);