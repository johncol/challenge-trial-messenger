export interface MessagesState {
  list: Messages;
  error?: string;
}

export interface Message {
  id: string;
  timestamp: number;
  text: string;
  user: string;
  to: string;
}

export type Messages = Message[];
