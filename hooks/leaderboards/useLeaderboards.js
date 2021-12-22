import { useQuery } from 'react-query';
import { client } from 'utils/client';

const fetchLeaderboards = async ({ query = {}, id }) => {
  if (id === undefined) {
  } else {
    return client(`/leaderboards/${id}`, { params: query });
  }
};

const useLeaderboards = ({ query, id } = {}) => {
  return useQuery(['leaderboards', id, query.page], () =>
    fetchLeaderboards({ query, id }),
    { keepPreviousData : true }
  );
};

export { useLeaderboards, fetchLeaderboards };
