// src/features/users/components/UsersTable.jsx
import React from 'react';
import { Table, Avatar, Tag, Space, Tooltip, Button } from 'antd';
import { FiEdit2, FiUserCheck, FiUserX, FiTrash2 } from 'react-icons/fi';
import { format, parseISO } from 'date-fns';

export default function UsersTable({
  users,
  loading = false,
  onEdit,
  onToggle,
  onDelete,
}) {
  const columns = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, record) => (
        <Space align="center">
          <Avatar size={36} src={record.photo} />
          <div>
            <div className="font-medium text-gray-900">{record.name}</div>
            <div className="text-xs text-gray-500">{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
      sorter: (a, b) => a.branch.localeCompare(b.branch),
      render: branch => branch || '—',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      sorter: (a, b) => a.department.localeCompare(b.department),
      render: dept => dept || '—',
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: roles => (
        <Space wrap>
          {roles.map(r => (
            <Tag key={r} color="geekblue">
              {r}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Disabled', value: 'Disabled' },
        { text: 'Pending', value: 'Pending' },
      ],
      onFilter: (value, record) => record.status === value,
      render: status => (
        <Tag color={status === 'Active' ? 'green' : status === 'Disabled' ? 'red' : 'orange'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      render: date => format(parseISO(date), 'yyyy-MM-dd'),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 140,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<FiEdit2 />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Tooltip title={record.status === 'Active' ? 'Disable' : 'Enable'}>
            <Button
              type="text"
              icon={record.status === 'Active' ? <FiUserX /> : <FiUserCheck />}
              onClick={() => onToggle(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="text"
              danger
              icon={<FiTrash2 />}
              onClick={() => onDelete(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users}
      rowKey="id"
      loading={loading}
      pagination={{ pageSize: 10, showSizeChanger: true, pageSizeOptions: ['10','25','50'] }}
      scroll={{ x: 'max-content' }}
    />
  );
}
