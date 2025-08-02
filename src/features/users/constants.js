// src/features/users/constants.js

export const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    roles: ['Finance Admin', 'Support Agent'],
    status: 'Active',
    createdAt: '2025-06-12T10:24:00Z',
    photo: 'https://i.pravatar.cc/150?u=u1',
    branch: 'Main Office',
    department: 'Finance',
  },
  {
    id: 'u2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    roles: ['Super Admin'],
    status: 'Pending',
    createdAt: '2025-07-01T15:47:00Z',
    photo: 'https://i.pravatar.cc/150?u=u2',
    branch: 'Kasese Branch',
    department: 'Operations',
  },
  // …more users
];

export const ROLE_OPTIONS = [
  'Super Admin',
  'Finance Admin',
  'Support Agent',
  'Manager',
].map(v => ({ value: v, label: v }));

export const STATUS_OPTIONS = [
  'Active',
  'Disabled',
  'Pending',
].map(v => ({ value: v, label: v }));

export const BRANCH_OPTIONS = [
  'Main Office',
  'Kasese Branch',
  'Operations HQ',
  'Sales Center',
].map(v => ({ value: v, label: v }));

export const DEPT_OPTIONS = [
  'Finance',
  'Operations',
  'Sales',
  'Support',
].map(v => ({ value: v, label: v }));
