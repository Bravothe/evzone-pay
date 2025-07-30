import { useQuery } from '@tanstack/react-query';
import { fetchPayments } from '../services/payments';

export function usePayments(page, limit = 10) {
  return useQuery(
    ['payments', page, limit],
    () => fetchPayments({ page, limit }),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 2, // 2m
    }
  );
}
