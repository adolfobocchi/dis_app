import React, { useEffect, useState } from 'react';
import { MdApartment, MdClose } from 'react-icons/md';
import styled from 'styled-components';
import './Style.css'
import * as Styled from '../styleds';
import ModalLoading from '../ModalLoading';
import html2pdf from 'html2pdf.js';

const ModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  height: auto;
  height: calc(100vh);
  display: flex;
  flex-direction: column;
  z-index: 9999;
  overflow-y: scroll;
  font-size: 13px;
  overflow-y: auto;
`;



const ModalContent = styled.div`
  background-color: rgba(255, 255,255, 0.9);
  border-radius: 5px;
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;

  
`;

const ModalHeader = styled.div`
  background-color: rgba(100, 100,100, 0.9);
  padding: 10px;
  height: 60px;
  width: 100vw;
  display: flex;
  justify-content: flex-end;
  position: fixed;
`;
const ContentInfoBasic = styled.div`
  width: 100vw;
  display: flex;
  margin-top: 60px;
`;
const ContentInfoSetorizacao = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
`;
const ContentInfoSetor = styled.div`
  margin: 8px;
  flex: 1;
  min-width: 300px;
  padding: 20px;
`;

const ContentInfoSeparador = styled.div`
  border-bottom: 2px solid #000;
  width: 100%;
  margin-bottom: 10px;
`;

const ContentInfoText = styled.div`
  color: #000;
  font-weight: 500;
  margin-bottom: 6px;
  font-size: 1em;
`;

const ContentInfoArea = styled.div`
  margin-left: 10px;
`;

const Collabel = styled.div`
  
  display: flex;
  width: auto;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  min-height: 110px;
  padding: 5px;
  background-color: #CCC;
  overflow: hidden;
  white-space: normal;
  padding: 6px;
`;
const API_URL = process.env.REACT_APP_URL_API;

