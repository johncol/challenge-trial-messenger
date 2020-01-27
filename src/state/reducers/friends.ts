import { createReducer, AnyAction } from '@reduxjs/toolkit';

import { FriendsState, Friends } from './../types/friends';
import { FriendsActionType } from './../actions/friends';

const initialState: FriendsState = {
  friends: []
};

export const friendsReducer = createReducer<FriendsState>(initialState, {
  [FriendsActionType.FETCH_FRIENDS_SUCCEEDED]: (_state: FriendsState, action: AnyAction) => {
    const friends: Friends = action.payload;
    return { friends };
  },

  [FriendsActionType.FETCH_FRIENDS_FAILED]: (_state: FriendsState, action: AnyAction) => {
    const error: string = action.payload;
    return {
      friends: [],
      error
    };
  }
});
