import { useQuery, useMutation } from "react-query";
import { client } from "utils/client";
import { JsonParse } from "utils/jsonParse";

const fetchPublicSurvey = async ({ query = {}, survey_id }) => {
  return client(`/data_collections/${survey_id}`, { params: query }).then(
    (data) => {
      let newData = data?.data;
      newData.languages.unshift({ id: 0, name: "English" });
      localStorage.setItem(`survey-${survey_id}-type`, newData.accessType);
      return newData;
    }
  );
};

const usePublicSurvey = ({ query = {}, survey_id }) => {
  let language = JsonParse(`survey-${survey_id}-language`);
  if (language && language.id > 0) query.language_id = language.id;

  let surveyType = localStorage.getItem(`survey-${survey_id}-type`);
  let codeAccess = JsonParse(`survey-${survey_id}-accessCode`);
  
  if(surveyType && surveyType === "code_access") query.accessCode = codeAccess;
  return useQuery(["public-survey", survey_id, query], () =>
    fetchPublicSurvey({ query, survey_id })
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

export { usePublicSurvey, fetchPublicSurvey, useSubmitSurvey };