const ModalInfo = ({ dados, close }) => {

  const [dadosState, setDadosState] = useState(null);

  useEffect(() => {
    setDadosState(dados);
  }, [dados])
  if (!dadosState) {
    return <ModalLoading />
  }

  function compararPorNome(a, b, obj) {
    const nomeA = a[obj].nome.toUpperCase();
    const nomeB = b[obj].nome.toUpperCase();

    if (nomeA < nomeB) {
      return -1;
    }
    if (nomeA > nomeB) {
      return 1;
    }
    return 0;
  }

  const downloadPDF = async () => {
    const content = document.getElementById('modal-content');

    const pdfOptions = {
      margin: 10,
      filename: 'relatorio.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { dpi: 192, letterRendering: true, useCORS: true, logging: true, scale: 0.99 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    try {
      await html2pdf().set(pdfOptions).from(content).save();
    } catch (error) {
      console.log(error);
    }
  };

  const openPrintWindow = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Relatório</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<div style="width: 210mm; height: 297mm;">'); // Tamanho da página A4
    let content = document.getElementById('modal-content').cloneNode(true);
  
  // Encontrar o elemento com id "table-area" dentro do conteúdo clonado
  const tableArea = content.querySelector('#table-area');
  
  // Ajustar o estilo width do elemento encontrado
  if (tableArea) {
    tableArea.style.width = '210mm'; // ou qualquer outra largura desejada
  }

  content.classList.add('print');
  printWindow.document.write(content.innerHTML);
  printWindow.document.write('</div></body></html>');
  printWindow.document.close();
  printWindow.print();
  };

  const setores = dadosState?.setores.sort((a, b) => compararPorNome(a, b, 'setor')) || []


  return (
    <div style={{
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      position: 'fixed',
      top: 0,
      left: 0,
      height: 'auto',
      height: 'calc(100vh)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 9999,
      overflowY: 'scroll',
      fontSize: '13px',
      overflowY: 'auto',
    }} >

      <div style={{
        backgroundColor: 'rgba(255, 255,255, 0.9)',
        borderRadius: '5px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        overflowY: 'auto',
      }}  >


        <div style={{
          backgroundColor: 'rgba(100, 100,100, 0.9)',
          padding: '10px',
          height: '60px',
          width: '100vw',
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'fixed',
        }}>

          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}><h2>DETALHES</h2></div>

          <MdClose onClick={() => close(false)} color='#F00' style={{ cursor: 'pointer', height: '3em', width: '3em', marginRight: 8 }} />
          <button onClick={downloadPDF}>Baixar PDF</button>
        </div>
        <div id='modal-content' >
          <div style={{
            width: '100vw',
            display: 'flex',
            marginTop: '60px',
          }}>
            <div style={{ width: 120, display: 'flex', justifyContent: 'center' }}>
              <Styled.ImagemArea style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {dadosState?.fachada ? <Styled.Imagem src={`${API_URL}/images/${dadosState?.fachada}`} /> : <MdApartment size={'90%'} />}

              </Styled.ImagemArea>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', }}>
              <h2 style={{ textTransform: 'uppercase' }}>{dadosState.empresa.razaoSocial}</h2>
              <div style={{
                color: '#000',
                fontWeight: '500',
                marginBottom: '6px',
                fontSize: '1em',
              }} >{`Data: ${dadosState.data}`}</div >
              <div style={{
                color: '#000',
                fontWeight: '500',
                marginBottom: '6px',
                fontSize: '1em',
              }} >{`Responsavel: ${dadosState.responsavel}`}</div >
              <div style={{
                color: '#000',
                fontWeight: '500',
                marginBottom: '6px',
                fontSize: '1em',
              }} >{`E-mail: ${dadosState.email}`}</div >
              <div style={{
                color: '#000',
                fontWeight: '500',
                marginBottom: '6px',
                fontSize: '1em',
              }} >{`Local: ${dadosState.empresa?.endereco}, ${dadosState.empresa?.numero} - ${dadosState.empresa?.cidade}`}</div >
              <div style={{
                color: '#000',
                fontWeight: '500',
                marginBottom: '6px',
                fontSize: '1em',
              }} >{`Ramo de atividade: ${dadosState?.empresa.area.nome}`}</div >

            </div>

          </div>
          <h3 style={{ textAlign: 'center' }}>Observações</h3>
          <div style={{
            borderBottom: '2px solid #000',
            width: '100%',
            marginBottom: '10px',
          }} />
          <div style={{
            color: '#000',
            fontWeight: '500',
            marginBottom: '6px',
            fontSize: '1em',
            textAlign: 'center'
          }} >{dadosState?.observacaoAmbiente ? `${dadosState?.observacaoAmbiente}` : 'Não há'}</div >
          <h3 style={{ textAlign: 'center' }}>Diagnóstico</h3>

          <div style={{
            borderBottom: '2px solid #000',
            width: '100%',
            marginBottom: '10px',
          }} />
          <div id='table-area' style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexWrap: 'wrap',
            width: '100%', /* Tamanho da página A4 em largura */


          }} >

            {setores.map((setor, setorIndex) => {

              const funcoesSetor = dadosState?.funcoes.filter(funcao => funcao.setor === setor.setor?._id).sort((a, b) => compararPorNome(a, b, 'funcao')) || []
              return (
                funcoesSetor.map((funcao, funcaoIndex) => {

                  const perigosFuncao = dadosState?.perigos.filter(perigo => perigo.funcao === funcao.funcao?._id).sort((a, b) => compararPorNome(a, b, 'perigo')) || []
                  const riscos = dadosState?.riscos.filter(risco => risco.funcao === funcao?.funcao._id).filter(risco => risco.setor === funcao?.setor).sort((a, b) => compararPorNome(a, b, 'risco')) || []
                  return (
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'column', width: '95%', margin: 20 }}>
                      <div style={{ display: 'flex', flex: 1, width: '100%', }}>
                        <div style={{
                          display: 'flex',
                          width: '80px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          border: '1px solid #000',
                          minHeight: '60px',
                          padding: '5px',
                          backgroundColor: '#CCC',
                          overflow: 'hidden',
                          whiteSpace: 'normal',

                        }}>{funcaoIndex + 1}</div>
                        <div style={{
                          display: 'flex',
                          width: '80px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          border: '1px solid #000',
                          minHeight: '60px',
                          padding: '5px',
                          backgroundColor: '#CCC',
                          overflow: 'hidden',
                          whiteSpace: 'normal',

                        }}>Função:</div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', minHeight: 110, padding: 5 }}>{`${funcao.funcao.nome}`}</div>
                        <div style={{
                          display: 'flex',
                          width: '80px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          border: '1px solid #000',
                          minHeight: '60px',
                          padding: '5px',
                          background: '#CCC',
                          overflow: 'hidden',
                          whiteSpace: 'normal',

                        }}>QT DE FUNCIONARIOS:</div>
                        <div style={{ display: 'flex', width: 100, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', minHeight: 110 }}>{funcao.quantidade}</div>
                      </div>
                      <div style={{ display: 'flex', flex: 1, width: '100%', }}>

                        <div style={{
                          display: 'flex',
                          width: '80px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          border: '1px solid #000',
                          minHeight: '60px',
                          padding: '5px',
                          backgroundColor: '#CCC',
                          overflow: 'hidden',
                          whiteSpace: 'normal',

                        }}>Setor:</div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', minHeight: 110, padding: 5 }}>{setor.setor.nome}</div>
                      </div>
                      <div style={{ display: 'flex', flex: 1, width: '100%', }}>

                        <div style={{
                          display: 'flex',
                          width: '80px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          border: '1px solid #000',
                          minHeight: '60px',
                          padding: '5px',
                          backgroundColor: '#CCC',
                          overflow: 'hidden',
                          whiteSpace: 'normal',

                        }}>descricao do ambiente: </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', minHeight: 110, padding: 5, textAlign: 'justify' }}>
                          {setor?.descricao?.nome}
                        </div>
                        <div style={{
                          display: 'flex',
                          width: '80px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          border: '1px solid #000',
                          minHeight: '60px',
                          padding: '5px',
                          backgroundColor: '#CCC',
                          overflow: 'hidden',
                          whiteSpace: 'normal',

                        }}>data da identificação: </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', minHeight: 110, padding: 5, textAlign: 'justify' }}>
                          {dadosState.data}
                        </div>

                      </div>
                      <div style={{ display: 'flex', flex: 1, width: '100%', }}>

                        <div style={{
                          display: 'flex',
                          width: '80px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          border: '1px solid #000',
                          minHeight: '60px',
                          padding: '5px',
                          backgroundColor: '#CCC',
                          overflow: 'hidden',
                          whiteSpace: 'normal',

                        }}>descricao das atividades: </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', minHeight: 110, padding: 5, textAlign: 'justify' }}>
                          {funcao?.descricao?.nome}
                        </div>

                      </div>
                      <div style={{ display: 'flex', flex: 1, width: '100%' }}>

                        <div style={{
                          display: 'flex',
                          width: '80px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          border: '1px solid #000',
                          minHeight: '60px',
                          padding: '5px',
                          backgroundColor: '#CCC',
                          overflow: 'hidden',
                          whiteSpace: 'normal',

                        }}>riscos: </div>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto' }}>
                          {


                            riscos.map((risco, riscoIndex) =>
                            (

                              <p key={riscoIndex} style={{ display: 'block' }}>
                                {`${funcaoIndex + 1}.${riscoIndex + 1} ${risco.risco.nome}`}
                              </p>

                            )
                            )
                          }
                        </div>

                      </div>
                      {
                        perigosFuncao.map((perigo, perigoIndex) => {
                          const riscosPerigo = dadosState?.riscos.filter(risco => risco.setor === setor.setor?._id && risco.funcao === funcao?.funcao._id).sort((a, b) => compararPorNome(a, b, 'risco'))

                          return (

                            riscosPerigo.map((risco, riscoIndex) => {
                              const agentesRisco = dadosState?.agentesRisco.filter((agenteRisco) =>
                                agenteRisco.setor === setor.setor?._id &&
                                agenteRisco.funcao === funcao?.funcao._id &&
                                agenteRisco.perigo === perigo?.perigo._id &&
                                agenteRisco.risco === risco?.risco._id) || [];

                              const viasAbsorcao = dadosState?.viasAbsorcao.filter(viaAbsorcao =>
                                viaAbsorcao.setor === setor?.setor._id &&
                                viaAbsorcao.funcao === funcao?.funcao._id &&
                                viaAbsorcao.perigo === perigo?.perigo._id &&
                                viaAbsorcao.risco === risco?.risco._id) || [];

                              const frequenciaExposicao = dadosState?.frequenciaExposicao.filter(frequenciaExposicao => frequenciaExposicao.risco === risco?.risco._id) || [];
                              const duracaoExposicao = dadosState?.duracaoExposicao.filter(duracaoExposicao => duracaoExposicao.risco === risco?.risco._id) || [];
                              const causas = dadosState?.causas.filter(causa =>
                                causa.setor === setor?.setor._id &&
                                causa.funcao === funcao?.funcao._id &&
                                causa.perigo === perigo?.perigo._id &&
                                causa.risco === risco?.risco._id) || [];
                              return (
                                <div style={{
                                  display: 'flex', flex: 1, flexDirection: 'column', marginTop: 20,
                                  pageBreakInside: 'avoid',
                                  pageBreakBefore: 'always',
                                  pageBreakAfter: 'always',
                                }}>
                                  <div style={{ display: 'flex', flex: 1, width: '100%' }}>

                                    <div style={{
                                      display: 'flex',
                                      width: '80px',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      border: '1px solid #000',
                                      minHeight: '60px',
                                      padding: '5px',
                                      backgroundColor: '#CCC',
                                      overflow: 'hidden',
                                      whiteSpace: 'normal',

                                    }}>agente: </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto', padding: 5 }}>
                                      {agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                        return (

                                          <p key={agenteRiscoIndex} style={{ display: 'block' }}>
                                            {`${agenteRisco.agenteRisco.nome}`}
                                          </p>

                                        )
                                      })
                                      }
                                    </div>
                                  </div>
                                  <div style={{ display: 'flex', flex: 1, width: '100%' }}>
                                    <div style={{
                                      display: 'flex',
                                      width: '80px',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      border: '1px solid #000',
                                      minHeight: '60px',
                                      padding: '5px',
                                      backgroundColor: '#CCC',
                                      overflow: 'hidden',
                                      whiteSpace: 'normal',

                                    }}>Fonte ou Circunstáncia: </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto', padding: 5 }}>


                                      <p key={perigoIndex} style={{ display: 'block' }}>
                                        {perigo.perigo.nome}<br></br>
                                      </p>


                                    </div>

                                    <div style={{
                                      display: 'flex',
                                      width: '80px',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      border: '1px solid #000',
                                      minHeight: '60px',
                                      padding: '5px',
                                      backgroundColor: '#CCC',
                                      overflow: 'hidden',
                                      whiteSpace: 'normal',

                                    }}>{`${funcaoIndex + 1}.${riscoIndex + 1}`} </div>
                                    <div style={{
                                      display: 'flex',
                                      width: '80px',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      border: '1px solid #000',
                                      minHeight: '60px',
                                      padding: '5px',
                                      backgroundColor: '#CCC',
                                      overflow: 'hidden',
                                      whiteSpace: 'normal',

                                    }}>risco: </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto', padding: 5 }}>


                                      <p key={riscoIndex} style={{ display: 'block' }}>
                                        {risco.risco.nome}
                                      </p>


                                    </div>
                                  </div>
                                  <div style={{ display: 'flex', flex: 1, width: '100%' }}>

                                    <div style={{
                                      display: 'flex',
                                      width: '80px',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      border: '1px solid #000',
                                      minHeight: '60px',
                                      padding: '5px',
                                      backgroundColor: '#CCC',
                                      overflow: 'hidden',
                                      whiteSpace: 'normal',

                                    }}>via absorcao: </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto', padding: 5 }}>
                                      {viasAbsorcao.map((viaAbsorcao, viaAbsorcaoIndex) => {
                                        return (

                                          <p key={viaAbsorcaoIndex} style={{ display: 'block' }}>
                                            {`${viaAbsorcao.viaAbsorcao.nome}`}

                                          </p>

                                        )
                                      })
                                      }
                                    </div>
                                    <div style={{
                                      display: 'flex',
                                      width: '80px',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      border: '1px solid #000',
                                      minHeight: '60px',
                                      padding: '5px',
                                      backgroundColor: '#CCC',
                                      overflow: 'hidden',
                                      whiteSpace: 'normal',

                                    }}>Frequencia Exposicao: </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto', padding: 5 }}>
                                      {frequenciaExposicao.map((frequenciaExposicao, frequenciaExposicaoIndex) => {
                                        return (

                                          <p key={frequenciaExposicaoIndex} style={{ display: 'block' }}>
                                            {frequenciaExposicao.frequenciaExposicao.nome}
                                          </p>

                                        )
                                      })
                                      }
                                    </div>
                                    <div style={{
                                      display: 'flex',
                                      width: '80px',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      border: '1px solid #000',
                                      minHeight: '60px',
                                      padding: '5px',
                                      backgroundColor: '#CCC',
                                      overflow: 'hidden',
                                      whiteSpace: 'normal',

                                    }}>Duração Exposicao: </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto', padding: 5 }}>
                                      {duracaoExposicao.map((duracaoExposicao, duracaoExposicaoIndex) => {
                                        return (

                                          <p key={duracaoExposicaoIndex} style={{ display: 'block' }}>
                                            {duracaoExposicao.duracaoExposicao.nome}
                                          </p>

                                        )
                                      })
                                      }
                                    </div>
                                  </div>
                                  <div style={{ display: 'flex', flex: 1, width: '100%' }}>

                                    <div style={{
                                      display: 'flex',
                                      width: '80px',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      border: '1px solid #000',
                                      minHeight: '60px',
                                      padding: '5px',
                                      backgroundColor: '#CCC',
                                      overflow: 'hidden',
                                      whiteSpace: 'normal',

                                    }}>Possiveis Lesoes: </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto', padding: 5 }}>
                                      {causas.map((causa, causaIndex) => {
                                        return (

                                          <p key={causaIndex} style={{ display: 'block' }}>
                                            {causa.causa.nome}
                                          </p>

                                        )
                                      })
                                      }
                                    </div>
                                    <div style={{
                                      display: 'flex',
                                      width: '80px',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      border: '1px solid #000',
                                      minHeight: '60px',
                                      padding: '5px',
                                      backgroundColor: '#CCC',
                                      overflow: 'hidden',
                                      whiteSpace: 'normal',

                                    }}>Medida: </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto', padding: 5 }}>
                                      {dadosState?.medidas.filter(medida => medida.risco === risco?.risco._id).map((medida, medidaIndex) => {
                                        return (

                                          <p key={medidaIndex} style={{ display: 'block' }}>
                                            {medida.medida.nome}
                                          </p>

                                        )
                                      })
                                      }
                                    </div>
                                    <div style={{
                                      display: 'flex',
                                      width: '80px',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      border: '1px solid #000',
                                      minHeight: '60px',
                                      padding: '5px',
                                      backgroundColor: '#CCC',
                                      overflow: 'hidden',
                                      whiteSpace: 'normal',

                                    }}>Avaliação Quantitativa: </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto', padding: 5 }}>
                                      {dadosState?.avaliacao.filter(avaliacao => avaliacao.risco === risco?.risco._id).map((avaliacao, avaliacaoIndex) => {
                                        return (

                                          <p key={avaliacaoIndex} style={{ display: 'block' }}>
                                            {avaliacao.avaliacao.nome}
                                          </p>

                                        )
                                      })
                                      }
                                    </div>
                                  </div>
                                  <div style={{ display: 'flex', flex: 1, width: '100%' }}>

                                    <div style={{
                                      display: 'flex',
                                      width: '80px',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      border: '1px solid #000',
                                      minHeight: '60px',
                                      padding: '5px',
                                      backgroundColor: '#CCC',
                                      overflow: 'hidden',
                                      whiteSpace: 'normal',

                                    }}>Probabilidade: </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto', padding: 5 }}>
                                      {dadosState?.probabilidades.filter(probabilidade => probabilidade.risco === risco?.risco._id).map((probabilidade, probabilidadeIndex) => {
                                        return (

                                          <p key={probabilidadeIndex} style={{ display: 'block' }}>
                                            {`(${probabilidade.probabilidade.valor}) ${probabilidade.probabilidade.nome}`}
                                          </p>

                                        )
                                      })
                                      }
                                    </div>
                                    <div style={{
                                      display: 'flex',
                                      width: '80px',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      border: '1px solid #000',
                                      minHeight: '60px',
                                      padding: '5px',
                                      backgroundColor: '#CCC',
                                      overflow: 'hidden',
                                      whiteSpace: 'normal',

                                    }}>Severidade: </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto', padding: 5 }}>
                                      {dadosState?.severidades.filter(severidade => severidade.risco === risco?.risco._id).map((severidade, severidadeIndex) => {
                                        return (

                                          <p key={severidadeIndex} style={{ display: 'block' }}>
                                            {`(${severidade.severidade.valor}) ${severidade.severidade.nome}`}
                                          </p>

                                        )
                                      })
                                      }
                                    </div>
                                    <div style={{
                                      display: 'flex',
                                      width: '80px',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      border: '1px solid #000',
                                      minHeight: '60px',
                                      padding: '5px',
                                      backgroundColor: '#CCC',
                                      overflow: 'hidden',
                                      whiteSpace: 'normal',

                                    }}>Nivel de risco: </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto', padding: 5 }}>
                                      {dadosState?.niveisRisco.filter(nivelRisco => nivelRisco.risco === risco?.risco._id).map((nivelRisco, nivelRiscoIndex) => {
                                        return (

                                          <p key={nivelRiscoIndex} style={{ display: 'block' }}>
                                            {`(${nivelRisco.nivelRisco?.probabilidadeValor}X${nivelRisco.nivelRisco?.severidadeValor}) ${nivelRisco.nivelRisco.nome}`}
                                          </p>

                                        )
                                      })
                                      }
                                    </div>
                                  </div>
                                  <div style={{ display: 'flex', flex: 1, flexDirection: 'column', marginTop: 20 }}>
                                    <div style={{ backgroundColor: '#CCC', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto', padding: 5 }}>PLANO DE ACAO</div>
                                    {dadosState?.planosAcao.filter(planoAcao => planoAcao.setor === setor?.setor._id &&
                                      planoAcao.funcao === funcao?.funcao._id && planoAcao.risco === risco?.risco._id).map((planoAcao, planoAcaoIndex) => (

                                        <>
                                          <div style={{ display: 'flex', flex: 1, width: '100%' }}>

                                            <div style={{
                                              display: 'flex',
                                              width: '80px',
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                              border: '1px solid #000',
                                              minHeight: '60px',
                                              padding: '5px',
                                              backgroundColor: '#CCC',
                                              overflow: 'hidden',
                                              whiteSpace: 'normal',

                                            }}>{planoAcaoIndex + 1} </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto', padding: 5 }}>


                                              <p key={planoAcaoIndex} style={{ display: 'block' }}>
                                                {planoAcao.planoAcao.nome}
                                              </p>


                                            </div>
                                          </div>
                                          <div style={{ display: 'flex', flex: 1, width: '100%' }}>

                                            <div style={{
                                              display: 'flex',
                                              width: '80px',
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                              border: '1px solid #000',
                                              minHeight: '60px',
                                              padding: '5px',
                                              backgroundColor: '#CCC',
                                              overflow: 'hidden',
                                              whiteSpace: 'normal',

                                            }}>intenção: </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto', padding: 5 }}>
                                              {dadosState?.intencao.filter(intencao => intencao.planoAcao === planoAcao?.planoAcao._id).map((intencao, intencaoIndex) => {
                                                return (

                                                  <p key={intencaoIndex} style={{ display: 'block' }}>
                                                    {intencao.intencao.nome}
                                                  </p>

                                                )
                                              })
                                              }
                                            </div>
                                            <div style={{
                                              display: 'flex',
                                              width: '80px',
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                              border: '1px solid #000',
                                              minHeight: '60px',
                                              padding: '5px',
                                              backgroundColor: '#CCC',
                                              overflow: 'hidden',
                                              whiteSpace: 'normal',

                                            }}>prioridade: </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto', padding: 5 }}>
                                              {dadosState?.prioridade.filter(prioridade => prioridade.planoAcao === planoAcao?.planoAcao._id).map((prioridade, prioridadeIndex) => {
                                                return (

                                                  <p key={prioridadeIndex} style={{ display: 'block' }}>
                                                    {prioridade.prioridade.nome}
                                                  </p>

                                                )
                                              })
                                              }
                                            </div>
                                            <div style={{
                                              display: 'flex',
                                              width: '80px',
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                              border: '1px solid #000',
                                              minHeight: '60px',
                                              padding: '5px',
                                              backgroundColor: '#CCC',
                                              overflow: 'hidden',
                                              whiteSpace: 'normal',

                                            }}>prazo: </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto', padding: 5 }}>
                                              {dadosState?.prazo.filter(prazo => prazo.planoAcao === planoAcao?.planoAcao._id).map((prazo, prazoIndex) => {
                                                return (

                                                  <p key={prazoIndex} style={{ display: 'block' }}>
                                                    {prazo.prazo.nome}
                                                  </p>

                                                )
                                              })
                                              }
                                            </div>

                                            <div style={{
                                              display: 'flex',
                                              width: '80px',
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                              border: '1px solid #000',
                                              minHeight: '60px',
                                              padding: '5px',
                                              backgroundColor: '#CCC',
                                              overflow: 'hidden',
                                              whiteSpace: 'normal',

                                            }}>monitoramento: </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto', padding: 5 }}>
                                              {dadosState?.monitoramentos.filter(monitoramento => monitoramento.planoAcao === planoAcao?.planoAcao._id).map((monitoramento, monitoramentoIndex) => {
                                                return (

                                                  <p key={monitoramentoIndex} style={{ display: 'block' }}>
                                                    {monitoramento.monitoramento.nome}
                                                  </p>

                                                )
                                              })
                                              }
                                            </div>
                                            <div style={{
                                              display: 'flex',
                                              width: '80px',
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                              border: '1px solid #000',
                                              minHeight: '60px',
                                              padding: '5px',
                                              backgroundColor: '#CCC',
                                              overflow: 'hidden',
                                              whiteSpace: 'normal',

                                            }}>Status: </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', border: '1px solid #000', height: 'auto', padding: 5 }}>
                                              {dadosState?.status.filter(status => status.planoAcao === planoAcao?.planoAcao._id).map((status, statusIndex) => {
                                                return (

                                                  <p key={statusIndex} style={{ display: 'block' }}>
                                                    {status.status.nome}
                                                  </p>

                                                )
                                              })
                                              }
                                            </div>

                                          </div>
                                        </>
                                      ))}

                                  </div>
                                </div>
                              )
                            })

                          )
                        })
                      }
                    </div>
                  )
                })
              )
            })}

          </div>
        </div>
      </div >
      <button onClick={openPrintWindow}>Imprimir</button>
    </div >
  );
};

export default ModalInfo;


