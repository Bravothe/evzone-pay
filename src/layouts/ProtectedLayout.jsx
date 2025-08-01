// src/layouts/ProtectedLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import ErrorBoundary from '../shared/components/ErrorBoundary';

export default function ProtectedLayout() {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Skip link */}
      <a
        href="#content"
        className="
          absolute -top-10 left-0
          bg-orange-500 text-white
          px-2 py-1
          z-50
          focus:top-0 focus:outline-none focus:ring-2 focus:ring-orange-400
          transition-all
        "
      >
        Skip to content
      </a>

      {/* Header */}
      <Header />

      {/* Body: sidebar + main */}
      <div className="flex flex-1">
        <Sidebar />

        <ErrorBoundary>
          <main
            id="content"
            className="flex-1 p-4 bg-gray-100 dark:bg-gray-800 transition-colors"
          >
            <Outlet />
          </main>
        </ErrorBoundary>
      </div>
    </div>
  );
}
