import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, CardTitle, CardSubtitle, CardBody, Alert } from 'shards-react';

import { Routes } from './../../constants/routes';
import { UserAction } from './../../state/actions/user';
import { UserState } from './../../state/types/user';
import { Selectors } from './../../state/selectors';
import { LoginForm } from './../../components/LoginForm';
import { Credentials } from './../../models/credentials';

import './login.scss';

export const Login = () => {
  const dispatch = useDispatch();
  const user: UserState = useSelector(Selectors.user);

  if (user.current) {
    return <Redirect to={Routes.CHAT} />;
  }

  const login = (credentials: Credentials) => {
    dispatch(UserAction.login(credentials));
  };

  return (
    <div className="login-screen">
      <Card>
        <CardBody>
          <CardTitle>Trial Messenger</CardTitle>
          <CardSubtitle>Login to start..</CardSubtitle>
          <LoginFailed error={user.error} />
          <LoginForm onSubmit={login} />
        </CardBody>
      </Card>
    </div>
  );
};

const LoginFailed = ({ error }: Partial<UserState>) => {
  if (!error) {
    return null;
  }

  return <Alert theme="light">{error}</Alert>;
};
