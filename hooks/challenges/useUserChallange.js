import { queryClient } from 'pages/_app';
import { useQuery, useMutation } from 'react-query';
import { client } from 'utils/client';
import {
  refetchUserChallengesInvited,
  refetchUserChallengesOngoing,
  refetchUserChallengesCompleted
} from './useUserChallanges';

const fetchUserChallenge = async ({ query = {}, id }) => {
  return client(`/user_challenges/${id}`, { params: query });
};

const useUserChallenge = ({ query, id }) => {
  return useQuery(['user-challenge', id], () =>
    fetchUserChallenge({ query, id })
  );
};

function useSubmitInvite({ id }) {
  return useMutation(
    (payload) =>
      client(`/user_challenges/${id}`, {
        method: 'PUT',
        data: payload,
      }),
    {
      onSettled: (data) => {
        let newData = data.data
        refetchUserChallengesOngoing();
        refetchUserChallengesInvited();
        refetchUserChallengesCompleted(); 
        let currrentChallenge = queryClient.getQueryData(['challenge', newData.challenge.id]);
        currrentChallenge.data.userChallenge.timeRemaining = newData.timeRemaining;
        queryClient.setQueryData(['challenge', newData.challenge.id], currrentChallenge)
        queryClient.invalidateQueries('auth')
      },
    }
  );
}

export { useUserChallenge, fetchUserChallenge, useSubmitInvite };
