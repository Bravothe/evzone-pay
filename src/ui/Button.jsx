import React from 'react';
import styles from './Button.module.css';

export default function Button({ children, onClick, className='' }) {
  return (
    <button onClick={onClick} className={`${styles.button} ${className}`}>
      {children}
    </button>
  );
}
