import { useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { client } from "utils/client";
import { JsonParse } from "utils/jsonParse";

const fetchValidatePublicSurvey = async ({ survey_id }) => {
  let parseAccessCode = JsonParse(`survey-${survey_id}-accessCode`, )
  return client(`/data_collections/${survey_id}/validate_code/${parseAccessCode}`).then((data) => data?.data);
};

export default function useCodeAccessSurvey({
  redirectTo = false,
  redirectIfFound = false,
  surveyId,
} = {}) {
  const { data, isFetching, isLoading, isError, error, isSuccess } = useQuery("code-access-public-survey", () =>
    fetchValidatePublicSurvey({ survey_id: surveyId }),
    {
      retry:false
    }
  );
  const router = useRouter();

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if data not yet there (fetch in progress, signed in or not) then don't do anything yet
    if (!redirectTo || isFetching || isLoading) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && isError) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && isSuccess)
    ) {
      localStorage.clear();
      router.push(redirectTo);
    }
  }, [isFetching, isLoading, redirectIfFound, redirectTo]);

  return { data, isLoading, isFetching, isSuccess, error };
}
