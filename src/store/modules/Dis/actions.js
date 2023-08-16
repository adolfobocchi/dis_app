// actions.js
export const LISTAR_DIS_REQUEST = 'LISTAR_DIS_REQUEST';
export const LISTAR_DIS_SUCCESS = 'LISTAR_DIS_SUCCESS';
export const LISTAR_DIS_FAILURE = 'LISTAR_DIS_FAILURE';

export const SHOW_DIS_REQUEST = 'SHOW_DIS_REQUEST';
export const SHOW_DIS_SUCCESS = 'SHOW_DIS_SUCCESS';
export const SHOW_DIS_FAILURE = 'SHOW_DIS_FAILURE';

export const CRIAR_DIS_REQUEST = 'CRIAR_DIS_REQUEST';
export const CRIAR_DIS_SUCCESS = 'CRIAR_DIS_SUCCESS';
export const CRIAR_DIS_FAILURE = 'CRIAR_DIS_FAILURE';

export const UPDATE_DIS_REQUEST = 'UPDATE_DIS_REQUEST';
export const UPDATE_DIS_SUCCESS = 'UPDATE_DIS_SUCCESS';
export const UPDATE_DIS_FAILURE = 'UPDATE_DIS_FAILURE';

export const DELETE_DIS_REQUEST = 'DELETE_DIS_REQUEST';
export const DELETE_DIS_SUCCESS = 'DELETE_DIS_SUCCESS';
export const DELETE_DIS_FAILURE = 'DELETE_DIS_FAILURE';

export const SET_DIS = 'SET_DIS';

export const DIS_ADD_SETOR = 'DIS_ADD_SETOR';
export const DIS_REMOVE_SETOR = 'DIS_REMOVE_SETOR';

export const DIS_ADD_FUNCAO = 'DIS_ADD_FUNCAO';
export const DIS_REMOVE_FUNCAO = 'DIS_REMOVE_FUNCAO';

export const DIS_ADD_ATIVIDADE = 'DIS_ADD_ATIVIDADE';
export const DIS_REMOVE_ATIVIDADE = 'DIS_REMOVE_ATIVIDADE';

export const DIS_ADD_PERIGO = 'DIS_ADD_PERIGO';
export const DIS_REMOVE_PERIGO = 'DIS_REMOVE_PERIGO';

export const DIS_ADD_AGENTERISCO = 'DIS_ADD_AGENTERISCO';
export const DIS_REMOVE_AGENTERISCO = 'DIS_REMOVE_AGENTERISCO';

export const DIS_ADD_RISCO = 'DIS_ADD_RISCO';
export const DIS_REMOVE_RISCO = 'DIS_REMOVE_RISCO';

export const DIS_ADD_VIAABSORCAO = 'DIS_ADD_VIAABSORCAO';
export const DIS_REMOVE_VIAABSORCAO = 'DIS_REMOVE_VIAABSORCAO';

export const DIS_ADD_FREQUENCIAEXPOSICAO = 'DIS_ADD_FREQUENCIAEXPOSICAO';
export const DIS_REMOVE_FREQUENCIAEXPOSICAO = 'DIS_REMOVE_FREQUENCIAEXPOSICAO';

export const DIS_ADD_DURACAOEXPOSICAO = 'DIS_ADD_DURACAOEXPOSICAO';
export const DIS_REMOVE_DURACAOEXPOSICAO = 'DIS_REMOVE_DURACAOEXPOSICAO';

export const DIS_ADD_CAUSA = 'DIS_ADD_CAUSA';
export const DIS_REMOVE_CAUSA = 'DIS_REMOVE_CAUSA';

export const DIS_ADD_MEDIDA = 'DIS_ADD_MEDIDA';
export const DIS_REMOVE_MEDIDA = 'DIS_REMOVE_MEDIDA';

export const DIS_ADD_AVALIACAO = 'DIS_ADD_AVALIACAO';
export const DIS_REMOVE_AVALIACAO = 'DIS_REMOVE_AVALIACAO';

export const DIS_ADD_PROBABILIDADE = 'DIS_ADD_PROBABILIDADE';
export const DIS_REMOVE_PROBABILIDADE = 'DIS_REMOVE_PROBABILIDADE';

export const DIS_ADD_SEVERIDADE = 'DIS_ADD_SEVERIDADE';
export const DIS_REMOVE_SEVERIDADE = 'DIS_REMOVE_SEVERIDADE';

export const DIS_ADD_NIVEL = 'DIS_ADD_NIVEL';
export const DIS_REMOVE_NIVEL = 'DIS_REMOVE_NIVEL';

export const DIS_ADD_PLANOACAO = 'DIS_ADD_PLANOACAO';
export const DIS_REMOVE_PLANOACAO = 'DIS_REMOVE_PLANOACAO';

