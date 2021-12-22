import NextImage from 'components/NextImage';
import { Question } from 'components/QuestionSurvey2';
import { useRouter } from 'next/router';
import {
  useJourneySurvey,
  useSubmitSurvey,
} from 'hooks/journeys/survey/useJourneySurvey';
import {
  useJourneySurveyQuestions,
  prefetchJourneySurveyQuestions,
} from 'hooks/journeys/survey/useJourneySurveyQuestions';
import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import React from 'react';
import { locale } from 'utils/locale';
import { useAuth } from 'context/AuthContext';

export function FourOhFour() {
  return (
    <div className="h-screen grid place-content-center">
      <h1>404 - Survey Not Found</h1>
      <p>Please ask your admin !</p>
    </div>
  );
}

export function Error() {
  return (
    <div className="h-screen grid place-content-center">
      <h1>Something went wrong</h1>
      <p>Don't worry, we are working on it !</p>
    </div>
  );
}

export function FourOhFourQuestions() {
  return (
    <div className="min-h-screen px-4 pt-5 pb-20 bg-base-500 grid place-content-center">
      <div className="flex flex-col items-center space-y-10">
        <div className="relative width-270 height-156">
          <NextImage
            src={survey.imageSecureUrl}
            layout="fixed"
            objectFit="contain"
            width={270}
            height={156}
            alt=""
          />
        </div>
        <div className="flex flex-col space-y-10">
          <div className="space-x-5 flex flex-col">
            <div className="max-width-956 md:min-width-956 grid grid-cols-auto-fit-full bg-white p-4 sm:p-6 rounded-12 relative shadow">
              <div className="grid place-content-center">
                <h1>404 - Survey Not Found</h1>
                <p>Please ask your admin !</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="self-start inline-flex justify-center items-center py-3 width-220 border border-white text-base font-medium rounded-md shadow-sm text-white bg-base-500 hover:bg-base-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-800"
              onClick={() => router.back()}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ErrorQuestions() {
  return (
    <div className="min-h-screen px-4 pt-5 pb-20 bg-base-500 grid place-content-center">
      <div className="flex flex-col items-center space-y-10">
        <div className="relative width-270 height-156">
          <NextImage
            src={survey.imageSecureUrl}
            layout="fixed"
            objectFit="contain"
            width={270}
            height={156}
            alt=""
          />
        </div>
        <div className="flex flex-col space-y-10">
          <div className="space-x-5 flex flex-col">
            <div className="max-width-956 md:min-width-956 grid grid-cols-auto-fit-full bg-white p-4 sm:p-6 rounded-12 relative shadow">
              <div className="grid place-content-center">
                <h1>Something went wrong</h1>
                <p>Don't worry, we are working on it !</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="self-start inline-flex justify-center items-center py-3 width-220 border border-white text-base font-medium rounded-md shadow-sm text-white bg-base-500 hover:bg-base-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-800"
              onClick={() => router.back()}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EmptyQuestions({ nextPage, prevPage, survey }) {
  const router = useRouter();
  const myRedirectFunction = function (type, page) {
    if (type === 'next') {
      if (page) {
        router.push({
          pathname: router.pathname,
          query: { ...router.query, page: page },
        });
      } else {
        router.push(`/survey/public/${survey.id}/thank-you`);
      }
    }

    if (type === 'prev') {
      if (page) {
        router.push({
          pathname: router.pathname,
          query: { ...router.query, page: page },
        });
      } else {
        router.push(`/survey/public/${survey.id}/instruction`);
      }
    }
  };
  return (
    <div className="min-h-screen px-4 pt-5 pb-20 bg-base-500 grid place-content-center">
      <div className="flex flex-col items-center space-y-10">
        <div className="relative width-270 height-156">
          <NextImage
            src={survey.imageSecureUrl}
            layout="fixed"
            objectFit="contain"
            width={270}
            height={156}
            alt=""
          />
        </div>
        <div className="flex flex-col space-y-10">
          <div className="space-x-5 flex flex-col">
            <div className="max-width-956 md:min-width-956 grid grid-cols-auto-fit-full bg-white p-4 sm:p-6 rounded-12 relative shadow">
              <div className="grid place-content-center">
                <h1>This Page has Empty Questions</h1>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="self-start inline-flex justify-center items-center py-3 width-220 border border-white text-base font-medium rounded-md shadow-sm text-white bg-base-500 hover:bg-base-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-800"
              onClick={() => myRedirectFunction('prev', prevPage)}
            >
              Back
            </button>

            <button
              type="button"
              className="self-end inline-flex justify-center items-center py-3 width-100 sm:width-220 border border-white text-base font-medium rounded-md shadow-sm text-white bg-base-500 hover:bg-base-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-800 disabled:bg-gray-100 disabled:text-gray-300"
              onClick={() => myRedirectFunction('next', nextPage)}
              disabled={true}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Survey() {
  const router = useRouter();
  if (!router.isReady) return null;
  const { survey_id, page, journey_id, event_batch_id } = router.query;

  const { permission, tenant } = useAuth();
  if (!permission['view_journey_survey'])
    return <div>You are not allowed to enter this page</div>;

  let {
    data: survey,
    isLoading: isLoadingSurvey,
    error,
  } = useJourneySurvey({
    survey_id,
    event_batch_id
  });

  const {
    data: questionsData,
    isLoading: isLoadingQuestions,
    error: errorQuestions,
    isSuccess: isSuccessQuestions,
  } = useJourneySurveyQuestions({
    page,
    survey_id,
  });

  const [answer, setAnswer] = useState();

  const { mutate } = useSubmitSurvey({ survey_id });

  useEffect(() => {
    if (page > questions?.totalPage) {
      router.back();
    }
  }, [isSuccessQuestions]);

  const { progress } = survey || {};
  let questions = questionsData?.data;
  let { nextPage } = questionsData || {};
  let firstQuestion = questions?.[0];
  let { dataSection: section } = firstQuestion || {};

  const myRedirectFunction = function (type, nextPage) {
    if (type === 'next') {
      if (nextPage) {
        prefetchJourneySurveyQuestions({ survey_id, page: nextPage });
        router.push(
          `/journey/${journey_id}/event-batch/${event_batch_id}/survey/${survey_id}/page/${nextPage}`
        );
      } else {
        router.push(tenant?.homepageRoute);
      }
    }
  };

  const onAnswer = (answer) => {
    setAnswer(answer);
    mutate(answer);
  };

  const onSubmit = (nextPage) => {
    if (nextPage) {
      myRedirectFunction('next', nextPage);
    } else {
      router.push(`/journey/${journey_id}/event-batch/${event_batch_id}/survey/${survey_id}/thank-you`);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="py-6 space-y-7 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 min-h-screen">
        {/* <div className="height-38 flex justify-between">
          <div className="cursor-pointer p-2 shadow-sm border rounded-6 border-gray-300 bg-white">
            <ArrowLeftIcon className="h-5 w-5 text-gray-400" />
          </div>
          <p className="med-20 text-gray-900">Survey</p>
          <div className="cursor-pointer p-2 border rounded-6 border-gray-300 bg-white">
            <ArrowRightIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div> */}

        <div className="flex md:flex-row flex-col gap-5">
          {/* <div className="w-full sm:max-width-302 p-6 bg-white rounded-12 sm:sticky sm:top-20 self-start shadow">
            <div className="space-y-5">
              <p className="med-20 text-gray-900">
                {survey?.name || <Skeleton />}
              </p>
              <NextImage
                className="rounded-8"
                src={survey?.imageSecureUrl}
                width={254}
                height={217}
                alt="survey-image"
                layout="fixed"
              />
              {progress?.totalQuestions && (
                <div className="flex flex-col gap-2 ">
                  <p className="med-14 text-gray-900">
                    {locale('Survey Progress')}
                  </p>
                  <div className="flex justify-between items-center">
                    <svg
                      width="154"
                      height="8"
                      viewBox="0 0 154 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current text-base-600"
                    >
                      <rect width="154" height="8" rx="4" fill="#F5F5F5" />
                      <rect width={progressPercentage} height="8" rx="4" />
                    </svg>

                    <p className="med-12 text-base-700">
                      {progress.completedQuestions} of {progress.totalQuestions}{' '}
                      {locale('Questions')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div> */}
          <div className="w-full bg-white p-6 rounded-12 relative shadow">
            <div className="flex flex-col gap-5 ">
              <div className="bg-white py-5 border-b border-gray-200 sm:px-2.5 space-y-3.5 z-20 sticky top-16">
                <h3 className="med-16 text-base-700">
                  {section?.name || <Skeleton />}
                </h3>
              </div>
              <div className="flex flex-col gap-5">
                {questions?.map((question, index) => (
                  <Question
                    question={question}
                    key={question.id}
                    onAnswer={onAnswer}
                    eventBatchId={event_batch_id}
                  />
                )) || (
                  <React.Fragment>
                    <Skeleton count={2} /> <Skeleton count={2} />{' '}
                    <Skeleton count={2} />
                  </React.Fragment>
                )}
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-base-600 hover:bg-base-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500
                    width-160 height-40 justify-center disabled:bg-gray-100 disabled:text-gray-300"
                  onClick={() => onSubmit(nextPage)}
                  disabled={!answer}
                >
                  {nextPage ? 'Next' : 'Finish'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
