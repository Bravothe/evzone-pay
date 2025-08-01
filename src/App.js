// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppProviders from './providers/AppProviders';
import PublicLayout from './layouts/PublicLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import Dashboard from './pages/Dashboard';

import PaymentsPage from './features/payments/pages/PaymentsPage';

// My Wallet feature pages
import WalletOverview   from './features/my-wallet/pages/WalletOverview';
import ManageFunds      from './features/my-wallet/pages/ManageFunds';
import ActivityBalances from './features/my-wallet/pages/ActivityBalances';

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
            <Route path="/"                  element={<Dashboard />} />
            <Route path="/payments"          element={<PaymentsPage />} />

            {/* My Wallet feature */}
            <Route path="/wallets/wallet-overview"                   element={<WalletOverview />} />
            <Route path="/wallets/manage-funds"      element={<ManageFunds />} />
            <Route path="/wallets/activity-balances" element={<ActivityBalances />} />

            {/* you can add more protected routes here */}
          </Route>
        </Routes>
      </Router>
    </AppProviders>
  );
}
