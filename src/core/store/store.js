import createSagaMiddleware from 'redux-saga';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { statisticsReducer } from '../reducers/statisticsReducer';
import { watcher } from '../sagas/watcher';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({reducer: {
        appReducer: statisticsReducer,
    },
    middleware: [...getDefaultMiddleware(),  sagaMiddleware],
});

sagaMiddleware.run(watcher);
