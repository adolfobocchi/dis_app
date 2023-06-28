import { all } from "redux-saga/effects";
import usuario from './Usuario/sagas';
import area from './Area/sagas';
import setor from './Setor/sagas';
import funcao from './Funcao/sagas';
import processo from './Processo/sagas';
import recurso from './Recurso/sagas';
import risco from './Risco/sagas';
import causa from './Causa/sagas';
import medida from './Medida/sagas';
import probabilidade from './Probabilidade/sagas';
import severidade from './Severidade/sagas';
import nivelrisco from './NivelRisco/sagas';
import proposta from './Proposta/sagas';

export default function* rootSaga() {
    return yield all([
        usuario,
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
    ]);
};