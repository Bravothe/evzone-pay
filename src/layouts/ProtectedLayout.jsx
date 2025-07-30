import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import ErrorBoundary from '../shared/components/ErrorBoundary';
import styles from './ProtectedLayout.module.css';

export default function ProtectedLayout() {
  return (
    <div className={styles.app}>
      <a href="#content" className={styles.skipLink}>Skip to content</a>
      <Header />
      <div className={styles.body}>
        <Sidebar />
        <ErrorBoundary>
          <main id="content" className={styles.main}>
            <Outlet />
          </main>
        </ErrorBoundary>
      </div>
    </div>
  );
}
