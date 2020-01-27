import { createAction } from '@reduxjs/toolkit';

import { User } from './../types/user';
import { Friend } from './../types/friends';
import { AppThunk, AppDispatch } from './../store';
import { friends } from './../../services/friends';

export enum FriendsActionType {
  FETCH_FRIENDS_SUCCEEDED = 'FETCH_FRIENDS_SUCCEEDED',
  FETCH_FRIENDS_FAILED = 'FETCH_FRIENDS_FAILED'
}

const fetchFriendsSuccessful = createAction<Friend[], FriendsActionType>(FriendsActionType.FETCH_FRIENDS_SUCCEEDED);
const fetchFriendsFailed = createAction<string, FriendsActionType>(FriendsActionType.FETCH_FRIENDS_FAILED);

const fetchFriends = (user: User): AppThunk => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      const friendsList: Friend[] | null = await friends.fetch(user);
      if (user) {
        dispatch(fetchFriendsSuccessful(friendsList));
      } else {
        dispatch(fetchFriendsFailed('Could not fetch friends list'));
      }
    } catch (error) {
      dispatch(fetchFriendsFailed(error.message));
    }
  };
};

export const FriendsAction = {
  fetchFriends
};
