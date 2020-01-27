import { createReducer, AnyAction } from '@reduxjs/toolkit';

import { MessagesState, Messages } from './../types/messages';
import { MessagesActionType } from './../actions/messages';

const initialState: MessagesState = {
  list: []
};

export const messagesReducer = createReducer<MessagesState>(initialState, {
  [MessagesActionType.FETCH_MESSAGES_SUCCEEDED]: (_state: MessagesState, action: AnyAction) => {
    const list: Messages = action.payload;
    return { list };
  },

  [MessagesActionType.FETCH_MESSAGES_FAILED]: (_state: MessagesState, action: AnyAction) => {
    const error: string = action.payload;
    return {
      list: [],
      error
    };
  }
});
