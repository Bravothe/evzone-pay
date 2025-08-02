import React from 'react'
import {
  FiChevronRight,
  FiChevronDown,
  FiPlus,
  FiEdit2,
  FiTrash2,
} from 'react-icons/fi'

export default function TreeNode({
  node,
  level,
  expanded,
  onToggle,
  onSelect,
  selected,
  addChild,
  renameNode,
  deleteNode,
}) {
  const isExp = expanded.has(node.id)
  const isSel = selected === node.id

  return (
    <div>
      <div
        className={`flex items-center p-2 rounded-lg ${
          isSel ? 'bg-orange-100' : 'hover:bg-gray-50'
        }`}
        style={{ marginLeft: level * 16 }}
      >
        {node.children.length > 0 ? (
          <button
            onClick={() => onToggle(node.id)}
            className="focus:outline-none mr-2 text-gray-500"
            aria-label={isExp ? 'Collapse' : 'Expand'}
          >
            {isExp ? <FiChevronDown /> : <FiChevronRight />}
          </button>
        ) : (
          <span className="w-5 mr-2" />
        )}

        <span
          onClick={() => onSelect(node.id)}
          className={`flex-1 cursor-pointer ${
            isSel ? 'text-orange-600' : 'text-gray-800'
          }`}
        >
          {node.name}
        </span>

        <span className="text-sm text-gray-500 mr-4">
          {node.userCount} users
        </span>

        <button
          onClick={() => addChild(node.id)}
          className="p-1 text-blue-500 hover:text-blue-700"
          aria-label="Add child"
        >
          <FiPlus />
        </button>
        <button
          onClick={() => renameNode(node.id)}
          className="p-1 text-green-500 hover:text-green-700"
          aria-label="Rename"
        >
          <FiEdit2 />
        </button>
        <button
          onClick={() => deleteNode(node.id)}
          className="p-1 text-red-500 hover:text-red-700"
          aria-label="Delete"
        >
          <FiTrash2 />
        </button>
      </div>
      {isExp &&
        node.children.map(child => (
          <TreeNode
            key={child.id}
            node={child}
            level={level + 1}
            expanded={expanded}
            onToggle={onToggle}
            onSelect={onSelect}
            selected={selected}
            addChild={addChild}
            renameNode={renameNode}
            deleteNode={deleteNode}
          />
        ))}
    </div>
  )
}
