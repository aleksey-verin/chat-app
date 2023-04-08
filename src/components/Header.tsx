import React, { useState } from 'react';
import PopupSettings from './PopupSettings';

const Header = () => {
  const [popupOpen, setPopupOpen] = useState(false);

  const handlePopupOpen = () => {
    setPopupOpen(true);
  };
  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  return (
    <>
      <header>
        <button onClick={handlePopupOpen} className="settings">
          Настройки
        </button>
        <div className="theme-switcher">
          <input id="switcher" type="checkbox" />
          <label htmlFor="switcher"></label>
        </div>
        <div className="connection"></div>
        <button className="exit">Выйти</button>
      </header>
      {popupOpen && <PopupSettings handlePopupClose={handlePopupClose} />}
    </>
  );
};

export default Header;
