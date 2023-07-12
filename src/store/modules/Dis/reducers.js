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
  DIS_ADD_PROCESSO,
  DIS_ADD_ATIVIDADE,
  DIS_ADD_RECURSO,
  DIS_ADD_RISCO,
  DIS_ADD_CAUSA,
  DIS_ADD_MEDIDA,
  DIS_ADD_PROBABILIDADE,
  DIS_ADD_SEVERIDADE,
  DIS_ADD_NIVEL,
  DIS_ADD_PROPOSTA,
  SET_DIS,
  DIS_REMOVE_PROPOSTA,
  DIS_REMOVE_NIVEL,
  DIS_REMOVE_SETOR,
  DIS_REMOVE_FUNCAO,
  DIS_REMOVE_PROCESSO,
  DIS_REMOVE_ATIVIDADE,
  DIS_REMOVE_RECURSO,
  DIS_REMOVE_RISCO,
  DIS_REMOVE_CAUSA,
  DIS_REMOVE_MEDIDA,
  DIS_REMOVE_PROBABILIDADE,
  DIS_REMOVE_SEVERIDADE,

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
        setores: state.setores.filter(setor => setor?.setor._id !== action.payload.setor )
      };
    case DIS_ADD_FUNCAO:
      if (!action.payload.funcao.hasOwnProperty('processos')) {
        action.payload.funcao.processos = []
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
              funcoes: setor.funcoes.filter(funcao => funcao?.funcao._id !== action.payload.funcao),
            };
          }
          return setor;
        }),
      };
    case DIS_ADD_PROCESSO:
      if (!action.payload.processo.hasOwnProperty('atividades')) {
        action.payload.processo.atividades = []
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
                    processos: [...funcao.processos, action.payload.processo],
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    case DIS_REMOVE_PROCESSO:
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
                    processos: funcao.processos.filter(processo => processo?.processo._id !== action.payload.processo),
                  };
                }
                return funcao;
              })
            };
          }
          return setor;
        }),
      };
    case DIS_ADD_ATIVIDADE:
      if (!action.payload.atividade.hasOwnProperty('recursos')) {
        action.payload.atividade.recursos = []
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
                    processos: funcao.processos.map((processo, processoIndex) => {
                      if (processoIndex === action.payload.processoIndex) {
                        return {
                          ...processo,
                          atividades: [...processo.atividades, action.payload.atividade],
                        };
                      }
                      return processo;
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
                    processos: funcao.processos.map((processo, processoIndex) => {
                      if (processoIndex === action.payload.processoIndex) {
                        return {
                          ...processo,
                          atividades: processo.atividades.filter(atividade => atividade?.atividade._id !== action.payload.atividade),
                        };
                      }
                      return processo;
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
    case DIS_ADD_RECURSO:
      if (!action.payload.recurso.hasOwnProperty('riscos')) {
        action.payload.recurso.riscos = []
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
                    processos: funcao.processos.map((processo, processoIndex) => {
                      if (processoIndex === action.payload.processoIndex) {
                        return {
                          ...processo,
                          atividades: processo.atividades.map((atividade, atividadeIndex) => {
                            if (atividadeIndex === action.payload.atividadeIndex) {
                              return {
                                ...atividade,
                                recursos: [...atividade.recursos, action.payload.recurso],
                              };
                            }
                            return atividade;
                          })
                        };
                      }
                      return processo;
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
    case DIS_REMOVE_RECURSO:
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
                    processos: funcao.processos.map((processo, processoIndex) => {
                      if (processoIndex === action.payload.processoIndex) {
                        return {
                          ...processo,
                          atividades: processo.atividades.map((atividade, atividadeIndex) => {
                            if (atividadeIndex === action.payload.atividadeIndex) {
                              return {
                                ...atividade,
                                recursos: atividade.recursos.filter(recurso => recurso?.recurso._id !== action.payload.recurso),
                              };
                            }
                            return atividade;
                          })
                        };
                      }
                      return processo;
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
      if (!action.payload.risco.hasOwnProperty('causas')) {
        action.payload.risco.causas = []
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
                    processos: funcao.processos.map((processo, processoIndex) => {
                      if (processoIndex === action.payload.processoIndex) {
                        return {
                          ...processo,
                          atividades: processo.atividades.map((atividade, atividadeIndex) => {
                            if (atividadeIndex === action.payload.atividadeIndex) {
                              return {
                                ...atividade,
                                recursos: atividade.recursos.map((recurso, recursoIndex) => {
                                  if (recursoIndex === action.payload.recursoIndex) {
                                    return {
                                      ...recurso,
                                      riscos: [...recurso.riscos, action.payload.risco],
                                    };
                                  }
                                  return recurso;
                                })
                              };
                            }
                            return atividade;
                          })
                        };
                      }
                      return processo;
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
                    processos: funcao.processos.map((processo, processoIndex) => {
                      if (processoIndex === action.payload.processoIndex) {
                        return {
                          ...processo,
                          atividades: processo.atividades.map((atividade, atividadeIndex) => {
                            if (atividadeIndex === action.payload.atividadeIndex) {
                              return {
                                ...atividade,
                                recursos: atividade.recursos.map((recurso, recursoIndex) => {
                                  if (recursoIndex === action.payload.recursoIndex) {
                                    return {
                                      ...recurso,
                                      riscos: recurso.riscos.filter(risco => risco?.risco._id !== action.payload.risco),
                                    };
                                  }
                                  return recurso;
                                })
                              };
                            }
                            return atividade;
                          })
                        };
                      }
                      return processo;
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
      if (!action.payload.causa.hasOwnProperty('medidas')) {
        action.payload.causa.medidas = []
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
                    processos: funcao.processos.map((processo, processoIndex) => {
                      if (processoIndex === action.payload.processoIndex) {
                        return {
                          ...processo,
                          atividades: processo.atividades.map((atividade, atividadeIndex) => {
                            if (atividadeIndex === action.payload.atividadeIndex) {
                              return {
                                ...atividade,
                                recursos: atividade.recursos.map((recurso, recursoIndex) => {
                                  if (recursoIndex === action.payload.recursoIndex) {
                                    return {
                                      ...recurso,
                                      riscos: recurso.riscos.map((risco, riscoIndex) => {
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            causas: [...risco.causas,action.payload.causa],
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return recurso;
                                })
                              };
                            }
                            return atividade;
                          })
                        };
                      }
                      return processo;
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
                    processos: funcao.processos.map((processo, processoIndex) => {
                      if (processoIndex === action.payload.processoIndex) {
                        return {
                          ...processo,
                          atividades: processo.atividades.map((atividade, atividadeIndex) => {
                            if (atividadeIndex === action.payload.atividadeIndex) {
                              return {
                                ...atividade,
                                recursos: atividade.recursos.map((recurso, recursoIndex) => {
                                  if (recursoIndex === action.payload.recursoIndex) {
                                    return {
                                      ...recurso,
                                      riscos: recurso.riscos.map((risco, riscoIndex) => {
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            causas: risco.causas.filter(causa => causa?.causa._id !== action.payload.causa),
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return recurso;
                                })
                              };
                            }
                            return atividade;
                          })
                        };
                      }
                      return processo;
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
      if (!action.payload.medida.hasOwnProperty('probabilidades')) {
        action.payload.medida.probabilidades = []
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
                    processos: funcao.processos.map((processo, processoIndex) => {
                      if (processoIndex === action.payload.processoIndex) {
                        return {
                          ...processo,
                          atividades: processo.atividades.map((atividade, atividadeIndex) => {
                            if (atividadeIndex === action.payload.atividadeIndex) {
                              return {
                                ...atividade,
                                recursos: atividade.recursos.map((recurso, recursoIndex) => {
                                  if (recursoIndex === action.payload.recursoIndex) {
                                    return {
                                      ...recurso,
                                      riscos: recurso.riscos.map((risco, riscoIndex) => {
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            causas: risco.causas.map((causa, causaIndex) => {
                                              if (causaIndex === action.payload.causaIndex) {
                                                return {
                                                  ...causa,
                                                  medidas: [...causa.medidas, action.payload.medida],
                                                };
                                              }
                                              return causa;
                                            })
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return recurso;
                                })
                              };
                            }
                            return atividade;
                          })
                        };
                      }
                      return processo;
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
                    processos: funcao.processos.map((processo, processoIndex) => {
                      if (processoIndex === action.payload.processoIndex) {
                        return {
                          ...processo,
                          atividades: processo.atividades.map((atividade, atividadeIndex) => {
                            if (atividadeIndex === action.payload.atividadeIndex) {
                              return {
                                ...atividade,
                                recursos: atividade.recursos.map((recurso, recursoIndex) => {
                                  if (recursoIndex === action.payload.recursoIndex) {
                                    return {
                                      ...recurso,
                                      riscos: recurso.riscos.map((risco, riscoIndex) => {
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            causas: risco.causas.map((causa, causaIndex) => {
                                              if (causaIndex === action.payload.causaIndex) {
                                                return {
                                                  ...causa,
                                                  medidas: causa.medidas.filter(medida => medida?.medida._id !== action.payload.medida),
                                                };
                                              }
                                              return causa;
                                            })
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return recurso;
                                })
                              };
                            }
                            return atividade;
                          })
                        };
                      }
                      return processo;
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
      if (!action.payload.probabilidade.hasOwnProperty('severidades')) {
        action.payload.probabilidade.severidades = []
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
                    processos: funcao.processos.map((processo, processoIndex) => {
                      if (processoIndex === action.payload.processoIndex) {
                        return {
                          ...processo,
                          atividades: processo.atividades.map((atividade, atividadeIndex) => {
                            if (atividadeIndex === action.payload.atividadeIndex) {
                              return {
                                ...atividade,
                                recursos: atividade.recursos.map((recurso, recursoIndex) => {
                                  if (recursoIndex === action.payload.recursoIndex) {
                                    return {
                                      ...recurso,
                                      riscos: recurso.riscos.map((risco, riscoIndex) => {
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            causas: risco.causas.map((causa, causaIndex) => {
                                              if (causaIndex === action.payload.causaIndex) {
                                                return {
                                                  ...causa,
                                                  medidas: causa.medidas.map((medida, medidaIndex) => {
                                                    if (medidaIndex === action.payload.medidaIndex) {
                                                      return {
                                                        ...medida,
                                                        probabilidades: [...medida.probabilidades, action.payload.probabilidade],
                                                      };
                                                    }
                                                    return medida;
                                                  })
                                                };
                                              }
                                              return causa;
                                            })
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return recurso;
                                })
                              };
                            }
                            return atividade;
                          })
                        };
                      }
                      return processo;
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
                    processos: funcao.processos.map((processo, processoIndex) => {
                      if (processoIndex === action.payload.processoIndex) {
                        return {
                          ...processo,
                          atividades: processo.atividades.map((atividade, atividadeIndex) => {
                            if (atividadeIndex === action.payload.atividadeIndex) {
                              return {
                                ...atividade,
                                recursos: atividade.recursos.map((recurso, recursoIndex) => {
                                  if (recursoIndex === action.payload.recursoIndex) {
                                    return {
                                      ...recurso,
                                      riscos: recurso.riscos.map((risco, riscoIndex) => {
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            causas: risco.causas.map((causa, causaIndex) => {
                                              if (causaIndex === action.payload.causaIndex) {
                                                return {
                                                  ...causa,
                                                  medidas: causa.medidas.map((medida, medidaIndex) => {
                                                    if (medidaIndex === action.payload.medidaIndex) {
                                                      return {
                                                        ...medida,
                                                        probabilidades: medida.probabilidades.filter(probabilidade => probabilidade?.probabilidade._id !== action.payload.probabilidade),
                                                      };
                                                    }
                                                    return medida;
                                                  })
                                                };
                                              }
                                              return causa;
                                            })
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return recurso;
                                })
                              };
                            }
                            return atividade;
                          })
                        };
                      }
                      return processo;
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
      if (!action.payload.severidade.hasOwnProperty('niveisRisco')) {
        action.payload.severidade.niveisRisco = []
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
                    processos: funcao.processos.map((processo, processoIndex) => {
                      if (processoIndex === action.payload.processoIndex) {
                        return {
                          ...processo,
                          atividades: processo.atividades.map((atividade, atividadeIndex) => {
                            if (atividadeIndex === action.payload.atividadeIndex) {
                              return {
                                ...atividade,
                                recursos: atividade.recursos.map((recurso, recursoIndex) => {
                                  if (recursoIndex === action.payload.recursoIndex) {
                                    return {
                                      ...recurso,
                                      riscos: recurso.riscos.map((risco, riscoIndex) => {
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            causas: risco.causas.map((causa, causaIndex) => {
                                              if (causaIndex === action.payload.causaIndex) {
                                                return {
                                                  ...causa,
                                                  medidas: causa.medidas.map((medida, medidaIndex) => {
                                                    if (medidaIndex === action.payload.medidaIndex) {
                                                      return {
                                                        ...medida,
                                                        probabilidades: medida.probabilidades.map((probabilidade, probabilidadeIndex) => {
                                                          if (probabilidadeIndex === action.payload.probabilidadeIndex) {
                                                            return {
                                                              ...probabilidade,
                                                              severidades: [...probabilidade.severidades, action.payload.severidade],
                                                            };
                                                          }
                                                          return probabilidade;
                                                        })
                                                      };
                                                    }
                                                    return medida;
                                                  })
                                                };
                                              }
                                              return causa;
                                            })
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return recurso;
                                })
                              };
                            }
                            return atividade;
                          })
                        };
                      }
                      return processo;
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
                    processos: funcao.processos.map((processo, processoIndex) => {
                      if (processoIndex === action.payload.processoIndex) {
                        return {
                          ...processo,
                          atividades: processo.atividades.map((atividade, atividadeIndex) => {
                            if (atividadeIndex === action.payload.atividadeIndex) {
                              return {
                                ...atividade,
                                recursos: atividade.recursos.map((recurso, recursoIndex) => {
                                  if (recursoIndex === action.payload.recursoIndex) {
                                    return {
                                      ...recurso,
                                      riscos: recurso.riscos.map((risco, riscoIndex) => {
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            causas: risco.causas.map((causa, causaIndex) => {
                                              if (causaIndex === action.payload.causaIndex) {
                                                return {
                                                  ...causa,
                                                  medidas: causa.medidas.map((medida, medidaIndex) => {
                                                    if (medidaIndex === action.payload.medidaIndex) {
                                                      return {
                                                        ...medida,
                                                        probabilidades: medida.probabilidades.map((probabilidade, probabilidadeIndex) => {
                                                          if (probabilidadeIndex === action.payload.probabilidadeIndex) {
                                                            return {
                                                              ...probabilidade,
                                                              severidades: probabilidade.severidades.filter(severidade => severidade?.severidade._id !== action.payload.severidade),
                                                            };
                                                          }
                                                          return probabilidade;
                                                        })
                                                      };
                                                    }
                                                    return medida;
                                                  })
                                                };
                                              }
                                              return causa;
                                            })
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return recurso;
                                })
                              };
                            }
                            return atividade;
                          })
                        };
                      }
                      return processo;
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
      if (!action.payload.nivel.hasOwnProperty('propostas')) {
        action.payload.nivel.propostas = []
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
                    processos: funcao.processos.map((processo, processoIndex) => {
                      if (processoIndex === action.payload.processoIndex) {
                        return {
                          ...processo,
                          atividades: processo.atividades.map((atividade, atividadeIndex) => {
                            if (atividadeIndex === action.payload.atividadeIndex) {
                              return {
                                ...atividade,
                                recursos: atividade.recursos.map((recurso, recursoIndex) => {
                                  if (recursoIndex === action.payload.recursoIndex) {
                                    return {
                                      ...recurso,
                                      riscos: recurso.riscos.map((risco, riscoIndex) => {
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            causas: risco.causas.map((causa, causaIndex) => {
                                              if (causaIndex === action.payload.causaIndex) {
                                                return {
                                                  ...causa,
                                                  medidas: causa.medidas.map((medida, medidaIndex) => {
                                                    if (medidaIndex === action.payload.medidaIndex) {
                                                      return {
                                                        ...medida,
                                                        probabilidades: medida.probabilidades.map((probabilidade, probabilidadeIndex) => {
                                                          if (probabilidadeIndex === action.payload.probabilidadeIndex) {
                                                            return {
                                                              ...probabilidade,
                                                              severidades: probabilidade.severidades.map((severidade, severidadeIndex) => {
                                                                if (severidadeIndex === action.payload.severidadeIndex) {
                                                                  return {
                                                                    ...severidade,
                                                                    niveisRisco: [...severidade.niveisRisco, action.payload.nivel],
                                                                  };
                                                                }
                                                                return severidade;
                                                              })
                                                            };
                                                          }
                                                          return probabilidade;
                                                        })
                                                      };
                                                    }
                                                    return medida;
                                                  })
                                                };
                                              }
                                              return causa;
                                            })
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return recurso;
                                })
                              };
                            }
                            return atividade;
                          })
                        };
                      }
                      return processo;
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
                    processos: funcao.processos.map((processo, processoIndex) => {

                      if (processoIndex === action.payload.processoIndex) {
                        return {
                          ...processo,
                          atividades: processo.atividades.map((atividade, atividadeIndex) => {

                            if (atividadeIndex === action.payload.atividadeIndex) {
                              return {
                                ...atividade,
                                recursos: atividade.recursos.map((recurso, recursoIndex) => {

                                  if (recursoIndex === action.payload.recursoIndex) {
                                    return {
                                      ...recurso,
                                      riscos: recurso.riscos.map((risco, riscoIndex) => {

                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            causas: risco.causas.map((causa, causaIndex) => {

                                              if (causaIndex === action.payload.causaIndex) {
                                                return {
                                                  ...causa,
                                                  medidas: causa.medidas.map((medida, medidaIndex) => {

                                                    if (medidaIndex === action.payload.medidaIndex) {
                                                      return {
                                                        ...medida,
                                                        probabilidades: medida.probabilidades.map((probabilidade, probabilidadeIndex) => {

                                                          if (probabilidadeIndex === action.payload.probabilidadeIndex) {
                                                            return {
                                                              ...probabilidade,
                                                              severidades: probabilidade.severidades.map((severidade, severidadeIndex) => {

                                                                if (severidadeIndex === action.payload.severidadeIndex) {
                                                                  return {
                                                                    ...severidade,
                                                                    niveisRisco: severidade.niveisRisco.filter(nivel => nivel?.nivelRisco._id !== action.payload.nivelRiscoId),

                                                                  }
                                                                };
                                                                return severidade;
                                                              })
                                                            };
                                                          }
                                                          return probabilidade;
                                                        })
                                                      };
                                                    }
                                                    return medida;
                                                  })
                                                };
                                              }
                                              return causa;
                                            })
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return recurso;
                                })
                              };
                            }
                            return atividade;
                          })
                        };
                      }
                      return processo;
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
    case DIS_ADD_PROPOSTA:
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
                    processos: funcao.processos.map((processo, processoIndex) => {
                      if (processoIndex === action.payload.processoIndex) {
                        return {
                          ...processo,
                          atividades: processo.atividades.map((atividade, atividadeIndex) => {
                            if (atividadeIndex === action.payload.atividadeIndex) {
                              return {
                                ...atividade,
                                recursos: atividade.recursos.map((recurso, recursoIndex) => {
                                  if (recursoIndex === action.payload.recursoIndex) {
                                    return {
                                      ...recurso,
                                      riscos: recurso.riscos.map((risco, riscoIndex) => {
                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            causas: risco.causas.map((causa, causaIndex) => {
                                              if (causaIndex === action.payload.causaIndex) {
                                                return {
                                                  ...causa,
                                                  medidas: causa.medidas.map((medida, medidaIndex) => {
                                                    if (medidaIndex === action.payload.medidaIndex) {
                                                      return {
                                                        ...medida,
                                                        probabilidades: medida.probabilidades.map((probabilidade, probabilidadeIndex) => {
                                                          if (probabilidadeIndex === action.payload.probabilidadeIndex) {
                                                            return {
                                                              ...probabilidade,
                                                              severidades: probabilidade.severidades.map((severidade, severidadeIndex) => {
                                                                if (severidadeIndex === action.payload.severidadeIndex) {
                                                                  return {
                                                                    ...severidade,
                                                                    niveisRisco: severidade.niveisRisco.map((nivel, nivelIndex) => {
                                                                      if (nivelIndex === action.payload.nivelIndex) {
                                                                        return {
                                                                          ...nivel,
                                                                          propostas: [...nivel.propostas, action.payload.proposta],
                                                                        };
                                                                      }
                                                                      return nivel;
                                                                    })
                                                                  };
                                                                }
                                                                return severidade;
                                                              })
                                                            };
                                                          }
                                                          return probabilidade;
                                                        })
                                                      };
                                                    }
                                                    return medida;
                                                  })
                                                };
                                              }
                                              return causa;
                                            })
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return recurso;
                                })
                              };
                            }
                            return atividade;
                          })
                        };
                      }
                      return processo;
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
    case DIS_REMOVE_PROPOSTA:
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
                    processos: funcao.processos.map((processo, processoIndex) => {

                      if (processoIndex === action.payload.processoIndex) {
                        return {
                          ...processo,
                          atividades: processo.atividades.map((atividade, atividadeIndex) => {

                            if (atividadeIndex === action.payload.atividadeIndex) {
                              return {
                                ...atividade,
                                recursos: atividade.recursos.map((recurso, recursoIndex) => {

                                  if (recursoIndex === action.payload.recursoIndex) {
                                    return {
                                      ...recurso,
                                      riscos: recurso.riscos.map((risco, riscoIndex) => {

                                        if (riscoIndex === action.payload.riscoIndex) {
                                          return {
                                            ...risco,
                                            causas: risco.causas.map((causa, causaIndex) => {

                                              if (causaIndex === action.payload.causaIndex) {
                                                return {
                                                  ...causa,
                                                  medidas: causa.medidas.map((medida, medidaIndex) => {

                                                    if (medidaIndex === action.payload.medidaIndex) {
                                                      return {
                                                        ...medida,
                                                        probabilidades: medida.probabilidades.map((probabilidade, probabilidadeIndex) => {

                                                          if (probabilidadeIndex === action.payload.probabilidadeIndex) {
                                                            return {
                                                              ...probabilidade,
                                                              severidades: probabilidade.severidades.map((severidade, severidadeIndex) => {

                                                                if (severidadeIndex === action.payload.severidadeIndex) {
                                                                  return {
                                                                    ...severidade,
                                                                    niveisRisco: severidade.niveisRisco.map((nivel, nivelIndex) => {

                                                                      if (nivelIndex === action.payload.nivelRiscoIndex) {
                                                                        
                                                                        return {
                                                                          ...nivel,
                                                                          propostas: nivel.propostas.filter(proposta => proposta.proposta._id !== action.payload.propostaId),
                                                                        };
                                                                      }
                                                                      return nivel;
                                                                    })
                                                                  };
                                                                }
                                                                return severidade;
                                                              })
                                                            };
                                                          }
                                                          return probabilidade;
                                                        })
                                                      };
                                                    }
                                                    return medida;
                                                  })
                                                };
                                              }
                                              return causa;
                                            })
                                          };
                                        }
                                        return risco;
                                      })
                                    };
                                  }
                                  return recurso;
                                })
                              };
                            }
                            return atividade;
                          })
                        };
                      }
                      return processo;
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
