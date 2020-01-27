import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardTitle, CardSubtitle, CardBody } from 'shards-react';

import { AppDispatch } from './../../../state/store';
import { UserAction } from './../../../state/actions/user';
import { RootState } from './../../../state/reducers';
import { LoginForm } from './../../LoginForm';
import { Credentials } from './../../../models/credentials';

import './login.scss';

export const Login = () => {
  const dispath: AppDispatch = useDispatch();
  const state: Partial<RootState> = useSelector((state: RootState) => {
    return state;
  });

  console.log('State:', state);

  return (
    <div className="login-screen">
      <Card>
        <CardBody>
          <CardTitle>Trial Messenger</CardTitle>
          <CardSubtitle>Login to start..</CardSubtitle>
          <LoginForm
            onSubmit={({ username }: Credentials) => {
              dispath(UserAction.login({ username }));
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
};
