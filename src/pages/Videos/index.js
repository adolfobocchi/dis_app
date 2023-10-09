import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ModalLoading from '../../components/ModalLoading';
import { listarVideosRequest } from '../../store/modules/Video/actions';

const LoginContainer = styled.div`
  background: linear-gradient(#212934, #5BAE54);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

const VideosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  max-width: 1200px;
  width: 100%;
  padding: 20px;
  margin-top: 20px;
`;

const VideoCard = styled.div`
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
`;

const VideosPage = ({videos, error, page, listarVideos, loading}) => {
  const API_URL = process.env.REACT_APP_URL_VIDEOS;
  const [videoState, setVideoState] = useState([]);

  useEffect(() => {
    listarVideos(0, 1);
  }, []);

  useEffect(() => {
    setVideoState(videos);
  }, [videos]);

  if (loading ) {
    return (<ModalLoading />)
  }
  return (

    <LoginContainer>
      <h1 style={{fontSize: '2em'}}>VÍDEOS INFORMATIVOS</h1>
      <VideosGrid>
        {videoState.map((video, index) => (
          <VideoCard key={index}>
            <h3>{video.titulo}</h3>
            <video width="100%" height="auto" controls>
              <source src={`${API_URL}/images/${video.video}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h3>{video.descricao}</h3>
          </VideoCard>
        ))}
      </VideosGrid>
    </LoginContainer>
  );
};

const mapStateToProps = state => {
  return {
    oading: state.video.loading,
    videos: state.video.videos,
    error: state.video.error,
    page: state.video.page,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listarVideos: (page, ativo) => dispatch(listarVideosRequest(page, ativo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideosPage);
