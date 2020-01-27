export interface UserState {
  user?: User;
  error?: string;
}

export interface User {
  username: string;
}
