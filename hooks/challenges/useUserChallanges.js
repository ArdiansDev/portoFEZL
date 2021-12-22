import { queryClient } from 'pages/_app';
import { useQuery } from 'react-query';
import { client } from 'utils/client';

const fetchUserChallenges = async ({ query = {} }) => {
  return client(`/user_challenges`, { params: query });
};

const useUserChallenges = ({ query } = {}) => {
  return useQuery('user-challenges', () => fetchUserChallenges({ query }));
};

const fetchUserChallengesInvited = async ({ query = {} }) => {
  return client(`/user_challenges?state=invited&&disable_pagination=true`, { params: query });
};

const useUserChallengesInvited = ({ query } = {}) => {
  return useQuery('user-challenges-invited', () =>
    fetchUserChallengesInvited({ query })
  );
};
const fetchUserChallengesOngoing = async ({ query = {} }) => {
  return client(`/user_challenges`, { params: query });
};

const useUserChallengesOngoing = ({ query } = {}) => {
  return useQuery(['user-challenges-ongoing'], () =>
    fetchUserChallengesOngoing({ query: {state: ["ongoing", "accepted"], "disable_pagination":true} })
  );
};

const useUserChallengesHistory = ({ query } = {}) => {
  return useQuery('user-challenges-history', () =>
    fetchUserChallenges({ query: {state: ["declined", "completed"], "disable_pagination":true }})
  );
};

const refetchUserChallengesOngoing = () => {
  queryClient.invalidateQueries('user-challenges-ongoing')
}

const refetchUserChallengesInvited = () => {
  queryClient.invalidateQueries('user-challenges-invited')
}

const refetchUserChallengesCompleted = () => {
  queryClient.invalidateQueries('user-challenges-history')
}

export {
  useUserChallenges,
  fetchUserChallenges,
  useUserChallengesInvited,
  fetchUserChallengesInvited,
  useUserChallengesOngoing,
  fetchUserChallengesOngoing,
  useUserChallengesHistory,
  refetchUserChallengesOngoing,
  refetchUserChallengesCompleted,
  refetchUserChallengesInvited
};
