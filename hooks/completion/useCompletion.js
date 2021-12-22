import { useQuery } from 'react-query';
import { client } from 'utils/client';

const fetchCompletion = async ({ query = {} }) => {
  return client(`/collections`, { params: query });
};

const fetchCountry = async ({ query = {} }) => {
  return client(`/country_codes`, { params: query });
};

const fetchDepartment = async ({ query = {} }) => {
  return client(`/departments`, { params: query });
};

const useCompletion = ({ query }) => {
  return useQuery(
    ['user-completion', query],
    () => fetchCompletion({ query }),
    { 
      keepPreviousData: true,
      refetchInterval: 1000 * 5,
      refetchIntervalInBackground: true
    }
  );
};

const getCountry = ({ query, options }) => {
  return useQuery('countries', () => fetchCountry({ query }), {
    keepPreviousData: true,
    ...options,
  });
};

const useDepartments = ({ query, options }) => {
  return useQuery('departments', () => fetchDepartment({ query }), {
    keepPreviousData: true,
    ...options,
  });
};

export { useCompletion, fetchCompletion, useDepartments, getCountry };
