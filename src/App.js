import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppProviders from './providers/AppProviders';
import PublicLayout from './layouts/PublicLayout';
import ProtectedLayout from './layouts/ProtectedLayout';

import PaymentsPage from './features/payments/pages/PaymentsPage';

export default function App() {
  return (
    <AppProviders>
      <Router>
        <Routes>
          {/* Public pages */}
          <Route element={<PublicLayout />}>
            <Route path="/login"    element={<div>Login Page</div>} />
            <Route path="/register" element={<div>Register Page</div>} />
          </Route>

          {/* Protected pages */}
          <Route element={<ProtectedLayout />}>
            <Route path="/"         element={<div>Dashboard</div>} />
            <Route path="/payments" element={<PaymentsPage />} />
            {/* you can add more protected routes here */}
          </Route>
        </Routes>
      </Router>
    </AppProviders>
  );
}
