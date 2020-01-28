import { Api } from './../constants';
import { RemoteFriend } from './../models/remote';
import { User, Friend, Friends } from './../state/types';

const fetchFriends = async (user: User): Promise<Friend[]> => {
  const friendList1: Promise<Friends> = fetchByUserParam('user1', user.username);
  const friendList2: Promise<Friends> = fetchByUserParam('user2', user.username);
  const friendsLists: Friends[] = await Promise.all([friendList1, friendList2]);

  const friends: Friends = [...friendsLists[0], ...friendsLists[1]];

  return friends.sort(byLatestInteraction);
};

const fetchByUserParam = async (param: 'user1' | 'user2', username: string): Promise<Friends> => {
  const url: URL = new URL(`${Api.HOST}/friends`);
  url.searchParams.append(param, username);

  const response: Response = await fetch(url.toString());
  if (response.status !== 200) {
    throw new Error('Http error');
  }

  const friends: RemoteFriend[] = await response.json();

  return friends.map((remote: RemoteFriend) => ({
    username: remote[param === 'user1' ? 'user2' : 'user1'],
    latestInteraction: remote.latestInteraction
  }));
};

const byLatestInteraction = (friend1: Friend, friend2: Friend): number => {
  return friend1.latestInteraction - friend2.latestInteraction;
};

export const friends = {
  fetch: fetchFriends
};
