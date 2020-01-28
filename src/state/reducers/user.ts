import { createReducer, AnyAction } from '@reduxjs/toolkit';

import { UserState, User } from './../types/user';
import { UserActionType } from './../actions/user';

const initialState: UserState = {
  current: undefined
};

export const userReducer = createReducer<UserState>(initialState, {
  [UserActionType.LOGIN_SUCCEEDED]: (_state: UserState, action: AnyAction) => {
    const current: User = action.payload;
    return { current };
  },

  [UserActionType.LOGIN_FAILED]: (_state: UserState, action: AnyAction) => {
    const error: string = action.payload;
    return { error };
  },

  [UserActionType.LOGOUT]: (_state: UserState, _action: AnyAction) => {
    return {};
  }
});
