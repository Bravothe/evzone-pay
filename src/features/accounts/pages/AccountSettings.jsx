import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useParams} from 'react-router-dom'

// Replace these with real API calls
async function fetchSubAccount(id) {
  // Mock fetch
  return new Promise(res => setTimeout(() => res({
    id,
    name: 'SubAccount ' + id,
    description: 'Detailed description for ' + id,
    region: 'Europe',
    currency: 'EUR',
    costCenter: 'Marketing',
    caps: { daily: '1000', weekly: '5000', monthly: '20000' },
    period: 'monthly',
    customRange: { start: '', end: '' },
    workflow: [],
    rollover: true,
    inherited: false,
  }), 400))
}
async function fetchUsers() {
  // Mock user list
  return new Promise(res => setTimeout(() => res([
    { id: 'u1', name: 'Alice' },
    { id: 'u2', name: 'Bob'   },
    { id: 'u3', name: 'Carol' },
  ]), 300))
}

const regions = [
  { value: 'North America', label: 'North America' },
  { value: 'Europe',        label: 'Europe' },
  { value: 'Asia',          label: 'Asia' },
  { value: 'Africa',        label: 'Africa' },
  { value: 'Australia',     label: 'Australia' },
]
const currencies = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'NGN', label: 'NGN' },
  { value: 'KES', label: 'KES' },
  { value: 'GHS', label: 'GHS' },
]
const periods = [
  { value: 'daily',       label: 'Daily' },
  { value: 'weekly',      label: 'Weekly' },
  { value: 'monthly',     label: 'Monthly' },
  { value: 'quarterly',   label: 'Quarterly' },
  { value: 'fiscal_year', label: 'Fiscal Year' },
  { value: 'custom',      label: 'Custom Range' },
]

export default function AccountSettings() {
  const { subAccountId } = useParams()
  const [loading, setLoading] = useState(true)
  //const [subAccount, setSubAccount] = useState(null)
  const [users, setUsers] = useState([])
  const [form, setForm] = useState(null)
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)

  // Load data
  useEffect(() => {
    setLoading(true)
    Promise.all([fetchSubAccount(subAccountId), fetchUsers()])
      .then(([sa, us]) => {
       // setSubAccount(sa)
        setUsers(us)
        // Initialize form
        setForm({
          name: sa.name,
          description: sa.description,
          region: regions.find(r => r.value === sa.region) || null,
          currency: currencies.find(c => c.value === sa.currency) || null,
          costCenter: sa.costCenter,
          caps: sa.caps,
          period: sa.period,
          customRange: sa.customRange,
          workflow: us.filter(u => sa.workflow.includes(u.id)).map(u => ({ value: u.id, label: u.name })),
          rollover: sa.rollover,
          inherited: sa.inherited,
        })
      })
      .finally(() => setLoading(false))
  }, [subAccountId])

  const change = (key, value) => { setForm(f => ({ ...f, [key]: value })); setDirty(true) }
  const changeCap = (periodKey, value) => { setForm(f => ({ ...f, caps: { ...f.caps, [periodKey]: value } })); setDirty(true) }

  const save = async () => {
    setSaving(true)
    try {
      // call onSave or API here
      alert('Saved: ' + JSON.stringify(form))
      setDirty(false)
    } catch {
      alert('Save failed')
    } finally {
      setSaving(false)
    }
  }

  if (loading || !form) {
    return <div className="p-6 text-center">Loading account settings...</div>
  }

  const workflowOptions = users.map(u => ({ value: u.id, label: u.name }))

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Account Settings</h1>
      <div className="bg-white rounded shadow p-6 space-y-6">
        {/* Display Name */}
        <div>
          <label className="block font-medium mb-1">Display Name</label>
          <input
            type="text"
            value={form.name}
            onChange={e => change('name', e.target.value)}
            className="w-full border rounded p-2 focus:ring focus:ring-orange-200"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={e => change('description', e.target.value)}
            className="w-full border rounded p-2 focus:ring focus:ring-orange-200"
          />
        </div>

        {/* Region & Currency */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Region</label>
            <Select
              options={regions}
              value={form.region}
              onChange={opt => change('region', opt)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Currency</label>
            <Select
              options={currencies}
              value={form.currency}
              onChange={opt => change('currency', opt)}
            />
          </div>
        </div>

        {/* Budget Caps */}
        <fieldset>
          <legend className="font-medium mb-2">Budget Caps</legend>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {['daily','weekly','monthly'].map(key => (
              <div key={key}>
                <label className="block capitalize mb-1">{key}</label>
                <input
                  type="number"
                  min="0"
                  value={form.caps[key]}
                  onChange={e => changeCap(key, e.target.value)}
                  className="w-full border rounded p-2 focus:ring focus:ring-orange-200"
                />
              </div>
            ))}
          </div>
        </fieldset>

        {/* Period */}
        <div>
          <label className="block font-medium mb-1">Period Granularity</label>
          <select
            value={form.period}
            onChange={e => change('period', e.target.value)}
            className="w-full border rounded p-2 focus:ring focus:ring-orange-200"
          >
            {periods.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>

        {/* Workflow */}
        <div>
          <label className="block font-medium mb-1">Approval Workflow</label>
          <Select
            isMulti
            options={workflowOptions}
            value={form.workflow}
            onChange={opts => change('workflow', opts)}
          />
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <button
            onClick={save}
            disabled={!dirty || saving}
            className="bg-orange-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
