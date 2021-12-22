import { useQuery } from 'react-query';
import { client } from 'utils/client';

const fetchTeams = async ({ query = {} }) => {
  return client(`/user_groups?team=true`, { params: query });
};

const fetchMeTeams = async ({ teamId, query = {} }) => {
  return client(`/user_groups/${teamId}`, { params: query });
};

const useTeams = ({ query } = {}) => {
  return useQuery('teams', () => fetchTeams({ query }));
};
const fetchTeamsSelect = async ({ query = {}, id }) => {
  if (id === undefined) {
  } else {
    return client(`/user_groups?team=true&user_id=${id}`, { params: query });
  }
};

const useTeamsSelect = ({ query, id } = {}) => {
  return useQuery(['team', id], () => fetchTeamsSelect({ query, id }));
};
const fetchTeamsSelected = async ({ query = {}, id }) => {
  if (id === undefined) {
  } else {
    return client(`/user_groups?team=true&user_id=${id}`, { params: query });
  }
};

const useTeamsSelected = ({ query, id } = {}) => {
  return useQuery(['team', id], () => fetchTeamsSelected({ query, id }));
};

const useMeTeams = ({ query, teamId } = {}) => {
  return useQuery(['me-teams', teamId], () => fetchMeTeams({ teamId, query }), {
    enabled: !!teamId,
  });
};
export {
  useMeTeams,
  useTeams,
  fetchTeams,
  useTeamsSelect,
  fetchTeamsSelect,
  useTeamsSelected,
  fetchTeamsSelected,
};
