import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

export default function Button({ children, onClick, variant = 'primary', disabled = false }) {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick:  PropTypes.func,
  variant:  PropTypes.oneOf(['primary', 'secondary']),
  disabled: PropTypes.bool,
};
