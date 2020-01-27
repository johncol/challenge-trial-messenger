export type FriendsState = { [username: string]: Friend };

export interface Friend {
  username: string;
  latestInteraction: number;
}
