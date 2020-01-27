import { combineReducers } from '@reduxjs/toolkit';

import { userReducer as user } from './user';

export const rootReducer = combineReducers({
  user
});

export type RootState = ReturnType<typeof rootReducer>;
