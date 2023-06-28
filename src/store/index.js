import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './modules/rootReducers';
import rootSaga from './modules/rootSagas';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [ 'usuario']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const middleware =[sagaMiddleware]

export const store = createStore(persistedReducer, applyMiddleware(...middleware));
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
