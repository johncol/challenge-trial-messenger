import { combineReducers } from '@reduxjs/toolkit';

import { userReducer as user } from './user';
import { friendsReducer as friends } from './friends';

export const rootReducer = combineReducers({
  user,
  friends
});

export type RootState = ReturnType<typeof rootReducer>;
