import { useQuery } from 'react-query';
import { client } from 'utils/client';

const fetchStamps = async ({ query = {} }) => {
  return client(`/user_stamps`, { params: query }).then((data) => data?.data);
};

const useStamps = ({ query } = {}) => {
  return useQuery('stamps', () => fetchStamps({ query }));
};

export { useStamps, fetchStamps };
