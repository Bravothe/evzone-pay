import React from 'react';
import styles from './PaymentsTable.module.css';

export default function PaymentRow({ payment }) {
  const { id, date, amount, status } = payment;
  return (
    <tr className={styles.row}>
      <td>{id}</td>
      <td>{new Date(date).toLocaleDateString()}</td>
      <td>{amount.toFixed(2)}</td>
      <td className={styles[status]}>{status}</td>
    </tr>
  );
}
