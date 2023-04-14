import React, { useEffect, useState } from 'react';
import PopupSettings from './PopupSettings';
import { useSelector } from 'react-redux';
import { selectorConnection } from '../store/reducers/connectionSlice';

interface HeaderProps {
  isConnected: boolean;
  closeConnection: () => void;
}

const Header = ({ isConnected, closeConnection }: HeaderProps) => {
  const [popupOpen, setPopupOpen] = useState(false);

  const handlePopupOpen = () => {
    setPopupOpen(true);
  };
  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleClick = () => {
    closeConnection();
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
        <div onClick={handleClick} className={`connection ${isConnected ? 'connect' : ''}`}></div>
        <button className="exit">Log Out</button>
      </header>
      {popupOpen && <PopupSettings handlePopupClose={handlePopupClose} />}
    </>
  );
};

export default Header;
