import api from '../../../services/api';

// Fetch a page of payments: ?page=1&limit=10
export function fetchPayments({ page = 1, limit = 10 }) {
  return api
    .get('/payments', { params: { page, limit } })
    .then(res => res.data);
}
