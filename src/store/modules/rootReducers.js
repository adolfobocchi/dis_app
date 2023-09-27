import { combineReducers } from 'redux';
import usuario from './Usuario/reducers';
import confirmation from './Confirmation/reducers';
import information from './Information/reducers';
import area from './Area/reducers';
import setor from './Setor/reducers';
import funcao from './Funcao/reducers';
import perigo from './Perigo/reducers';
import monitoramento from './Monitoramento/reducers';
import risco from './Risco/reducers';
import causa from './Causa/reducers';
import medida from './Medida/reducers';
import probabilidade from './Probabilidade/reducers';
import severidade from './Severidade/reducers';
import nivelrisco from './NivelRisco/reducers';
import planoAcao from './PlanoAcao/reducers';
import dis from './Dis/reducers';
import atividade from './Atividade/reducers'
import empresa from './Empresa/reducers'
import video from './Video/reducers'

const rootReducer = combineReducers({
    usuario,
    confirmation,
    information,
    area,
    setor,
    funcao,
    perigo,
    monitoramento,
    risco,
    causa,
    medida,
    probabilidade,
    severidade,
    nivelrisco,
    planoAcao,
    dis,
    atividade,
    empresa,
    video,
})

export default rootReducer;