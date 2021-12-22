import NextImage from 'components/NextImage';
import React from 'react';
import { usePublicSurvey } from 'hooks/public_survey/usePublicSurvey';
import { useRouter } from 'next/router';
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

export default function SurveyDetail() {
  const router = useRouter();
  const { survey_id } = router.query;
  if (!router.isReady) return null;

  const { data } = useLocale();
  let permission = data?.configs;
  let tenant = data;
  if (!permission.viewPublicSurvey)
    return <div>You are not allowed to enter this page</div>;

  const {
    data: survey,
    isLoading,
    error,
  } = usePublicSurvey({
    survey_id,
  });

  if (isLoading) return null;
  if (error?.response?.status === 404) return <FourOhFour />;
  if (error) return <Error />;
  const nextPage = () => {
    if (tenant.name === 'UOB') {
      router.push(
        `/survey/public/${survey_id}/page/${survey.questionPage.next}`
      );
    } else {
      router.push(`/survey/public/${survey_id}/instruction`);
    }
  };
  console.log(locale);
  return (
    <ProtectedPublicSurvey surveyId={survey_id} accessType={survey.accessType}>
      <div className="bg-base-500">
        <div className="min-h-screen lg:grid lg:place-content-center pt-5 bg-base-500 flex flex-col">
          <div className="px-4 lg:px-12 lg:px-auto lg:mx-auto flex flex-col items-center sm:space-y-10 space-y-5">
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

            <div className="flex space-x-5">
              <div className="p-8 space-y-7 bg-white rounded-10 max-width-956">
                <pre className="med-20 sm:med-38 font-bold text-base-600 break-words whitespace-pre-line">
                  {survey.name}
                </pre>
                <span className="inline-flex mb-3 items-center px-5 py-0.5 rounded-md med-16 bg-transparent border border-base-600 text-base-600">
                  {locale('Total No. of Questions:')} {survey.totalQuestions}
                </span>
                <pre className="reg-16 sm:reg-20 text-gray-600 break-words whitespace-pre-line">
                  {survey.openingMessage}
                </pre>
              </div>
            </div>
            <button
              type="button"
              className="sm:self-end mb-10 inline-flex justify-center items-center py-3 width-220 border border-white text-base font-medium rounded-md shadow-sm text-white bg-base-500 hover:bg-base-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-800"
              onClick={nextPage}
            >
              {locale('Next')}
            </button>
          </div>
        </div>
        {survey.languages?.length > 1 && (
          <div className="w-full flex mt-20 pb-5 justify-center items-center static bottom-0 py-4 border-t-2 border-white border-opacity-30">
            <ChooseLanguage languages={survey.languages} surveyId={survey_id} />
          </div>
        )}
      </div>
    </ProtectedPublicSurvey>
  );
}

SurveyDetail.getHeader = ({ children }) => <div>{children}</div>;
SurveyDetail.protectedRoute = false;
