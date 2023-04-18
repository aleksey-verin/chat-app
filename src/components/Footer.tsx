import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import ImgSend from './image/ImgSend';

interface FooterProps {
  sendMessage: (text: string) => void;
}

const defaultValue = '';

const Footer = ({ sendMessage }: FooterProps) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    event?.preventDefault();
    if (!inputValue.trim().length) return;
    sendMessage(inputValue);
    setInputValue(defaultValue);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (
        event.key === 'Enter' &&
        !event.shiftKey &&
        document.activeElement === textareaRef.current
      ) {
        handleSubmit();
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [inputValue]);

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setInputValue(textarea.value);
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight + 2}px`;
  };

  return (
    <footer>
      <form onSubmit={handleSubmit} className="send-message" id="sendMessage">
        <textarea
          className="textarea-message"
          placeholder="type your message here.."
          autoComplete="off"
          autoFocus
          rows={1}
          value={inputValue}
          onChange={handleTextarea}
          form="sendMessage"
          ref={textareaRef}></textarea>
        <button className="btn-send" type="submit">
          <ImgSend />
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
