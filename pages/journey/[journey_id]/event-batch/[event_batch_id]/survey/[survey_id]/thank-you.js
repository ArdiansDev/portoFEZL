import NextImage from 'components/NextImage';
import useUser from 'hooks/auth/useUser';
import { useJourneySurvey } from 'hooks/journeys/survey/useJourneySurvey';
import { useRouter } from 'next/router';
import { locale } from 'utils/locale';
import { useAuth } from 'context/AuthContext';

export default function CompleteSurvey() {
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

  let { data: survey, isLoading: isLoadingSurvey } = useJourneySurvey({
    survey_id,
    event_batch_id
  });

  if (isLoadingSurvey) return null;

  return (
    <div className="min-h-screen">
      <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 min-h-screen">
        <div className="space-x-5 flex">
          <div className="w-full p-6 bg-white rounded-12 shadow">
            <div className="px-6">
              <div className="px-4 py-5 space-y-6 flex flex-col items-center">
                <div className="flex flex-col gap-4 justify-center">
                  <p className="med-30 text-base-700">
                    {survey.closingMessage}
                  </p>
                </div>
                {/* <div>
                  <NextImage width="400" height="300" src={survey.closingImageSecureUrl} alt="" />
                </div> */}
                <div className="flex gap-4 justify-center">
                  <button
                    type="button"
                    className="hidden width-200 justify-center items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                    onClick={() => router.push(`/journey/${journey_id}`)}
                  >
                    {locale('Continue Next Item')}
                  </button>

                  <button
                    type="button"
                    className="inline-flex justify-center items-center px-6 py-3 width-200 border border-transparent text-base font-medium rounded-6 shadow-sm text-white bg-base-600 hover:bg-base-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                    onClick={() => router.push(`/journey/${journey_id}`)}
                  >
                    {locale('Back to Journey')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
