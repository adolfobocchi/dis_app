// reducers.js
import { SHOW_EMPRESAS_REQUEST, SHOW_EMPRESAS_SUCCESS, SHOW_EMPRESAS_FAILURE, LISTAR_EMPRESAS_REQUEST, CRIAR_EMPRESAS_REQUEST, UPDATE_EMPRESAS_REQUEST, DELETE_EMPRESAS_REQUEST, LISTAR_EMPRESAS_SUCCESS, CRIAR_EMPRESAS_SUCCESS, UPDATE_EMPRESAS_SUCCESS, DELETE_EMPRESAS_SUCCESS, LISTAR_EMPRESAS_FAILURE, CRIAR_EMPRESAS_FAILURE, UPDATE_EMPRESAS_FAILURE, DELETE_EMPRESAS_FAILURE, UPDATEPASSWORD_EMPRESAS_FAILURE, UPDATEPASSWORD_EMPRESAS_SUCCESS, UPDATEPASSWORD_EMPRESAS_REQUEST, LISTAR_GRUPOS_REQUEST, LISTAR_GRUPOS_SUCCESS, LISTAR_GRUPOS_FAILURE, SHOW_GRUPOS_FAILURE, SHOW_GRUPOS_SUCCESS, SHOW_GRUPOS_REQUEST, CRIAR_GRUPO_REQUEST, UPDATE_GRUPOS_REQUEST, DELETE_GRUPOS_REQUEST, CRIAR_GRUPOS_SUCCESS, CRIAR_GRUPOS_REQUEST, UPDATE_GRUPOS_SUCCESS, ADD_COMUNICADO_SUCCESS, ADD_COMUNICADO_REQUEST, ADD_COMUNICADO_FAILURE, ADD_DOCUMENTO_REQUEST, ADD_DOCUMENTO_SUCCESS, ADD_DOCUMENTO_FAILURE, REMOVE_DOCUMENTO_REQUEST, REMOVE_DOCUMENTO_SUCCESS, REMOVE_DOCUMENTO_FAILURE, UPDATE_DOCUMENTO_REQUEST, UPDATE_DOCUMENTO_SUCCESS, UPDATE_DOCUMENTO_FAILURE, UPDATE_COMUNICADO_FAILURE, REMOVE_COMUNICADO_FAILURE, REMOVE_COMUNICADO_SUCCESS, UPDATE_COMUNICADO_SUCCESS, UPDATE_COMUNICADO_REQUEST, REMOVE_COMUNICADO_REQUEST, ADD_HISTORICOACAO_FAILURE, UPDATE_HISTORICOACAO_FAILURE, REMOVE_HISTORICOACAO_FAILURE, REMOVE_HISTORICOACAO_SUCCESS, UPDATE_HISTORICOACAO_SUCCESS, ADD_HISTORICOACAO_SUCCESS, ADD_HISTORICOACAO_REQUEST, UPDATE_HISTORICOACAO_REQUEST, REMOVE_HISTORICOACAO_REQUEST, REMOVE_PLANOACAO_FAILURE, UPDATE_PLANOACAO_FAILURE, ADD_PLANOACAO_FAILURE, UPDATE_PLANOACAO_SUCCESS, REMOVE_PLANOACAO_SUCCESS, ADD_PLANOACAO_SUCCESS, REMOVE_PLANOACAO_REQUEST, UPDATE_PLANOACAO_REQUEST, ADD_PLANOACAO_REQUEST, ADD_SOLICITACAO_FAILURE, UPDATE_SOLICITACAO_FAILURE, REMOVE_SOLICITACAO_FAILURE, ADD_SOLICITACAO_SUCCESS, REMOVE_SOLICITACAO_SUCCESS, UPDATE_SOLICITACAO_SUCCESS, ADD_SOLICITACAO_REQUEST, UPDATE_SOLICITACAO_REQUEST, REMOVE_SOLICITACAO_REQUEST, REMOVE_RESPOSTASOLICITACAO_FAILURE, UPDATE_RESPOSTASOLICITACAO_FAILURE, ADD_RESPOSTASOLICITACAO_FAILURE, ADD_RESPOSTASOLICITACAO_SUCCESS, REMOVE_RESPOSTASOLICITACAO_SUCCESS, UPDATE_RESPOSTASOLICITACAO_SUCCESS, ADD_RESPOSTASOLICITACAO_REQUEST, UPDATE_RESPOSTASOLICITACAO_REQUEST, REMOVE_RESPOSTASOLICITACAO_REQUEST, LOGINEMPRESA_REQUEST, LOGINEMPRESA_SUCCESS, LOGINEMPRESA_FAILURE, LOGOUTEMPRESA_REQUEST, LOGOUTEMPRESA_SUCCESS, SEARCH_EMPRESAS_REQUEST, SEARCH_EMPRESAS_SUCCESS, SEARCH_EMPRESAS_FAILURE, SEARCH_GRUPOS_REQUEST, SEARCH_GRUPOS_SUCCESS, SEARCH_GRUPOS_FAILURE, SHOW_SOLICITACAO_REQUEST, SHOW_SOLICITACAO_SUCCESS, SHOW_SOLICITACAO_FAILURE, LISTAR_SOLICITACAO_REQUEST, LISTAR_SOLICITACAO_SUCCESS } from './actions';


