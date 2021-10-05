import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger';

const store = configureStore({
    reducer: combineReducers({}),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export type RootState = ReturnType<typeof store.getState>

export default store;