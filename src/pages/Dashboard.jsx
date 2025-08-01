// src/pages/Dashboard.jsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import {
  FiPlusCircle,
  FiRepeat,
  FiCreditCard,
  FiZap,
  FiInfo,
} from 'react-icons/fi';

const walletData = [
  { name: 'Primary', value: 42000 },
  { name: 'Savings', value: 15000 },
  { name: 'Rewards', value: 8000 },
];

const throughputData = [
  { month: 'Jan', tx: 1200 },
  { month: 'Feb', tx: 1500 },
  { month: 'Mar', tx: 1700 },
  { month: 'Apr', tx: 1400 },
  { month: 'May', tx: 1800 },
  { month: 'Jun', tx: 2000 },
];

const recentActivities = [
  'Approved payout of $5,000 to Vendor A',
  'Received deposit of $12,000 from Client X',
  'Alert: High failure rate on Wallet Y',
  'Reconciled 230 transactions',
  'New user registration: user@example.com',
];

const kpiData = [
  { label: 'System Health', value: '92%' },
  { label: 'Active Alerts', value: '3' },
  { label: 'Monthly Volume', value: '$350K' },
  { label: 'New Users', value: '124' },
];

// Extended service cards with status and details
const serviceCards = [
  {
    title: 'PayKit',
    desc: 'Launch branded checkout pages or embed SDKs across platforms in minutes.',
    action: { label: 'Learn More', url: '/paykit' },
    status: 'Activated',
    orgId: 'PK-001',
    orgName: 'PayKit Solutions',
    walletBalance: '$42,000',
    creditLimit: '$100,000',
  },
  {
    title: 'CorporatePay',
    desc: 'Centralized spending with approval flows and team-level controls.',
    action: { label: 'Learn More', url: '/corporatepay' },
    status: 'Activated',
    orgId: 'CP-002',
    orgName: 'Evzone Corp',
    walletBalance: '$150,000',
    creditLimit: '$500,000',
  },
  {
    title: 'UtilityPay',
    desc: 'Automate billing and reconciliation for large utility workflows.',
    action: { label: 'Learn More', url: '/utilitypay' },
    status: 'Not Activated',
  },
  {
    title: 'AgentHub',
    desc: 'Manage agent networks with KYC, geo-zoning, and live analytics.',
    action: { label: 'Learn More', url: '/agenthub' },
    status: 'Not Activated',
  },
  {
    title: 'CreditConnect',
    desc: 'Offer loans with automated underwriting and compliance tools.',
    action: { label: 'Learn More', url: '/creditconnect' },
    status: 'Not Activated',
  },
  {
    title: 'SchoolWallet',
    desc: 'Wallets for campuses: fund meals, manage vendors, and monitor activity.',
    action: { label: 'Register', url: '/schoolwallet/register' },
    status: 'Not Activated',
  },
];

const COLORS = ['#FF6D00', '#FFD699', '#B3E5FC'];

export default function DashboardPage() {
  return (
    <div className="w-full p-6 bg-gray-100 box-border flex flex-col gap-8">
      {/* Row 1: Quick Actions */}
      <div className="flex justify-end gap-3">
        {[
          { icon: FiPlusCircle, label: 'Top-Up' },
          { icon: FiRepeat,      label: 'Transfer' },
          { icon: FiCreditCard,  label: 'Add Payment Method' },
        ].map((action, idx) => (
          <button
            key={idx}
            className="
              flex items-center gap-2
              bg-orange-100 text-orange-700
              px-4 py-2 rounded-md font-medium
              transition transform hover:scale-105
              hover:bg-orange-500 hover:text-white
            "
          >
            <action.icon className="w-4 h-4" />
            <span>{action.label}</span>
          </button>
        ))}
      </div>

      {/* Row 2: KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-1 hover:shadow-2xl transition"
          >
            <p className="text-sm text-gray-600 mb-1">{kpi.label}</p>
            <p className="text-2xl font-semibold text-gray-900">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Row 3: Charts & Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Wallet Balances */}
        <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-1 hover:shadow-2xl transition">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Wallet Balances</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={walletData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label
                animationDuration={700}
              >
                {walletData.map((entry, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Transactions Throughput */}
        <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-1 hover:shadow-2xl transition">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Transactions Throughput</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={throughputData} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="tx" stroke="#FF6D00" strokeWidth={2} animationDuration={700} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-1 hover:shadow-2xl transition">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Recent Activity</h3>
          <ul className="flex flex-col gap-2 max-h-44 overflow-y-auto text-sm text-gray-600">
            {recentActivities.map((act, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Row 4: Sleek Extended Services */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceCards.map((svc, idx) => (
          <div
            key={idx}
            className="
              bg-white
              rounded-2xl
              shadow-lg
              p-6
              transform hover:-translate-y-1 hover:shadow-2xl
              transition
            "
          >
            <h4 className="text-xl font-semibold text-gray-900 mb-4">
              {svc.title}
            </h4>

            {svc.status === 'Activated' ? (
              <div className="space-y-2 text-gray-700 mb-6 text-sm">
                <p><span className="font-medium">Organisation ID:</span> {svc.orgId}</p>
                <p><span className="font-medium">Organisation Name:</span> {svc.orgName}</p>
                <p><span className="font-medium">Wallet Balance:</span> {svc.walletBalance}</p>
                <p><span className="font-medium">Credit Limit:</span> {svc.creditLimit}</p>
              </div>
            ) : (
              <p className="text-gray-600 mb-6 text-sm">{svc.desc}</p>
            )}

            <div className="flex gap-3">
              {svc.status === 'Not Activated' && (
                <button
                  onClick={() => {/* activate logic */}}
                  className="
                    flex-1
                    flex items-center justify-center
                    bg-green-500 hover:bg-green-600 text-white
                    px-4 py-2 rounded-lg font-medium
                    transition
                  "
                >
                  <FiZap className="w-5 h-5 mr-2" />
                  Activate
                </button>
              )}

              <a
                href={svc.action.url}
                className={`
                  flex-1 flex items-center justify-center
                  ${svc.status === 'Activated'
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'border border-gray-400 text-gray-700 hover:bg-gray-100'
                  }
                  px-4 py-2 rounded-lg font-medium
                  transition
                `}
              >
                <FiInfo className="w-5 h-5 mr-2" />
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
