import React from 'react'
import { FiPlus, FiRefreshCw } from 'react-icons/fi'

export default function SidebarControls({ addRoot, refresh }) {
  return (
    <div className="flex space-x-2 mb-4">
      <button
        onClick={addRoot}
        className="flex-1 flex items-center justify-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      >
        <FiPlus className="mr-2" /> New Root
      </button>
      <button
        onClick={refresh}
        className="flex-1 flex items-center justify-center bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition"
      >
        <FiRefreshCw className="mr-2" /> Refresh
      </button>
    </div>
  )
}
