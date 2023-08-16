import {
  LISTAR_DIS_REQUEST,
  LISTAR_DIS_SUCCESS,
  LISTAR_DIS_FAILURE,
  SHOW_DIS_REQUEST,
  SHOW_DIS_SUCCESS,
  SHOW_DIS_FAILURE,
  CRIAR_DIS_REQUEST,
  CRIAR_DIS_SUCCESS,
  CRIAR_DIS_FAILURE,
  UPDATE_DIS_REQUEST,
  UPDATE_DIS_SUCCESS,
  UPDATE_DIS_FAILURE,
  DELETE_DIS_REQUEST,
  DELETE_DIS_SUCCESS,
  DELETE_DIS_FAILURE,
  DIS_ADD_SETOR,
  DIS_ADD_FUNCAO,
  DIS_ADD_MONITORAMENTO,
  DIS_ADD_ATIVIDADE,
  DIS_ADD_PERIGO,
  DIS_ADD_RISCO,
  DIS_ADD_CAUSA,
  DIS_ADD_MEDIDA,
  DIS_ADD_PROBABILIDADE,
  DIS_ADD_SEVERIDADE,
  DIS_ADD_NIVEL,
  DIS_ADD_PLANOACAO,
  SET_DIS,
  DIS_REMOVE_PLANOACAO,
  DIS_REMOVE_NIVEL,
  DIS_REMOVE_SETOR,
  DIS_REMOVE_FUNCAO,
  DIS_REMOVE_MONITORAMENTO,
  DIS_REMOVE_ATIVIDADE,
  DIS_REMOVE_PERIGO,
  DIS_REMOVE_RISCO,
  DIS_REMOVE_CAUSA,
  DIS_REMOVE_MEDIDA,
  DIS_REMOVE_PROBABILIDADE,
  DIS_REMOVE_SEVERIDADE,
  DIS_ADD_AGENTERISCO,
  DIS_REMOVE_AGENTERISCO,
  DIS_ADD_VIAABSORCAO,
  DIS_REMOVE_VIAABSORCAO,
  DIS_ADD_FREQUENCIAEXPOSICAO,
  DIS_REMOVE_FREQUENCIAEXPOSICAO,
  DIS_ADD_DURACAOEXPOSICAO,
  DIS_REMOVE_DURACAOEXPOSICAO,
  DIS_ADD_AVALIACAO,
  DIS_REMOVE_AVALIACAO,
  DIS_ADD_STATUS,
  DIS_REMOVE_STATUS,
  DIS_REMOVE_PRAZO,
  DIS_ADD_PRAZO,
  DIS_REMOVE_PRIORIDADE,
  DIS_ADD_PRIORIDADE,
  DIS_REMOVE_INTENCAO,
  DIS_ADD_INTENCAO,

} from './actions'

const initialState = {
  loading: false,
  disList: [],
  dis: null,
  error: '',
  page: 1,
  setores: [],
};

const disReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_DIS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SHOW_DIS_SUCCESS:
      return {
        ...state,
        dis: action.payload,
        loading: false,
      };
    case SHOW_DIS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LISTAR_DIS_REQUEST:
      return {
        ...state,
        page: action.payload.page,
        loading: true,
      };
    case CRIAR_DIS_REQUEST:
    case UPDATE_DIS_REQUEST:
    case DELETE_DIS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LISTAR_DIS_SUCCESS:
      return {
        ...state,
        loading: false,
        disList: action.payload,
        error: '',
      };
    case CRIAR_DIS_SUCCESS:
      return {
        ...state,
        loading: false,
        disList: [...state.disList, action.payload],
        setores: [],
        error: '',
      };
    case UPDATE_DIS_SUCCESS:
      var index = state.disList.findIndex((dis) => dis._id === action.payload._id);
      state.disList[index] = action.payload;
      return {
        ...state,
        loading: false,
        disList: [...state.disList],
        setores: [],
        error: '',
      };
    case DELETE_DIS_SUCCESS:
      var index = state.disList.findIndex((dis) => dis._id === action.payload);
      return {
        ...state,
        loading: false,
        disList: [
          ...state.disList.slice(0, index),
          ...state.disList.slice(index + 1)
        ],
        setores: [],
        error: '',
      };
    case LISTAR_DIS_FAILURE:
    case CRIAR_DIS_FAILURE:
    case UPDATE_DIS_FAILURE:
    case DELETE_DIS_FAILURE:
      return {
        ...state,
        loading: false,
        dis: null,
        setores: [],
        error: action.payload,
      };
    case SET_DIS:
      return {
        ...state,
        loading: false,
        dis: { ...state.disList[action.payload] },
        setores: [...state.disList[action.payload].setores],
        error: '',
      };
    
    case DIS_ADD_SETOR:
      if (!action.payload.setor.hasOwnProperty('funcoes')) {
        action.payload.setor.funcoes = []
      }
      return {
        ...state,
        setores:[...state.setores, action.payload.setor]
      };
    case DIS_REMOVE_SETOR:
      return {
        ...state,
        setores: state.setores.filter(setor => setor?.setor._id !== action.payload.setorId )
      };
    
    case DIS_ADD_FUNCAO:
      if (!action.payload.funcao.hasOwnProperty('atividades')) {
        action.payload.funcao.atividades = []
      }
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: [...setor.funcoes, action.payload.funcao],
            };
          }
          return setor;
        }),
      };
    case DIS_REMOVE_FUNCAO:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.filter(funcao => funcao?.funcao._id !== action.payload.funcaoId),
            };
          }
          return setor;
        }),
      };
    
    case DIS_ADD_ATIVIDADE:
        if (!action.payload.atividade.hasOwnProperty('perigos')) {
          action.payload.atividade.perigos = []
        }
        return {
          ...state,
          setores: state.setores.map((setor, setorIndex) => {
            if (setorIndex === action.payload.setorIndex) {
              return {
                ...setor,
                funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                  if (funcaoIndex === action.payload.funcaoIndex) {
                    return {
                      ...funcao,
                      atividades: [...funcao.atividades, action.payload.atividade],
                    };
                  }
                  return funcao;
                })
              };
            }
            return setor;
          }),
        };
    case DIS_REMOVE_ATIVIDADE:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.filter(atividade => atividade?.atividade._id !== action.payload.atividadeId)
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    
    case DIS_ADD_PERIGO:
      if (!action.payload.perigo.hasOwnProperty('agentesRisco')) {
        action.payload.perigo.agentesRisco = []
      }
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: [...atividade.perigos, action.payload.perigo],
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    case DIS_REMOVE_PERIGO:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.filter(perigo => perigo?.perigo._id !== action.payload.perigoId),
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    
    case DIS_ADD_AGENTERISCO:
      if (!action.payload.agenteRisco.hasOwnProperty('riscos')) {
        action.payload.agenteRisco.riscos = []
      }
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: [...perigo.agentesRisco, action.payload.agenteRisco],
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    case DIS_REMOVE_AGENTERISCO:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco:perigo.agentesRisco.filter(agenteRisco => agenteRisco?.agenteRisco._id !== action.payload.agenteRiscoId)
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    
    case DIS_ADD_RISCO:
      if (!action.payload.risco.hasOwnProperty('planosAcao')) {
        action.payload.risco.planosAcao = []
        action.payload.risco.viaAbsorcao = []
        action.payload.risco.frequenciaExposicao = []
        action.payload.risco.duracaoExposicao = []
        action.payload.risco.causa = []
        action.payload.risco.medida = []
        action.payload.risco.avaliacao = []
        action.payload.risco.probabilidade = []
        action.payload.risco.severidade = []
        action.payload.risco.nivelRisco = []
      }
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {

                                    return {
                                      ...agenteRisco,
                                      riscos: [...agenteRisco.riscos, action.payload.risco],
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    case DIS_REMOVE_RISCO:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {

                                    return {
                                      ...agenteRisco,
                                      riscos: agenteRisco.riscos.filter(risco => risco?.risco._id !== action.payload.riscoId),
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };   
    
    case DIS_ADD_VIAABSORCAO:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos:  agenteRisco.riscos.map((risco, riscoIndex) => {
                                        
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            viaAbsorcao: [action.payload.viaAbsorcao]
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    case DIS_REMOVE_VIAABSORCAO:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos:  agenteRisco.riscos.map((risco, riscoIndex) => {
                                        
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            viaAbsorcao: risco.viaAbsorcao.filter(viaAbsorcao => viaAbsorcao?._id !== action.payload.viaAbsorcaoId)
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };     
    
    case DIS_ADD_FREQUENCIAEXPOSICAO:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos: agenteRisco.riscos.map((risco, riscoIndex) => {
                                        
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            frequenciaExposicao: [action.payload.frequenciaExposicao]
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    case DIS_REMOVE_FREQUENCIAEXPOSICAO:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos: agenteRisco.riscos.map((risco, riscoIndex) => {
                                        
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            frequenciaExposicao: risco.frequenciaExposicao.filter(frequenciaExposicao => frequenciaExposicao?._id !== action.payload.frequenciaExposicaoId)
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };   
      
    case DIS_ADD_DURACAOEXPOSICAO:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos: agenteRisco.riscos.map((risco, riscoIndex) => {
                                        
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            duracaoExposicao: [action.payload.duracaoExposicao]
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    case DIS_REMOVE_DURACAOEXPOSICAO:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos: agenteRisco.riscos.map((risco, riscoIndex) => {
                                        
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            duracaoExposicao: risco.duracaoExposicao.filter(duracaoExposicao => duracaoExposicao?._id !== action.payload.duracaoExposicaoId)
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };  
      
    case DIS_ADD_CAUSA:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos: agenteRisco.riscos.map((risco, riscoIndex) => {
                                        
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            causa: [action.payload.causa]
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    case DIS_REMOVE_CAUSA:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos: agenteRisco.riscos.map((risco, riscoIndex) => {
                                        
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            causa: risco.causa.filter(causa => causa?.causa._id !== action.payload.causaId)
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };    
      
    case DIS_ADD_MEDIDA:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos: agenteRisco.riscos.map((risco, riscoIndex) => {
                                        
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            medida: [action.payload.medida]
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    case DIS_REMOVE_MEDIDA:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos: agenteRisco.riscos.map((risco, riscoIndex) => {
                                        
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            medida: risco.medida.filter(medida => medida?.medida._id !== action.payload.medidaId)
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };  
      
    case DIS_ADD_AVALIACAO:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos:agenteRisco.riscos.map((risco, riscoIndex) => {
                                        
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            avaliacao: [action.payload.avaliacao]
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    case DIS_REMOVE_AVALIACAO:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos:agenteRisco.riscos.map((risco, riscoIndex) => {
                                        
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            avaliacao:  risco.avaliacao.filter(avaliacao => avaliacao?._id !== action.payload.avaliacaoId)
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };    
      
    case DIS_ADD_PROBABILIDADE:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos: agenteRisco.riscos.map((risco, riscoIndex) => {
                                        
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            probabilidade: [action.payload.probabilidade]
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    case DIS_REMOVE_PROBABILIDADE:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos: agenteRisco.riscos.map((risco, riscoIndex) => {
                                        
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            probabilidade: risco.probabilidade.filter(probabilidade => probabilidade?.probabilidade._id !== action.payload.probabilidadeId)
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };   
      
    case DIS_ADD_SEVERIDADE:   
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos:agenteRisco.riscos.map((risco, riscoIndex) => {
                                        
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            severidade: [action.payload.severidade]
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    case DIS_REMOVE_SEVERIDADE:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos:agenteRisco.riscos.map((risco, riscoIndex) => {
                                        
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            severidade:  risco.severidade.filter(severidade => severidade?.severidade._id !== action.payload.severidadeId)
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };  
    
    case DIS_ADD_NIVEL:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos: agenteRisco.riscos.map((risco, riscoIndex) => {
                                        
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            nivelRisco: [action.payload.nivelRisco]
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    case DIS_REMOVE_NIVEL:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos: agenteRisco.riscos.map((risco, riscoIndex) => {
                                        
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            nivelRisco:  risco.nivelRisco.filter(nivelRisco => nivelRisco?.nivelRisco._id !== action.payload.nivelRiscoId)
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      }; 
    
    case DIS_ADD_PLANOACAO:   
      action.payload.planoAcao.intencao = []
      action.payload.planoAcao.prioridade = []
      action.payload.planoAcao.prazo = []
      action.payload.planoAcao.monitoramento = []
      action.payload.planoAcao.status = []
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos: agenteRisco.riscos.map((risco, riscoIndex) => {
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            planosAcao: [...risco.planosAcao, action.payload.planoAcao],
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    case DIS_REMOVE_PLANOACAO:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos: agenteRisco.riscos.map((risco, riscoIndex) => {
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            planosAcao: risco.planosAcao.filter(planoAcao => planoAcao?.planoAcao._id !== action.payload.planoAcaoId),
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    
    case DIS_ADD_INTENCAO:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos: agenteRisco.riscos.map((risco, riscoIndex) => {
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            planosAcao: risco.planosAcao.map((planoAcao, planoAcaoIndex) => {
                                        
                                              if (planoAcaoIndex === action.payload.planoAcaoIndex) {
                                                return {
                                                  ...planoAcao,
                                                  intencao: [action.payload.intencao]
                                                };
                                              }
                                              return planoAcao;
                                            })
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    case DIS_REMOVE_INTENCAO:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos: agenteRisco.riscos.map((risco, riscoIndex) => {
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            planosAcao: risco.planosAcao.map((planoAcao, planoAcaoIndex) => {
                                        
                                              if (planoAcaoIndex === action.payload.planoAcaoIndex) {
                                                return {
                                                  ...planoAcao,
                                                  intencao: planoAcao.intencao.filter(intencao => intencao?._id !== action.payload.intencaoId)
                                                };
                                              }
                                              return planoAcao;
                                            })
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    
    case DIS_ADD_PRIORIDADE:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos: agenteRisco.riscos.map((risco, riscoIndex) => {
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            planosAcao: risco.planosAcao.map((planoAcao, planoAcaoIndex) => {
                                        
                                              if (planoAcaoIndex === action.payload.planoAcaoIndex) {
                                                return {
                                                  ...planoAcao,
                                                  prioridade: [action.payload.prioridade]
                                                };
                                              }
                                              return planoAcao;
                                            })
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    case DIS_REMOVE_PRIORIDADE:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos: agenteRisco.riscos.map((risco, riscoIndex) => {
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            planosAcao: risco.planosAcao.map((planoAcao, planoAcaoIndex) => {
                                        
                                              if (planoAcaoIndex === action.payload.planoAcaoIndex) {
                                                return {
                                                  ...planoAcao,
                                                  prioridade: planoAcao.prioridade.filter(prioridade => prioridade?._id !== action.payload.prioridadeId)
                                                };
                                              }
                                              return planoAcao;
                                            })
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    
    case DIS_ADD_PRAZO:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos: agenteRisco.riscos.map((risco, riscoIndex) => {
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            planosAcao:risco.planosAcao.map((planoAcao, planoAcaoIndex) => {
                                        
                                              if (planoAcaoIndex === action.payload.planoAcaoIndex) {
                                                return {
                                                  ...planoAcao,
                                                  prazo: [action.payload.prazo]
                                                };
                                              }
                                              return planoAcao;
                                            })
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    case DIS_REMOVE_PRAZO:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos: agenteRisco.riscos.map((risco, riscoIndex) => {
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            planosAcao:risco.planosAcao.map((planoAcao, planoAcaoIndex) => {
                                        
                                              if (planoAcaoIndex === action.payload.planoAcaoIndex) {
                                                return {
                                                  ...planoAcao,
                                                  prazo: planoAcao.prazo.filter(prazo => prazo?._id !== action.payload.prazoId)
                                                };
                                              }
                                              return planoAcao;
                                            })
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    
    case DIS_ADD_MONITORAMENTO:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos: agenteRisco.riscos.map((risco, riscoIndex) => {
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            planosAcao: risco.planosAcao.map((planoAcao, planoAcaoIndex) => {
                                        
                                              if (planoAcaoIndex === action.payload.planoAcaoIndex) {
                                                return {
                                                  ...planoAcao,
                                                  monitoramento: [action.payload.monitoramento]
                                                };
                                              }
                                              return planoAcao;
                                            })
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    case DIS_REMOVE_MONITORAMENTO:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos: agenteRisco.riscos.map((risco, riscoIndex) => {
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            planosAcao: risco.planosAcao.map((planoAcao, planoAcaoIndex) => {
                                        
                                              if (planoAcaoIndex === action.payload.planoAcaoIndex) {
                                                return {
                                                  ...planoAcao,
                                                  monitoramento:planoAcao.monitoramento.filter(monitoramento => monitoramento?.monitoramento._id !== action.payload.monitoramentoId)
                                                };
                                              }
                                              return planoAcao;
                                            })
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    
    case DIS_ADD_STATUS:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos: agenteRisco.riscos.map((risco, riscoIndex) => {
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            planosAcao: risco.planosAcao.map((planoAcao, planoAcaoIndex) => {
                                        
                                              if (planoAcaoIndex === action.payload.planoAcaoIndex) {
                                                return {
                                                  ...planoAcao,
                                                  status: [action.payload.status]
                                                };
                                              }
                                              return planoAcao;
                                            })
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    case DIS_REMOVE_STATUS:
      return {
        ...state,
        setores: state.setores.map((setor, setorIndex) => {
          if (setorIndex === action.payload.setorIndex) {
            return {
              ...setor,
              funcoes: setor.funcoes.map((funcao, funcaoIndex) => {
                if (funcaoIndex === action.payload.funcaoIndex) {
                  return {
                    ...funcao,
                    atividades: funcao.atividades.map((atividade, atividadeIndex) => {
                      if (atividadeIndex === action.payload.atividadeIndex) {
                        return {
                          ...atividade,
                          perigos: atividade.perigos.map((perigo, perigoIndex) => {
                            if (perigoIndex === action.payload.perigoIndex) {
                              return {
                                ...perigo,
                                agentesRisco: perigo.agentesRisco.map((agenteRisco, agenteRiscoIndex) => {
                                  if (agenteRiscoIndex === action.payload.agenteRiscoIndex) {
                                    return {
                                      ...agenteRisco,
                                      riscos: agenteRisco.riscos.map((risco, riscoIndex) => {
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            planosAcao: risco.planosAcao.map((planoAcao, planoAcaoIndex) => {
                                        
                                              if (planoAcaoIndex === action.payload.planoAcaoIndex) {
                                                return {
                                                  ...planoAcao,
                                                  status: planoAcao.status.filter(status => status?._id !== action.payload.statusId)
                                                };
                                              }
                                              return planoAcao;
                                            })
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return agenteRisco;
                                })
                              };
                            }
                            return perigo;
                          })
                        };
                      }
                      return atividade;
                    })
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    
    default:
      return state;
  }
};

export default disReducer;