const initialState = {
  isAuthenticated: false,
  token: null,
  grupoLogado: null,
  error: null,
  empresa: null,
  grupo: null,
  grupos: [],
  solicitacao: null,
  solicitacoes: [],
  empresas: [],
  loading: false,
  page: 1
};

const empresaReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SOLICITACAO_REQUEST:
    case SHOW_GRUPOS_REQUEST:
    case SHOW_EMPRESAS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SHOW_SOLICITACAO_SUCCESS:
      return {
        ...state,
        solicitacao: action.payload.solicitacao,
        loading: false,
      };
    case SHOW_GRUPOS_SUCCESS:
      return {
        ...state,
        grupo: action.payload,
        loading: false,
      };
    case SHOW_EMPRESAS_SUCCESS:
      return {
        ...state,
        empresa: action.payload,
        loading: false,
      };
    case SHOW_SOLICITACAO_FAILURE:
    case SHOW_GRUPOS_FAILURE:
    case SHOW_EMPRESAS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LISTAR_GRUPOS_REQUEST:
      return {
        ...state,
        page: action.payload.page,
        loading: true,
      };
    case LISTAR_EMPRESAS_REQUEST:
      return {
        ...state,
        page: action.payload.page,
        loading: true,
      };
    case LISTAR_SOLICITACAO_REQUEST:
      return {
        ...state,
        page: action.payload.page,
        loading: true,
      };
    case SEARCH_GRUPOS_REQUEST:
    case SEARCH_EMPRESAS_REQUEST:
    case ADD_DOCUMENTO_REQUEST:
    case UPDATE_DOCUMENTO_REQUEST:
    case REMOVE_DOCUMENTO_REQUEST:
    case ADD_COMUNICADO_REQUEST:
    case UPDATE_COMUNICADO_REQUEST:
    case REMOVE_COMUNICADO_REQUEST:
    case ADD_HISTORICOACAO_REQUEST:
    case UPDATE_HISTORICOACAO_REQUEST:
    case REMOVE_HISTORICOACAO_REQUEST:
    case ADD_PLANOACAO_REQUEST:
    case UPDATE_PLANOACAO_REQUEST:
    case REMOVE_PLANOACAO_REQUEST:
    case ADD_SOLICITACAO_REQUEST:
    case UPDATE_SOLICITACAO_REQUEST:
    case REMOVE_SOLICITACAO_REQUEST:
    case REMOVE_PLANOACAO_REQUEST:
    case ADD_RESPOSTASOLICITACAO_REQUEST:
    case UPDATE_RESPOSTASOLICITACAO_REQUEST:
    case REMOVE_RESPOSTASOLICITACAO_REQUEST:
    case CRIAR_GRUPOS_REQUEST:
    case CRIAR_EMPRESAS_REQUEST:
    case UPDATE_GRUPOS_REQUEST:
    case UPDATE_EMPRESAS_REQUEST:
    case DELETE_GRUPOS_REQUEST:
    case DELETE_EMPRESAS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_GRUPOS_SUCCESS:
    case LISTAR_GRUPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        grupos: action.payload,
        error: '',
      };

    case SEARCH_EMPRESAS_SUCCESS:
    case LISTAR_EMPRESAS_SUCCESS:
      return {
        ...state,
        loading: false,
        empresas: action.payload,
        error: '',
      };
    case LISTAR_SOLICITACAO_SUCCESS:
      return {
        ...state,
        loading: false,
        solicitacoes: action.payload,
        error: '',
      };
    case CRIAR_GRUPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        grupos: [...state.grupos, action.payload],
        error: '',
      };
    case CRIAR_EMPRESAS_SUCCESS:
      return {
        ...state,
        loading: false,
        empresas: [...state.empresas, action.payload],
        error: '',
      };
    case ADD_DOCUMENTO_SUCCESS:
    case REMOVE_DOCUMENTO_SUCCESS:
    case UPDATE_DOCUMENTO_SUCCESS:
    case ADD_COMUNICADO_SUCCESS:
    case REMOVE_COMUNICADO_SUCCESS:
    case UPDATE_COMUNICADO_SUCCESS:
    case ADD_HISTORICOACAO_SUCCESS:
    case REMOVE_HISTORICOACAO_SUCCESS:
    case UPDATE_HISTORICOACAO_SUCCESS:
    case ADD_PLANOACAO_SUCCESS:
    case REMOVE_PLANOACAO_SUCCESS:
    case UPDATE_PLANOACAO_SUCCESS:
    case ADD_SOLICITACAO_SUCCESS:
    case REMOVE_SOLICITACAO_SUCCESS:
    case UPDATE_SOLICITACAO_SUCCESS:
    case UPDATE_PLANOACAO_SUCCESS:
    case UPDATE_EMPRESAS_SUCCESS:
      var index = state.empresas.findIndex((empresa) => empresa._id === action.payload._id);
      state.empresas[index] = action.payload;

      var indexGrupoLogado = state.grupoLogado.empresas.findIndex((empresa) => empresa._id === action.payload._id);


      state.grupoLogado.empresas[indexGrupoLogado] = action.payload;
      return {
        ...state,
        loading: false,
        empresas: [...state.empresas],
        grupoLogado: { ...state.grupoLogado },
        error: '',
      };
    case UPDATE_GRUPOS_SUCCESS:
      var index = state.grupos.findIndex((grupo) => grupo._id === action.payload._id);
      state.grupos[index] = action.payload;
      return {
        ...state,
        loading: false,
        grupos: [...state.grupos],
        error: '',
      };
    case DELETE_EMPRESAS_SUCCESS:
      var index = state.empresas.findIndex((empresa) => empresa._id === action.payload);
      return {
        ...state,
        loading: false,
        empresas: [
          ...state.empresas.slice(0, index),
          ...state.empresas.slice(index + 1)
        ],
        error: '',
      };
    case REMOVE_RESPOSTASOLICITACAO_SUCCESS:
    case UPDATE_RESPOSTASOLICITACAO_SUCCESS:
    case ADD_RESPOSTASOLICITACAO_SUCCESS:
      console.log(action.payload.solicitacoes[0])
      var index = state.solicitacoes.findIndex((solicitacao) => solicitacao?.solicitacao._id === action.payload.solicitacoes[0]?._id);
      state.solicitacoes[index].solicitacao = action.payload.solicitacoes[0];
      state.solicitacao = action.payload.solicitacoes[0];
      return {
        ...state,
        loading: false,
        solicitacoes: [...state.solicitacoes],
        solicitacao: { ...state.solicitacao },
        error: '',
      };
    case UPDATE_DOCUMENTO_FAILURE:
    case REMOVE_DOCUMENTO_FAILURE:
    case ADD_DOCUMENTO_FAILURE:
    case ADD_COMUNICADO_FAILURE:
    case UPDATE_COMUNICADO_FAILURE:
    case REMOVE_COMUNICADO_FAILURE:
    case ADD_HISTORICOACAO_FAILURE:
    case UPDATE_HISTORICOACAO_FAILURE:
    case REMOVE_HISTORICOACAO_FAILURE:
    case ADD_PLANOACAO_FAILURE:
    case UPDATE_PLANOACAO_FAILURE:
    case REMOVE_PLANOACAO_FAILURE:
    case ADD_SOLICITACAO_FAILURE:
    case UPDATE_SOLICITACAO_FAILURE:
    case REMOVE_SOLICITACAO_FAILURE:
    case REMOVE_PLANOACAO_FAILURE:
    case ADD_RESPOSTASOLICITACAO_FAILURE:
    case UPDATE_RESPOSTASOLICITACAO_FAILURE:
    case REMOVE_RESPOSTASOLICITACAO_FAILURE:
    case SEARCH_GRUPOS_FAILURE:
    case LISTAR_GRUPOS_FAILURE:
    case LISTAR_EMPRESAS_FAILURE:
    case SEARCH_EMPRESAS_FAILURE:
    case CRIAR_EMPRESAS_FAILURE:
    case UPDATE_EMPRESAS_FAILURE:
    case DELETE_EMPRESAS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGINEMPRESA_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        error: null,
        loading: true,
      };
    case LOGINEMPRESA_SUCCESS:
      action.payload.history(`/areadocliente`);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        grupoLogado: action.payload.grupo,
        error: null,
        loading: false,
      };
    case LOGINEMPRESA_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        grupoLogado: null,
        error: action.payload.message,
        loading: false,
      };
    case LOGOUTEMPRESA_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case LOGOUTEMPRESA_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        grupoLogado: null,
        error: '',
        loading: false,
      };
    default:
      return state;
  }
};

export default empresaReducer;
