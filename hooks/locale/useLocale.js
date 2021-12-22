import { client } from 'utils/client';
import { useQuery, useMutation } from 'react-query';

const fetchLocale = async () => {
  return client(`/tenants/current`).then((data) => data?.data);
};

const useLocale = (config) => {
  return useQuery('locale', () => fetchLocale(), config);
};
const usePutLocale = ({ options, subdomain }) => {
  return useMutation(
    (payload) =>
      client(`/locales/${subdomain}`, {
        method: 'PUT',
        data: payload,
      }),
    {
      ...options,
    }
  );
};
export { fetchLocale, useLocale, usePutLocale };
