import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';

import { Routes } from './../constants/routes';
import { Login } from './../screens/login';
import { Chat } from './../screens/chat';

export const App: React.FC = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Redirect path={Routes.ROOT} to={Routes.LOGIN} />
        <Route path={Routes.LOGIN}>
          <Login />
        </Route>
        <Route path={Routes.CHAT}>
          <Chat />
        </Route>
      </BrowserRouter>
    </div>
  );
};
