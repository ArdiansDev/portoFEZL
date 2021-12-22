import { useQuery } from 'react-query';
import { client } from 'utils/client';

const fetchChallenge = async ({ query = {}, id }) => {
  if (id === undefined) {
  } else {
    return client(`/challenges/${id}`, { params: query });
  }
};

const useChallenge = ({ query, id } = {}) => {
  return useQuery(['challenge', id], () =>
    fetchChallenge({ query, id })
  );
};

export { useChallenge, fetchChallenge };
