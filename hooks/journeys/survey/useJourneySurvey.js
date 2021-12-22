import { useQuery, useMutation } from "react-query";
import { client } from "utils/client";

const fetchJourneySurvey = async ({ query = {}, survey_id, event_batch_id }) => {
  return client(`/journey_surveys/${event_batch_id}/data_collections/${survey_id}`, { params: query }).then(
    (data) => data?.data
  );
};

const useJourneySurvey = ({ query = {}, survey_id, event_batch_id }) => {
  return useQuery(["journey-survey", survey_id], () => fetchJourneySurvey({ query, survey_id, event_batch_id }));
};

function useSubmitSurvey({ survey_id }) {
  return useMutation((updates) =>
    client(`/data_collections/${survey_id}/answers`, {
      method: "POST",
      data: updates,
    })
  );
}

export { useJourneySurvey, fetchJourneySurvey, useSubmitSurvey };
