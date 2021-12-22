import { useQuery } from 'react-query';
import { client } from 'utils/client';

const fetchSurveys = async ({ query = {} }) => {
    return client(`/data_collections`,  { params: query }).then((data) => data);
  };
  
const useSurveys = ({ query, options } = {}) => {
    return useQuery(['surveys', query], 
      () => fetchSurveys({ query }),
      { ...options }
    );
};
  
export {
  useSurveys,
};