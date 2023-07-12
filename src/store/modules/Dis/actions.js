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

export const DIS_ADD_PROCESSO = 'DIS_ADD_PROCESSO';
export const DIS_REMOVE_PROCESSO = 'DIS_REMOVE_PROCESSO';

export const DIS_ADD_ATIVIDADE = 'DIS_ADD_ATIVIDADE';
export const DIS_REMOVE_ATIVIDADE = 'DIS_REMOVE_ATIVIDADE';

export const DIS_ADD_RECURSO = 'DIS_ADD_RECURSO';
export const DIS_REMOVE_RECURSO = 'DIS_REMOVE_RECURSO';

export const DIS_ADD_RISCO = 'DIS_ADD_RISCO';
export const DIS_REMOVE_RISCO = 'DIS_REMOVE_RISCO';

export const DIS_ADD_CAUSA = 'DIS_ADD_CAUSA';
export const DIS_REMOVE_CAUSA = 'DIS_REMOVE_CAUSA';

export const DIS_ADD_MEDIDA = 'DIS_ADD_MEDIDA';
export const DIS_REMOVE_MEDIDA = 'DIS_REMOVE_MEDIDA';

export const DIS_ADD_PROBABILIDADE = 'DIS_ADD_PROBABILIDADE';
export const DIS_REMOVE_PROBABILIDADE = 'DIS_REMOVE_PROBABILIDADE';

export const DIS_ADD_SEVERIDADE = 'DIS_ADD_SEVERIDADE';
export const DIS_REMOVE_SEVERIDADE = 'DIS_REMOVE_SEVERIDADE';

export const DIS_ADD_NIVEL = 'DIS_ADD_NIVEL';
export const DIS_REMOVE_NIVEL = 'DIS_REMOVE_NIVEL';

export const DIS_ADD_PROPOSTA = 'DIS_ADD_PROPOSTA';
export const DIS_REMOVE_PROPOSTA = 'DIS_REMOVE_PROPOSTA';

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
  export const removeSetor = (setor) => ({
    type: DIS_REMOVE_SETOR,
    payload: { setor }
  })

  export const addFuncao = (setorIndex, funcao) => ({
    type: DIS_ADD_FUNCAO,
    payload: { setorIndex, funcao }
  })
  export const removeFuncao = (setorIndex, funcao) => ({
    type: DIS_REMOVE_FUNCAO,
    payload: { setorIndex, funcao }
  })

  export const addProcesso = (setorIndex, funcaoIndex, processo) => ({
    type: DIS_ADD_PROCESSO,
    payload: { setorIndex, funcaoIndex, processo }
  })
  export const removeProcesso = (setorIndex, funcaoIndex, processo) => ({
    type: DIS_REMOVE_PROCESSO,
    payload: { setorIndex, funcaoIndex, processo }
  })

  export const addAtividade = (setorIndex, funcaoIndex, processoIndex, atividade ) => ({
    type: DIS_ADD_ATIVIDADE,
    payload: { setorIndex, funcaoIndex, processoIndex, atividade }
  })
  export const removeAtividade = (setorIndex, funcaoIndex, processoIndex, atividade ) => ({
    type: DIS_REMOVE_ATIVIDADE,
    payload: { setorIndex, funcaoIndex, processoIndex, atividade }
  })

  export const addRecurso = (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recurso) => ({
    type: DIS_ADD_RECURSO,
    payload: { setorIndex, funcaoIndex, processoIndex, atividadeIndex, recurso }
  })
  export const removeRecurso = (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recurso) => ({
    type: DIS_REMOVE_RECURSO,
    payload: { setorIndex, funcaoIndex, processoIndex, atividadeIndex, recurso }
  })

  export const addRisco = (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, risco) => ({
    type: DIS_ADD_RISCO,
    payload: { setorIndex, funcaoIndex,  processoIndex, atividadeIndex, recursoIndex, risco }
  })
  export const removeRisco = (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, risco) => ({
    type: DIS_REMOVE_RISCO,
    payload: { setorIndex, funcaoIndex,  processoIndex, atividadeIndex, recursoIndex, risco }
  })

  export const addCausa = (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causa) => ({
    type: DIS_ADD_CAUSA,
    payload: { setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causa }
  })
  export const removeCausa = (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causa) => ({
    type: DIS_REMOVE_CAUSA,
    payload: { setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causa }
  })

  export const addMedida = (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medida) => ({
    type: DIS_ADD_MEDIDA,
    payload: { setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medida }
  })
  export const removeMedida = (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medida) => ({
    type: DIS_REMOVE_MEDIDA,
    payload: { setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medida }
  })

  export const addProbabilidade = (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidade) => ({
    type: DIS_ADD_PROBABILIDADE,
    payload: { setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidade }
  })
 export const removeProbabilidade = (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidade) => ({
    type: DIS_REMOVE_PROBABILIDADE,
    payload: { setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidade }
  })

  export const addSeveridade = (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidadeIndex, severidade) => ({
    type: DIS_ADD_SEVERIDADE,
    payload: { setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidadeIndex, severidade }
  })
  export const removeSeveridade = (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidadeIndex, severidade) => ({
    type: DIS_REMOVE_SEVERIDADE,
    payload: { setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidadeIndex, severidade }
  })

  export const addNivel = (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidadeIndex, severidadeIndex, nivel) => ({
    type: DIS_ADD_NIVEL,
    payload: { setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidadeIndex, severidadeIndex, nivel }
  })

  export const removeNivel = (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidadeIndex, severidadeIndex, nivelRiscoId) => ({
    type: DIS_REMOVE_NIVEL,
    payload: { setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidadeIndex, severidadeIndex, nivelRiscoId }
  })

  export const addProposta = (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidadeIndex, severidadeIndex, nivelIndex, proposta) => ({
    type: DIS_ADD_PROPOSTA,
    payload: { setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidadeIndex, severidadeIndex, nivelIndex, proposta }
  })

  export const removeProposta = (setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidadeIndex, severidadeIndex, nivelRiscoIndex, propostaId) => ({
    type: DIS_REMOVE_PROPOSTA,
    payload: { setorIndex, funcaoIndex, processoIndex, atividadeIndex, recursoIndex, riscoIndex, causaIndex, medidaIndex, probabilidadeIndex, severidadeIndex, nivelRiscoIndex, propostaId }
  })

