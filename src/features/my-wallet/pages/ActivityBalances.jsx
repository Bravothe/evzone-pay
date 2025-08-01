import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import { FiSearch, FiPlusCircle, FiArrowRightCircle, FiCreditCard } from 'react-icons/fi';
import classNames from 'classnames';
import { WalletSummary } from './WalletSummary'; // Replace with your actual path

const mockTransactions = Array.from({ length: 42 }, (_, i) => ({
  date: `2025-07-${30 - (i % 5)}`,
  status: ['Completed', 'Pending', 'Failed'][i % 3],
  fee: `$${(i * 0.5).toFixed(2)}`,
  ref: `TXN${12345 + i}`,
  amount: (i % 2 === 0 ? '+' : '-') + `$${(100 + i * 10).toFixed(2)}`,
}));

const statusOptions = [
  { value: 'All', label: 'All' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Failed', label: 'Failed' },
];

export default function ActivityBalances() {
  const totalValue = '$12,345.67';
  const delta24h = '+2.3%';
  const txnsToday = 24;

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState(statusOptions[0]);
  const [sortKey, setSortKey] = useState('date');
  const [sortAsc, setSortAsc] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    return mockTransactions
      .filter(
        (tx) =>
          (statusFilter.value === 'All' || tx.status === statusFilter.value) &&
          (tx.ref.includes(search) ||
            tx.status.toLowerCase().includes(search.toLowerCase()))
      )
      .sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return sortAsc ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortAsc ? 1 : -1;
        return 0;
      });
  }, [search, statusFilter, sortKey, sortAsc]);

  const pages = Math.ceil(filtered.length / pageSize);
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  function toggleSort(key) {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
    setPage(1);
  }

  return (
    <section className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow space-y-6 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <header
        className={classNames(
          'px-6 lg:px-8 py-4 rounded-xl backdrop-blur',
          'bg-white/70 dark:bg-gray-800/70 shadow-premium transition-all',
          'flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6'
        )}
      >
        <WalletSummary
          totalValue={totalValue}
          delta24h={delta24h}
          txnsToday={txnsToday}
        />

        {/* Right Controls */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-5">
          {/* Quick Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => alert('Top-Up clicked')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            >
              <FiPlusCircle className="w-5 h-5" />
              Top-Up
            </button>
            <button
              onClick={() => alert('Transfer clicked')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            >
              <FiArrowRightCircle className="w-5 h-5" />
              Transfer
            </button>
            <button
              onClick={() => alert('Add Payment clicked')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            >
              <FiCreditCard className="w-5 h-5" />
              Add Payment
            </button>
          </div>

          {/* Search */}
          <div className="relative w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search ref or status..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 outline-none transition"
            />
          </div>

          {/* Status Filter */}
          <div className="w-40">
            <Select
              value={statusFilter}
              onChange={(opt) => {
                setStatusFilter(opt);
                setPage(1);
              }}
              options={statusOptions}
              isSearchable={false}
              className="text-sm"
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: 'rgb(243 244 246)',
                  borderColor: state.isFocused ? '#FF7F00' : '#E5E7EB',
                  borderRadius: '0.75rem',
                  padding: '2px 6px',
                  minHeight: '38px',
                  boxShadow: state.isFocused
                    ? '0 0 0 2px rgba(255,127,0,0.4)'
                    : 'none',
                  transition: 'all 0.2s ease-in-out',
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? '#FFF2E0' : 'white',
                  color: '#111',
                  padding: '8px 12px',
                }),
                menu: (base) => ({
                  ...base,
                  borderRadius: '0.75rem',
                  overflow: 'hidden',
                  zIndex: 40,
                }),
                singleValue: (base) => ({
                  ...base,
                  color: '#111',
                }),
              }}
            />
          </div>
        </div>
      </header>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {['date', 'status', 'fee', 'ref', 'amount'].map((key) => (
                <th
                  key={key}
                  onClick={() => toggleSort(key)}
                  tabIndex={0}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-white cursor-pointer"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {pageData.map((tx, i) => (
              <tr key={i} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                <td className="px-6 py-4 whitespace-nowrap text-sm">{tx.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{tx.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{tx.fee}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{tx.ref}</td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    tx.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {tx.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <nav className="flex justify-end items-center gap-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Prev
        </button>
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Page {page} of {pages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(pages, p + 1))}
          disabled={page === pages}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Next
        </button>
      </nav>
    </section>
  );
}