export const DIS_ADD_INTENCAO = 'DIS_ADD_INTENCAO';
export const DIS_REMOVE_INTENCAO = 'DIS_REMOVE_INTENCAO';

export const DIS_ADD_PRIORIDADE = 'DIS_ADD_PRIORIDADE';
export const DIS_REMOVE_PRIORIDADE = 'DIS_REMOVE_PRIORIDADE';

export const DIS_ADD_PRAZO = 'DIS_ADD_PRAZO';
export const DIS_REMOVE_PRAZO = 'DIS_REMOVE_PRAZO';

export const DIS_ADD_MONITORAMENTO = 'DIS_ADD_MONITORAMENTO';
export const DIS_REMOVE_MONITORAMENTO = 'DIS_REMOVE_MONITORAMENTO';

export const DIS_ADD_STATUS = 'DIS_ADD_STATUS';
export const DIS_REMOVE_STATUS = 'DIS_REMOVE_STATUS';


export const listarDisRequest = (page, ativo) => ({
  type: LISTAR_DIS_REQUEST,
  payload: {page, ativo}
});

export const listarDisSuccess = (dis) => ({
  type: LISTAR_DIS_SUCCESS,
  payload: {dis}
});

export const listarDisFailure = (error) => ({
  type: LISTAR_DIS_FAILURE,
  payload: {error}
});

export const setDis = (index) => ({
  type: SET_DIS,
  payload: index,
});

