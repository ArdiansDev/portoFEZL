import { useQuery } from "react-query";
import { client } from "utils/client";
import { queryClient } from "pages/_app";

const fetchJourneySurveyQuestions = async ({ query = {}, survey_id }) => {
  return client(`/data_collections/${survey_id}/questions`, { params: query });
};

const useJourneySurveyQuestions = ({ query = {}, survey_id, page } = {}) => {
  return useQuery(["journey-survey-questions", survey_id, query], () =>
    fetchJourneySurveyQuestions({
      query: { ...query, questionPage: page },
      survey_id,
    })
  );
};

const prefetchJourneySurveyQuestions = async ({
  survey_id,
  query = {},
  page,
}) => {
  return queryClient.prefetchQuery(
    ["journey-survey-questions", survey_id, query],
    () =>
      fetchJourneySurveyQuestions({
        query: { ...query, questionPage: page },
        survey_id,
      })
  );
};

export {
  useJourneySurveyQuestions,
  fetchJourneySurveyQuestions,
  prefetchJourneySurveyQuestions,
};
