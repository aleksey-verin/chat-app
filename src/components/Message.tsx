import { format, parseISO } from 'date-fns';
import React from 'react';
import { IUserTypes, userTypes } from '../utils/constants';

interface MessageProps {
  text: string;
  email: string;
  name: string;
  time: string;
  type: keyof IUserTypes;
}

const Message = ({ text, email, name, time, type }: MessageProps) => {
  const messageName = name ? name : email;
  const displayName = messageName.length > 20 ? `${messageName.slice(0, 20)}..` : messageName;
  const messageTime = format(parseISO(time), 'HH:mm');

  const userStyle = { display: type === userTypes.authUser ? 'none' : 'block' };

  return (
    <div className={`message ${type}`}>
      <div className="content">
        <div style={userStyle} className="message__user">
          {displayName}
        </div>
        <div className="message__content">
          <span className="message-text">{text}</span>
          <div className="message__time">{messageTime}</div>
        </div>
      </div>
    </div>
  );
};

export default Message;
