import React, { useEffect } from 'react';
import { Container, Row, Col } from 'shards-react';
import { useDispatch, useSelector } from 'react-redux';

import { Selectors } from './../../state/selectors';
import { FriendsState } from './../../state/types/friends';
import { FriendsAction } from './../../state/actions/friends';
import { MessagesAction } from './../../state/actions/messages';
import { UserState, User } from './../../state/types/user';
import { FriendsList } from './../../components/FriendsList';
import { MessagesHistory } from './../../components/MessagesHistory';
import { Header } from './../../components/Header';
import { UserAction } from './../../state/actions/user';
import { Redirect } from 'react-router-dom';
import { Routes } from './../../constants/routes';
import { Messages, MessagesState } from './../../state/types/messages';

import './chat.scss';

// TODO add a loaded flag to state slices
// TODO use one hole selector
export const Chat = () => {
  const dispatch = useDispatch();
  const { user }: UserState = useSelector(Selectors.user);
  const friendsState: FriendsState = useSelector(Selectors.friends);
  const { friends } = friendsState;
  const messagesState: MessagesState = useSelector(Selectors.messages);
  const { messages } = messagesState;

  useEffect(() => {
    if (user && friends.length === 0 && !friendsState.error) {
      dispatch(FriendsAction.fetchFriends(user));
    }
  });

  useEffect(() => {
    if (user && friends.length > 0 && messages.length === 0 && !messagesState.error) {
      dispatch(MessagesAction.fetchMessages(user, friends[0]));
    }
  });

  if (!user) {
    return <Redirect to={Routes.LOGIN} />;
  }

  // const messages: Messages = [
  //   { id: '1', timestamp: 1580074897224, user: 'alessandra_ambrosio', to: 'johncol', text: 'How are you doing?' },
  //   { id: '2', timestamp: 1580074897224, user: 'johncol', to: 'alessandra_ambrosio', text: 'How are you doing?' },
  //   { id: '3', timestamp: 1580074897224, user: 'johncol', to: 'alessandra_ambrosio', text: 'How are you doing?' },
  //   { id: '4', timestamp: 1580074897224, user: 'alessandra_ambrosio', to: 'johncol', text: 'How are you doing?' },
  //   { id: '10', timestamp: 1580074897224, user: 'alessandra_ambrosio', to: 'johncol', text: 'How are you doing?' },
  //   { id: '20', timestamp: 1580074897224, user: 'johncol', to: 'alessandra_ambrosio', text: 'How are you doing?' },
  //   { id: '30', timestamp: 1580074897224, user: 'johncol', to: 'alessandra_ambrosio', text: 'How are you doing?' },
  //   { id: '40', timestamp: 1580074897224, user: 'alessandra_ambrosio', to: 'johncol', text: 'How are you doing?' },
  //   { id: '11', timestamp: 1580074897224, user: 'alessandra_ambrosio', to: 'johncol', text: 'How are you doing?' },
  //   {
  //     id: '21',
  //     timestamp: 1580074897224,
  //     user: 'johncol',
  //     to: 'alessandra_ambrosio',
  //     text: 'Good!'
  //   },
  //   { id: '31', timestamp: 1580074897224, user: 'johncol', to: 'alessandra_ambrosio', text: 'How are you doing?' },
  //   { id: '41', timestamp: 1580074897224, user: 'alessandra_ambrosio', to: 'johncol', text: 'How are you doing?' }
  // ];

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
