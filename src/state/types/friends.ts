export interface FriendsState {
  list: Friends;
  error?: string;
}

export interface Friend {
  username: string;
  latestInteraction: number;
}

export type Friends = Friend[];
