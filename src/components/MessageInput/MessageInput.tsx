import React, { useState, useEffect } from 'react';
import { Button, InputGroup, InputGroupAddon, FormInput, Form } from 'shards-react';

import { Friend } from './../../state/types';

interface Props {
  onSubmit: (message: string) => void;
  friend: Friend;
}

type MessagesMap = { [username: string]: string };

export const MessageInput = ({ onSubmit, friend }: Props) => {
  const [messagesMap, setMessagesMap] = useState(({} as any) as MessagesMap);

  const messageForCurrentFriend = (): string => {
    return messagesMap[friend.username] ?? '';
  };

  const setMessageForCurrentFriend = (message: string): void => {
    setMessagesMap((current: MessagesMap) => ({
      ...current,
      [friend.username]: message
    }));
  };

  const updateMessage = (event: any): void => {
    setMessageForCurrentFriend(event.target.value);
  };

  useEffect(giveFocusToInput, [friend]);

  const handleSubmit = (event: any): void => {
    event.preventDefault();
    const message: string = messageForCurrentFriend().trim();
    if (message.length > 0) {
      onSubmit(message);
      setMessageForCurrentFriend('');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="message-input">
      <InputGroup>
        <FormInput placeholder="Say hello.." value={messageForCurrentFriend()} onChange={updateMessage} />
        <InputGroupAddon type="append">
          <Button theme="primary">Send</Button>
        </InputGroupAddon>
      </InputGroup>
    </Form>
  );
};

const giveFocusToInput = (): void => {
  const input: HTMLInputElement = document.querySelector('.message-input .form-control') as HTMLInputElement;
  input.focus();
};
