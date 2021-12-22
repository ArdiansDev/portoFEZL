import { useQuery } from 'react-query';
import { client } from 'utils/client';

const fetchRewards = async ({ query = {} }) => {
  return client(`/reward_details`, { params: query }).then(
    (data) => data?.data
  );
};

const useRewards = ({ query } = {}) => {
  if(query?.currency === 'all'){
    query = {}
  }
  return useQuery('rewards', () => fetchRewards({ query }), { keepPreviousData : true });
};

export { useRewards, fetchRewards };
