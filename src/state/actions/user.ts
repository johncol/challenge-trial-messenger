import { createAction } from '@reduxjs/toolkit';

import { User } from './../types/user';

export enum UserActionType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT'
}

const login = createAction<User, UserActionType>(UserActionType.LOGIN);
const logout = createAction<void, UserActionType>(UserActionType.LOGOUT);

export const UserAction = {
  login,
  logout
};
