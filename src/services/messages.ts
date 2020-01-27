import { Api } from './../constants/api';
import { Messages, Message } from './../state/types/messages';

const fetchOneWayMessages = async (from: string, to: string): Promise<Messages> => {
  const url: URL = new URL(`${Api.HOST}/messages`);
  url.searchParams.append('user', from);
  url.searchParams.append('to', to);

  const response: Response = await fetch(url.toString());
  if (response.status !== 200) {
    throw new Error('Http error');
  }

  const messages: Messages = await response.json();

  return messages;
};

const fetchTwoWaysMessages = async (username1: string, username2: string): Promise<Messages> => {
  const messagesLists: Messages[] = await Promise.all([
    fetchOneWayMessages(username1, username2),
    fetchOneWayMessages(username2, username1)
  ]);

  const messages: Messages = [...messagesLists[0], ...messagesLists[1]];

  return messages.sort(byTimestamp);
};

const byTimestamp = (message1: Message, message2: Message): number => {
  return message1.timestamp - message2.timestamp;
};

export const messages = {
  fetchOneWayMessages,
  fetchTwoWaysMessages
};
