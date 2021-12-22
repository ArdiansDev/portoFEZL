import { useQuery, useMutation } from 'react-query';
import { client } from 'utils/client';

const fetchLink = async ({ query = {} }) => {
  return client(`/links`, { params: query });
};

const useLink = ({ query } = {}) => {
  return useQuery(['link', query], () => fetchLink({ query }), {
    keepPreviousData: true,
  });
};
const useSubmitBulkLink = ({ options }) => {
  return useMutation(
    (payload) =>
      client(`/links/bulk`, {
        method: 'POST',
        data: payload,
      }),
    {
      ...options,
    }
  );
};

const fetchGetPresign = async ({ query = {} }) => {
  return client(`/uploads/presign`, { params: query });
};

const useGetPresign = ({ query, options } = {}) => {
  return useQuery('presignUrl', () => fetchGetPresign({ query }), {
    ...options,
  });
};

const useSubmitBulkReports = ({ options }) => {
  return useMutation(
    (payload) =>
      client(`/reports`, {
        method: 'POST',
        data: payload,
      }),
    {
      ...options,
    }
  );
};
export {
  useLink,
  fetchLink,
  useSubmitBulkLink,
  useGetPresign,
  useSubmitBulkReports,
};
