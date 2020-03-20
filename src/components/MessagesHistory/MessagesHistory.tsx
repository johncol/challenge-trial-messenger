import React, { useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from 'shards-react';

import { Friend, Messages, Message } from './../../state/types';
import { ChatMessage } from './../ChatMessage';
import { MessageInput } from './../MessageInput';

import './messages_history.scss';

interface Props {
  visibleIf: boolean;
  friend: Friend;
  messages: Messages;
  onAddMessage: (message: string) => void;
  onDeleteMessage: (message: Message) => void;
}

export const MessagesHistory = ({ visibleIf, friend, messages, onAddMessage, onDeleteMessage }: Props) => {
  useEffect(scrollToBottomOfChat, [messages.length]);

  if (!visibleIf) {
    return null;
  }

  const toChatMessage = (message: Message) => (
    <ChatMessage
      key={message.id}
      message={message}
      belongsToUser={message.to === friend.username}
      onClick={() => onDeleteMessage(message)}
    />
  );

  return (
    <div className="messages-history">
      <Card>
        <CardHeader>
          Chat with <strong>{friend.username}</strong>
        </CardHeader>
        <CardBody>{messages.map(toChatMessage)}</CardBody>
        <CardFooter>
          <MessageInput onSubmit={onAddMessage} friend={friend} />
        </CardFooter>
      </Card>
    </div>
  );
};

const scrollToBottomOfChat = () => {
  document.querySelector('.messages-history .card-body')?.scrollTo({ top: 100000 });
};
