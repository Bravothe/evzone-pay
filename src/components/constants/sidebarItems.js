// src/constants/sidebarItems.js

import {
  FiUserCheck,
  FiUsers,
  FiHome,
  FiCreditCard,
  FiDownload,
  FiSend,
  FiLayers,
  FiRepeat,
  FiActivity,
  FiFileText,
  FiShield,
  FiBell,
  FiSettings,
  FiClipboard,
  FiDatabase,
} from 'react-icons/fi';

const sidebarItems = [

    {
    key: 'dashboard',
    label: 'Dashboard',
    icon: FiHome,
    to: '/',
  },
  {
    key: 'auth',
    label: 'Onboarding & KYC',
    icon: FiUserCheck,
    to: '/auth',
    children: [
      { key: 'auth-individual', label: 'Individual KYC', to: '/auth/individual' },
      { key: 'auth-business',   label: 'Business KYC',   to: '/auth/business' },
      { key: 'auth-enterprise',  label: 'Enterprise KYC', to: '/auth/enterprise' },
    ],
  },
 {
  key: 'wallets',
  label: 'My Wallet',
  icon: FiDatabase,
  to: '/wallets',
  children: [
  { key: 'wallets-overview',    label: 'Overview',      to: '/wallets/wallet-overview' },
  { key: 'wallets-balances',    label: 'Balances',      to: '/wallets/activity-balances' },
  { key: 'wallet-managefunds',  label: 'Manage Funds',  to: '/wallets/manage-funds' },
],

},

  {
    key: 'payments',
    label: 'Payments',
    icon: FiCreditCard,
    to: '/payments',
    children: [
      { key: 'payments-all',      label: 'All Payments', to: '/payments' },
      { key: 'payments-deposits', label: 'Deposits',     to: '/payments/deposits' },
      { key: 'payments-funding',  label: 'Funding',      to: '/payments/funding' },
    ],
  },
  {
    key: 'payouts',
    label: 'Payouts',
    icon: FiSend,
    to: '/payouts',
    children: [
      { key: 'payouts-batch',     label: 'Batch Runs',     to: '/payouts/batch' },
      { key: 'payouts-scheduler', label: 'Scheduler',      to: '/payouts/scheduler' },
      { key: 'payouts-exceptions',label: 'Exceptions',     to: '/payouts/exceptions' },
    ],
  },
  {
    key: 'settlements',
    label: 'Settlements',
    icon: FiDownload,
    to: '/settlements',
    children: [
      { key: 'settlements-batches', label: 'Batch Viewer', to: '/settlements/batches' },
      { key: 'settlements-netting', label: 'Netting',      to: '/settlements/netting' },
    ],
  },
{
    key: 'accounts',
    label: 'Accounts',
    icon: FiLayers,
    to: '/accounts',
    children: [
      { key: 'accounts-tree',      label: 'Accounts Tree',     to: '/accounts/tree' },
      { key: 'accounts-controls',  label: 'Account Controls',  to: '/accounts/controls' },
      { key: 'accounts-settings', label: 'Settings',         to: '/accounts/settings' },
      { key: 'accounts-history',   label: 'History',           to: '/accounts/history' },
    ],
  },
  {
    key: 'transactions',
    label: 'Transactions',
    icon: FiActivity,
    to: '/transactions',
    children: [
      { key: 'tx-all',     label: 'All Transactions', to: '/transactions' },
      { key: 'tx-filters', label: 'Filters & Search', to: '/transactions/filters' },
      { key: 'tx-export',  label: 'Export',           to: '/transactions/export' },
    ],
  },
  {
    key: 'reconciliation',
    label: 'Reconciliation',
    icon: FiRepeat,
    to: '/reconciliation',
    children: [
      { key: 'recon-kanban',     label: 'Kanban Board',    to: '/reconciliation/kanban' },
      { key: 'recon-suggestions',label: 'ML Suggestions',  to: '/reconciliation/suggestions' },
      { key: 'recon-history',    label: 'Exception History', to: '/reconciliation/history' },
    ],
  },
  {
    key: 'invoices',
    label: 'Invoices',
    icon: FiFileText,
    to: '/invoices',
    children: [
      { key: 'inv-create',   label: 'Create Invoice', to: '/invoices/create' },
      { key: 'inv-editor',   label: 'Line‑Item Editor', to: '/invoices/editor' },
      { key: 'inv-dispatch', label: 'Dispatch & Preview', to: '/invoices/dispatch' },
    ],
  },
  {
    key: 'users',
    label: 'User Management',
    icon: FiUsers,
    to: '/users',
    children: [
      { key: 'users-all',      label: 'System Users',     to: '/users' },
      { key: 'users-invite',   label: 'Invitations',to: '/users/invite' },
      { key: 'users-impersonate', label: 'User Sessions', to: '/users/impersonation' },
    ],
  },
  {
    key: 'permissions',
    label: 'Permissions',
    icon: FiShield,
    to: '/permissions',
    children: [
      { key: 'permissions-matrix',    label: 'Permission Matrix', to: '/permissions/matrix' },
      { key: 'permissions-flags',     label: 'Feature Flags',     to: '/permissions/flags' },
    ],
  },
  {
    key: 'notifications',
    label: 'Notifications',
    icon: FiBell,
    to: '/notifications',
    children: [
      { key: 'notif-templates', label: 'Templates', to: '/notifications/templates' },
      { key: 'notif-channels',  label: 'Channels',    to: '/notifications/channels' },
      { key: 'notif-sla',       label: 'SLA Heatbars',to: '/notifications/sla' },
    ],
  },
  {
    key: 'integrations',
    label: 'Integrations',
    icon: FiSettings,
    to: '/integrations',
    children: [
      { key: 'int-keys',       label: 'API Keys',    to: '/integrations/keys' },
      { key: 'int-webhooks',   label: 'Webhooks',    to: '/integrations/webhooks' },
      { key: 'int-playground', label: 'Event Playground', to: '/integrations/playground' },
    ],
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: FiSettings,
    to: '/settings',
    children: [
      { key: 'settings-org',      label: 'Organization Info',     to: '/settings/org' },
      { key: 'settings-residency',label: 'Data Residency',        to: '/settings/residency' },
      { key: 'settings-timezone', label: 'Time & Formats',        to: '/settings/timezone' },
      { key: 'settings-security', label: 'MFA & SSO',             to: '/settings/security' },
    ],
  },
  {
    key: 'auditLog',
    label: 'Audit Trails',
    icon: FiClipboard,
    to: '/audit-log',
    children: [
      { key: 'audit-search', label: 'Search Logs', to: '/audit-log/search' },
      { key: 'audit-diff',   label: 'Diff Viewer', to: '/audit-log/diff' },
    ],
  },
];

export default sidebarItems;
