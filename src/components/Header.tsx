import React from 'react';

const Header = () => {
  return (
    <header>
      <button className="settings">Настройки</button>
      <div className="theme-switcher">
        <input id="switcher" type="checkbox" />
        <label htmlFor="switcher"></label>
      </div>
      <div className="connection"></div>
      <button className="exit">Выйти</button>
    </header>
  );
};

export default Header;
