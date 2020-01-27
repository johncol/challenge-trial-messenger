import { createAction } from '@reduxjs/toolkit';

import { User } from './../types/user';
import { Credentials } from './../../models/credentials';
import { AppThunk, AppDispatch } from './../store';
import { authentication } from './../../services/authentication';

export enum UserActionType {
  LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL',
  LOGIN_FAILED = 'LOGIN_FAILED',
  LOGOUT = 'LOGOUT'
}

const loginSuccessful = createAction<User, UserActionType>(UserActionType.LOGIN_SUCCESSFUL);
const loginFailed = createAction<string, UserActionType>(UserActionType.LOGIN_FAILED);
const logout = createAction<void, UserActionType>(UserActionType.LOGOUT);

const login = (credentials: Credentials): AppThunk => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      const user: User | null = await authentication.login(credentials);
      if (user) {
        dispatch(loginSuccessful(user));
      } else {
        dispatch(loginFailed('Invalid username or password'));
      }
    } catch (error) {
      dispatch(loginFailed(error.message));
    }
  };
};

export const UserAction = {
  login,
  logout
};
