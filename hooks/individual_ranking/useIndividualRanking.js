import { useQuery } from 'react-query';
import { client } from 'utils/client';
import useUser from 'hooks/auth/useUser';

const fetchIndividualRanking = async ({ query = {} }) => {
  return client(`/individual_rankings`, { params: query });
};

const fetchMeRanking = async ({ query = {} }) => {
  return client(`/individual_rankings/me`, { params: query });
};

const useIndividualRanking = ({ query, options } = {}) => {
  return useQuery(
    ['individual_ranking', query.page],
    () => fetchIndividualRanking({ query }),
    { keepPreviousData: true, ...options }
  );
};

const useMeRanking = ({ query } = {}) => {
  return useQuery('me_ranking', () => fetchMeRanking({ query }));
};

const prefetchIndividualRanking = ({ query } = {}) => {
  const queryClient = new QueryClient();
  return queryClient.prefetchQuery('individual_ranking', () =>
    fetchIndividualRanking({ query })
  );
};

export {
  useMeRanking,
  useIndividualRanking,
  fetchIndividualRanking,
  prefetchIndividualRanking,
};
