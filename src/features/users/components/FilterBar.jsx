// src/features/users/components/FilterBar.jsx
import React from 'react';
import { Space, Input, Select, DatePicker } from 'antd';
import { FiSearch } from 'react-icons/fi';
import {
  ROLE_OPTIONS,
  STATUS_OPTIONS,
  BRANCH_OPTIONS,
  DEPT_OPTIONS,
} from '../constants';
import dayjs from 'dayjs';
import 'antd/dist/reset.css'; // or 'antd/dist/antd.css'

const { RangePicker } = DatePicker;

export default function FilterBar({
  search,     onSearch,
  role,       onRole,
  status,     onStatus,
  branch,     onBranch,
  department, onDepartment,
  dateFrom,   onDateFrom,
  dateTo,     onDateTo,
}) {
  return (
    <Space
      wrap
      size="middle"
      align="center"
      style={{ width: '100%', marginBottom: 24 }}
    >
      {/* Search Input */}
      <Input
        allowClear
        placeholder="Search…"
        prefix={<FiSearch className="text-gray-400" />}
        style={{ width: 280 }}
        value={search}
        onChange={e => onSearch(e.target.value)}
      />

      {/* Role Select */}
      <Select
        allowClear
        showSearch
        placeholder="Role"
        options={ROLE_OPTIONS}
        value={role}
        onChange={onRole}
        filterOption={(input, option) =>
          option.label.toLowerCase().includes(input.toLowerCase())
        }
        style={{ width: 180 }}
      />

      {/* Status Select */}
      <Select
        allowClear
        placeholder="Status"
        options={STATUS_OPTIONS}
        value={status}
        onChange={onStatus}
        style={{ width: 160 }}
      />

      {/* Branch Select */}
      <Select
        allowClear
        showSearch
        placeholder="Branch"
        options={BRANCH_OPTIONS}
        value={branch}
        onChange={onBranch}
        filterOption={(input, option) =>
          option.label.toLowerCase().includes(input.toLowerCase())
        }
        style={{ width: 180 }}
      />

      {/* Department Select */}
      <Select
        allowClear
        showSearch
        placeholder="Department"
        options={DEPT_OPTIONS}
        value={department}
        onChange={onDepartment}
        filterOption={(input, option) =>
          option.label.toLowerCase().includes(input.toLowerCase())
        }
        style={{ width: 180 }}
      />

      {/* Date Range Picker */}
      <RangePicker
        allowClear
        style={{ width: 280 }}
        value={
          dateFrom && dateTo
            ? [dayjs(dateFrom), dayjs(dateTo)]
            : []
        }
        format="YYYY-MM-DD"
        onChange={(_dates, dateStrings) => {
          onDateFrom(dateStrings[0]);
          onDateTo(dateStrings[1]);
        }}
      />
    </Space>
  );
}
