import React from 'react';
import { useSelector } from 'react-redux';
import { selectorMessagesSlice } from '../store/reducers/messagesSlice';
import Message from './Message';
import { selectorUserAuthenticationSlice } from '../store/reducers/userAuthenticationSlice';
import Loader from '../assets/Loader';

const Main = () => {
  const { messages, isLoading } = useSelector(selectorMessagesSlice);
  const { userEmail } = useSelector(selectorUserAuthenticationSlice);

  return (
    <main className="">
      <img className="loader-messages" src="./img/loader.svg" alt="loader" />
      <div className="scroll-container">
        <div className="scroll"></div>
      </div>
      {messages.map(({ _id, text, user, createdAt }) => (
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
