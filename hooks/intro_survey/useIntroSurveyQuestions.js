import { useQuery } from "react-query";
import { client } from "utils/client";
import { queryClient } from "pages/_app";

const fetchIntroSurveyQuestions = async ({ query = {}, survey_id }) => {
  return client(`/data_collections/${survey_id}/questions`, { params: query });
};

const useIntroSurveyQuestions = ({ query = {}, survey_id, page } = {}) => {
  return useQuery(["intro-survey-questions", survey_id, query], () =>
    fetchIntroSurveyQuestions({
      query: { ...query, questionPage: page },
      survey_id,
    })
  );
};

const prefetchIntroSurveyQuestions = async ({
  survey_id,
  query = {},
  page,
}) => {
  return queryClient.prefetchQuery(
    ["intro-survey-questions", survey_id, query],
    () =>
      fetchIntroSurveyQuestions({
        query: { ...query, questionPage: page },
        survey_id,
      })
  );
};

export {
  useIntroSurveyQuestions,
  fetchIntroSurveyQuestions,
  prefetchIntroSurveyQuestions,
};
