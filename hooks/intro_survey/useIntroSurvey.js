import { useQuery, useMutation } from "react-query";
import { client } from "utils/client";

const fetchIntroSurvey = async ({ query = {}, survey_id }) => {
  return client(`/data_collections/${survey_id}`, { params: query }).then(
    (data) => data
  );
};

const useIntroSurvey = ({ query = {}, survey_id }) => {
  return useQuery(["intro-survey", survey_id], () =>
    fetchIntroSurvey({ query, survey_id })
  );
};

function useSubmitSurvey({ survey_id }) {
  return useMutation((updates) =>
    client(`/data_collections/${survey_id}/answers`, {
      method: "POST",
      data: updates,
    })
  );
}

export { useIntroSurvey, fetchIntroSurvey, useSubmitSurvey };
