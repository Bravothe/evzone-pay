import React, { useState } from 'react'
import SidebarControls from '../components/SidebarControls'
import TreeNode        from '../components/TreeNode'
import DetailsPanel    from '../components/DetailsPanel'
import AddEditModal    from '../components/AddEditModal'

// Dummy starting data
const initialData = [
  {
    id: '1',
    country: 'Europe',
    office:  'Head Office',
    name:    'Head Office',
    description: 'Main HQ for operations',
    rollover: true,
    cap: '100,000 USD',
    workflow: 'Standard Approval',
    userCount: 12,
    members: [
      { id: 'u1', name: 'Alice Smith', email: 'alice@evzone.com', photo: 'https://i.pravatar.cc/150?u=1', joined: '2022-01-15' },
      { id: 'u2', name: 'Bob Jones',   email: 'bob@evzone.com',   photo: 'https://i.pravatar.cc/150?u=2', joined: '2022-03-22' },
    ],
    children: [
      {
        id: '1-1',
        name: 'Finance Dept',
        description: 'Handles budgeting',
        rollover: false,
        cap: '50,000 USD',
        workflow: 'Finance Approval',
        userCount: 4,
        members: [
          { id: 'u3', name: 'Carol White', email: 'carol@evzone.com', photo: 'https://i.pravatar.cc/150?u=3', joined: '2022-05-10' },
        ],
        children: [],
      },
      {
        id: '1-2',
        name: 'Sales Dept',
        description: 'Manages sales',
        rollover: true,
        cap: '30,000 USD',
        workflow: 'Manager Approval',
        userCount: 8,
        members: [],
        children: [],
      },
    ],
  },
]

function findNode(nodes, id) {
  for (let n of nodes) {
    if (n.id === id) return n
    const c = findNode(n.children, id)
    if (c) return c
  }
  return null
}

export default function AccountsTree() {
  const [treeData, setTreeData]   = useState(initialData)
  const [expanded, setExpanded]   = useState(new Set())
  const [selected, setSelected]   = useState(null)
  const [modalMode, setModalMode] = useState(null)
  const [modalNode, setModalNode] = useState(null)

  const refresh     = () => setTreeData([...treeData])
  const addRoot     = () => { setModalMode('root'); setModalNode(null) }

  // Node actions
  const toggle     = id => {
    const next = new Set(expanded)
    next.has(id) ? next.delete(id) : next.add(id)
    setExpanded(next)
  }
  const addChild   = node => { setModalMode('dept'); setModalNode(node) }
  const startEdit  = node => { setModalMode('edit'); setModalNode(node) }
  const deleteNode = id => {
    if (!window.confirm('Delete this sub-account?')) return
    const recurse = ns => ns
      .filter(n=>n.id!==id)
      .map(n=>({...n, children: recurse(n.children)}))
    setTreeData(recurse(treeData))
    if (selected===id) setSelected(null)
  }

  const handleModalSubmit = fields => {
    const newNode = {
      id:        Date.now().toString(),
      country:   modalMode==='root'?fields.country:undefined,
      office:    modalMode==='root'?fields.office:undefined,
      name:      modalMode==='root'?fields.office:fields.name,
      description: fields.description,
      rollover:  false,
      cap:       '',
      workflow:  '',
      userCount: 0,
      members:   [],
      children:  [],
    }

    if (modalMode === 'dept') {
      const recurse = ns => ns.map(n=>
        n.id===modalNode.id
          ? {...n, children:[...n.children,newNode]}
          : {...n, children: recurse(n.children)}
      )
      setTreeData(recurse(treeData))
      setExpanded(prev=>new Set(prev).add(modalNode.id))
    }
    else if (modalMode === 'edit') {
      const recurse = ns => ns.map(n=>
        n.id===modalNode.id
          ? { ...n, ...newNode, children:n.children, members:n.members }
          : { ...n, children: recurse(n.children) }
      )
      setTreeData(recurse(treeData))
    }
    else { // root
      setTreeData([newNode, ...treeData])
    }
  }

  const selectedNode = selected ? findNode(treeData, selected) : null

  return (
    <div className="flex h-full bg-white shadow rounded-lg overflow-hidden">
      <div className="w-1/3 border-r p-4">
        <SidebarControls
          addRoot={addRoot}
          refresh={refresh}
        />
        <div className="space-y-1 overflow-y-auto">
          {treeData.map(n => (
            <TreeNode
              key={n.id}
              node={n}
              level={0}
              expanded={expanded}
              onToggle={toggle}
              onSelect={setSelected}
              selected={selected}
              addChild={addChild}
              startEdit={startEdit}
              deleteNode={deleteNode}
            />
          ))}
        </div>
      </div>
      <div className="w-2/3 p-6">
        <DetailsPanel node={selectedNode} onClose={() => setSelected(null)} />
      </div>

      <AddEditModal
        isOpen={!!modalMode}
        mode={modalMode}
        parentNode={modalNode}
        node={modalNode}
        onClose={() => setModalMode(null)}
        onSubmit={handleModalSubmit}
      />
    </div>
  )
}
