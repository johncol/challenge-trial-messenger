import { RootState } from './../reducers';
import { UserState } from './../types/user';

export const userSelector = (state: RootState): UserState => {
  return state.user;
};
