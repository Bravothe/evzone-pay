import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import styles from './PublicLayout.module.css';

export default function PublicLayout() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>EVzone Pay</Link>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} EVzone Africa
      </footer>
    </div>
  );
}
