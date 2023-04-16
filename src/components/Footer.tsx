import React, { useEffect, useRef, useState } from 'react';
import ImgClose from './image/ImgClose';

interface FooterProps {
  sendMessage: (text: string) => void;
}

const defaultValue = '';

const Footer = ({ sendMessage }: FooterProps) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  const handleSubmit = () => {
    if (!inputValue.trim().length) return;
    sendMessage(inputValue);
    setInputValue(defaultValue);
  };

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSubmit();
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [inputValue]);

  return (
    <footer>
      <form className="send-message" id="sendMessage">
        <textarea
          className="textarea-message"
          placeholder="message.."
          autoComplete="off"
          autoFocus
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputValue(e.target.value)}
          form="sendMessage"></textarea>
        <button onClick={handleSubmit} className="btn-send" type="submit">
          <ImgClose />
        </button>
      </form>
    </footer>
  );
};

export default Footer;

// The classic form does not work for sending a message by pressing Enter
//
// const Footer = ({ sendMessage }: FooterProps) => {
//   const [inputValue, setInputValue] = useState(defaultValue);
//   const formRef = useRef<HTMLFormElement>(null);

//   const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!inputValue.trim().length) return;
//     sendMessage(inputValue);
//     setInputValue(defaultValue);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       formRef.current?.dispatchEvent(new Event('submit'));
//     }
//   };

//   return (
//     <footer>
//       <form
//         onSubmit={handleSubmit}
//         className="send-message"
//         id="sendMessage"
//         action=""
//         ref={formRef}>
//         <textarea
//           className="textarea-message"
//           placeholder="message.."
//           autoComplete="off"
//           autoFocus
//           value={inputValue}
//           onKeyDown={handleKeyDown}
//           onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputValue(e.target.value)}
//           form="sendMessage"></textarea>
//         <button className="btn-send" type="submit">
//           <ImgClose />
//         </button>
//       </form>
//     </footer>
//   );
// };

// export default Footer;
