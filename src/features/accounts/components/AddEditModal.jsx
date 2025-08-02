import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { FiX } from 'react-icons/fi'

export default function AddEditModal({
  isOpen,
  mode,        // 'root' | 'dept' | 'edit'
  parentNode,  // when mode==='dept'
  node,        // when mode==='edit'
  onClose,
  onSubmit,
}) {
  const [fields, setFields] = useState({})

  // init fields for each mode
  useEffect(() => {
    if (mode === 'root') {
      setFields({ country: '', office: '', description: '' })
    } else if (mode === 'dept') {
      setFields({ name: '', description: '' })
    } else if (mode === 'edit' && node) {
      setFields({ name: node.name, description: node.description || '' })
    }
  }, [mode, node])

  const handleChange = (k, v) => setFields(f => ({ ...f, [k]: v }))
  const handleSubmit = () => {
    onSubmit(fields)
    onClose()
  }

  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h3 className="text-lg font-semibold">
            {mode === 'root'
              ? 'New Root Account'
              : mode === 'dept'
              ? `Add Department to “${parentNode.name}”`
              : `Edit "${node.name}"`}
          </h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <FiX size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          {mode === 'root' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Country</label>
                <Select
                  options={[
                    { value: 'North America', label: 'North America' },
                    { value: 'Europe', label: 'Europe' },
                    { value: 'Asia', label: 'Asia' },
                    { value: 'Africa', label: 'Africa' },
                    { value: 'Australia', label: 'Australia' },
                  ]}
                  value={fields.country ? { value: fields.country, label: fields.country } : null}
                  onChange={opt => handleChange('country', opt.value)}
                  placeholder="Select country…"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Office Name</label>
                <input
                  type="text"
                  value={fields.office}
                  onChange={e => handleChange('office', e.target.value)}
                  className="w-full border rounded p-2 focus:ring focus:ring-orange-200"
                  placeholder="e.g. Head Office"
                />
              </div>
            </>
          )}

          {(mode === 'dept' || mode === 'edit') && (
            <div>
              <label className="block text-sm font-medium mb-1">Department Name</label>
              <input
                type="text"
                value={fields.name}
                onChange={e => handleChange('name', e.target.value)}
                className="w-full border rounded p-2 focus:ring focus:ring-orange-200"
                placeholder="e.g. Finance Dept"
              />
            </div>
          )}

          {/* Shared description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={fields.description}
              onChange={e => handleChange('description', e.target.value)}
              rows={3}
              className="w-full border rounded p-2 focus:ring focus:ring-orange-200"
              placeholder="Optional details…"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-2 px-4 py-3 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
