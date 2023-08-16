import { all } from "redux-saga/effects";
import usuario from './Usuario/sagas';
import area from './Area/sagas';
import setor from './Setor/sagas';
import funcao from './Funcao/sagas';
import perigo from './Perigo/sagas';
import monitoramento from './Monitoramento/sagas';
import risco from './Risco/sagas';
import causa from './Causa/sagas';
import medida from './Medida/sagas';
import probabilidade from './Probabilidade/sagas';
import severidade from './Severidade/sagas';
import nivelrisco from './NivelRisco/sagas';
import planoAcao from './PlanoAcao/sagas';
import dis from './Dis/sagas';
import atividade from './Atividade/sagas';
import empresa from './Empresa/sagas';

export default function* rootSaga() {
    return yield all([
        usuario,
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
        empresa
    ]);
};