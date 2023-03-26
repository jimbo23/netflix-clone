import fetcher from '@lib/fetcher';
import useSWR from 'swr';

export const useMovie = (id?: string) =>
  useSWR(id ? `/api/movies/${id}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
