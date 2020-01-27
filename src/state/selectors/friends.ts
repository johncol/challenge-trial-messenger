import { RootState } from './../reducers';
import { FriendsState } from './../types/friends';

export const friendsSelector = (state: RootState): FriendsState => {
  return state.friends;
};
