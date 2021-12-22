import { useQuery, useMutation } from 'react-query';
import { client } from 'utils/client';
import { queryClient } from 'pages/_app';

const fetchUserRewards = async ({ query = {} }) => {
  return client(`/user_rewards`, { params: {"disable_pagination":true} });
};

const fetchUserRewardsId = async ({ rewardId, query = {} }) => {
  return client(`/user_rewards/${rewardId}`, { params: query });
};

const useUserRewards = ({ query } = {}) => {
  return useQuery('user_rewards', () => fetchUserRewards({ query }));
};

const useUserReward = ({ query, rewardId } = {}) => {
  return useQuery(["user_reward", rewardId], () => fetchUserRewardsId({ rewardId: rewardId, query }));
};

function useRedeems() {
  return useMutation((payload) =>
    client(`/user_rewards`, {
      method: 'POST',
      data: payload,
    }), {
      onSuccess: (data) => {
        data = data?.data ?? data;
        queryClient.setQueryData(['user_reward',data.reward.id], data)
        queryClient.invalidateQueries('auth')
        queryClient.invalidateQueries('rewards')
        queryClient.invalidateQueries('user_rewards')
        
      }
    }
  );
}

export { useUserRewards, fetchUserRewards, useRedeems, useUserReward };
