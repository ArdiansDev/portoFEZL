import { useQuery, useMutation } from 'react-query';
import { client } from 'utils/client';

const fetchChallengeAnswers = async ({ query = {} }) => {
  return client(`/challenge_answers`, { params: query });
};

const useChallengeAnswers = ({ query }) => {
  return useQuery('challenge-answers', () => fetchChallengeAnswers({ query }));
};

function useSubmitAnswers() {
  return useMutation((payload) =>
    client(`/challenge_answers`, {
      method: 'POST',
      data: payload,
    })
  );
}

export { useChallengeAnswers, fetchChallengeAnswers, useSubmitAnswers };
