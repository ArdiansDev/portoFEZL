import NextImage from 'components/NextImage';
import { Question } from 'components/public-survey/Question';
import { useRouter } from 'next/router';
import {
  prefetchPublicSurveyQuestions,
  usePublicSurveyQuestions,
} from 'hooks/public_survey/usePublicSurveyQuestions';
import {
  usePublicSurvey,
  useSubmitSurvey,
} from 'hooks/public_survey/usePublicSurvey';
import { useLocalStorageState } from 'hooks/utils/useLocalStorageState';
import ModalWarning from 'components/ModalWarning';
import { useState, useEffect } from 'react';
import ChooseLanguage from 'components/public-survey/ChooseLanguage';
import ProtectedPublicSurvey from 'components/public-survey/ProtectedPublicSurvey';
import { locale } from 'utils/locale';
import { useLocale } from 'hooks/locale/useLocale';

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
  const { data } = useLocale();
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
      } else if (data?.name.includes('UOB')) {
        router.push(`/survey/public/${survey.id}/welcome`);
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

  const { data } = useLocale();
  let permission = data?.configs;
  if (!permission.viewPublicSurvey)
    return <div>You are not allowed to enter this page</div>;

  const { survey_id, page } = router.query;
  const {
    data: survey,
    isLoading: isLoadingSurvey,
    error,
  } = usePublicSurvey({
    survey_id,
  });
  const {
    data: questionsData,
    isLoading,
    error: errorQuestions,
    isSuccess: isSuccessQuestions,
  } = usePublicSurveyQuestions({
    page,
    survey_id,
  });

  const [answers, setAnswers] = useLocalStorageState(
    `survey-${survey_id}-answers`,
    []
  );
  const [openModalWarning, setOpenModalWarning] = useState(false);
  const { mutate } = useSubmitSurvey({ survey_id });

  useEffect(() => {
    if (page > questions?.totalPage) {
      router.back();
    }
  }, [isSuccessQuestions]);

  if (isLoading || isLoadingSurvey) return null;
  if (error?.response?.status === 404) return <FourOhFour />;
  if (error) return <Error />;
  if (error?.response?.status === 404) return <FourOhFourQuestions />;
  if (error) return <ErrorQuestions />;

  let questions = questionsData?.data;

  if (questions?.length == 0) {
    return (
      <ProtectedPublicSurvey
        surveyId={survey_id}
        accessType={survey.accessType}
      >
        <EmptyQuestions
          survey={survey}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </ProtectedPublicSurvey>
    );
  }

  let { nextPage, prevPage, totalPage, currentPage } = questionsData;
  let firstQuestion = questions[0];
  let { dataSection: section } = firstQuestion;

  const myRedirectFunction = function (type, page) {
    if (type === 'next') {
      if (page) {
        prefetchPublicSurveyQuestions({ survey_id, page });
        router.push(`/survey/public/${survey_id}/page/${page}`);
      } else {
        router.push(`/survey/public/${survey_id}/thank-you`);
      }
    }

    if (type === 'prev') {
      if (page) {
        prefetchPublicSurveyQuestions({ survey_id, page });
        router.push(`/survey/public/${survey_id}/page/${page}`);
      } else if (data?.name.includes('UOB')) {
        router.push(`/survey/public/${survey_id}/welcome`);
      } else {
        router.push(`/survey/public/${survey_id}/instruction`);
      }
    }
  };

  const thisPageQuestionsIds = questions?.map((question) => question.sequence);
  const thisPageAnswerIds = answers?.map((answer) => answer.questionSequence);
  const isAllAnswer = thisPageQuestionsIds.every((questionSequence) =>
    thisPageAnswerIds.includes(questionSequence)
  );
  const canFinalize = thisPageAnswerIds.length === survey.totalQuestions;

  const resetAnswer = () => {
    let prevAnswers = JSON.parse(JSON.stringify(answers));
    const filteredAnswers = prevAnswers.filter(
      (answer) => !thisPageQuestionsIds.includes(answer.questionSequence)
    );
    setAnswers(filteredAnswers);
  };

  const onSubmit = (nextPage) => {
    if (nextPage) {
      myRedirectFunction('next', nextPage);
    } else {
      let newAnswer = answers?.map((answer) => ({
        questionId: answer.questionId,
        optionIds: answer.optionIds,
        answer: answer.answer,
      }));
      mutate(newAnswer);
      localStorage.removeItem(`survey-${survey_id}-answers`);
      router.push(`/survey/public/${survey_id}/thank-you`);
    }
  };

  return (
    <ProtectedPublicSurvey surveyId={survey_id} accessType={survey.accessType}>
      <div className="min-h-screen px-4 pt-5 bg-base-500 mx-auto flex flex-col justify-between">
        <div className="grid grid-cols-1 items-center space-y-10">
          <div className="flex flex-col justify-center items-center">
            <div className="hidden width-160 height-90 sm:block relative object-contain">
              <NextImage
                src={survey.imageSecureUrl}
                layout="fill"
                objectFit="contain"
                alt=""
              />
            </div>
            <div className="sm:hidden width-240 height-135 block relative object-contain">
              <NextImage
                src={survey.imageSecureUrl}
                layout="fill"
                objectFit="contain"
                alt=""
              />
            </div>
          </div>
          <div className="grid mx-auto grid-cols-1 space-y-10 ">
            <div className="grid grid-cols-1">
              <div className="flex justify-between mb-4">
                <p className="reg-16 text-white">{survey.name}</p>
                <p className="reg-16 text-white">
                  {currentPage + '/' + totalPage}
                </p>
              </div>
              <div className="max-width-956 grid grid-cols-1 mx-auto md:min-width-956 bg-white p-4 sm:p-6 rounded-12 relative shadow">
                <div className="flex flex-col space-y-5 ">
                  <div className="bg-white px-2.5 py-5 border-b border-gray-200 sm:px-2.5 space-y-1">
                    <div className="flex justify-between flex-wrap">
                      <div className="w-3/4">
                        <h3 className="med-20 text-base-700">
                          {section?.name}
                        </h3>
                        <p className="reg-16 text-gray-500">
                          {section?.description}
                        </p>
                      </div>
                      <p
                        className="reg-16 text-gray-400 underline cursor-pointer"
                        onClick={() => setOpenModalWarning(true)}
                      >
                        {locale('Reset My Answers')}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-5">
                    {questions?.map((question, index) => (
                      <Question
                        question={question}
                        key={question.id}
                        answer={answers.find(
                          (answer) =>
                            answer.questionSequence === question.sequence
                        )}
                        onAnswer={(answer) => {
                          let prevAnswers = JSON.parse(JSON.stringify(answers));
                          const filteredAnswers = prevAnswers.filter(
                            (answer) =>
                              answer.questionSequence !== question.sequence
                          );
                          filteredAnswers.push(answer);
                          setAnswers(filteredAnswers);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                className="self-start inline-flex justify-center items-center py-3 width-100 sm:width-220 border border-white text-base font-medium rounded-md shadow-sm text-white bg-base-500 hover:bg-base-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-800"
                onClick={() => myRedirectFunction('prev', prevPage)}
              >
                {locale('Back')}
              </button>

              <button
                type="button"
                className="self-end inline-flex justify-center items-center py-3 width-100 sm:width-220 border border-white text-base font-medium rounded-md shadow-sm text-white bg-base-500 hover:bg-base-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-800 disabled:bg-gray-100 disabled:text-gray-300"
                onClick={() => onSubmit(nextPage)}
                disabled={nextPage ? !isAllAnswer : !canFinalize}
              >
                {nextPage ? locale('Next') : locale('Submit')}
              </button>
            </div>
          </div>
        </div>
        {openModalWarning && (
          <ModalWarning
            open={openModalWarning}
            setOpen={setOpenModalWarning}
            resetAnswer={resetAnswer}
          />
        )}
        {survey.languages?.length > 1 && (
          <div className="self-end w-full flex mt-20 justify-center items-center bottom-0 py-4 border-t-2 border-white border-opacity-30">
            <ChooseLanguage languages={survey.languages} surveyId={survey_id} />
          </div>
        )}
      </div>
    </ProtectedPublicSurvey>
  );
}

Survey.getHeader = ({ children }) => <div>{children}</div>;
Survey.protectedRoute = false;
