import { queryClient } from 'pages/_app';
import { useMutation, useQuery } from 'react-query';
import { client } from 'utils/client';

const fetchResources = async ({ query = {} }) => {
  return client(`/training_calendars?disable_pagination=true`).then((data) => data?.data);
};

const useResources = ({ query } = {}) => {
  return useQuery('resources', () => fetchResources({ query }));
};

const fetchResourcesAdmin = async ({ query = {} }) => {
  return client(`/training_calendars`, { params: query }).then((data) => data);
};

const useResourcesAdmin = ({ query } = {}) => {
  return useQuery(
    ['resources-admin', query],
    () => fetchResourcesAdmin({ query }),
    { keepPreviousData: true }
  );
};

const fetchResourcesCompletion = async ({ query = {} }) => {
  return client(`/resource_completions`, { params: query }).then(
    (data) => data
  );
};

const useResourcesCompletion = ({ query } = {}) => {
  return useQuery(
    ['resources-completion', query],
    () => fetchResourcesCompletion({ query }),
    { keepPreviousData: true }
  );
};

const useSubmitResources = () => {
  return useMutation(
    (resourceId) =>
      client(`/training_calendars/${resourceId}/complete`, {
        method: 'POST',
      }),
    {
      onSettled: async (_) => {
        queryClient.prefetchQuery(['resources']);
      },
    }
  );
};

const useSubmitBulkResources = ({ options }) => {
  return useMutation(
    (payload) =>
      client(`/training_calendars/bulk`, {
        method: 'POST',
        data: payload,
      }),
    {
      ...options,
    }
  );
};

const useSubmitBulkResourcesCompletion = ({ options }) => {
  return useMutation(
    (payload) =>
      client(`/resource_completions`, {
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

const useSubmitBulkReports = ({options}) => {
  return useMutation((payload) =>
    client(`/reports`, {
      method: 'POST',
      data: payload,
    }), {
      ...options
    }
  );
};

const useDeleteResources = ({ options }) => {
  return useMutation(
    (id) =>
      client(`/training_calendars/${id}`, {
        method: 'DELETE',
      }),
    {
      ...options,
    }
  );
};

const useDeleteResourcesCompletion = ({ options }) => {
  return useMutation(
    (id) =>
      client(`/resource_completions/${id}`, {
        method: 'DELETE',
      }),
    {
      ...options,
    }
  );
};

export {
  useResources,
  fetchResources,
  useSubmitResources,
  useSubmitBulkResources,
  useSubmitBulkResourcesCompletion,
  useGetPresign,
  useResourcesAdmin,
  useSubmitBulkReports,
  useResourcesCompletion,
  useDeleteResources,
  useDeleteResourcesCompletion
};

// import { useInfiniteQuery } from 'react-query'
// import { client } from 'utils/client'

// const fetchPublicSurveyQuestions = async ({query = {}, survey_id}) => {
//   return client(`data_collections/${survey_id}/questions`, { params: query })
// }

// const usePublicSurveyQuestions = ({query = {}, survey_id}) => {
//   let questionPage =
//   return useInfiniteQuery(['public-survey-questions',survey_id], (page=1) => fetchPublicSurveyQuestions({query: {questionPage: page}, survey_id}),
//       {
//         getNextPageParam: (lastPage) => lastPage.nextPage,
//         getPreviousPageParam: (firstPage) => firstPage.prevPage,
//      }
//   )
// }

// export { usePublicSurveyQuestions, fetchPublicSurveyQuestions }
