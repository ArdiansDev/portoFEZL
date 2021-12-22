import NextImage from 'components/NextImage';
import Skeleton from 'react-loading-skeleton';

import {
  DatabaseIcon,
  StarIcon,
  TicketIcon,
  TemplateIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import JourneyListCard from 'components/JourneyListCard';
import { useJourney } from 'hooks/journeys/useJourney';
import { useJourneyProgress } from 'hooks/journeys/useJourneyProgress';
import { useState } from 'react';
import ModalChallenge from 'components/ModalChallenge';
import React from 'react';
import { locale } from 'utils/locale';
import { useAuth } from 'context/AuthContext';
import JourneySectionCard from 'components/JourneySectionCard';
import GemsIcons from 'public/GemsIcon';

export default function JourneyDetail() {
  const router = useRouter();
  const { journey_id } = router.query;
  if (!router.isReady) return null;

  const { permission } = useAuth();
  if (!permission['view_journey'])
    return <div>You are not allowed to enter this page</div>;

  const { data: journey } = useJourney({ journey_id });
  const { data: journeyProgress } = useJourneyProgress({ id: journey_id });
  const [showChallenges, setShowChallenges] = useState(false);

  const { userProgress, items } = journey || {};
  const progressPercentage =
    (userProgress?.completedItemCount / userProgress?.totalItem) * 100;

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 items-center">
        <main className="py-5 flex gap-5 sm:flex-row flex-col sm:w-full">
          <aside className="w-full sm:max-width-302 sm:min-width-302 sm:min-height-751 h-max bg-white flex flex-col self-center sm:self-start top-20 p-6 space-y-6 sm:sticky rounded-12 shadow items-center">
            <div className="height-217 width-254 relative">
              <NextImage
                className="rounded-8"
                src={journey?.imageSecureUrl}
                objectFit="contain"
                alt="journey card"
                layout="fill"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <p className="med-14 text-gray-900">
                {journey?.title || <Skeleton />}
              </p>
              <p className="reg-12 text-gray-600">
                {journey?.description || <Skeleton />}
              </p>
            </div>
            {userProgress && userProgress?.totalItem > 0 ? (
              <div className="w-full flex gap-2 flex-col">
                <p className="text-left med-14 text-gray-600">
                  {locale('Journey Progress')}
                </p>
                <div className="flex gap-2 items-center">
                  <div>
                    <svg
                      width="100%"
                      height="8"
                      viewBox="0 0 100% 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current text-base-600"
                    >
                      <rect width="100%" height="8" rx="4" fill="#F5F5F5" />
                      <rect
                        width={`${progressPercentage}%`}
                        height="8"
                        rx="4"
                      />
                    </svg>
                  </div>
                  <p className="med-12 min-w-max text-base-700">
                    {userProgress?.completedItemCount} of{' '}
                    {userProgress?.totalItem} Items
                  </p>
                </div>
              </div>
            ) : (
              <Skeleton />
            )}
            <div className="w-full flex flex-col gap-3">
              {(journeyProgress?.earnedCoins > 0 ||
              journeyProgress?.totalCoins > 0) && permission['view_rewards_coins']? (
                <div className="rounded-md flex gap-5 items-center px-4 py-2 border border-base-700">
                  <div className="bg-base-500 w-10 h-10 p-2 rounded-xl flex items-center justify-center">
                    <DatabaseIcon
                      stroke="white"
                      strokeWidth="2"
                      className="w-6"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="reg-12 text-gray-500">
                      {locale('Total Coins Earned')}
                    </p>
                    <p className="med-14 text-gray-900 ">
                      {journeyProgress?.earnedCoins} {locale('of')}{' '}
                      {journeyProgress?.totalCoins}
                    </p>
                  </div>
                </div>
              ) : (
                <></>
              )}
              {(journeyProgress?.earnedStamps > 0 ||
              journeyProgress?.totalStamps > 0) && permission['view_stamps'] ? (
                <div className="rounded-md flex gap-5 items-center px-4 py-2 border border-base-700">
                  <div className="bg-base-500 w-10 h-10 p-2 rounded-xl flex items-center justify-center">
                    <TicketIcon
                      stroke="white"
                      strokeWidth="2"
                      className="w-6"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="reg-12 text-gray-500">
                      {locale('Total Badges Earned')}
                    </p>
                    <p className="med-14 text-gray-900 ">
                      {journeyProgress?.earnedStamps} of{' '}
                      {journeyProgress?.totalStamps}
                    </p>
                  </div>
                </div>
              ) : (
                <></>
              )}
              {journeyProgress?.earnedScore > 0 ||
              journeyProgress?.totalScore > 0 ? (
                <div className="rounded-md flex gap-5 items-center px-4 py-2 border border-base-700">
                  <div className="bg-base-500 w-10 h-10 p-2 rounded-xl flex items-center justify-center">
                    <StarIcon stroke="white" strokeWidth="2" className="w-6" />
                  </div>
                  <div className="flex flex-col">
                    <p className="reg-12 text-gray-500">
                      {locale('Total Score Earned')}
                    </p>
                    <p className="med-14 text-gray-900 ">
                      {journeyProgress?.earnedScore} of{' '}
                      {journeyProgress?.totalScore}
                    </p>
                  </div>
                </div>
              ) : (
                <></>
              )}
              {(journeyProgress?.earnedGems > 0 ||
              journeyProgress?.totalGems > 0) && permission['view_rewards_gems'] ? (
                <div className="rounded-md flex gap-5 items-center px-4 py-2 border border-base-700">
                  <div className="bg-base-500 w-10 h-10 p-2 rounded-xl flex items-center justify-center">
                    {/* <StarIcon stroke="white" strokeWidth="2" className="w-6" /> */}
                    <GemsIcons stroke="white" strokeWidth="2" className="h-4" />
                  </div>
                  <div className="flex flex-col">
                    <p className="reg-12 text-gray-500">
                      {locale('Total Gems Earned')}
                    </p>
                    <p className="med-14 text-gray-900 ">
                      {journeyProgress?.earnedGems} of{' '}
                      {journeyProgress?.totalGems}
                    </p>
                  </div>
                </div>
              ) : (
                <></>
              )}
              {permission['view_journey_challenge'] && (
                <div className="rounded-md flex gap-5 items-center px-4 py-2 border border-base-700">
                  <div className="bg-base-500 w-10 h-10 p-2 rounded-xl flex items-center justify-center">
                    <TemplateIcon
                      stroke="white"
                      strokeWidth="2"
                      className="w-6"
                    />
                  </div>

                  <div className="flex flex-col">
                    <p className="reg-12 text-gray-500">
                      {locale('Challenges')}
                    </p>
                    <p className="med-14 text-gray-900 ">
                      {journeyProgress?.completedChallengeCount} {locale('of')}{' '}
                      {journeyProgress?.totalChallenge}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </aside>

          <section className="w-full mx-auto flex flex-col gap-5">
            <div className="flex justify-between items-center mt-4">
              <p className="med-24 text-gray-900">List of Content</p>
              {/* <button
                type="button"
                className="inline-flex gap-2 items-center px-4 py-2 border border-base-600 text-base font-medium rounded-md shadow-sm text-base-600 bg-white hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500"
                onClick={()=>setShowChallenges(true)}
              >
                <div className="bg-base-500 rounded-lg px-1.5 py-1.5 items-center justify-center">
                  <PuzzleIcon stroke="white" className="w-5 h-5" />
                </div>
                Challenges
              </button> */}
            </div>
            {/* List Content */}

            <div className="flex gap-5 flex-col">
              {(items &&
                items?.map((item) => {
                  if (
                    (item?.itemType?.toLowerCase() === 'event' && permission['view_event']) ||
                    (item?.itemType?.toLowerCase() === 'workshop' && permission['view_workshop']) ||
                    (item?.itemType?.toLowerCase() === 'webinar' && permission['view_webinar']) ||
                    (item?.itemType?.toLowerCase() === 'task' && permission['view_task']) ||
                    (item?.itemType?.toLowerCase() === 'survey' && permission['view_survey']) ||
                    (item?.itemType?.toLowerCase() === 'quiz' && permission['view_exam']) ||
                    (item?.itemType?.toLowerCase() === 'media' && permission['view_media']) ||
                    (item?.itemType?.toLowerCase() === 'link' && permission['view_link']) ||
                    (item?.itemType?.toLowerCase() === 'resource' && permission['view_resources'])
                  ) {
                    return (
                      <div>
                        {item.itemType !== 'section' ? (
                          <JourneyListCard
                            type={item.itemType}
                            title={item.title}
                            remainingAttempts={item.remainingAttempts}
                            completed={item.state === 'completed'}
                            retake={item?.state === 'retake'}
                            offRetakeLimit={item?.state === 'off_retake_limit'}
                            key={item.id}
                            onClick={() => {
                              let url = `/journey/${journey_id}/event-batch/${
                                item.eventBatchId
                              }/${item.itemType.toLowerCase()}/${item.id}`;
                              if (item.itemType.toLowerCase() === 'survey') {
                                url += `/welcome`;
                              }

                              if (item.itemType.toLowerCase() === 'quiz') {
                                url += `/question/${item.id}`;
                              }
                              router.push(url);
                            }}
                          />
                        ) : (
                          <JourneySectionCard
                            item={item}
                            title={item.title}
                            journey_id={journey_id}
                            userProgress={userProgress}
                          />
                        )}
                      </div>
                    );
                  }
                })) || (
                <React.Fragment>
                  <Skeleton count={3} /> <Skeleton count={3} />{' '}
                  <Skeleton count={3} /> <Skeleton count={3} />{' '}
                  <Skeleton count={3} /> <Skeleton count={3} />{' '}
                  <Skeleton count={3} /> <Skeleton count={3} />
                </React.Fragment>
              )}
            </div>
          </section>
        </main>
      </div>
      {showChallenges && (
        <ModalChallenge open={showChallenges} setOpen={setShowChallenges} />
      )}
    </div>
  );
}
