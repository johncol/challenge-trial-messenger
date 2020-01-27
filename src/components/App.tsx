import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';

import { Login } from './screens/login';

export const App: React.FC = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Redirect path="/" to="/login" />
        <Route path="/login">
          <Login />
        </Route>
      </BrowserRouter>
    </div>
  );
};
