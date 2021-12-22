import { useQuery } from "react-query";
import { client } from "utils/client";
import { JsonParse } from "utils/jsonParse";

const fetchValidatePublicSurvey = async ({ survey_id }) => {
  let parseAccessCode = JsonParse(`survey-${survey_id}-accessCode`);
  return client(`/data_collections/${survey_id}/validate_code/${parseAccessCode}`).then((data) => data?.data);
};

const useCodeValidation = ({ survey_id, uniqueCode }) => {
  return useQuery(
    "code-access-public-survey",
    () => fetchValidatePublicSurvey({ survey_id }),
    {
      enabled: false,
      retry: false
    }
  );
};

export { useCodeValidation, fetchValidatePublicSurvey };
