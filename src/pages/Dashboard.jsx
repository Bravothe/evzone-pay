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
  FiCheckCircle,
  FiDownload,
  FiAlertTriangle,
  FiRefreshCw,
  FiUserPlus,
} from 'react-icons/fi';
import styles from './Dashboard.module.css';

const walletData = [
  { name: 'Primary Wallet', value: 42000 },
  { name: 'Savings Wallet', value: 15000 },
  { name: 'Rewards Wallet', value: 8000 },
];

const throughputData = [
  { date: 'Jan', tx: 1200 },
  { date: 'Feb', tx: 1500 },
  { date: 'Mar', tx: 1700 },
  { date: 'Apr', tx: 1400 },
  { date: 'May', tx: 1800 },
  { date: 'Jun', tx: 2000 },
];

const KPIS = [
  { label: 'System Health', value: '92%', variant: 'default' },
  { label: 'Active Alerts', value: '3', variant: 'alerts' },
  { label: 'Monthly Volume', value: '$350K', variant: 'default' },
  { label: 'New Users', value: '124', variant: 'default' },
];

const COLORS = ['#FF6D00', '#FFD699', '#B3E5FC'];

export default function Dashboard() {
  return (
    <div className={styles.container}>
      {/* KPI Widgets */}
      <div className={styles.kpiGrid}>
        {KPIS.map((kpi) => (
          <div key={kpi.label} className={styles.card}>
            <h3 className={styles.cardTitle}>{kpi.label}</h3>
            <h2
              className={
                kpi.variant === 'alerts'
                  ? styles.cardValueAlerts
                  : styles.cardValue
              }
            >
              {kpi.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Charts + Feed */}
      <div className={styles.chartsGrid}>
        {/* Wallet Balances */}
        <div className={styles.card}>
          <h3 className={styles.chartTitle}>Wallet Balances</h3>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={walletData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {walletData.map((entry, idx) => (
                    <Cell
                      key={idx}
                      fill={COLORS[idx % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transactions Throughput */}
        <div className={styles.card}>
          <h3 className={styles.chartTitle}>
            Transactions Throughput
          </h3>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart
                data={throughputData}
                margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="tx"
                  stroke="#FF6D00"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={styles.feedCard}>
          <h3 className={styles.chartTitle}>Recent Activity</h3>
          <ul className={styles.feedList}>
            <li className={styles.feedListItem}>
              <FiCheckCircle className={styles.feedIcon} />
              Approved payout of $5,000 to Vendor A
            </li>
            <li className={styles.feedListItem}>
              <FiDownload className={styles.feedIcon} />
              Received deposit of $12,000 from Client X
            </li>
            <li className={styles.feedListItem}>
              <FiAlertTriangle className={styles.feedIcon} />
              Alert: High failure rate on Wallet Y
            </li>
            <li className={styles.feedListItem}>
              <FiRefreshCw className={styles.feedIcon} />
              Reconciled 230 transactions
            </li>
            <li className={styles.feedListItem}>
              <FiUserPlus className={styles.feedIcon} />
              New user registration: user@example.com
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
