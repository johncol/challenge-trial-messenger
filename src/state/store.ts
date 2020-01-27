import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { rootReducer as reducer, RootState } from './reducers';

export const store = configureStore<RootState>({ reducer });

export type AppStore = typeof store;

export type AppDispatch = typeof store.dispatch & AppThunk;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
