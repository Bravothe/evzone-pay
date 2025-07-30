import React from 'react';
import PaymentRow from './PaymentRow';
import styles from './PaymentsTable.module.css';

export default function PaymentsTable({ data = [] }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map(p => (
          <PaymentRow key={p.id} payment={p} />
        ))}
      </tbody>
    </table>
  );
}
