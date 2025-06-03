import React, { useState } from 'react';
import logo from '/assets/images/logo.png';
import Button from './Button';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img className="logo" src={logo} width={50} height={50} alt="App Logo" />
        <h1>HabitFlow</h1>
      </div>

      {/* Desktop Menu */}
      <ul className="navbar-links">
        <li><Button type='button' label='Logout' className='logout-button' onClick={handleLogout}/></li>
        <li><a href="/home">Home</a></li>
        <li><a href="/habits">Habits</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
      </ul>

      {/* Hamburger Menu Button (Mobile) */}
      <button
        className="navbar-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="navbar-mobile-menu">
          <ul>
            <li><a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</a></li>
            <li><a href="#habits" onClick={() => setIsMobileMenuOpen(false)}>Habits</a></li>
            <li><a href="#dashboard" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;