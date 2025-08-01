// src/features/my-wallet/pages/WalletSummary.jsx
import React from 'react';

export function WalletSummary({ totalValue, delta24h, txnsToday }) {
  return (
    <div className="flex flex-wrap gap-6">
      <div>
        <div className="text-sm text-gray-600">Total Value</div>
        <div className="text-xl font-semibold text-gray-900">
          {totalValue}
        </div>
      </div>
      <div>
        <div className="text-sm text-gray-600">24h Change</div>
        <div
          className={
            delta24h.startsWith('+')
              ? 'text-xl font-semibold text-green-600'
              : 'text-xl font-semibold text-red-600'
          }
        >
          {delta24h}
        </div>
      </div>
      <div>
        <div className="text-sm text-gray-600">Transactions Today</div>
        <div className="text-xl font-semibold text-gray-900">
          {txnsToday}
        </div>
      </div>
    </div>
  );
}
