import { useQuery } from 'react-query';
import { client } from 'utils/client';

const fetchChallengeResult = async ({ query = {}, id }) => {
  return client(`/challenges/${id}/result`, { params: query });
};

const useChallengeResult = ({ query, id } = {}) => {
  return useQuery(['challange-result', id], () =>
    fetchChallengeResult({ query, id })
  );
};

export { useChallengeResult, fetchChallengeResult };
