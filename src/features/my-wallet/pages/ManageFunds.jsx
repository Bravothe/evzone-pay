// src/features/my-wallet/pages/ManageFunds.jsx
import React, { useState } from 'react';
import {
  FiCreditCard,
  FiRepeat,
  FiPlusCircle,
} from 'react-icons/fi';

export default function ManageFunds() {
  const [activeTab, setActiveTab] = useState('topup');

  const TabBtn = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex-1 text-center py-2 font-medium ${
        activeTab === id
          ? 'border-b-2 border-orange-600 text-orange-600'
          : 'text-gray-600'
      } hover:text-orange-600 transition`}
    >
      <Icon className="inline-block mr-1 w-5 h-5 align-middle" />
      <span className="align-middle">{label}</span>
    </button>
  );

  const FormWrapper = ({ children }) => (
    <form
      className="space-y-4 bg-white p-6 rounded-lg shadow mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        alert('Submitted!');
      }}
    >
      {children}
    </form>
  );

  return (
    <div className="mt-16 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Manage Funds
      </h2>
      <div className="flex border-b mb-6 mx-auto">
        <TabBtn id="topup" icon={FiPlusCircle} label="Top-Up" />
        <TabBtn id="transfer" icon={FiRepeat} label="Transfer" />
        <TabBtn
          id="addMethod"
          icon={FiCreditCard}
          label="Add Payment Method"
        />
      </div>

      {activeTab === 'topup' && (
        <FormWrapper>
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Payment Method
            </label>
            <select className="w-full border border-gray-300 rounded px-3 py-2">
              <option>Credit / Debit Card</option>
              <option>Bank Transfer</option>
              <option>Mobile Money</option>
            </select>
          </div>
          <button className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded">
            <FiPlusCircle className="w-5 h-5" />
            Top-Up Now
          </button>
        </FormWrapper>
      )}

      {activeTab === 'transfer' && (
        <FormWrapper>
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Recipient
            </label>
            <input
              type="text"
              placeholder="ID or email"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <button className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded">
            <FiRepeat className="w-5 h-5" />
            Send Transfer
          </button>
        </FormWrapper>
      )}

      {activeTab === 'addMethod' && (
        <FormWrapper>
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Cardholder Name
            </label>
            <input
              type="text"
              placeholder="Name on card"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Card Number
            </label>
            <input
              type="text"
              placeholder="XXXX XXXX XXXX XXXX"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="password"
                placeholder="•••"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
          <button className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded">
            <FiCreditCard className="w-5 h-5" />
            Add Method
          </button>
        </FormWrapper>
      )}
    </div>
  );
}
