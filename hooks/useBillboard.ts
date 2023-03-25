import useSWR from 'swr';

import fetcher from '@lib/fetcher';

export const useBillboard = () =>
  useSWR('/api/random', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
