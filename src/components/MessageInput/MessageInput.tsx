import React, { useState, useEffect } from 'react';
import { Button, InputGroup, InputGroupAddon, FormInput, Form } from 'shards-react';

import { Friend } from './../../state/types';

interface Props {
  onSubmit: (message: string) => void;
  friend: Friend;
}

export const MessageInput = ({ onSubmit, friend }: Props) => {
  const [messageMap, setMessageMap] = useState(({} as any) as { [username: string]: string });

  const updateMessage = (event: any) => {
    const { value } = event.target;
    setMessageMap(current => ({
      ...current,
      [friend.username]: value
    }));
  };

  useEffect(giveFocusToInput, [friend]);

  const handleSubmit = (event: any): void => {
    event.preventDefault();
    if (messageMap[friend.username].trim().length > 0) {
      onSubmit(messageMap[friend.username].trim());
      setMessageMap(current => ({
        ...current,
        [friend.username]: ''
      }));
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="message-input">
      <InputGroup>
        <FormInput placeholder="Say hello.." value={messageMap[friend.username] || ''} onChange={updateMessage} />
        <InputGroupAddon type="append">
          <Button theme="primary">Send</Button>
        </InputGroupAddon>
      </InputGroup>
    </Form>
  );
};

const giveFocusToInput = () => {
  const input: HTMLInputElement = document.querySelector('.message-input .form-control') as HTMLInputElement;
  input.focus();
};
