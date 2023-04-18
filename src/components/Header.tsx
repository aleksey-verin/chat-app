import React, { useState } from 'react';
import PopupSettings from './PopupSettings';
import { useAppDispatch } from '../store/store';
import { setLogout } from '../store/reducers/userAuthenticationSlice';
import { useSelector } from 'react-redux';
import { selectorTheme, setDarkTheme, setLightTheme } from '../store/reducers/themeSlice';
import { themes } from '../utils/constants';

interface HeaderProps {
  isConnected: boolean;
  closeConnection: () => void;
}

const Header = ({ isConnected, closeConnection }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const { theme, isThemeDark } = useSelector(selectorTheme);

  const [popupOpen, setPopupOpen] = useState(false);

  const handlePopupOpen = () => {
    setPopupOpen(true);
  };
  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleConnectionSwitch = () => {
    if (isConnected) {
      closeConnection();
    } else {
      window.location.reload();
    }
  };

  const handleLogout = () => {
    dispatch(setLogout());
  };

  const changeTheme = () => {
    theme === themes.dark ? dispatch(setLightTheme()) : dispatch(setDarkTheme());
  };

  return (
    <>
      <header>
        <button onClick={handlePopupOpen} className="settings">
          Settings
        </button>
        <div className="theme-switcher">
          <input id="switcher" type="checkbox" checked={isThemeDark} onChange={changeTheme} />
          <label htmlFor="switcher"></label>
        </div>
        <div
          onClick={handleConnectionSwitch}
          className={`connection ${isConnected ? 'connect' : ''}`}></div>
        <button onClick={handleLogout} className="exit">
          Log Out
        </button>
      </header>
      {popupOpen && <PopupSettings handlePopupClose={handlePopupClose} />}
    </>
  );
};

export default Header;
