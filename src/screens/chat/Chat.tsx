import React, { useEffect } from 'react';
import { Container, Row, Col } from 'shards-react';
import { useDispatch, useSelector } from 'react-redux';

import { Selectors } from './../../state/selectors';
import { FriendsState } from './../../state/types/friends';
import { FriendsAction } from './../../state/actions/friends';
import { UserState, User } from './../../state/types/user';
import { FriendsList } from './../../components/FriendsList';
import { MessagesHistory } from './../../components/MessagesHistory';
import { Header } from './../../components/Header';
import { UserAction } from './../../state/actions/user';
import { Redirect } from 'react-router-dom';
import { Routes } from './../../constants/routes';
import { Messages } from './../../state/types/messages';

import './chat.scss';

export const Chat = () => {
  const dispatch = useDispatch();
  const { user }: UserState = useSelector(Selectors.user);
  const { friends, error }: FriendsState = useSelector(Selectors.friends);

  useEffect(() => {
    if (friends.length === 0 && !error) {
      dispatch(FriendsAction.fetchFriends(user as User));
    }
  });

  if (!user) {
    return <Redirect to={Routes.LOGIN} />;
  }

  const messages: Messages = [
    { id: '1', timestamp: 1580074897224, user: 'alessandra_ambrosio', to: 'johncol', text: 'How are you doing?' },
    { id: '2', timestamp: 1580074897224, user: 'johncol', to: 'alessandra_ambrosio', text: 'How are you doing?' },
    { id: '3', timestamp: 1580074897224, user: 'johncol', to: 'alessandra_ambrosio', text: 'How are you doing?' },
    { id: '4', timestamp: 1580074897224, user: 'alessandra_ambrosio', to: 'johncol', text: 'How are you doing?' },
    { id: '10', timestamp: 1580074897224, user: 'alessandra_ambrosio', to: 'johncol', text: 'How are you doing?' },
    { id: '20', timestamp: 1580074897224, user: 'johncol', to: 'alessandra_ambrosio', text: 'How are you doing?' },
    { id: '30', timestamp: 1580074897224, user: 'johncol', to: 'alessandra_ambrosio', text: 'How are you doing?' },
    { id: '40', timestamp: 1580074897224, user: 'alessandra_ambrosio', to: 'johncol', text: 'How are you doing?' },
    { id: '11', timestamp: 1580074897224, user: 'alessandra_ambrosio', to: 'johncol', text: 'How are you doing?' },
    {
      id: '21',
      timestamp: 1580074897224,
      user: 'johncol',
      to: 'alessandra_ambrosio',
      text: 'Good!'
    },
    { id: '31', timestamp: 1580074897224, user: 'johncol', to: 'alessandra_ambrosio', text: 'How are you doing?' },
    { id: '41', timestamp: 1580074897224, user: 'alessandra_ambrosio', to: 'johncol', text: 'How are you doing?' }
  ];

  const logout = () => dispatch(UserAction.logout());

  return (
    <Container className="chat-screen">
      <Row>
        <Col>
          <Header onLogout={logout} user={user} />
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="4">
          <FriendsList list={friends} />
        </Col>
        <Col sm="12" md="8">
          <MessagesHistory visibleIf={friends.length > 0} friend={friends[0]} messages={messages} />
        </Col>
      </Row>
    </Container>
  );
};
