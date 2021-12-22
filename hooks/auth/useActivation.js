import { useQuery, useMutation } from 'react-query';
import { client } from 'utils/client';

const fetchActivation = async ({ query = {} }) => {
  return client(`/challenge_answers`, { params: query });
};

const useActivation = ({ query }) => {
  return useQuery('challenge-answers', () => fetchActivation({ query }));
};

function useActivate() {
  return useMutation((payload) =>
    client(`/validate_token?token=${payload}`, {
      method: 'GET',
      data: payload,
    })
  );
}

function useAccount_creation() {
  return useMutation((payload) =>
    client(`/account_creation`, {
      method: 'PUT',
      data: payload,
    })
  );
}

export { useActivation, fetchActivation, useActivate, useAccount_creation };
