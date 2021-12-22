import NextImage from 'components/NextImage';
import React from 'react';
import ChooseLanguage from 'components/public-survey/ChooseLanguage';
import { usePublicSurvey } from 'hooks/public_survey/usePublicSurvey';
import { useRouter } from 'next/router';
import { useLocalStorageState } from 'hooks/utils/useLocalStorageState';
import { useCodeValidation } from 'hooks/public_survey/useCodeValidation';
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

export default function Survey() {
  const router = useRouter();
  const { survey_id } = router.query;
  if (!router.isReady) return null;

  const { data } = useLocale();
  let permission = data?.configs;
  console.log(permission);
  // if (!permission.viewPublicSurvey)
  //   return <div>You are not allowed to enter this page</div>;

  const {
    data: survey,
    isLoading,
    error,
  } = usePublicSurvey({
    survey_id,
  });

  let currentPathname = location.pathname;
  const [uniqueCode, setUniqueCode] = useLocalStorageState(
    `survey-${survey_id}-accessCode`,
    ''
  );

  const [_, setTypeSurvey] = useLocalStorageState(
    `survey-${survey_id}-type`,
    ''
  );

  const {
    isSuccess: isValidCode,
    refetch,
    isFetching: isLoadingValidation,
    isPreviousData: isPreviousValidation,
  } = useCodeValidation({
    survey_id,
    uniqueCode,
  });

  React.useEffect(() => {
    if (survey?.accessType) setTypeSurvey(survey?.accessType);
    if (uniqueCode.length === 7) {
      refetch();
    }
  }, [uniqueCode]);

  if (isLoading) return null;
  if (error?.response?.status === 404) return <FourOhFour />;
  if (error) return <Error />;

  let canContinue =
    survey.accessType === 'unlimited_access' ? true : isValidCode;

  return (
    <div className="h-screen grid place-content-center bg-base-500">
      <div className="mx-auto width-328 sm:width-600 flex items-center flex-col justify-center space-y-7 sm:space-y-10 -mt-40">
        <div className="sm:hidden object-contain width-240 height-135 block relative">
          <NextImage
            src={survey.imageSecureUrl}
            layout="fill"
            objectFit="contain"
            alt=""
          />
        </div>
        <div className="sm:block hidden width-384 height-216 object-contain relative">
          <NextImage
            src={survey.imageSecureUrl}
            layout="fill"
            objectFit="contain"
            alt=""
          />
        </div>
        <pre className="sm:med-20 sm:med-30 text-white text-center break-words whitespace-pre-line">
          {survey.name}
        </pre>
        {survey.accessType === 'code_access' && (
          <div className="w-full flex flex-col justify-center items-center">
            <input
              type="text"
              name="code"
              id="code"
              value={uniqueCode}
              className="text-gray-800 inner-shadow focus:ring-base-500 focus:border-base-500 block sm:text-sm border-gray-300 rounded-md text-center width-312 sm:width-332"
              placeholder="Input Unique Code"
              onChange={(e) => setUniqueCode(e.target.value)}
              maxLength="8"
            />
            <p
              className={`mt-2 reg-12 text-center ${
                isLoadingValidation
                  ? 'text-gray-100'
                  : !isValidCode && !isPreviousValidation
                  ? 'text-red-500'
                  : 'text-gray-100'
              }
              ${
                uniqueCode?.length === 7 && !isPreviousValidation
                  ? 'visible'
                  : 'invisible'
              }`}
              id="email-description"
            >
              {uniqueCode?.length === 7 &&
              !isPreviousValidation &&
              !isLoadingValidation &&
              isValidCode
                ? 'This code can be used. Select continue to proceed.'
                : uniqueCode?.length === 7 &&
                  !isPreviousValidation &&
                  !isLoadingValidation &&
                  !isValidCode
                ? 'This code can’t be used.'
                : 'Loading . . .'}
            </p>
          </div>
        )}
        <button
          type="button"
          className="self-center inline-flex justify-center items-center py-3 width-100 sm:width-220 border border-white text-base font-medium rounded-md shadow-sm text-white bg-base-500 hover:bg-base-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-800 disabled:bg-gray-100 disabled:text-gray-300"
          onClick={() => {
            router.push(`${currentPathname}/welcome`);
          }}
          disabled={canContinue ? false : true}
        >
          {locale('Continue')}
        </button>
      </div>
      {survey.languages?.length > 1 && (
        <div className="w-full flex justify-center items-center absolute bottom-0 py-4 border-t-2 border-white border-opacity-30">
          <ChooseLanguage languages={survey.languages} surveyId={survey_id} />
        </div>
      )}
    </div>
  );
}

Survey.getHeader = ({ children }) => <>{children}</>;
Survey.protectedRoute = false;
