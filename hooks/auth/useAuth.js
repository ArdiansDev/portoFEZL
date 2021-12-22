import { useQuery } from 'react-query';
import { client } from 'utils/client';
import useUser from './useUser';

const fetchAuth = async ({ query = {} }) => {
  return client('/auth', { params: query }).then(data => data?.data);
};

const useAuth = ({ query } = {}) => {
  return useQuery('auth', () => fetchAuth({ query }));
};

const prefetchAuth = ({ query } = {}) => {
  const queryClient = new QueryClient();
  return queryClient.prefetchQuery('Auth', () => fetchAuth({ query }));
};

export { useAuth, fetchAuth, prefetchAuth };
