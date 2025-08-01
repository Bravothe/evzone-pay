// src/components/header/Header.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BsList, BsBoxArrowRight } from 'react-icons/bs';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function Header({ collapsed, onToggleSidebar }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  const menuRef = useRef(null);
  const dummyUser = {
    name: 'John Doe',
    email: 'john@example.com',
    avatarUrl:
      'https://res.cloudinary.com/dlfa42ans/image/upload/v1753798918/boys_zmnhiz.jpg',
  };

  // Close dropdown on outside click or ESC
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  // Apply and persist theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const handleLogout = useCallback(() => {
    // TODO: replace with real logout logic
    console.log('Logging out…');
  }, []);

  return (
    <header
      className={`sticky top-0 w-full h-16 flex items-center backdrop-blur-md bg-white bg-opacity-75 shadow-md z-50 transition-all ${
        collapsed ? 'pl-16' : 'pl-4'
      }`}
    >
      {onToggleSidebar && (
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          className="text-gray-600 hover:text-orange-500 text-2xl mr-4"
        >
          <BsList />
        </button>
      )}

      <Link to="/" className="flex items-center flex-shrink-0">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
          <img
            src="https://res.cloudinary.com/dlfa42ans/image/upload/v1743601557/logo1_ypujra.png"
            alt="EVzone logo"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-xl font-bold text-orange-600 hover:text-orange-500 transition-transform transform hover:scale-105">
          EVzone{' '}
          <span className="italic font-extrabold text-green-600">Pay</span>
        </span>
      </Link>

      <nav className="hidden md:flex space-x-6 ml-8">
        <NavLink
          to="/discuss"
          className="text-gray-600 hover:text-orange-500 transition"
        >
          Discuss your needs
        </NavLink>
        <NavLink
          to="/docs"
          className="text-gray-600 hover:text-orange-500 transition"
        >
          System Manual
        </NavLink>
        <NavLink
          to="/ask-guide"
          className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded transition"
        >
          Ask Guide
        </NavLink>
      </nav>

      <div className="flex items-center ml-auto relative" ref={menuRef}>
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="text-gray-600 hover:text-orange-500 text-2xl mr-4"
        >
          {theme === 'light' ? <FiSun /> : <FiMoon />}
        </button>

        <div>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            aria-label="User menu"
            className="flex items-center text-gray-700 hover:text-orange-500 transition"
          >
            <img
              src={dummyUser.avatarUrl}
              alt={`Avatar of ${dummyUser.name}`}
              className="w-8 h-8 rounded-full object-cover mr-2"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/evzone.jpeg';
              }}
            />
            <span className="text-sm font-medium mr-3">
              {dummyUser.email}
            </span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg min-w-[10rem] overflow-hidden z-50">
              <button
                onClick={handleLogout}
                role="menuitem"
                className="w-full flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                <BsBoxArrowRight className="mr-2 text-lg" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
