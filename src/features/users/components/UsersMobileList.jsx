// src/features/users/components/UsersMobileList.jsx
import React from 'react';
import { format, parseISO } from 'date-fns';
import { FiEdit2 } from 'react-icons/fi';

export default function UsersMobileList({ users, onEdit, onToggle, onDelete }) {
  return (
    <div className="md:hidden space-y-3">
      {users.map(u => (
        <div key={u.id} className="border rounded bg-white shadow p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <img
                src={u.photo}
                alt={u.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-medium">{u.name}</div>
                <div className="text-sm text-gray-600">{u.email}</div>
              </div>
            </div>
            <button
              onClick={() => onEdit(u)}
              className="text-blue-600 hover:text-blue-800"
              aria-label={`Edit ${u.name}`}
            >
              <FiEdit2 />
            </button>
          </div>

          <div className="mt-3 text-sm space-y-1">
            <div><strong>Branch:</strong> {u.branch}</div>
            <div><strong>Department:</strong> {u.department}</div>
            <div><strong>Roles:</strong> {u.roles.join(', ')}</div>
            <div><strong>Status:</strong> {u.status}</div>
            <div><strong>Created:</strong> {format(parseISO(u.createdAt), 'yyyy-MM-dd')}</div>
          </div>

          <div className="mt-3 flex space-x-4 text-sm">
            <button
              onClick={() => onToggle(u)}
              className="text-indigo-600 hover:text-indigo-800"
            >
              {u.status === 'Active' ? 'Disable' : 'Enable'}
            </button>
            <button
              onClick={() => onDelete(u)}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
