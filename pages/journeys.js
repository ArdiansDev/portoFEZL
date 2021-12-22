import { JourneyCard } from 'components/JourneyCard';
import { useJourneys } from 'hooks/journeys/useJourneys';
import React from 'react';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import { locale } from 'utils/locale';
import { useAuth } from 'context/AuthContext';

export default function Journeys() {
  let { data } = useJourneys();
  const router = useRouter();

  let journeys = data;

  const { permission } = useAuth();
  if (!permission['view_journey'])
    return <div>You are not allowed to enter this page</div>;

  return (
    <div className="flex flex-col">
      <section className="pb-16 flex flex-col space-y-12 pt-8">
        <div className="flex flex-col space-y-6 ">
          {/* <div className="flex flex-col space-y-3">
            <p className="med-24 text-gray-900">{locale("Journeys Started")}</p>
            <div className="grid grid-cols-auto-fit gap-5">
              {journeys && journeys?.map((journey) => (
                <div onClick={() => router.push(`/journey/${journey?.id}`)}>
                  <JourneyCard journey={journey} key={journey?.id} />
                </div>
              )) || <React.Fragment> <Skeleton count={5}/> <Skeleton count={5}/> <Skeleton count={5}/> <Skeleton count={5}/> <Skeleton count={5}/> </React.Fragment>}
            </div>
          </div> */}

          <div className="flex flex-col space-y-3">
            <p className="med-24 text-gray-900">
              {locale('Journeys Available')}
            </p>
            <div className="grid grid-cols-auto-fit gap-5">
              {(journeys &&
                journeys
                  ?.filter?.((journey) => journey?.id !== 9895)
                  ?.map((journey) => (
                    <div onClick={() => router.push(`/journey/${journey?.id}`)}>
                      <JourneyCard journey={journey} key={journey?.id} />
                    </div>
                  ))) || (
                <React.Fragment>
                  {' '}
                  <Skeleton count={5} /> <Skeleton count={5} />{' '}
                  <Skeleton count={5} /> <Skeleton count={5} />{' '}
                  <Skeleton count={5} />{' '}
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
