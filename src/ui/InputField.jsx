import React from 'react';
import styles from './InputField.module.css';

export default function InputField(props) {
  return <input {...props} className={styles.input} />;
}
