import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../services/api';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then(data => setUsers(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Users</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <ul className="list-disc list-inside space-y-1">
          {users.map(u => (
            <li key={u.id}>
              {u.name} (<span className="text-sm text-gray-600">{u.email}</span>)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
