import React, { useState, useMemo } from 'react';
import FilterBar       from '../components/FilterBar';
import UsersTable      from '../components/UsersTable';
import UsersMobileList from '../components/UsersMobileList';
import UserEditDrawer  from '../components/UserEditDrawer';
import { DUMMY_USERS } from '../constants';

export default function SystemUsers() {
  const [users, setUsers]               = useState(DUMMY_USERS);
  const [search, setSearch]             = useState('');
  const [filterRole, setFilterRole]     = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);
  const [filterBranch, setFilterBranch] = useState(null);
  const [filterDept, setFilterDept]     = useState(null);
  const [dateFrom, setDateFrom]         = useState('');
  const [dateTo, setDateTo]             = useState('');
  const [editing, setEditing]           = useState(null);

  const filtered = useMemo(() => {
    return users.filter(u => {
      if (search &&
          !(
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
          )
      ) return false;
      if (filterRole?.value && !u.roles.includes(filterRole.value))      return false;
      if (filterStatus?.value && u.status !== filterStatus.value)       return false;
      if (filterBranch?.value && u.branch !== filterBranch.value)       return false;
      if (filterDept?.value && u.department !== filterDept.value)       return false;
      const created = new Date(u.createdAt);
      if (dateFrom && created < new Date(dateFrom))                     return false;
      if (dateTo   && created > new Date(dateTo))                       return false;
      return true;
    });
  }, [
    users, search,
    filterRole, filterStatus,
    filterBranch, filterDept,
    dateFrom, dateTo,
  ]);

  const handleEdit   = u => setEditing(u);
  const handleClose  = () => setEditing(null);
  const handleSave   = updated => {
    setUsers(us => us.map(x => x.id === updated.id ? updated : x));
    setEditing(null);
  };
  const handleToggle = u => {
    setUsers(us => us.map(x =>
      x.id === u.id
        ? { ...x, status: x.status === 'Active' ? 'Disabled' : 'Active' }
        : x
    ));
  };
  const handleDelete = u => {
    if (window.confirm(`Delete user ${u.name}?`)) {
      setUsers(us => us.filter(x => x.id !== u.id));
    }
  };

  return (
    <div className="p-6">
      <FilterBar
        search={search} onSearch={setSearch}
        role={filterRole} onRole={setFilterRole}
        status={filterStatus} onStatus={setFilterStatus}
        branch={filterBranch} onBranch={setFilterBranch}
        department={filterDept} onDepartment={setFilterDept}
        dateFrom={dateFrom} onDateFrom={setDateFrom}
        dateTo={dateTo} onDateTo={setDateTo}
      />

      <UsersTable
        users={filtered}
        onEdit={handleEdit}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />

      <UsersMobileList
        users={filtered}
        onEdit={handleEdit}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />

      {/* pass `visible` prop so Drawer shows */}
      <UserEditDrawer
        user={editing}
        visible={!!editing}
        onClose={handleClose}
        onSave={handleSave}
      />
    </div>
  );
}
