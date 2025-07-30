import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../services/api';

export default function Transactions() {
  const [txns, setTxns]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    fetchTransactions()
      .then(data => {
        setTxns(data);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load transactions.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading transactions…</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (txns.length === 0) {
    return <p className="text-gray-500">No transactions available.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
      <ul className="list-disc list-inside space-y-2">
        {txns.map(t => (
          <li key={t.id} className="border-b pb-2">
            <div className="flex justify-between">
              <span><strong>{t.amount} {t.currency}</strong></span>
              <span className="text-sm text-gray-600 capitalize">{t.status}</span>
            </div>
            <div className="text-xs text-gray-500">
              {new Date(t.createdAt).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
