import { combineReducers } from 'redux';
import usuario from './Usuario/reducers';
import confirmation from './Confirmation/reducers';
import area from './Area/reducers';
import setor from './Setor/reducers';
import funcao from './Funcao/reducers';
import processo from './Processo/reducers';
import recurso from './Recurso/reducers';
import risco from './Risco/reducers';
import causa from './Causa/reducers';
import medida from './Medida/reducers';
import probabilidade from './Probabilidade/reducers';
import severidade from './Severidade/reducers';
import nivelrisco from './NivelRisco/reducers';
import proposta from './Proposta/reducers';
import dis from './Dis/reducers';
import atividade from './Atividade/reducers'

const rootReducer = combineReducers({
    usuario,
    confirmation,
    area,
    setor,
    funcao,
    processo,
    recurso,
    risco,
    causa,
    medida,
    probabilidade,
    severidade,
    nivelrisco,
    proposta,
    dis,
    atividade,
})

export default rootReducer;