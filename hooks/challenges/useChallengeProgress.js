import { useQuery } from 'react-query';
import { client } from 'utils/client';
import useUser from 'hooks/auth/useUser';

const fetchChallengeProgress = async ({ query = {}, id }) => {
  return client(`/challenges/${id}/progress`, { params: query });
};

const useChallengeProgress = ({ query, id } = {}) => {
  return useQuery(['challenge-progress', id], () =>
    fetchChallengeProgress({ query, id })
  );
};

export { useChallengeProgress, fetchChallengeProgress };
