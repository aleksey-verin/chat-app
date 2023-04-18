import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectorMessagesSlice } from '../store/reducers/messagesSlice';
import Message from './Message';
import { selectorUserAuthenticationSlice } from '../store/reducers/userAuthenticationSlice';
import Loader from '../assets/Loader';

interface MainProps {
  socketMessages: iMessage[];
}

const Main = ({ socketMessages }: MainProps) => {
  const { messages, isLoading } = useSelector(selectorMessagesSlice);
  const { userEmail } = useSelector(selectorUserAuthenticationSlice);

  const [AllMessages, setAllMessages] = useState<iMessage[]>([]);

  useEffect(() => {
    if (socketMessages) {
      setAllMessages([...socketMessages, ...messages]);
    } else {
      setAllMessages(messages);
    }
  }, [socketMessages, messages]);

  return (
    <main className="">
      <div className="scroll-container">
        <div className="scroll"></div>
      </div>
      {AllMessages.map(({ _id, text, user, createdAt }) => (
        <Message
          key={_id}
          text={text}
          email={user.email}
          name={user.name}
          time={createdAt}
          type={user.email === userEmail ? 'user' : 'other'}
        />
      ))}
      {isLoading && <Loader />}
    </main>
  );
};

export default Main;
