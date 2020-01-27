import { createReducer, AnyAction } from '@reduxjs/toolkit';

import { UserState, User } from './../types/user';
import { UserActionType } from './../actions/user';

const initialState: UserState = null;

export const userReducer = createReducer<UserState>(initialState, {
  [UserActionType.LOGIN]: (_state: UserState, action: AnyAction) => {
    const user: User = action.payload;
    return user;
  },

  [UserActionType.LOGOUT]: (_state: UserState, _action: AnyAction) => {
    return null;
  }
});
