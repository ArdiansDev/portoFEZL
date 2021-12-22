import React, { useEffect, useState } from "react";
import { useIntroSurvey, useSubmitSurvey } from "hooks/intro_survey/useIntroSurvey";
import { Question } from "components/QuestionSurvey";
import { prefetchIntroSurveyQuestions, useIntroSurveyQuestions } from "hooks/intro_survey/useIntroSurveyQuestions";
import { useRouter } from "next/router";
import { locale } from 'utils/locale';
import { useAuth } from "context/AuthContext";
export default function SurveyDetail() {
  const router = useRouter();
  if(!router.isReady) return null

  const { permission, tenant } = useAuth();
  if(!permission["view_intro_survey"]) return <div>You are not allowed to enter this page</div>
  
  const { survey_id, page } = router.query;
  const {
    isLoading: isLoadingSurvey,
  } = useIntroSurvey({
    survey_id,
  });

  const {
    data: questionsData,
    isLoading,
    isSuccess: isSuccessQuestions
  } = useIntroSurveyQuestions({
    page,
    survey_id,
  });

  const { mutate } = useSubmitSurvey({ survey_id });

  useEffect(() => {
    if(page > questions?.totalPage){
      router.back()
    }
  }, [isSuccessQuestions]);

  const [answer, setAnswer] = useState();

  if (isLoading || isLoadingSurvey) return null;
  let questions = questionsData?.data;
  let { nextPage, totalPage, currentPage } = questionsData;

  const myRedirectFunction = function (type, nextPage) {
    if (type === "next") {
      if (nextPage) {
        prefetchIntroSurveyQuestions({ survey_id, page:nextPage });
        router.push(`/profiling/${survey_id}/page/${nextPage}`);
      } else {
        router.push(tenant?.homepageRoute);
      }
    }
  };

  const onAnswer = (answer) => {
    setAnswer(answer)
    mutate(answer);
  }

  const onSubmit = (nextPage) => {
    if (nextPage) {
      myRedirectFunction("next", nextPage);
    } else {
      router.push(tenant?.homepageRoute);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto px-4 sm:px-8 lg:px-0 py-6 w-full max-width-900 flex flex-col items-center space-y-8 sm:space-y-20 justify-center sm:align-middle">
        <div className="flex w-full justify-between items-center space-x-4">
            <svg
              width="100%"
              height="8"
              viewBox="0 0 100% 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="fill-current text-base-600"
            >
              <rect width="100%" height="8" rx="4" fill="#F5F5F5" />
              <rect width={`${currentPage/totalPage*100}%`} height="8" rx="4" />
            </svg>

          <p className="med-12 w-max-content min-w-max text-base-700">
            {locale("Question")} {currentPage} of {totalPage}
          </p>
        </div>

        <div className="flex flex-col space-y-8 ">
          {questions?.map((question, index) => (
            <Question
              question={question}
              section={question?.dataSection}
              key={question.id}
              onAnswer={onAnswer}
            />
          ))}
        </div>

        <button
          type="button"
          className="inline-flex self-center justify-center width-182 text-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-base-600 hover:bg-base-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500 disabled:bg-gray-100 disabled:text-gray-300"
          onClick={() => onSubmit(nextPage)}
          disabled={!answer}
        >
          {nextPage ? locale("Next") : locale("Submit") }
        </button>
      </div>
    </div>
  );
}

SurveyDetail.getLayout = (page) =>page
SurveyDetail.getHeader = ({ children }) => <div>{children}</div>;
