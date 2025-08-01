// src/layouts/PublicLayout.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 bg-orange-500 text-white">
        <Link to="/" className="text-2xl font-semibold no-underline">
          EVzone Pay
        </Link>
      </header>

      <main className="flex-1 p-4">
        <Outlet />
      </main>

      <footer className="p-2 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} EVzone Africa
      </footer>
    </div>
  );
}
