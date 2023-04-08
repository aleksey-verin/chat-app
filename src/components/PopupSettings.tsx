import React, { useState } from 'react';
import { useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';
import {
  changeUserName,
  selectorUserAuthenticationSlice
} from '../store/reducers/userAuthenticationSlice';
import Loader from '../assets/Loader';
import Error from './Error';

const defaultValue = {
  name: ''
};

interface PopupSettingsProps {
  handlePopupClose: () => void;
}

const PopupSettings = ({ handlePopupClose }: PopupSettingsProps) => {
  const dispatch = useAppDispatch();

  const { userToken, userName, isLoading, isError, errorType } = useSelector(
    selectorUserAuthenticationSlice
  );

  const currentUserName = userName ? userName : defaultValue.name;
  const [inputNewNameValue, setInputNewNameValue] = useState(currentUserName);

  const handleNewNameForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const minLength = 3;
    if (!userToken || !inputNewNameValue) return;
    if (inputNewNameValue.length < minLength) return;
    if (inputNewNameValue === userName) return;
    dispatch(changeUserName({ userName: inputNewNameValue, token: userToken }));
    setInputNewNameValue(defaultValue.name);
  };

  return (
    <div className="popup active">
      <div className="popup-container">
        <div className="popup-title">
          <div className="title__text">Настройки</div>
          <div onClick={handlePopupClose} className="title__close">
            ╳
          </div>
        </div>
        <div className="popup-content login-code">
          <div className="content-title">Текущее имя пользователя:</div>
          <form onSubmit={handleNewNameForm} className="content-form">
            <input
              onChange={(e) => setInputNewNameValue(e.target.value)}
              value={inputNewNameValue}
              className="content-input"
              type="text"
              placeholder="Введите имя пользователя.."
            />
            <button disabled={isLoading} className="content-btn" type="submit">
              Изменить
            </button>

            {isLoading && <Loader />}
            {isError && <Error message={errorType} />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopupSettings;
