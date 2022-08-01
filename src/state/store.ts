import {configureStore} from '@reduxjs/toolkit';
import localforage from 'localforage';
import {applyMiddleware, Middleware} from 'redux';
import {reducer, AppState} from './app';
import {useDispatch} from 'react-redux'

const STORAGE_STATE_KEY = 'sudoku-state'

let saveStorePromise: Promise<unknown> = Promise.resolve();

const statePersister: Middleware<{}, AppState> = (store) => next => action => {
    let result = next(action);
    const state: AppState = store.getState();
    saveStorePromise = saveStorePromise.then(() => localforage.setItem(STORAGE_STATE_KEY, state));
    return result;
};

export const loadState = async () => localforage.getItem<AppState>(STORAGE_STATE_KEY);

export function createStore(preloadedState?: AppState) {
    const storeConfig = {
        reducer,
        enhancers: [applyMiddleware(statePersister)],
        preloadedState,
    };
    return configureStore(storeConfig);
}

export type Store = ReturnType<typeof createStore>;

export type AppDispatch = Store['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
