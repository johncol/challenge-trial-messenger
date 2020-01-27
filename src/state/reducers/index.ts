import { combineReducers } from '@reduxjs/toolkit';

import { userReducer as user } from './user';
import { friendsReducer as friends } from './friends';
import { messagesReducer as messages } from './messages';

export const rootReducer = combineReducers({
  user,
  friends,
  messages
});

export type RootState = ReturnType<typeof rootReducer>;
