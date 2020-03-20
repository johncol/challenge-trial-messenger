import * as React from 'react';

import { Message } from './../../state/types';

import './chat_message.scss';

interface Props {
  belongsToUser: boolean;
  message: Message;
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export const ChatMessage = ({ belongsToUser, message, onClick }: Props) => {
  const classModifier: string = 'chat-message--' + (belongsToUser ? 'own' : 'other');
  return (
    <div className={`chat-message ${classModifier}`}>
      <span className="chat-message__text" onClick={onClick}>
        {message.text}
      </span>
    </div>
  );
};
