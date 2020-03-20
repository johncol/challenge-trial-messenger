import React, { useState } from 'react';
import { Badge, Tooltip } from 'shards-react';

import { Message } from './../../state/types';

import './chat_message.scss';

interface Props {
  belongsToUser: boolean;
  message: Message;
  onDelete: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export const ChatMessage = (props: Props) => {
  const { belongsToUser, message } = props;
  const classModifier: string = 'chat-message--' + (belongsToUser ? 'own' : 'other');

  return (
    <div className={`chat-message ${classModifier}`}>
      <span className="chat-message__text">
        <span>{message.text}</span>
        <DeleteMessageCTA {...props} />
      </span>
    </div>
  );
};

const DeleteMessageCTA = ({ onDelete, message, belongsToUser }: Props) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);
  const placement: string = belongsToUser ? 'right' : 'left';
  return (
    <>
      <Badge outline theme="light" onClick={onDelete} id={`message-x-${message.id}`}>
        &times;
      </Badge>
      <Tooltip open={tooltipOpen} target={`#message-x-${message.id}`} toggle={toggleTooltip} placement={placement}>
        Delete message
      </Tooltip>
    </>
  );
};
