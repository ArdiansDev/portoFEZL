import { useQuery } from 'react-query';
import { client } from 'utils/client';

const fetchResourcesSources = async ({ query = {} }) => {
    return client(`/training_calendars/sources`).then((data) => data?.data);
  };
  
const useResourcesSources = ({ query, options } = {}) => {
    return useQuery('resources-sources', 
      () => fetchResourcesSources({ query }),
      { ...options }
    );
};
  
export {
  useResourcesSources,
};