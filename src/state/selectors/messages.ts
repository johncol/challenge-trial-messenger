import { RootState } from './../reducers';
import { MessagesState } from './../types/messages';

export const messagesSelector = (state: RootState): MessagesState => {
  return state.messages;
};
