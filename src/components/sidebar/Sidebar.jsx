// src/components/sidebar/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';
import sidebarItems from '../constants/sidebarItems';

export default function Sidebar() {
  const location = useLocation();
  const [openKey, setOpenKey] = useState(null);
  const toggle = (key) => setOpenKey(openKey === key ? null : key);

  return (
    <aside className="w-64 bg-white p-4 shadow-lg rounded-r-xl flex flex-col">
      <ul className="flex-1 overflow-y-auto list-none m-0 p-0">
        {sidebarItems.map((item, idx) => {
          const isActive = location.pathname.startsWith(item.to);
          const isOpen   = openKey === item.key;
          const Icon     = item.icon;

          return (
            <li key={item.key} className={idx > 0 ? 'mt-2' : ''}>
              {/* If the item has children, use a button to toggle */}
              {item.children ? (
                <button
                  onClick={() => toggle(item.key)}
                  className={`
                    w-full text-left flex items-center px-3 py-2 rounded-r-lg transition
                    ${isActive
                      ? 'text-orange-600 bg-orange-100 border-l-4 border-orange-600'
                      : isOpen
                        ? 'text-orange-600 bg-orange-50 border-l-4 border-orange-500'
                        : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                    }
                  `}
                >
                  {Icon && <Icon className="mr-2 text-xl" />}
                  <span className="flex-1 whitespace-nowrap">{item.label}</span>
                  {isOpen
                    ? <FiChevronDown className="text-orange-500" />
                    : <FiChevronRight className="text-gray-500" />
                  }
                </button>
              ) : (
                /* No children → render a NavLink */
                <NavLink
                  to={item.to}
                  className={({ isActive: navIsActive }) => `
                    flex items-center px-3 py-2 rounded-r-lg transition
                    ${navIsActive
                      ? 'text-orange-600 bg-orange-100 border-l-4 border-orange-600'
                      : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                    }
                  `}
                >
                  {Icon && <Icon className="mr-2 text-xl" />}
                  <span className="flex-1 whitespace-nowrap">{item.label}</span>
                </NavLink>
              )}

              {/* Sub-menu (only for items with children) */}
              {item.children && isOpen && (
                <ul className="list-none m-0 p-0 ml-4 mt-1 border-l border-gray-200">
                  {item.children.map((sub, subIdx) => (
                    <li key={sub.key} className={subIdx > 0 ? 'mt-2' : ''}>
                      <NavLink
                        to={sub.to}
                        className={({ isActive: subActive }) => `
                          flex items-center px-2 py-1 rounded-r-lg transition
                          ${subActive
                            ? 'text-orange-600 bg-orange-100 border-l-4 border-orange-600'
                            : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
                          }
                        `}
                      >
                        {sub.icon && <sub.icon className="mr-2 text-lg" />}
                        <span className="flex-1 whitespace-nowrap">{sub.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
