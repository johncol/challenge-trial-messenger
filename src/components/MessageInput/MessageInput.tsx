import React, { useState, useEffect } from 'react';
import { Button, InputGroup, InputGroupAddon, FormInput, Form } from 'shards-react';
import { Friend } from '../../state/types/friends';

interface Props {
  onSubmit: (message: string) => void;
  friend: Friend;
}

export const MessageInput = ({ onSubmit, friend }: Props) => {
  const [message, setMessage] = useState('');
  const updateMessage = (event: any) => setMessage(event.target.value);

  useEffect(giveFocusToInput, [friend]);

  const handleSubmit = (event: any): void => {
    event.preventDefault();
    if (message.trim().length > 0) {
      onSubmit(message.trim());
      setMessage('');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="message-input">
      <InputGroup>
        <FormInput placeholder="Say hello.." value={message} onChange={updateMessage} />
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
