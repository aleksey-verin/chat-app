import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';
import {
  getUserIdentification,
  selectorUserIdentificationSlice
} from '../store/reducers/userIdentificationSlice';
import Error from './Error';
import {
  getUserAuthentication,
  selectorUserAuthenticationSlice
} from '../store/reducers/userAuthenticationSlice';
import Loader from '../assets/Loader';
import { getMessages } from '../store/reducers/messagesSlice';

const defaultValue = {
  email: '',
  code: ''
};

const Login = () => {
  const dispatch = useAppDispatch();
  const {
    isUserIdentified,
    isLoading: isLoadingEmail,
    isError: isErrorEmail,
    errorType: errorTypeEmail
  } = useSelector(selectorUserIdentificationSlice);
  const {
    isAuth,
    isLoading: isLoadingCode,
    isError: isErrorCode,
    errorType: errorTypeCode
  } = useSelector(selectorUserAuthenticationSlice);

  const [emailPopup, setEmailPopup] = useState(true);
  const [codePopup, setCodePopup] = useState(false);

  const handleCodeLink = () => {
    setEmailPopup(false);
    setCodePopup(true);
  };

  const handleEmailLink = () => {
    setEmailPopup(true);
    setCodePopup(false);
  };

  const [inputEmailValue, setInputEmailValue] = useState(defaultValue.email);
  const [inputCodeValue, setInputCodeValue] = useState(defaultValue.code);

  const handleEmailForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const minLength = 3;
    if (inputEmailValue.length < minLength) return;
    dispatch(getUserIdentification(inputEmailValue));
    setInputEmailValue(defaultValue.email);
  };

  const handleCodeForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const minLength = 3;
    if (inputCodeValue.length < minLength) return;
    dispatch(getUserAuthentication(inputCodeValue));
    setInputCodeValue(defaultValue.code);
  };

  useEffect(() => {
    if (isUserIdentified) {
      setEmailPopup(false);
      setCodePopup(true);
    }
  }, [isUserIdentified]);

  return (
    <div className="popup active">
      {emailPopup && (
        <div className="popup-container">
          <div className="popup-title">
            <div className="title__text">Authorization</div>
          </div>
          <div className="popup-content login-code">
            <div className="content-title">Email:</div>
            <form onSubmit={handleEmailForm} className="content-form">
              <input
                onChange={(e) => setInputEmailValue(e.target.value)}
                value={inputEmailValue}
                className="content-input"
                type="email"
                placeholder="enter email.."
              />
              <button disabled={isLoadingEmail} className="content-btn" type="submit">
                Get code
              </button>
              <a onClick={handleCodeLink} className="link-code">
                already have the code?
              </a>
              {isLoadingEmail && <Loader />}
              {isErrorEmail && <Error message={errorTypeEmail} />}
            </form>
          </div>
        </div>
      )}
      {codePopup && (
        <div className="popup-container">
          <div className="popup-title">
            <div className="title__text">Confirmation</div>
          </div>
          <div className="popup-content login-code">
            <div className="content-title">Code from email:</div>
            <form onSubmit={handleCodeForm} className="content-form">
              <input
                onChange={(e) => setInputCodeValue(e.target.value)}
                value={inputCodeValue}
                className="content-input"
                type="text"
                placeholder="enter your code.."
              />
              <button disabled={isLoadingCode} className="content-btn" type="submit">
                Enter
              </button>
              <a onClick={handleEmailLink} className="link-code">
                Did you not receive an email?
              </a>
              {isLoadingCode && <Loader />}
              {isErrorCode && <Error message={errorTypeCode} />}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
