import React from 'react';

const Message = () => {
  return (
    <div className="message">
      <div className="content">
        <div className="message__user"></div>
        <div className="message__content">
          <span className="message-text"></span>
          <div className="message__time"></div>
        </div>
      </div>
    </div>
  );
};

export default Message;
