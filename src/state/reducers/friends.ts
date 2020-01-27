import { createReducer, AnyAction } from '@reduxjs/toolkit';

import { FriendsState, Friends } from './../types/friends';
import { FriendsActionType } from './../actions/friends';

const initialState: FriendsState = {
  list: []
};

export const friendsReducer = createReducer<FriendsState>(initialState, {
  [FriendsActionType.FETCH_FRIENDS_SUCCEEDED]: (_state: FriendsState, action: AnyAction) => {
    const list: Friends = action.payload;
    return { list };
  },

  [FriendsActionType.FETCH_FRIENDS_FAILED]: (_state: FriendsState, action: AnyAction) => {
    const error: string = action.payload;
    return {
      list: [],
      error
    };
  }
});
