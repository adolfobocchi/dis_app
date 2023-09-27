import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ModalLoading from '../ModalLoading';

import { useForm } from 'react-hook-form';

import { showConfirmation } from '../../store/modules/Confirmation/actions';
import { showInformation } from '../../store/modules/Information/actions';
import { MdEdit, MdEditNote, MdHighlightOff, MdKeyboardArrowDown, MdKeyboardArrowUp, MdSearch, MdViewList } from 'react-icons/md';

import * as Styled from '../styleds';
import Paginacao from '../Paginacao';
import DataPicker from '../DataPicker';
import { criarVideosRequest, deleteVideosRequest, listarVideosRequest, updateVideosRequest } from '../../store/modules/Video/actions';

const Videos = ({ loading, usuario, videos, error, page, listarVideos, criarVideos, updateVideos, deleteVideos, confirmacao, informacao }) => {

  const API_URL = process.env.REACT_APP_URL_API;

  const formEmpty = {
    titulo: '',
    descricao: '',
    video: '',
    data: '',
    ativo: true,
    usuario: ''
  }

  const listFields = {
    titulo: 'texto',
    video: 'link',
    data: 'texto',
    ativo: 'boolean',
    opção: ''
  }

  const [sectionItems, setSectionItems] = useState([
    { id: 1, label: 'Cadastro', expanded: false, sections: [{ id: 1, label: 'Cadastro', expanded: false, component: 'formulario' },], icon: <MdEdit /> },
    { id: 2, label: 'Pesquisa', expanded: true, sections: [{ id: 1, label: 'Pesquisa', expanded: false, component: 'search' },], icon: <MdSearch /> },
    { id: 3, label: 'Listagem', expanded: true, sections: [{ id: 1, label: 'Listagem', expanded: false, component: 'listagem' },], icon: <MdViewList /> },
  ]);

  const [videoState, setVideoState] = useState([]);
  const [videoSelected, setVideoSelected] = useState(formEmpty);

  const { register, control, setValue, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: videoSelected
      ? {
        titulo: videoSelected.titulo,
        data: videoSelected.data,
        descricao: videoSelected.descricao,
        video: videoSelected.video,
        usuario: videoSelected.usuario,
        ativo: videoSelected.ativo,
      } :
      {}
  });

  useEffect(() => {
    listarVideos(0, 1);
  }, []);

  useEffect(() => {
    setVideoState(videos);
  }, [videos]);

  useEffect(() => {
    reset({ ...videoSelected });
  }, [reset, videoSelected]);

  const toggleSection = (itemId, event) => {
    event.stopPropagation();
    setSectionItems((prevState) =>
      prevState.map((item) => {
        if (item.id === itemId) {
          return { ...item, expanded: !item.expanded };
        }
        return item;
      })
    );
  };

  const toggleSectionExpand = (itemId, event) => {
    event.stopPropagation();
    setSectionItems((prevState) =>
      prevState.map((item) => {
        if (item.id === itemId) {
          return { ...item, expanded: true };
        }
        return item;
      })
    );
  };
  const handleSelect = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setVideoSelected(videoState[index])
  }

  const handleDelete = (event,videoId) => {
    event.preventDefault();
    event.stopPropagation();
    confirmacao('DELETAR REGISTRO', 'VOCE REALMENTE DESEJA EXCLUIR O VIDEO?', () => { deleteVideos(videoId) });
  }

  const handleClear = () => {
    setVideoSelected({ ...formEmpty })
  }

  const onSubmit = (data) => {

    data.usuario = usuario;
    const formData = new FormData();
    formData.append("videoFile", data.videoFile[0]);
    formData.append('video', JSON.stringify(data));

    if (data._id) {
      updateVideos(videoSelected._id, formData);

    } else {
      criarVideos(formData);

    }
    if (error === '') {
      handleClear();
    }

  };

  if (loading) {
    return <ModalLoading />
  }
  return (
    <Styled.Container>
      {sectionItems.map((sectionItem) => (
        <>
          <Styled.SectionArea
            key={sectionItem.id}
            onClick={(event) => toggleSection(sectionItem.id, event)}
          >
            <Styled.AreaWidth style={{ width: 20 }}>{sectionItem.icon}</Styled.AreaWidth>
            <Styled.AreaFlex>{sectionItem.label}</Styled.AreaFlex>
            <Styled.AreaWidth style={{ width: 20, justifyContent: 'flex-end' }} >
              {sectionItem.expanded ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </Styled.AreaWidth>
          </Styled.SectionArea>
          {sectionItem.expanded &&
            sectionItem.sections.map((section) => {
              if (section.component === 'formulario') {
                return (
                  <Styled.FormArea>
                    <Styled.Form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>

                      <Styled.Label>Data: </Styled.Label>
                      <DataPicker name="data" control={control} setValue={setValue} defaultValue={videoSelected?.data} showTimeSelect={false} />
                      {errors.data && <span>Campo obrigatório</span>}

                      <Styled.Label>Titulo:</Styled.Label>
                      <Styled.Input
                        {...register('titulo', { required: true })}
                      />
                      {errors.titulo && <span>Campo obrigatório</span>}

                      <Styled.Label>Descricao:</Styled.Label>
                      <Styled.Input
                        {...register('descricao', { required: true })}
                      />
                      {errors.descricao && <span>Campo obrigatório</span>}

                      <Styled.Label>Anexar video:</Styled.Label>
                      <Styled.Input type='file' name='videoFile' {...register('videoFile', { required: false })} />
                      {errors.acordoFile && <span>Campo obrigatório</span>}
                      {videoSelected?.video &&
                        <a href={`${API_URL}/images/${videoSelected.video}`} target="_blank" rel="noreferrer"> Arquivo </a>
                      }
                      
                      <Styled.Label>Ativo</Styled.Label>
                      <Styled.Input 
                        type='checkbox'
                        {...register('ativo')}
                      />
                      {errors.ativo && <span>Campo obrigatório</span>}

                      <Styled.Button type="submit">Salvar</Styled.Button>
                      <Styled.Button type="button" style={{ background: '#FBAF3A' }} onClick={(event) => handleClear(event)}>Limpar</Styled.Button>
                    </Styled.Form>

                  </Styled.FormArea>

                )
              }
              if (section.component === 'search') {
                return (<Styled.FormArea>
                  { }
                </Styled.FormArea>)
              }
              if (section.component === 'listagem') {
                return (<>
                  <Paginacao page={page} ativo={0} listagem={listarVideos} />
                  <Styled.ListArea>

                    <Styled.ListHeader>
                      {
                        Object.keys(listFields).map((key, index) => {
                          return <Styled.Coluna label={key} key={index} />
                        })
                      }

                    </Styled.ListHeader>
                    <Styled.List>

                            <React.Fragment >
                              {videos && videos.map((video, index) => (
                                <Styled.ListItem key={video._id}>

                                  {
                                    Object.keys(listFields).map((field, index) => {
                                      if (field !== '_id' && field !== 'opção') {
                                        if (listFields[field] === 'link') {
                                          return (
                                            <Styled.CampoValor key={index}>
                                              <a href={`${API_URL}/images/${video[field]}`} target="_blank" rel="noreferrer"> Arquivo </a>
                                            </Styled.CampoValor>
                                          )
                                        } else {
                                          return (
                                            <Styled.CampoValor key={index}>
                                              {video[field] && `${video[field]}`}
                                            </Styled.CampoValor>
                                          );
                                        }

                                      }
                                    })
                                  }
                                  {/* {Object.keys(video).map((field, index) => {
                                    if (field !== '_id' && listFields.hasOwnProperty(field)) {
                                      return (
                                        <Styled.CampoValor key={field}>
                                          {`${video[field]}`}
                                        </Styled.CampoValor>
                                      );
                                    }
                                  })} */}
                                  <Styled.ColunaValor>
                                    <div
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        flex: 1,
                                      }}
                                    >
                                      <MdHighlightOff
                                        color='#F00'
                                        onClick={(event) => handleDelete(event, video._id, video.video)}
                                        style={{ height: '1em', width: '1em' }}
                                      />
                                    </div>
                                    <div
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        width: '6em',
                                      }}
                                    >
                                      <MdEditNote
                                        color='#005'
                                        onClick={(event) => {
                                          toggleSectionExpand(1, event);
                                          handleSelect(event, index);
                                        }}
                                        style={{ height: '1.2em', width: '1.2em' }}
                                      />
                                    </div>
                                  </Styled.ColunaValor>
                                </Styled.ListItem>
                              ))}
                            </React.Fragment>
                          
                        
                    </Styled.List>
                  </Styled.ListArea>
                </>)
              }
            })}
        </>
      ))}


    </Styled.Container>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.video.loading,
    videos: state.video.videos,
    error: state.video.error,
    page: state.video.page,
    usuario: state.usuario.usuario,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    listarVideos: (page, ativo) => dispatch(listarVideosRequest(page, ativo)),
    criarVideos: (id, video) => dispatch(criarVideosRequest(id, video)),
    updateVideos: (id, video) => dispatch(updateVideosRequest(id, video)),
    deleteVideos: (id) => dispatch(deleteVideosRequest(id)),
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm)),
    informacao: (text) => dispatch(showInformation(text)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Videos);