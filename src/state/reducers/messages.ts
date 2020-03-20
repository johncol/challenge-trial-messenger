import { createReducer, AnyAction } from '@reduxjs/toolkit';

import { MessagesState, Messages, Message } from './../types/messages';
import { MessagesActionType } from './../actions/messages';
import { UserActionType } from './../actions/user';

const initialState: MessagesState = {
  list: []
};

export const messagesReducer = createReducer<MessagesState>(initialState, {
  [MessagesActionType.CLEAR_MESSAGES]: (_state: MessagesState, _action: AnyAction) => {
    return {
      list: []
    };
  },

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
  },

  [MessagesActionType.ADD_MESSAGE_SUCCEEDED]: (state: MessagesState, action: AnyAction) => {
    const message: Message = action.payload;
    return {
      list: [...state.list, message]
    };
  },

  [MessagesActionType.ADD_MESSAGE_FAILED]: (state: MessagesState, action: AnyAction) => {
    const error: string = action.payload;
    return {
      ...state,
      error
    };
  },

  [MessagesActionType.DELETE_MESSAGE_SUCCEEDED]: (state: MessagesState, action: AnyAction) => {
    const messageToDelete: Message = action.payload;
    return {
      list: state.list.filter((message: Message) => message.id !== messageToDelete.id)
    };
  },

  [MessagesActionType.DELETE_MESSAGE_FAILED]: (state: MessagesState, action: AnyAction) => {
    const error: string = action.payload;
    return {
      ...state,
      error
    };
  },

  [UserActionType.LOGOUT]: (_state: MessagesState, _action: AnyAction) => {
    return {
      list: []
    };
  }
});
