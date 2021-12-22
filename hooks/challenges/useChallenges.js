import { useQuery } from 'react-query';
import { client } from 'utils/client';

const fetchChallenges = async ({ query = {} }) => {
  return client('/challenges', { params: query });
};

const useChallenges = ({ query } = {}) => {
  return useQuery('challenges', () => fetchChallenges({ query }));
};
const useChallengesJourney = ({ query } = {}) => {
  return useQuery('challenges-journey', () =>
    fetchChallenges({ query: { context_type: 'journey' } })
  );
};
const useChallengesWeekly = ({ query } = {}) => {
  return useQuery('challenges-weekly', () =>
    fetchChallenges({ query: { context_type: 'weekly' } })
  );
};

const useChallengesAll = ({ query } = {}) => {
  return useQuery('challenges-weekly', () =>
    fetchChallenges({ query: { context_type: ['weekly', 'journey'] } })
  );
};

const refetchChallengesJourney = () => {
  queryClient.invalidateQueries('challenges-journey');
};

const refetchChallengesWeekly = () => {
  queryClient.invalidateQueries('challenges-weekly');
};
const refetchChallengesAll = () => {
  queryClient.invalidateQueries('challenges-all');
};
export {
  useChallenges,
  fetchChallenges,
  useChallengesJourney,
  useChallengesWeekly,
  refetchChallengesJourney,
  refetchChallengesWeekly,
  useChallengesAll,
  refetchChallengesAll,
};
