import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import AppProviders from './providers/AppProviders';
import PublicLayout from './layouts/PublicLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import Dashboard from './pages/Dashboard';

import PaymentsPage from './features/payments/pages/PaymentsPage';

// My Wallet pages
import WalletOverview   from './features/my-wallet/pages/WalletOverview';
import ManageFunds      from './features/my-wallet/pages/ManageFunds';
import ActivityBalances from './features/my-wallet/pages/ActivityBalances';

// Accounts pages (create these)
import AccountsTree      from './features/accounts/pages/AccountsTree';
import AccountControls   from './features/accounts/pages/AccountControls';
import AccountSettings   from './features/accounts/pages/AccountSettings';
import AccountHistory    from './features/accounts/pages/AccountHistory';


// ← NEW User Management pages
import SystemUsers      from './features/users/pages/SystemUsers';
import Invitations      from './features/users/pages/Invitations';
import UserSessions     from './features/users/pages/UserSessions';

export default function App() {
  return (
    <AppProviders>
      <Router>
        <Routes>
          {/* Public */}
          <Route element={<PublicLayout />}>
            <Route path="/login"    element={<div>Login Page</div>} />
            <Route path="/register" element={<div>Register Page</div>} />
          </Route>

          {/* Protected */}
          <Route element={<ProtectedLayout />}>
            {/* Dashboard */}
            <Route index element={<Dashboard />} />

            <Route path="payments" element={<PaymentsPage />} />

            {/* My Wallet */}
            <Route path="wallets">
              <Route path="overview"        element={<WalletOverview />} />
              <Route path="manage-funds"    element={<ManageFunds />} />
              <Route path="activity-balances" element={<ActivityBalances />} />
            </Route>

            {/* Accounts */}
            <Route path="accounts">
              <Route index element={<Navigate to="tree" replace />} />
              <Route path="tree"      element={<AccountsTree />} />
              <Route path="controls"  element={<AccountControls />} />
              <Route path="settings" element={<AccountSettings />} />
              <Route path="history"   element={<AccountHistory />} />
            </Route>


               {/* ← NEW User Management */}
            <Route path="users">
              <Route index                 element={<SystemUsers />} />
              <Route path="invite"         element={<Invitations />} />
              <Route path="impersonation"  element={<UserSessions />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </AppProviders>
  );
}
