import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { FiSearch, FiFilter, FiDownload, FiChevronLeft, FiChevronRight, FiEye } from 'react-icons/fi'

// Mock data generator
const generateMockData = (count = 50) => {
  const actions = ['login', 'logout', 'impersonate_start', 'impersonate_end', 'policy_edit']
  const modules = ['PayKit', 'CorporatePay', 'UtilityPay', 'AgentHub', 'CreditConnect', 'SchoolWallet']
  const data = []
  for (let i = 1; i <= count; i++) {
    const action = actions[Math.floor(Math.random() * actions.length)]
    const module = modules[Math.floor(Math.random() * modules.length)]
    const timestamp = new Date(Date.now() - Math.random() * 1e10).toISOString()
    const actor = `user${(i % 10) + 1}@evzone.com`
    data.push({
      id: i,
      actor,
      timestamp,
      action,
      subAccount: `Account ${(i % 5) + 1}`,
      key: action,
      from: Math.random() > 0.5 ? 'true' : 'false',
      to: Math.random() > 0.5 ? 'true' : 'false',
      module,
      raw: JSON.stringify({ actor, action, module, timestamp }, null, 2)
    })
  }
  return data
}

const actionOptions = [
  { value: '', label: 'All Actions' },
  { value: 'login', label: 'Login' },
  { value: 'logout', label: 'Logout' },
  { value: 'impersonate_start', label: 'Impersonate Start' },
  { value: 'impersonate_end', label: 'Impersonate End' },
  { value: 'policy_edit', label: 'Policy Edit' },
]
const moduleOptions = [
  { value: 'PayKit', label: 'PayKit' },
  { value: 'CorporatePay', label: 'CorporatePay' },
  { value: 'UtilityPay', label: 'UtilityPay' },
  { value: 'AgentHub', label: 'AgentHub' },
  { value: 'CreditConnect', label: 'CreditConnect' },
  { value: 'SchoolWallet', label: 'SchoolWallet' },
]

export default function ActivityHistory() {
  const [records, setRecords] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [actionFilter, setActionFilter] = useState('')
  const [moduleFilter, setModuleFilter] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [viewRaw, setViewRaw] = useState(null)

  useEffect(() => {
    const data = generateMockData(123)
    setRecords(data)
    setFiltered(data)
  }, [])

  useEffect(() => {
    let temp = [...records]
    if (search) {
      temp = temp.filter(r =>
        r.actor.includes(search) ||
        r.action.includes(search) ||
        r.module.includes(search)
      )
    }
    if (actionFilter) {
      temp = temp.filter(r => r.action === actionFilter)
    }
    if (moduleFilter.length) {
      temp = temp.filter(r => moduleFilter.some(m => m.value === r.module))
    }
    setFiltered(temp)
    setPage(1)
  }, [search, actionFilter, moduleFilter, records])

  const totalPages = Math.ceil(filtered.length / pageSize)
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize)

  const exportCsv = () => {
    const header = ['Actor','Timestamp','Action','Sub-Account','Key','From→To','Module']
    const rows = filtered.map(r => [r.actor, r.timestamp, r.action, r.subAccount, r.key, `${r.from}→${r.to}`, r.module])
    const csv = [header, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'activity-history.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-4 space-y-4">
      {/* Filters & Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-2 flex-wrap">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-3 py-2 border rounded-lg focus:ring focus:ring-orange-200"
            />
          </div>
          <Select
            options={actionOptions}
            value={actionOptions.find(o => o.value === actionFilter)}
            onChange={opt => setActionFilter(opt.value)}
            className="w-48"
            placeholder={<><FiFilter className="inline mr-1"/> Action</>}
          />
          <Select
            isMulti
            options={moduleOptions}
            value={moduleFilter}
            onChange={setModuleFilter}
            className="w-48"
            placeholder={<><FiFilter className="inline mr-1"/> Module</>}
          />
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={exportCsv}
            className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          ><FiDownload className="mr-2"/> Export CSV</button>
          <Select
            options={[10,25,50,100].map(n => ({ value: n, label: `${n} / page` }))}
            value={{ value: pageSize, label: `${pageSize} / page` }}
            onChange={opt => setPageSize(opt.value)}
            className="w-32"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto shadow rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              {['Actor','Timestamp','Action','Sub-Account','Key','From→To','Module',''].map(header => (
                <th
                  key={header}
                  className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase"
                >{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map(r => (
              <tr key={r.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 text-sm text-gray-800">{r.actor}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{new Date(r.timestamp).toLocaleString()}</td>
                <td className="px-4 py-2 text-sm text-teal-600 font-medium">{r.action}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{r.subAccount}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{r.key}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{r.from}→{r.to}</td>
                <td className="px-4 py-2 text-sm text-indigo-600">{r.module}</td>
                <td className="px-4 py-2 text-sm">
                  <button
                    onClick={() => setViewRaw(r.raw)}
                    className="text-orange-500 hover:text-orange-700"
                  ><FiEye /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing {(page-1)*pageSize+1}–{Math.min(page*pageSize, filtered.length)} of {filtered.length}
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="p-2 rounded hover:bg-gray-200"
          ><FiChevronLeft/></button>
          <span className="px-2 text-sm">{page} / {totalPages}</span>
          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="p-2 rounded hover:bg-gray-200"
          ><FiChevronRight/></button>
        </div>
      </div>

      {/* Raw Modal */}
      {viewRaw && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Raw Event Details</h2>
              <button onClick={() => setViewRaw(null)} className="text-gray-600 hover:text-gray-900">×</button>
            </div>
            <pre className="bg-gray-100 p-4 rounded max-h-60 overflow-auto text-xs">
              {viewRaw}
            </pre>
            <div className="mt-4 text-right">
              <button
                onClick={() => setViewRaw(null)}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
              >Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}