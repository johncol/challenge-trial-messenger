import React from 'react';
import { ListGroup, ListGroupItem } from 'shards-react';

import { Friends, Friend } from './../../state/types/friends';

import './friends_list.scss';

interface Props {
  list: Friends;
}

export const FriendsList = ({ list }: Props) => {
  return (
    <div className="friends-list">
      <ListGroup>
        {list.map((friend: Friend, index: number) => (
          <ListGroupItem key={index}>{friend.username}</ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};
