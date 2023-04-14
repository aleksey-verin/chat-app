import React, { useState } from 'react';
import PopupSettings from './PopupSettings';
import { useAppDispatch } from '../store/store';
import { setLogout } from '../store/reducers/userAuthenticationSlice';

interface HeaderProps {
  isConnected: boolean;
  closeConnection: () => void;
}

const Header = ({ isConnected, closeConnection }: HeaderProps) => {
  const dispatch = useAppDispatch();

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

  return (
    <>
      <header>
        <button onClick={handlePopupOpen} className="settings">
          Settings
        </button>
        <div className="theme-switcher">
          <input id="switcher" type="checkbox" />
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