export const showDisRequest = (disId) => ({
    type: SHOW_DIS_REQUEST,
    payload: disId,
  });
  
  export const showDisSuccess = (dis) => ({
    type: SHOW_DIS_SUCCESS,
    payload: { dis },
  });
  
  export const showDisFailure = (error) => ({
    type: SHOW_DIS_FAILURE,
    payload: { error },
  });
  
  export const criarDisRequest = (dis) => ({
    type: CRIAR_DIS_REQUEST,
    payload: { dis },
  });
  
  export const criarDisSuccess = (dis) => ({
    type: CRIAR_DIS_SUCCESS,
    payload: { dis },
  });;
  
  export const criarDisFailure = (error) => ({
    type: CRIAR_DIS_FAILURE,
    payload: { error },
  });
  
  export const updateDisRequest = (id, dis) => ({
    type: UPDATE_DIS_REQUEST,
    payload: { id, dis },
  });
  
  export const updateDisSuccess = (dis) => ({
    type: UPDATE_DIS_SUCCESS,
    payload: { dis },
  });
  
  export const updateDisFailure = (error) => ({
    type: UPDATE_DIS_FAILURE,
    payload: { error },
  });
  
  export const deleteDisRequest = (id) => ({
    type: DELETE_DIS_REQUEST,
    payload: id,
  });
  
  export const deleteDisSuccess = (id) => ({
    type: DELETE_DIS_SUCCESS,
    payload: {id},
  });
  
  export const deleteDisFailure = (error) => ({
    type: DELETE_DIS_FAILURE,
    payload: { error },
  });
  
  export const addSetor = (setor) => ({
    type: DIS_ADD_SETOR,
    payload: { setor }
  })
  export const removeSetor = (setorId) => ({
    type: DIS_REMOVE_SETOR,
    payload: { setorId }
  })

  export const addFuncao = (setorIndex, funcao) => ({
    type: DIS_ADD_FUNCAO,
    payload: { setorIndex, funcao }
  })
  export const removeFuncao = (setorIndex, funcaoId) => ({
    type: DIS_REMOVE_FUNCAO,
    payload: { setorIndex, funcaoId }
  })

  export const addAtividade = (setorIndex, funcaoIndex, atividade ) => ({
    type: DIS_ADD_ATIVIDADE,
    payload: { setorIndex, funcaoIndex, atividade }
  })
  export const removeAtividade = (setorIndex, funcaoIndex, atividadeId ) => ({
    type: DIS_REMOVE_ATIVIDADE,
    payload: { setorIndex, funcaoIndex, atividadeId }
  })

  export const addPerigo = (setorIndex, funcaoIndex, atividadeIndex, perigo) => ({
    type: DIS_ADD_PERIGO,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigo }
  })
  export const removePerigo = (setorIndex, funcaoIndex, atividadeIndex, perigoId) => ({
    type: DIS_REMOVE_PERIGO,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoId }
  })

  export const addAgenteRisco = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRisco) => ({
    type: DIS_ADD_AGENTERISCO,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRisco }
  })
  export const removeAgenteRisco = (setorIndex, funcaoIndex,atividadeIndex, perigoIndex,  agenteRiscoId) => ({
    type: DIS_REMOVE_AGENTERISCO,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoId }
  })

  export const addRisco = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, risco) => ({
    type: DIS_ADD_RISCO,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, risco }
  })
  export const removeRisco = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoId) => ({
    type: DIS_REMOVE_RISCO,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoId }
  })
  
  export const addViaAbsorcao = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, viaAbsorcao) => ({
    type: DIS_ADD_VIAABSORCAO,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, viaAbsorcao }
  })
  export const removeViaAbsorcao = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, viaAbsorcaoId) => ({
    type: DIS_REMOVE_VIAABSORCAO,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, viaAbsorcaoId }
  })

  export const addFrequenciaExposicao = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, frequenciaExposicao) => ({
    type: DIS_ADD_FREQUENCIAEXPOSICAO,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, frequenciaExposicao }
  })
  export const removeFrequenciaExposicao = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, frequenciaExposicaoId) => ({
    type: DIS_REMOVE_FREQUENCIAEXPOSICAO,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, frequenciaExposicaoId }
  })

  export const addDuracaoExposicao = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, duracaoExposicao) => ({
    type: DIS_ADD_DURACAOEXPOSICAO,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, duracaoExposicao }
  })
  export const removeDuracaoExposicao = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, duracaoExposicaoId) => ({
    type: DIS_REMOVE_DURACAOEXPOSICAO,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, duracaoExposicaoId }
  })

  export const addCausa = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, causa) => ({
    type: DIS_ADD_CAUSA,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, causa }
  })
  export const removeCausa = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, causaId) => ({
    type: DIS_REMOVE_CAUSA,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, causaId }
  })

  export const addMedida = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, medida) => ({
    type: DIS_ADD_MEDIDA,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, medida }
  })
  export const removeMedida = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, medidaId) => ({
    type: DIS_REMOVE_MEDIDA,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, medidaId }
  })

  export const addAvaliacao = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, avaliacao) => ({
    type: DIS_ADD_AVALIACAO,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, avaliacao }
  })
  export const removeAvaliacao = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, avaliacaoId) => ({
    type: DIS_REMOVE_AVALIACAO,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, avaliacaoId }
  })

  export const addProbabilidade = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, probabilidade) => ({
    type: DIS_ADD_PROBABILIDADE,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, probabilidade }
  })
 export const removeProbabilidade = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, probabilidadeId) => ({
    type: DIS_REMOVE_PROBABILIDADE,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, probabilidadeId }
  })

  export const addSeveridade = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, severidade) => ({
    type: DIS_ADD_SEVERIDADE,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, severidade }
  })
  export const removeSeveridade = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, severidadeId) => ({
    type: DIS_REMOVE_SEVERIDADE,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, severidadeId }
  })

  export const addNivel = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, nivelRisco) => ({
    type: DIS_ADD_NIVEL,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, nivelRisco }
  })

  export const removeNivel = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, nivelRiscoId) => ({
    type: DIS_REMOVE_NIVEL,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, nivelRiscoId }
  })

  export const addPlanoAcao = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcao) => ({
    type: DIS_ADD_PLANOACAO,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcao }
  })

  export const removePlanoAcao = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoId) => ({
    type: DIS_REMOVE_PLANOACAO,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoId }
  })

  export const addIntencao = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, intencao) => ({
    type: DIS_ADD_INTENCAO,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, intencao }
  })
  export const removeIntencao = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, intencaoId) => ({
    type: DIS_REMOVE_INTENCAO,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, intencaoId }
  })

  export const addPrioridade = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, prioridade) => ({
    type: DIS_ADD_PRIORIDADE,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, prioridade }
  })
  export const removePrioridade = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, prioridadeId) => ({
    type: DIS_REMOVE_PRIORIDADE,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, prioridadeId }
  })

  export const addPrazo = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, prazo) => ({
    type: DIS_ADD_PRAZO,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, prazo }
  })
  export const removePrazo = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, prazoId) => ({
    type: DIS_REMOVE_PRAZO,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, prazoId }
  })

  export const addMonitoramento = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, monitoramento) => ({
    type: DIS_ADD_MONITORAMENTO,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, monitoramento }
  })
  export const removeMonitoramento = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, monitoramentoId) => ({
    type: DIS_REMOVE_MONITORAMENTO,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, monitoramentoId }
  })

  export const addStatus = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, status) => ({
    type: DIS_ADD_STATUS,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, status }
  })
  export const removeStatus = (setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, statusId) => ({
    type: DIS_REMOVE_STATUS,
    payload: { setorIndex, funcaoIndex, atividadeIndex, perigoIndex, agenteRiscoIndex, riscoIndex, planoAcaoIndex, statusId }
  })

  

  

 

  

  

