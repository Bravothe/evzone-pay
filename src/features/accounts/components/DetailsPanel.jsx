import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FiMoreVertical, FiMail, FiUserX } from 'react-icons/fi'

export default function DetailsPanel({ node, onClose }) {
  const [menuState, setMenuState] = useState(null)
  // menuState: { id, x, y } or null

  // Close the menu if user clicks outside or scrolls
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuState && !e.target.closest('.member-menu')) {
        setMenuState(null)
      }
    }
    window.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('scroll', handleClickOutside, true)
    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('scroll', handleClickOutside, true)
    }
  }, [menuState])

  if (!node) {
    return <div className="text-gray-500 italic">Select a node to see details</div>
  }

  const openMenu = (memberId, event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setMenuState({
      id: memberId,
      x: rect.right,
      y: rect.bottom
    })
  }

  const handleAction = (action, member) => {
    setMenuState(null)
    if (action === 'message') alert(`Message ${member.name}`)
    if (action === 'block')   alert(`Block ${member.name}`)
  }

  return (
    <div className="space-y-6 relative">
      <h2 className="text-2xl font-bold">{node.name}</h2>

      <div className="grid grid-cols-2 gap-4 text-gray-700">
        {node.country && (
          <div>
            <p className="font-medium">Country:</p>
            <p>{node.country}</p>
          </div>
        )}
        {node.office && (
          <div>
            <p className="font-medium">Office:</p>
            <p>{node.office}</p>
          </div>
        )}
        <div>
          <p className="font-medium">Description:</p>
          <p>{node.description || '—'}</p>
        </div>
        <div>
          <p className="font-medium">Workflow:</p>
          <p>{node.workflow || '—'}</p>
        </div>
        <div>
          <p className="font-medium">Cap:</p>
          <p className="font-bold">{node.cap || '—'}</p>
        </div>
        <div>
          <p className="font-medium">Users:</p>
          <p>{node.userCount}</p>
        </div>
      </div>

      {node.members?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Members</h3>
          <div className="overflow-auto border rounded-lg">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Member
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Info
                  </th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {node.members.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <img
                          src={u.photo}
                          alt={u.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium text-gray-900">
                          {u.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      <div>{u.email}</div>
                      <div className="text-xs text-gray-400">
                        Joined: {u.joined}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center relative">
                      <button
                        onClick={e => {
                          e.stopPropagation()
                          openMenu(u.id, e)
                        }}
                        className="p-1 hover:bg-gray-200 rounded transition"
                        aria-label="Actions"
                      >
                        <FiMoreVertical />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {menuState &&
        createPortal(
          <ul
            className="member-menu absolute bg-white border border-gray-200 rounded-md shadow-lg z-50 w-40 py-1"
            style={{ top: menuState.y + 4, left: menuState.x - 160 }}
          >
            <li>
              <button
                onClick={() =>
                  handleAction(
                    'message',
                    node.members.find(m => m.id === menuState.id)
                  )
                }
                className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
              >
                <FiMail className="mr-2" /> Message
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  handleAction(
                    'block',
                    node.members.find(m => m.id === menuState.id)
                  )
                }
                className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
              >
                <FiUserX className="mr-2" /> Block
              </button>
            </li>
          </ul>,
          document.body
        )}
    </div>
  )
}
