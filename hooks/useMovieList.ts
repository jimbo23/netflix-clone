import fetcher from '@lib/fetcher';
import useSWR from 'swr';

export const useMovieList = () =>
  useSWR('/api/movies', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
