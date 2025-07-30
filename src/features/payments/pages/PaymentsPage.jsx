import React, { useState } from 'react';
import { usePayments } from '../hooks/usePayments';
import PaymentsTable from '../components/PaymentsTable';
import styles from '../styles/PaymentsPage.module.css';

export default function PaymentsPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error, isPreviousData } = usePayments(page);

  if (isLoading) return <div className={styles.loader}>Loading payments…</div>;
  if (error) return <div className={styles.error}>Error loading payments.</div>;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Payments</h1>
      <PaymentsTable data={data.items} />
      <div className={styles.pagination}>
        <button
          onClick={() => setPage(old => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => {
            if (!isPreviousData && data.hasMore) {
              setPage(old => old + 1);
            }
          }}
          disabled={isPreviousData || !data.hasMore}
        >
          Next
        </button>
      </div>
    </div>
  );
}
