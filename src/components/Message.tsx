import React from 'react';

interface MessageProps {
  text: string;
  email: string;
  name: string;
  time: string;
  type: string;
}

const Message = ({ text, email, name, time, type }: MessageProps) => {
  return (
    <div className={`message ${type}`}>
      <div className="content">
        <div className="message__user">{name ? name : email}</div>
        <div className="message__content">
          <span className="message-text">{text}</span>
          <div className="message__time">12:00</div>
        </div>
      </div>
    </div>
  );
};

export default Message;
