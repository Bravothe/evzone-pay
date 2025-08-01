import { useState, useEffect } from 'react';
import Select from 'react-select';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from 'recharts';
import {
  FiPlusCircle,
  FiRepeat,
  FiCreditCard,
} from 'react-icons/fi';

const COLORS = ['#FF7F00', '#FFD580', '#FFB347'];

const rangeOptions = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
];

const Skeleton = () => (
  <div className="animate-pulse space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
    <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded" />
    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  </div>
);

export default function WalletOverview({ onTopUp, onTransfer, onAddPaymentMethod }) {
  const [loading, setLoading] = useState(true);
  const [distributionData, setDistributionData] = useState([]);
  const [throughputData, setThroughputData] = useState([]);
  const [range, setRange] = useState(rangeOptions[0]);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setDistributionData([
        { name: 'USD', value: 5000 },
        { name: 'EUR', value: 3000 },
        { name: 'NGN', value: 2000 },
      ]);
      setThroughputData([
        { date: '2025-07-24', amount: 1200 },
        { date: '2025-07-25', amount: 1500 },
        { date: '2025-07-26', amount: 900 },
        { date: '2025-07-27', amount: 1800 },
        { date: '2025-07-28', amount: 1300 },
        { date: '2025-07-29', amount: 1700 },
        { date: '2025-07-30', amount: 1100 },
      ]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [range]);

  if (loading) return <Skeleton />;

  const totalBalance = distributionData.reduce((sum, { value }) => sum + value, 0);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow space-y-6 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Wallet Overview</h2>
          <div className="w-44">
            <Select
              value={range}
              onChange={setRange}
              options={rangeOptions}
              isSearchable={false}
              className="text-sm"
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: 'rgb(243 244 246)',
                  borderColor: state.isFocused ? '#FF7F00' : '#E5E7EB',
                  borderRadius: '0.75rem',
                  minHeight: '38px',
                  boxShadow: state.isFocused ? '0 0 0 2px rgba(255,127,0,0.4)' : 'none',
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? '#FFF2E0' : 'white',
                  color: '#111',
                }),
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Top-Up', onClick: onTopUp, Icon: FiPlusCircle },
            { label: 'Transfer', onClick: onTransfer, Icon: FiRepeat },
            { label: 'Add Method', onClick: onAddPaymentMethod, Icon: FiCreditCard },
          ].map(({ label, onClick, Icon }) => (
            <button
              key={label}
              onClick={onClick}
              className="inline-flex items-center gap-2 border border-orange-600 text-orange-600 px-4 py-2 rounded hover:bg-orange-600 hover:text-white transition"
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="flex items-baseline gap-2">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Total Balance:
        </span>
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          ${totalBalance.toLocaleString()}
        </span>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Balance Distribution */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-3">
            Balance Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={distributionData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={80}
                label={({ name, value }) =>
                  `${name}: ${((value / totalBalance) * 100).toFixed(0)}%`
                }
              >
                {distributionData.map((entry, i) => (
                  <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(val) => `$${val.toLocaleString()}`} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Transaction Throughput */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-3">
            Transaction Throughput
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={throughputData} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(amt) => `$${amt}`} />
              <Tooltip
                formatter={(val) => `$${val.toLocaleString()}`}
                labelFormatter={(lbl) => `Date: ${lbl}`}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#FF7F00"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
