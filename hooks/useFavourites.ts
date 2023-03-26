import useSWR from 'swr';
import fetcher from '@lib/fetcher';

export const useFavourites = () =>
  useSWR('/api/favourites', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
