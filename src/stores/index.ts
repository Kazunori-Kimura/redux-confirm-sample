import { combineReducers, configureStore, getDefaultMiddleware, Store } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import message from './message';

const rootReducer = combineReducers({
    message: message.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type ReduxStore = Store<RootState>;

const createStore = (): ReduxStore => {
    const middlewares = [...getDefaultMiddleware()];

    if (process.env.NODE_ENV === 'development') {
        middlewares.push(logger);
    }

    const store = configureStore({
        reducer: rootReducer,
        middleware: middlewares,
        devTools: process.env.NODE_ENV === 'development',
    });

    return store;
};

export default createStore;
