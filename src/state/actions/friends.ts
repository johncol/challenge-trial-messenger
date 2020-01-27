import { createAction } from '@reduxjs/toolkit';

import { User } from './../types/user';
import { Friends } from './../types/friends';
import { AppThunk, AppDispatch } from './../store';
import { friends } from './../../services/friends';

export enum FriendsActionType {
  FETCH_FRIENDS_SUCCEEDED = 'FETCH_FRIENDS_SUCCEEDED',
  FETCH_FRIENDS_FAILED = 'FETCH_FRIENDS_FAILED'
}

const fetchFriendsSucceeded = createAction<Friends, FriendsActionType>(FriendsActionType.FETCH_FRIENDS_SUCCEEDED);
const fetchFriendsFailed = createAction<string, FriendsActionType>(FriendsActionType.FETCH_FRIENDS_FAILED);

const fetchFriends = (user: User): AppThunk => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      const friendsList: Friends | null = await friends.fetch(user);
      dispatch(fetchFriendsSucceeded(friendsList));
    } catch (error) {
      dispatch(fetchFriendsFailed(error.message));
    }
  };
};

export const FriendsAction = {
  fetchFriends
};
