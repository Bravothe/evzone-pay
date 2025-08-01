// src/features/my-wallet/pages/QuickActions.jsx
import React from 'react';
import { FiPlusCircle, FiRepeat, FiCreditCard } from 'react-icons/fi';

export function QuickActions({ onTopUp, onTransfer, onAddPayment }) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={onTopUp}
        className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded"
      >
        <FiPlusCircle className="w-5 h-5" />
        Top-Up
      </button>
      <button
        onClick={onTransfer}
        className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded"
      >
        <FiRepeat className="w-5 h-5" />
        Transfer
      </button>
      <button
        onClick={onAddPayment}
        className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded"
      >
        <FiCreditCard className="w-5 h-5" />
        Add Method
      </button>
    </div>
  );
}
