import NextImage from "components/NextImage";
import React from "react";
import { usePublicSurvey } from "hooks/public_survey/usePublicSurvey";
import { useRouter } from "next/router";
import ChooseLanguage from "components/public-survey/ChooseLanguage";
import ProtectedPublicSurvey from "components/public-survey/ProtectedPublicSurvey";
import { locale } from 'utils/locale';
import { useAuth } from "context/AuthContext";

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

export default function ThankYou() {
  const router = useRouter();
  const { survey_id } = router.query;
  if (!router.isReady) return null;

  const { permission } = useAuth();
  if(!permission["view_journey_survey"]) return <div>You are not allowed to enter this page</div>

  const {
    data: survey,
    isLoading,
    error,
  } = usePublicSurvey({
    survey_id,
  });

  if (isLoading ) return null;
  if (error?.response?.status === 404) return <FourOhFour />;
  if (error) return <Error />;

  return (
    <ProtectedPublicSurvey surveyId={survey_id} accessType={survey.accessType}>
      <div className="bg-base-500">
        <div className="min-h-screen lg:grid lg:place-content-center pt-5 pb-10 flex flex-col">
          <div className="px-4 sm:px-6 md:px-12 lg:px-auto lg:mx-auto sm:max-width-1160 flex flex-col items-center sm:space-y-10 space-y-5">
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


            <div className="flex space-x-5 max-width-956 mx-auto md:min-width-956 ">
              <div className="p-6 sm:p-10 space-y-7 grid place-content-center place-items-center sm:w-full bg-white rounded-10 justify-center items-center">
                <p className="med-20 sm:med-30 text-base-600">
                  {survey.closingMessage}
                </p>
                <div className="relative width-285 height-174 sm:width-448 sm:height-274">
                  <NextImage
                    src={survey.closingImageSecureUrl}
                    layout="fill"
                    objectFit="contain"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex justify-center items-center py-3 width-220 border border-white text-base font-medium rounded-md shadow-sm text-white bg-base-500 hover:bg-base-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-800"
              onClick={() => {
                localStorage.clear();
                router.push(`/survey/public/${survey_id}`);
              }}
            >
              {locale("End of survey")}
            </button>
          </div>
        </div>
        {survey.languages?.length > 1 && (
          <div className="w-full flex justify-center items-center static py-4 border-t-2 border-white border-opacity-30">
            <ChooseLanguage languages={survey.languages} surveyId={survey_id} />
          </div>
        )}
      </div>
    </ProtectedPublicSurvey>
  );
}

ThankYou.getHeader = ({ children }) => <div>{children}</div>;
