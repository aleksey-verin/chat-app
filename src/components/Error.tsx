import React from 'react';

interface ErrorTypes {
  message: string;
}

const Error = ({ message }: ErrorTypes) => {
  return <div style={{ textAlign: 'center', color: 'lightcoral', marginTop: 10 }}>{message}</div>;
};

export default Error;
