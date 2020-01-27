import { createReducer, AnyAction } from '@reduxjs/toolkit';

import { UserState, User } from './../types/user';
import { UserActionType } from './../actions/user';

const initialState: UserState = {
  user: { username: 'johncol' }
};

export const userReducer = createReducer<UserState>(initialState, {
  [UserActionType.LOGIN_SUCCEEDED]: (_state: UserState, action: AnyAction) => {
    const user: User = action.payload;
    return { user };
  },

  [UserActionType.LOGIN_FAILED]: (_state: UserState, action: AnyAction) => {
    const error: string = action.payload;
    return { error };
  },

  [UserActionType.LOGOUT]: (_state: UserState, _action: AnyAction) => {
    return {};
  }
});
