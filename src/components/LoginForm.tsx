import React, { useState } from 'react';
import { Form, FormInput, FormGroup, Button } from 'shards-react';

import { Credentials } from './../models/credentials';

interface Props {
  onSubmit: (credentials: Credentials) => void;
}

export const LoginForm = ({ onSubmit }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const updateUsername = (event: any) => setUsername(event.target.value);
  const updatePassword = (event: any) => setPassword(event.target.value);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
      <FormGroup>
        <label htmlFor="#username">Username</label>
        <FormInput id="#username" placeholder="Username" value={username} onChange={updateUsername} />
      </FormGroup>
      <FormGroup>
        <label htmlFor="#password">Password</label>
        <FormInput type="password" id="#password" placeholder="Password" value={password} onChange={updatePassword} />
      </FormGroup>
      <Button>Login</Button>
    </Form>
  );
};
