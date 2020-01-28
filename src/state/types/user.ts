export interface UserState {
  current?: User;
  error?: string;
}

export interface User {
  username: string;
  avatar: string;
}
