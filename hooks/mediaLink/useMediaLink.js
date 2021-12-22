import { queryClient } from 'pages/_app';
import { useMutation, useQuery } from 'react-query';
import { client } from 'utils/client';

const fetchMediaLink = async ({ query = {}, event_id }) => {
  return client(`/event_batches/${event_id}`, { params: query }).then(
    (data) => data?.data
  );
};

const useMediaLink = ({ query, event_id }) => {
  return useQuery(['MediaLink', event_id], () =>
    fetchMediaLink({ query, event_id })
  );
};

const useSubmitMediaLink = ({ event_id }) => {
  return useMutation(
    () =>
      client(`/event_batches/${event_id}/complete`, {
        method: 'PUT',
      }),
    {
      onSettled: async (_) => {
        queryClient.prefetchQuery(['MediaLink', event_id]);
      },
    }
  );
};

const fetchMediaAdmin = async ({ query = {} }) => {
  return client(`/media`, { params: query }).then((data) => data);
};

const useMediaAdmin = ({ query } = {}) => {
  return useQuery(['media-admin', query], () => fetchMediaAdmin({ query }), {
    keepPreviousData: true,
  });
};
export { useMediaLink, fetchMediaLink, useSubmitMediaLink, useMediaAdmin };
