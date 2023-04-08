import React from 'react';

const Footer = () => {
  return (
    <footer>
      <form className="send-message" id="sendMessage" action="">
        <textarea
          className="textarea-message"
          placeholder="сообщение.."
          autoComplete="off"
          autoFocus
          form="sendMessage"></textarea>
        <button className="btn-send" type="submit">
          -
        </button>
      </form>
    </footer>
  );
};

export default Footer;
