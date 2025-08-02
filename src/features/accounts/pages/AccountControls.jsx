import React, { useState, useEffect, useMemo } from 'react'
import { FiSearch } from 'react-icons/fi'
import Select from 'react-select'

// Mock API functions (replace with real implementations)
async function fetchGlobalPermissions() {
  return new Promise(res => setTimeout(() => res(mockGlobal()), 500))
}
async function fetchOverrides(subAccountId) {
  return new Promise(res => setTimeout(() => res(mockOverrides()), 500))
}
async function saveOverrides(subAccountId, overrides) {
  return new Promise(res => setTimeout(res, 500))
}
function mockGlobal() {
  const roles = ['Super Admin', 'Finance Admin', 'Support Agent']
  const actions = [
    { module: 'PayKit', key: 'create_hosted_page', label: 'Create Hosted Page' },
    { module: 'PayKit', key: 'view_transactions', label: 'View Transactions' },
    { module: 'UtilityPay', key: 'generate_invoice', label: 'Generate Invoice' },
    { module: 'AgentHub', key: 'onboard_agent', label: 'Onboard Agent' }
  ]
  const perms = {}
  actions.forEach(a => {
    perms[a.key] = {}
    roles.forEach(r => { perms[a.key][r] = Math.random() > 0.5 })
  })
  return perms
}
function mockOverrides() { return {} }

