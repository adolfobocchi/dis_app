import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm } from 'react-hook-form';
import { showConfirmation } from '../../store/modules/Confirmation/actions';

import * as Styled from '../styleds';
import { listarConfiguracaoGeraisRequest, updateConfiguracaoGeraisRequest } from '../../store/modules/ConfiguracaoGerais/actions';
import EditorHtml from '../EditorHtml';

const ConfiguracaoGerais = ({ loading, configuracaoGerais, error, listarConfiguracaoGerais, updateConfiguracaoGerais, confirmacao }) => {
  const API_URL = process.env.REACT_APP_URL_API;

  const formEmpty = {
    identificacao: '',
    logo: '',
    email: '',
    smtp: '',
    smtpPassword: '',
    smtpPorta: '',
    emailTextoPadrao: '',
  }

  const [configuracaoGeraisSelected, setConfiguracaoGeraisSelected] = useState(formEmpty);
  const { register, control, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: configuracaoGeraisSelected
      ? {
        identificacao: configuracaoGeraisSelected.identificacao,
        logo: configuracaoGeraisSelected.logo,
        email: configuracaoGeraisSelected.email,
        smtp: configuracaoGeraisSelected.smtp,
        smtpPassword: configuracaoGeraisSelected.smtpPassword,
        smtpPorta: configuracaoGeraisSelected.smtpPorta,
        emailTextoPadrao: configuracaoGeraisSelected.emailTextoPadrao,
      } :
      {}
  });

  useEffect(() => {
    listarConfiguracaoGerais();
  }, []);

  useEffect(() => {
    setConfiguracaoGeraisSelected(configuracaoGerais)
  }, [configuracaoGerais]);


  useEffect(() => {
    reset({ ...configuracaoGerais });
  }, [reset, configuracaoGerais])


  const onSubmit = (data) => {
    const formData = new FormData();
      formData.append("logoFile", data.logoFile[0]);
      formData.append('configuracao', JSON.stringify(data));
      updateConfiguracaoGerais(formData)
  };

  if (loading) {
    return <ModalLoading />
  }
  return (
    <Styled.Container>
      <Styled.FormArea>
        <Styled.Form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
          
          <Styled.Label>Identificação:</Styled.Label>
          <Styled.Input
            {...register('identificacao', { required: true })}
          />
          {errors.identificacao && <span>Campo obrigatório</span>}
          <Styled.Label>Logo:</Styled.Label>
          <Styled.Input type='file' name='logoFile' {...register('logoFile', { required: false })} />
          {configuracaoGeraisSelected?.logo &&
            <img style={{width: '280px'}} src={`${API_URL}/images/${configuracaoGeraisSelected.logo}`} alt='logo' />
          }
          <Styled.Label>Email: </Styled.Label>
          <Styled.Input type='email'
            {...register('email', { required: true })}
          />
          {errors.email && <span>Campo obrigatório</span>}
          <Styled.Label>Servidor smtp: </Styled.Label>
          <Styled.Input type='text'
            {...register('smtp', { required: false })}
          />
          {errors.smtp && <span>Campo obrigatório</span>}
          <Styled.Label>Senha smtp: </Styled.Label>
          <Styled.Input type='password'
            {...register('smtpPassword', { required: false })}
          />
          {errors.smtpPassword && <span>Campo obrigatório</span>}
          <Styled.Label>Porta smtp: </Styled.Label>
          <Styled.Input type='text'
            {...register('smtpPorta', { required: false })}
          />
          {errors.smtpPassword && <span>Campo obrigatório</span>}
          <Styled.Label>Texto e-mail padrão: </Styled.Label>
          <div>
          <EditorHtml name="emailTextoPadrao" control={control} defaultValue={configuracaoGeraisSelected?.emailTextoPadrao} />
          </div>
          
          

          <Styled.Button type="submit">Salvar</Styled.Button>
        </Styled.Form>

      </Styled.FormArea>
    </Styled.Container>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.configuracaoGerais.loading,
    configuracaoGerais: state.configuracaoGerais.gerais,
    error: state.configuracaoGerais.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listarConfiguracaoGerais: () => dispatch(listarConfiguracaoGeraisRequest()),
    updateConfiguracaoGerais: (configuracao) => dispatch(updateConfiguracaoGeraisRequest(configuracao)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfiguracaoGerais);