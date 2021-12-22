import NextImage from 'components/NextImage';
import useUser from 'hooks/auth/useUser';
import { useJourneySurvey } from 'hooks/journeys/survey/useJourneySurvey';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import { locale } from 'utils/locale';
import { useAuth } from 'context/AuthContext';

export default function WelcomeSurvey() {
  const router = useRouter();
  if (!router.isReady) return null;

  const { permission } = useAuth();
  if (!permission['view_journey_survey'])
    return <div>You are not allowed to enter this page</div>;

  const { survey_id, journey_id, event_batch_id } = router.query;

  useUser({
    redirectTo: '/login',
    redirectIfFound: false,
  });

  let { data: survey } = useJourneySurvey({
    survey_id,
    event_batch_id
  });

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

        <div className="flex sm:flex-row flex-col gap-5">
          {/* <div className="height-217 mobile:self-center max-width-254 w-full relative">
              <NextImage
                className="rounded-8"
                src={survey?.imageSecureUrl}
                width={254}
                height={217}
                alt="journey card"
                layout="fill"
              />
            </div> */}

          <div className="w-full p-2 sm:p-6 bg-white rounded-12 shadow min-height-400">
            <div className="px-2 sm:px-6">
              <div className="px-4 py-5 space-y-6 flex flex-col items-start">
                <div className="flex flex-col gap-2 justify-start">
                  <p className="med-20 sm:med-24 text-base-700">
                    {survey?.name || <Skeleton />}
                  </p>
                  <span className="inline-flex items-center rounded-md med-14 sm:med-16 text-gray-500">
                    {locale('Total No. of Questions:')}{' '}
                    {survey?.totalQuestions || <Skeleton />}
                  </span>
                </div>
                <pre className="reg-16 sm:reg-20 text-gray-800 break-words whitespace-pre-line">
                  {survey?.openingMessage || <Skeleton count={5} />}
                </pre>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="self-end inline-flex justify-center items-center px-6 py-3 width-200 height-50 border border-transparent text-base font-medium rounded-6 shadow-sm text-white bg-base-600 hover:bg-base-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
            onClick={() =>
              router.push(`/journey/${journey_id}/event-batch/${event_batch_id}/survey/${survey_id}/page/1`)
            }
          >
            {locale('Begin Survey')}
          </button>
        </div>
      </div>
    </div>
  );
}
