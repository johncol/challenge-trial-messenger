import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'shards-react';
import { useDispatch, useSelector } from 'react-redux';

import { Selectors } from './../../state/selectors';
import { UserAction } from './../../state/actions/user';
import { FriendsAction } from './../../state/actions/friends';
import { MessagesAction } from './../../state/actions/messages';
import { RootState } from './../../state/reducers';
import { FriendsList } from './../../components/FriendsList';
import { MessagesHistory } from './../../components/MessagesHistory';
import { Header } from './../../components/Header';
import { Routes } from './../../constants/routes';

import './chat.scss';

// TODO add a loaded flag to state slices
export const Chat = () => {
  const dispatch = useDispatch();
  const { user, friends, messages }: RootState = useSelector(Selectors.root);

  useEffect(() => {
    if (user.user && friends.friends.length === 0 && !friends.error) {
      dispatch(FriendsAction.fetchFriends(user.user));
    }
  });

  useEffect(() => {
    if (user.user && friends.friends.length > 0 && messages.messages.length === 0 && !messages.error) {
      dispatch(MessagesAction.fetchMessages(user.user, friends.friends[0]));
    }
  });

  if (!user.user) {
    return <Redirect to={Routes.LOGIN} />;
  }

  const logout = () => dispatch(UserAction.logout());

  return (
    <Container className="chat-screen">
      <Row>
        <Col>
          <Header onLogout={logout} user={user.user} />
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="4">
          <FriendsList list={friends.friends} />
        </Col>
        <Col sm="12" md="8">
          <MessagesHistory
            visibleIf={friends.friends.length > 0}
            friend={friends.friends[0]}
            messages={messages.messages}
          />
        </Col>
      </Row>
    </Container>
  );
};
