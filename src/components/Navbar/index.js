import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

const Header = () => {
  const handleLogout = () => {
    // Redirect to login page after logout
  };

  return (
    <div className="header">
      <div className="header-left">
        <NavLink to="/" exact className="logo">Event Manager</NavLink>
      </div>
      <div className="header-right">
        <NavLink to="/events" className="nav-link">Events</NavLink>
        <NavLink to="/weather" className="nav-link">Weather</NavLink>
        <NavLink to="/profile" className="nav-link">Profile</NavLink>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default Header;
