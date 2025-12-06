import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (email) => {
    return email ? email.charAt(0).toUpperCase() : 'U';
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/applications', label: 'Applications', icon: '📋' },
    { path: '/add-application', label: 'Add Job', icon: '➕' },
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
            <span className="logo-icon">📊</span>
            <div>
              <span className="logo-text">JobTrack Pro</span>
              <span className="logo-tagline">Enterprise</span>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          {/* Navigation Links - Desktop */}
          <nav className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            {user ? (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="nav-icon">{link.icon}</span>
                    {link.label}
                  </Link>
                ))}

                {/* User Menu */}
                <div className="user-menu">
                  <div className="user-info">
                    <div className="avatar">{getInitials(user.email)}</div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">
                        {user.email.split('@')[0]}
                      </span>
                      <span className="user-role">{user.role}</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout} 
                    className="btn btn-text btn-sm"
                    title="Logout"
                  >
                    <span>🚪</span>
                  </button>
                </div>
              </>
            ) : (
              <Link 
                to="/login" 
                className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="nav-icon">🔐</span>
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;