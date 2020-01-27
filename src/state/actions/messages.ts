import { createAction } from '@reduxjs/toolkit';

import { User } from './../types/user';
import { Friend } from './../types/friends';
import { Messages } from './../types/messages';
import { AppThunk, AppDispatch } from './../store';
import { messages } from './../../services/messages';

export enum MessagesActionType {
  FETCH_MESSAGES_SUCCEEDED = 'FETCH_MESSAGES_SUCCEEDED',
  FETCH_MESSAGES_FAILED = 'FETCH_MESSAGES_FAILED'
}

const fetchMessagesSucceeded = createAction<Messages, MessagesActionType>(MessagesActionType.FETCH_MESSAGES_SUCCEEDED);
const fetchMessagesFailed = createAction<string, MessagesActionType>(MessagesActionType.FETCH_MESSAGES_FAILED);

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

export const MessagesAction = {
  fetchMessages
};
