import { createAction } from '@reduxjs/toolkit';

import { User } from './../types/user';
import { Friend } from './../types/friends';
import { Messages, Message } from './../types/messages';
import { AppThunk, AppDispatch } from './../store';
import { messages } from './../../services/messages';

export enum MessagesActionType {
  CLEAR_MESSAGES = 'CLEAR_MESSAGES',
  FETCH_MESSAGES_SUCCEEDED = 'FETCH_MESSAGES_SUCCEEDED',
  FETCH_MESSAGES_FAILED = 'FETCH_MESSAGES_FAILED',
  ADD_MESSAGE_SUCCEEDED = 'ADD_MESSAGE_SUCCEEDED',
  ADD_MESSAGE_FAILED = 'ADD_MESSAGE_FAILED'
}

const clearMessages = createAction<void, MessagesActionType>(MessagesActionType.CLEAR_MESSAGES);
const fetchMessagesSucceeded = createAction<Messages, MessagesActionType>(MessagesActionType.FETCH_MESSAGES_SUCCEEDED);
const fetchMessagesFailed = createAction<string, MessagesActionType>(MessagesActionType.FETCH_MESSAGES_FAILED);
const addMessageSucceeded = createAction<Message, MessagesActionType>(MessagesActionType.ADD_MESSAGE_SUCCEEDED);
const addMessageFailed = createAction<string, MessagesActionType>(MessagesActionType.ADD_MESSAGE_FAILED);

const fetchMessages = (user: User, friend: Friend): AppThunk => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      const messagesList: Messages = await messages.fetchTwoWaysMessages(user.username, friend.username);
      dispatch(fetchMessagesSucceeded(messagesList));
    } catch (error) {
      dispatch(fetchMessagesFailed(error.message));
    }
  };
};

const addMessage = (from: string, to: string, text: string): AppThunk => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      const message: Message = await messages.addNew(from, to, text);
      dispatch(addMessageSucceeded(message));
    } catch (error) {
      dispatch(addMessageFailed(error.message));
    }
  };
};

export const MessagesAction = {
  clearMessages,
  fetchMessages,
  addMessage
};
