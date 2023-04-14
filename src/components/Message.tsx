import { format, parseISO } from 'date-fns';
import React from 'react';

interface MessageProps {
  text: string;
  email: string;
  name: string;
  time: string;
  type: string;
}

const Message = ({ text, email, name, time, type }: MessageProps) => {
  const messageName = name ? name : email;
  const displayName = messageName.length > 20 ? `${messageName.slice(0, 20)}..` : messageName;
  const messageTime = format(parseISO(time), 'HH:mm');

  return (
    <div className={`message ${type}`}>
      <div className="content">
        <div className="message__user">{displayName}</div>
        <div className="message__content">
          <span className="message-text">{text}</span>
          <div className="message__time">{messageTime}</div>
        </div>
      </div>
    </div>
  );
};

export default Message;