export default function AccountControls({ subAccountId = 'all' }) {
  const [globalPerms, setGlobalPerms] = useState(null)
  const [overrides, setOverrides] = useState({})
  const [effective, setEffective] = useState({})
  const [moduleFilter, setModuleFilter] = useState([])
  const [searchText, setSearchText] = useState('')
  // Stabilize roles array to avoid changing dependencies
  const roles = useMemo(
    () => ['Super Admin', 'Finance Admin', 'Support Agent'],
    []
  )
  const [actionsList, setActionsList] = useState([])
  const [page, setPage] = useState(0)
  const pageSize = 10
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showRevertModal, setShowRevertModal] = useState(false)

  // Fetch global perms & overrides
  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetchGlobalPermissions(),
      subAccountId !== 'all' ? fetchOverrides(subAccountId) : Promise.resolve({})
    ])
      .then(([g, o]) => {
        setGlobalPerms(g)
        setOverrides(o)
        const acts = Object.keys(g).map(key => ({
          key,
          label: g[key].label || key.replace(/_/g, ' '),
          module: key.split('_')[0]
        }))
        setActionsList(acts)
      })
      .catch(() => setError('Failed to load permissions'))
      .finally(() => setLoading(false))
  }, [subAccountId])

  // Compute effective permissions
  useEffect(() => {
    if (!globalPerms) return
    const eff = {}
    Object.entries(globalPerms).forEach(([key, perms]) => {
      eff[key] = {}
      roles.forEach(r => {
        const hasOverride = overrides[key]?.[r] !== undefined
        eff[key][r] = hasOverride ? overrides[key][r] : globalPerms[key][r]
      })
    })
    setEffective(eff)
  }, [globalPerms, overrides, roles])

  // Toggle permission override
  const togglePermission = (actionKey, role) => {
    const current = effective[actionKey]?.[role] ?? false
    setOverrides(prev => ({
      ...prev,
      [actionKey]: { ...prev[actionKey], [role]: !current }
    }))
  }

  // Bulk toggles
  const bulkToggleModule = (moduleNames, value) => {
    setOverrides(prev => {
      const next = { ...prev }
      actionsList
        .filter(a => moduleNames.includes(a.module))
        .forEach(a => {
          next[a.key] = { ...next[a.key] }
          roles.forEach(r => { next[a.key][r] = value })
        })
      return next
    })
  }
  const bulkToggleRole = (role, value) => {
    setOverrides(prev => {
      const next = { ...prev }
      actionsList.forEach(a => {
        next[a.key] = { ...next[a.key], [role]: value }
      })
      return next
    })
  }

  // Save & revert
  const handleSave = () => {
    setLoading(true)
    saveOverrides(subAccountId, overrides)
      .then(() => setShowRevertModal(false))
      .catch(() => setError('Save failed'))
      .finally(() => setLoading(false))
  }
  const confirmRevert = () => {
    setOverrides({})
    setShowRevertModal(false)
  }

  // Module select options
  const moduleOptions = useMemo(
    () => [...new Set(actionsList.map(a => a.module))].map(m => ({ value: m, label: m })),
    [actionsList]
  )

  // Filter & paginate actions
  const filtered = actionsList.filter(a =>
    (moduleFilter.length === 0 || moduleFilter.some(opt => opt.value === a.module)) &&
    a.label.toLowerCase().includes(searchText.toLowerCase())
  )
  const pageCount = Math.ceil(filtered.length / pageSize)
  const pageActions = filtered.slice(page * pageSize, page * pageSize + pageSize)

  if (loading) return <div className='p-6 text-center'>Loading...</div>
  if (error) return <div className='p-6 text-red-600'>{error}</div>

  return (
    <div className='p-6 bg-white rounded-lg shadow-md space-y-6'>
      {/* Filters */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0'>
        <div className='flex flex-col sm:flex-row sm:space-x-4 w-full sm:w-auto'>
          <div className='w-full sm:w-48'>
            <Select
              isMulti
              options={moduleOptions}
              value={moduleFilter}
              onChange={setModuleFilter}
              placeholder='Module...'
            />
          </div>
          <div className='relative flex-1'>
            <FiSearch className='absolute left-3 top-3 text-gray-400' />
            <input
              type='text'
              placeholder='Search actions...'
              className='w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500'
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </div>
        </div>
        <div className='flex space-x-3'>
          <button
            onClick={() => bulkToggleModule(moduleFilter.map(o => o.value), true)}
            className='bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition'
          >
            Enable Selected Modules
          </button>
          <button
            onClick={() => bulkToggleRole('Finance Admin', false)}
            className='bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition'
          >
            Disable Finance Admin
          </button>
        </div>
      </div>

      {/* Permissions Table */}
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Module</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Action</th>
              {roles.map(r => (
                <th key={r} className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>{r}</th>
              ))}
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {pageActions.map(a => (
              <tr key={a.key}>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{a.module}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{a.label}</td>
                {roles.map(r => {
                  const isOv = overrides[a.key]?.[r] !== undefined
                  const val = effective[a.key]?.[r] ?? false
                  return (
                    <td key={r} className='px-6 py-4 whitespace-nowrap text-center'>
                      <label className='inline-flex items-center space-x-2'>
                        <input
                          type='checkbox'
                          checked={val}
                          onChange={() => togglePermission(a.key, r)}
                          className='h-5 w-5 text-orange-600 focus:ring-orange-500 border-gray-300 rounded'
                        />
                        {isOv && <span className='text-xs text-gray-500' title={`Global default = ${globalPerms[a.key]?.[r] ? '✓' : '✕'}`}>OVERRIDE</span>}
                      </label>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className='flex justify-between items-center'>
        <span className='text-sm text-gray-600'>Page {page + 1} of {pageCount}</span>
        <div className='flex space-x-2'>
          <button onClick={() => setPage(p => Math.max(p - 1, 0))} disabled={page === 0} className='px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md disabled:opacity-50 transition'>Prev</button>
          <button onClick={() => setPage(p => Math.min(p + 1, pageCount - 1))} disabled={page === pageCount - 1} className='px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md disabled:opacity-50 transition'>Next</button>
        </div>
      </div>

      {/* Save / Revert */}
      {subAccountId !== 'all' && (
        <div className='flex space-x-3'>
          <button onClick={handleSave} className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition'>Save Changes</button>
          <button onClick={() => setShowRevertModal(true)} className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition'>Revert to Global</button>
        </div>
      )}

      {/* Revert Confirmation Modal */}
      {showRevertModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div role='dialog' aria-modal='true' className='bg-white rounded-lg p-6 w-96'>
            <h2 className='text-lg font-semibold mb-4'>Confirm Revert</h2>
            <p className='mb-6'>Are you sure you want to revert to global defaults for <span className='font-medium'>{subAccountId}</span>?</p>
            <div className='flex justify-end space-x-2'>
              <button onClick={() => setShowRevertModal(false)} className='px-4 py-2 rounded-md border'>Cancel</button>
              <button onClick={confirmRevert} className='px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition'>Yes, Revert</button>
            </div>
          </div>
        </div>
      )}

      {/* Audit Trail */}
      {subAccountId !== 'all' && (
        <div className='pt-4 border-t'>
          <a href={`/audit/subaccounts/${subAccountId}`} className='text-blue-600 hover:underline'>View recent permission changes</a>
        </div>
      )}
    </div>
  )
}