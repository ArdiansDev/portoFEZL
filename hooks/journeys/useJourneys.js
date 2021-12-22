import { useQuery, useMutation } from 'react-query';
import { client } from 'utils/client';

const fetchJourneys = async ({ query = {} }) => {
  return client('/journeys', { params: query }).then((data) => data?.data);
};

const useJourneys = ({ query } = {}) => {
  return useQuery('journeys', () => fetchJourneys({ query }));
};

const prefetchJourneys = ({ query } = {}) => {
  const queryClient = new QueryClient();
  return queryClient.prefetchQuery('journeys', () => fetchJourneys({ query }));
};
const fetchAdminJourney = async ({ query = {} }) => {
  return client(`/journeys`, { params: query });
};

const useAdminJourney = ({ query } = {}) => {
  return useQuery(
    ['journey-admin', query],
    () => fetchAdminJourney({ query }),
    {
      keepPreviousData: true,
      refetchOnMount: 'always',
    }
  );
};
const fetchAdminJourneyUser = async ({ query = {}, id }) => {
  return client(`/journeys/${id}/users`, { params: query });
};

const useAdminJourneyUser = ({ query, id } = {}) => {
  return useQuery(
    ['journey-adminUser', query, id],
    () => fetchAdminJourneyUser({ query, id }),
    {
      keepPreviousData: true,
    }
  );
};
const fetchAdminJourneyUserGroup = async ({ query = {}, id }) => {
  return client(`/journeys/${id}/user_groups`, { params: query });
};

const useAdminJourneyUserGroup = ({ query, id } = {}) => {
  return useQuery(
    ['journey-adminGroup', query, id],
    () => fetchAdminJourneyUserGroup({ query, id }),
    {
      keepPreviousData: true,
    }
  );
};
const fetchAdminJourneyUserAssigned = async ({ query = {}, id }) => {
  return client(`/journeys/${id}/assigned_users`, { params: query });
};

const useAdminJourneyUserAssigned = ({ query, id } = {}) => {
  return useQuery(
    ['journey-adminUser', query, id],
    () => fetchAdminJourneyUserAssigned({ query, id }),
    {
      keepPreviousData: true,
    }
  );
};
const fetchAdminJourneyUserGroupAssigned = async ({ query = {}, id }) => {
  return client(`/journeys/${id}/assigned_user_groups`, { params: query });
};

const useAdminJourneyUserGroupAssigned = ({ query, id } = {}) => {
  return useQuery(
    ['journey-adminGroup', query, id],
    () => fetchAdminJourneyUserGroupAssigned({ query, id }),
    {
      keepPreviousData: true,
    }
  );
};

const usePostJourney = ({ options, id }) => {
  return useMutation(
    (payload) =>
      client(`/journeys/${id}/assign_users`, {
        method: 'POST',
        data: payload,
      }),
    {
      ...options,
    }
  );
};
const useDeletejourney = ({ options }) => {
  return useMutation(
    (id) =>
      client(`/journeys/${id}`, {
        method: 'DELETE',
      }),
    {
      ...options,
    }
  );
};

const useUnassignUserFromJourney = ({ options, journeyId } = {}) => {
  return useMutation(
    (userId) =>
      client(`/journeys/${journeyId}/assigned_users/${userId}`, {
        method: 'DELETE',
      }),
    {
      ...options,
    }
  );
};

const useUnassignGroupFromJourney = ({ options, journeyId } = {}) => {
  return useMutation(
    (userId) =>
      client(`/journeys/${journeyId}/assigned_user_groups/${userId}`, {
        method: 'DELETE',
      }),
    {
      ...options,
    }
  );
};

export {
  useJourneys,
  fetchJourneys,
  prefetchJourneys,
  useAdminJourney,
  useAdminJourneyUser,
  useAdminJourneyUserGroup,
  useDeletejourney,
  usePostJourney,
  useAdminJourneyUserAssigned,
  useAdminJourneyUserGroupAssigned,
  useUnassignUserFromJourney,
  useUnassignGroupFromJourney,
};
