// src/components/header/Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BsList, BsBoxArrowRight } from 'react-icons/bs';
import { FiSearch, FiSun, FiMoon } from 'react-icons/fi';
import styles from './Header.module.css';

export default function Header({ collapsed, onToggleSidebar }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const menuRef = useRef(null);

  const dummyUser = {
    name: 'John Doe',
    email: 'john@example.com',
    avatarUrl: 'https://res.cloudinary.com/dlfa42ans/image/upload/v1753798918/boys_zmnhiz.jpg',
  };

  // close dropdown on outside click or Escape
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  // apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const handleLogout = () => {
    // TODO: replace with real logout logic
    console.log('Logging out…');
  };

  return (
    <header
      className={`${styles.header} ${collapsed ? styles.collapsed : ''}`}
    >
      {onToggleSidebar && (
        <button
          className={styles.toggleBtn}
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <BsList />
        </button>
      )}

      <Link to="/" className={styles.logo}>
        <div className={styles.logoWrapper}>
          <img
            src="https://res.cloudinary.com/dlfa42ans/image/upload/v1743601557/logo1_ypujra.png"
            alt="EVzone logo"
            className={styles.logoImg}
          />
        </div>
        <span className={styles.logoText}>EVzone</span>
      </Link>

      <div className={styles.search}>
        <FiSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search…"
          className={styles.searchInput}
        />
      </div>

      <nav className={styles.navLinks}>
        <NavLink to="/discuss" className={styles.navLink}>
          Discuss your needs
        </NavLink>
        <NavLink to="/docs" className={styles.navLink}>
          System Manual
        </NavLink>
        <NavLink to="/ask-guide" className={styles.guideBtn}>
          Ask Guide
        </NavLink>
      </nav>

      <div className={styles.actions}>
        <button
          onClick={toggleTheme}
          className={styles.themeBtn}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <FiSun /> : <FiMoon />}
        </button>

        <div className={styles.userMenu} ref={menuRef}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className={styles.userBtn}
            aria-haspopup="true"
            aria-expanded={menuOpen}
          >
            <img
              src={dummyUser.avatarUrl}
              alt={dummyUser.name}
              onError={(e) => (e.currentTarget.src = '/evzone.jpeg')}
              className={styles.avatar}
            />
            <span className={styles.username}>
              {dummyUser.email}
            </span>
          </button>
          {menuOpen && (
            <div className={styles.dropdown}>
              <button
                onClick={handleLogout}
                className={styles.dropdownItem}
              >
                <BsBoxArrowRight
                  className={styles.dropdownIcon}
                />{' '}
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
