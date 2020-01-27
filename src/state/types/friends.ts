export interface FriendsState {
  friends: Friends;
  error?: string;
}

export interface Friend {
  username: string;
  latestInteraction: number;
}

export type Friends = Friend[];
