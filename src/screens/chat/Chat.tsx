import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'shards-react';
import { useDispatch, useSelector } from 'react-redux';

import { Selectors } from './../../state/selectors';
import { UserAction, FriendsAction, MessagesAction } from './../../state/actions';
import { Friend, User, Message } from './../../state/types';
import { RootState } from './../../state/reducers/root';
import { FriendsList } from './../../components/FriendsList';
import { MessagesHistory } from './../../components/MessagesHistory';
import { Header } from './../../components/Header';
import { Routes } from './../../constants/routes';
import { Polling } from './../../constants/polling';

import './chat.scss';

export const Chat = () => {
  const dispatch = useDispatch();
  const { user, friends, messages }: RootState = useSelector(Selectors.root);
  const [currentFriend, setCurrentFriend] = useState((null as any) as Friend);

  useEffect(() => {
    if (user.current && friends.list.length === 0 && !friends.error) {
      dispatch(FriendsAction.fetchFriends(user.current));
    }
  }, [friends.list]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (user.current) {
      if (currentFriend) {
        dispatch(MessagesAction.clearMessages());
        dispatch(MessagesAction.fetchMessages(user.current, currentFriend));
        intervalId = ((user: User) => {
          return setInterval(() => {
            dispatch(MessagesAction.fetchMessages(user, currentFriend));
          }, Polling.INTERVAL);
        })(user.current);
      } else if (friends.list.length > 0) {
        setCurrentFriend(friends.list[0]);
      }
    }
    return () => clearInterval(intervalId);
  }, [currentFriend, friends.list]);

  if (!user.current) {
    return <Redirect to={Routes.LOGIN} />;
  }

  const logout = () => dispatch(UserAction.logout());

  const addMessage = (text: string) => {
    if (user.current) {
      dispatch(MessagesAction.addMessage(user.current.username, currentFriend.username, text));
    }
  };

  const deleteMessage = (message: Message) => {
    dispatch(MessagesAction.deleteMessage(message));
  };

  return (
    <Container className="chat-screen">
      <Row>
        <Col>
          <Header onLogout={logout} user={user.current} />
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="4" lg="3">
          <FriendsList list={friends.list} onFriendClick={setCurrentFriend} currentFriend={currentFriend} />
        </Col>
        <Col sm="12" md="8" lg="9">
          <MessagesHistory
            visibleIf={!!currentFriend}
            friend={currentFriend}
            messages={messages.list}
            onAddMessage={addMessage}
            onDeleteMessage={deleteMessage}
          />
        </Col>
      </Row>
    </Container>
  );
};
