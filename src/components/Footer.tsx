import React, { useState } from 'react';

interface FooterProps {
  sendMessage: (text: string) => void;
}

const defaultValue = '';

const Footer = ({ sendMessage }: FooterProps) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim().length) return;
    console.log(inputValue);
    sendMessage(inputValue);
    setInputValue(defaultValue);
  };

  return (
    <footer>
      <form onSubmit={handleSubmit} className="send-message" id="sendMessage" action="">
        <textarea
          className="textarea-message"
          placeholder="message.."
          autoComplete="off"
          autoFocus
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputValue(e.target.value)}
          form="sendMessage"></textarea>
        <button className="btn-send" type="submit">
          -
        </button>
      </form>
    </footer>
  );
};

export default Footer;
