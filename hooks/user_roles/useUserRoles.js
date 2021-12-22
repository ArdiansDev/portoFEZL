import { queryClient } from 'pages/_app';
import { useMutation, useQuery } from 'react-query';
import { client } from 'utils/client';

const fetchUserRolesAdmin = async ({ query = {} }) => {
  return client(`/users`, { params: query }).then((data) => data);
};

const useUserRolesAdmin = ({ query } = {}) => {
  return useQuery(
    ['users-admin', query],
    () => fetchUserRolesAdmin({ query }),
    {
      keepPreviousData: true,
    }
  );
};
const fetchUserGroupRolesAdmin = async ({ query = {} }) => {
  return client(`/user_groups`, { params: query });
};

const useUserGroupRolesAdmin = ({ query } = {}) => {
  return useQuery(
    ['usersGroup-admin', query],
    () => fetchUserGroupRolesAdmin({ query }),
    {
      keepPreviousData: true,
    }
  );
};
export { useUserRolesAdmin, useUserGroupRolesAdmin };
