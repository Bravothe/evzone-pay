import { useQuery } from '@tanstack/react-query';
import api from '../api';

export function useFetch(key, url, options = {}) {
  return useQuery(
    [key, url],
    () => api.get(url).then((res) => res.data),
    { staleTime: 1000 * 60 * 5, ...options }
  );
}
