// src/components/sidebar/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';
import sidebarItems from '../constants/sidebarItems';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const location = useLocation();
  const [openKey, setOpenKey] = useState(null);
  const toggle = (key) => setOpenKey(openKey === key ? null : key);

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.list}>
        {sidebarItems.map((item) => {
          const isActive = location.pathname.startsWith(item.to);
          const isOpen   = openKey === item.key;

          return (
            <li key={item.key} className={styles.item}>
              <div
                className={`
                  ${styles.link}
                  ${isActive  ? styles.active   : ''}
                  ${isOpen    ? styles.expanded : ''}
                `}
                onClick={() => item.children && toggle(item.key)}
              >
                {item.icon && <item.icon className={styles.icon} />}
                <span className={styles.label}>{item.label}</span>
                {item.children && (
                  isOpen
                    ? <FiChevronDown className={`${styles.chevron} ${styles.open}`} />
                    : <FiChevronRight className={styles.chevron} />
                )}
              </div>

              {item.children && isOpen && (
                <ul className={styles.sublist}>
                  {item.children.map((sub) => (
                    <li key={sub.key}>
                      <NavLink
                        to={sub.to}
                        className={({ isActive }) =>
                          `${styles.sublink} ${isActive ? styles.active : ''}`
                        }
                      >
                        {sub.icon && <sub.icon className={styles.icon} />}
                        <span className={styles.label}>{sub.label}</span>
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
