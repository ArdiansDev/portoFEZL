import { useQuery } from "react-query";
import { client } from "utils/client";
import { queryClient } from "pages/_app";
import { JsonParse } from "utils/jsonParse";

const fetchPublicSurveyQuestions = async ({ query = {}, survey_id }) => {
  return client(`/data_collections/${survey_id}/questions`, { params: query });
};

const usePublicSurveyQuestions = ({ query = {}, survey_id, page } = {}) => {
  let language = JsonParse(`survey-${survey_id}-language`);
  let surveyType = localStorage.getItem(`survey-${survey_id}-type`);
  let codeAccess = JsonParse(`survey-${survey_id}-accessCode`);

  if(surveyType && surveyType === "code_access") query.accessCode = codeAccess;
  if (language && language.id > 0) query.language_id = language.id;
  return useQuery(["public-survey-questions", survey_id, query], () =>
    fetchPublicSurveyQuestions({
      query: { ...query, questionPage: page },
      survey_id,
    })
  );
};

const prefetchPublicSurveyQuestions = async ({
  survey_id,
  query = {},
  page,
}) => {
  let language = JsonParse(`survey-${survey_id}-language`);
  if (language && language.id > 0) query.language_id = language.id;

  let surveyType = localStorage.getItem(`survey-${survey_id}-type`);
  let codeAccess = JsonParse(`survey-${survey_id}-accessCode`);
  if(surveyType && surveyType === "code_access") query.accessCode = codeAccess;
  
  return queryClient.prefetchQuery(
    ["public-survey-questions", survey_id, query],
    () =>
      fetchPublicSurveyQuestions({
        query: { ...query, questionPage: page },
        survey_id,
      })
  );
};

export {
  usePublicSurveyQuestions,
  fetchPublicSurveyQuestions,
  prefetchPublicSurveyQuestions,
};
