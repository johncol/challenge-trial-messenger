import React from 'react';
import { ListGroup, ListGroupItem } from 'shards-react';

import { Friends, Friend } from './../../state/types/friends';

import './friends_list.scss';

interface Props {
  list: Friends;
  onFriendClick: (friend: Friend) => void;
}

export const FriendsList = ({ list, onFriendClick }: Props) => {
  const toListGroupItem = (friend: Friend) => (
    <ListGroupItem key={friend.username} onClick={() => onFriendClick(friend)}>
      {friend.username}
    </ListGroupItem>
  );

  return (
    <div className="friends-list">
      <ListGroup>{list.map(toListGroupItem)}</ListGroup>
    </div>
  );
};
