import NextImage from "components/NextImage";
import React from "react";
import { useIntroSurvey } from "hooks/intro_survey/useIntroSurvey";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import { locale } from 'utils/locale';
import { useAuth } from "context/AuthContext";
export default function WelcomeProfiling() {
  const router = useRouter();
  const { survey_id } = router.query;
  if (!router.isReady) return null;
  
  const { permission } = useAuth();
  if(!permission["view_intro_survey"]) return <div>You are not allowed to enter this page</div>

  let {
    data: survey,
  } = useIntroSurvey({
    survey_id,
  });

  survey = survey?.data ?? survey

  return (
    <div className="h-screen bg-white">
      <div className="mx-auto width-588 flex flex-col items-center space-y-20 justify-center sm:align-middle sm:h-screen">
        <div className="relative width-400 height-225">
          <NextImage
            src={survey?.imageSecureUrl}
            layout="fill"
            objectFit="contain"
            alt=""
          />
        </div>
        <div className="flex flex-col space-y-8 text-center">
          <pre className="med-38 text-blue-800 break-words whitespace-pre-line">{survey?.name || <Skeleton count={1}/>}</pre>
          <pre className="reg-16 sm:reg-20 text-gray-800 break-words whitespace-pre-line">
              {survey?.openingMessage || <Skeleton count={5}/>}
          </pre>
          <button
            type="button"
            className="inline-flex self-center justify-center width-182 text-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-base-600 hover:bg-base-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
            onClick={() => router.push(`/profiling/${survey_id}/page/1`)}
          >
            {locale("Let's get started")}
          </button>
        </div>
      </div>
    </div>
  );
}

WelcomeProfiling.getLayout = (page) =>page
WelcomeProfiling.getHeader = ({ children }) => <div>{children}</div>;
