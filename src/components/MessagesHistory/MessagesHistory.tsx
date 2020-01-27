import React, { useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, InputGroup, InputGroupAddon, FormInput } from 'shards-react';

import { Friend } from './../../state/types/friends';
import { Messages, Message } from './../../state/types/messages';
import { ChatMessage } from './../ChatMessage';

import './messages_history.scss';

interface Props {
  visibleIf: boolean;
  friend: Friend;
  messages: Messages;
}

export const MessagesHistory = ({ visibleIf, friend, messages }: Props) => {
  useEffect(scrollToBottomOfChat);

  if (!visibleIf) {
    return null;
  }

  const toChatMessage = (message: Message) => (
    <ChatMessage key={message.id} message={message} belongsToUser={message.to === friend.username} />
  );

  return (
    <div className="messages-history">
      <Card>
        <CardHeader>
          Chat with <strong>{friend.username}</strong>
        </CardHeader>
        <CardBody>{messages.map(toChatMessage)}</CardBody>
        <CardFooter>
          <InputGroup>
            <FormInput placeholder="Message.." />
            <InputGroupAddon type="append">
              <Button theme="primary">Send</Button>
            </InputGroupAddon>
          </InputGroup>
        </CardFooter>
      </Card>
    </div>
  );
};

const scrollToBottomOfChat = () => {
  document.querySelector('.messages-history .card-body')?.scrollTo({ top: 100000 });
};
