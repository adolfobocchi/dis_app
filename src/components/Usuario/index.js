import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm, Controller } from 'react-hook-form';
import { criarUsuariosRequest, deleteUsuariosRequest, listarUsuariosRequest, updatePasswordUsuariosRequest, updateUsuariosRequest } from '../../store/modules/Usuario/actions';
import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { MdHighlightOff } from 'react-icons/md';

import * as Styled from '../styleds';
import Paginacao from '../Paginacao';

const Usuarios = ({ loading, usuarios, error, page, listarUsuarios, criarUsuarios, updateUsuarios, updatePasswordUsuarios, deleteUsuarios, confirmacao }) => {
  const formEmpty = {
    _id: '',
    nome: '',
    email: '',
    password: '',
    tipo: '',
    registro: '',
    ativo: true,
  }

  const listFields = {
    nome: 'texto',
    email: 'texto',
    tipo: 'texto',
  }

  const [usuariosState, setUsuariosState] = useState([]);
  const [usuarioSelected, setUsuarioselected] = useState(formEmpty);
  const { register, control, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: usuarioSelected
      ? {
        _id: usuarioSelected._id,
        nome: usuarioSelected.nome,
        valor: usuarioSelected.valor
      } :
      {}
  });
  console.log(page);

  useEffect(() => {
    listarUsuarios(page, 0);
  }, []);

  useEffect(() => {
    setUsuariosState(usuarios);
  }, [usuarios]);


  useEffect(() => {
    reset({ ...usuarioSelected });
  }, [reset, usuarioSelected])


  const handleSelect = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setUsuarioselected(usuarios[index]);

  }

  const handleDelete = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR O USUARIO?', () => { deleteUsuarios(index) });
  }

  const handleClear = () => {
    setUsuarioselected({ ...formEmpty })
  }


  const onSubmit = (data) => {
    if (data._id) {
      updateUsuarios(data._id, data);

    } else {
      criarUsuarios(data);
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
          <Styled.Label>Nome:</Styled.Label>
          <Styled.Input
            {...register('nome', { required: true })}
          />
          {errors.nome && <span>Campo obrigatório</span>}
          <Styled.Label>Email: </Styled.Label>
          <Styled.Input type='email'
            {...register('email', { required: true })}
          />
          {errors.email && <span>Campo obrigatório</span>}
          <Styled.Label>Tipo: </Styled.Label>
          <Controller
            name="tipo"
            control={control}
            rules={{ required: 'Campo obrigatório' }}
            render={({ field }) => (
              <select style={{padding: 8}} {...field}>
                <option value="">Selecione o tipo</option>
                <option value="assistente">Assistente</option>
                <option value="técnico">Técnico</option>
                <option value="administrador">Administrador</option>
              </select>
            )}
          />
          {errors.tipo && <span>Campo obrigatório</span>}
          <Styled.Label>Senha: </Styled.Label>
          <Styled.Input type='password'
            {...register('password', { required: false })}
          />
          {errors.password && <span>Campo obrigatório</span>}
          <Styled.Label>Registro: </Styled.Label>
          <Styled.Input 
            {...register('registro', { required: true })}
          />
          {errors.registro && <span>Campo obrigatório</span>}
          <Styled.Label>Ativo</Styled.Label>
          <Styled.Input
            type='checkbox'
            {...register('ativo')}
          />
          {errors.ativo && <span>Campo obrigatório</span>}

          <Styled.Button type="submit">Salvar</Styled.Button>
        </Styled.Form>

      </Styled.FormArea>
      <Paginacao page={page} ativo={0} listagem={listarUsuarios} />
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

          {usuariosState?.length > 0 && usuariosState?.map((usuario, index) => (
            <>
              <Styled.ListItem key={usuario._id} onClick={(event) => handleSelect(event, index)}>
                {
                  Object.keys(usuario).map((field, index) => {
                    if (field !== '_id' && listFields.hasOwnProperty(field)) {
                      return (<Styled.CampoValor>{`${usuario[field]}`}</Styled.CampoValor>)
                    }
                  })
                }

                <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', flex: 1 }} >
                  <MdHighlightOff color='#F00' onClick={(event) => handleDelete(event, usuario._id)} style={{ height: '1em', width: '1em' }} />
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
    loading: state.usuario.loading,
    usuarios: state.usuario.usuarios,
    error: state.usuario.error,
    page: state.usuario.page,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listarUsuarios: (page, ativo) => dispatch(listarUsuariosRequest(page, ativo)),
    criarUsuarios: (usuario) => dispatch(criarUsuariosRequest(usuario)),
    updateUsuarios: (id, usuario) => dispatch(updateUsuariosRequest(id, usuario)),
    updatePasswordUsuarios: (id, usuario) => dispatch(updatePasswordUsuariosRequest(id, usuario)),
    deleteUsuarios: (id) => dispatch(deleteUsuariosRequest(id)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Usuarios);