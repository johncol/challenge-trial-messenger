import React, { useState } from 'react';
import { ListGroup, ListGroupItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'shards-react';

import { Friends, Friend } from './../../state/types/friends';

import './friends_list.scss';

interface Props {
  list: Friends;
  currentFriend: Friend;
  onFriendClick: (friend: Friend) => void;
}

export const FriendsList = ({ list, onFriendClick, currentFriend }: Props) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const friendToItem = (friend: Friend, Item: any) => (
    <Item
      key={friend.username}
      onClick={() => onFriendClick(friend)}
      className={classModifierFor('item', friend.username === currentFriend?.username)}
    >
      {friend.username}
    </Item>
  );

  return (
    <div className="friends-list">
      <ListGroup>{list.map(friend => friendToItem(friend, ListGroupItem))}</ListGroup>
      <Dropdown open={dropDownOpen} toggle={() => setDropDownOpen(!dropDownOpen)}>
        <DropdownToggle theme="light">{currentFriend?.username}</DropdownToggle>
        <DropdownMenu>{list.map(friend => friendToItem(friend, DropdownItem))}</DropdownMenu>
      </Dropdown>
    </div>
  );
};

const classModifierFor = (element: string, condition: boolean): string => {
  if (!condition) {
    return '';
  }

  return `${element}--current-friend`;
};
