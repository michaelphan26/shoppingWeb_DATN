import { applyMiddleware, configureStore, createStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import Reducers from './reducers';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key:'combineReducers',
    storage: storage
}

const pReducer = persistReducer(persistConfig, Reducers );

const store = createStore(
    pReducer,
    applyMiddleware(logger)
)

const persistor = persistStore(store);

export type RootState = ReturnType<typeof Reducers>

export { persistor, store };