import useSWR from 'swr';
import fetcher from '@lib/fetcher';

// Client side
const useCurrentUser = () => useSWR('/api/current', fetcher);

export default useCurrentUser;
