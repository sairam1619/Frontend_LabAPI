// components/Navbar.js
import React from 'react';

const Navbar = ({ user, remainingTime }) => {
  return (
    <header className="top-navbar">
      <div className="navbar-left">
        <button className="menu-toggle">☰</button>
      </div>
      
      <div className="navbar-right">
        <div className="session-timer">
          <span>{remainingTime} remaining</span>
        </div>
        <div className="notifications">
          <span className="notification-badge">3</span>
          <button className="icon-button">🔔</button>
        </div>
        <div className="user-profile">
          <span>{user || 'John Doe'}</span>
          <span className="dropdown-arrow">▼</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;