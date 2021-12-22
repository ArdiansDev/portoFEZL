import { JourneyCard } from 'components/JourneyCard';
import Banners from 'components/BannersCarousels';
import { useJourneys } from 'hooks/journeys/useJourneys';
import { ErrorBoundary } from 'react-error-boundary';
import React, { useState } from 'react';
import { useQueryErrorResetBoundary } from 'react-query';
import { useRouter } from 'next/router';
import { DatabaseIcon } from '@heroicons/react/outline';
import { useResources } from 'hooks/resources/useResources';
import { useRewards } from 'hooks/rewards/useRewards';
import { ResourceCard } from 'components/ResourceCard';
import Skeleton from 'react-loading-skeleton';
import RewardsModal from 'components/profiles/RewardsModal';
import RewardsInstruction from 'components/profiles/RewardsInstruction';
import {
  ExternalLinkIcon,
  TicketIcon,
  ViewBoardsIcon,
} from '@heroicons/react/solid';
import { useAuth } from 'context/AuthContext';
import NextImage from 'components/NextImage';
import GiftCard from 'public/GiftCard.png';

export default function Home() {
  const { permission } = useAuth();
  if (!permission['view_home'])
    return <div>You are not allowed to enter this page</div>;

  let { data } = useJourneys();
  let journeys = data

  const { data: rewardsData } = useRewards();
  let { data: resources } = useResources();
  
  const { rewards, userPoints, userGems } = rewardsData || {};
  const { reset } = useQueryErrorResetBoundary();
  const router = useRouter();

  const [Show, setShow] = useState(false);
  const [ShowInstruction, setShowInstruction] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [currentReward, setCurrentReward] = useState();

  const handleClose = () => {
    setShow(false);
  };
  const handleCloseInstruction = () => {
    setShowInstruction(false);
  };

  return (
    <div className="flex flex-col">
      <section className="pb-16 flex flex-col sm:space-y-12 space-y-8 pt-4 sm:pt-8">
        {permission['view_banner'] && <Banners />}

        {permission['view_journey'] && (
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between">
              <p className="med-24 text-gray-900">Journeys</p>
              {journeys?.length > 3 && (
                <p
                  className="text-base-700 cursor-pointer hover:underline"
                  onClick={() => router.push(`/journeys`)}
                >
                  see more
                </p>
              )}
            </div>

            {journeys?.length !== 0 ? (
              <div className={'grid grid-cols-auto-fit gap-5'}>
                {journeys?.filter?.(journey => journey?.id !== 9895)?.slice(0, 3)?.map((journey) => (
                  <ErrorBoundary
                    onReset={reset}
                    fallbackRender={({ resetErrorBoundary }) => (
                      <div>
                        There was an error!
                        <button onClick={() => resetErrorBoundary()}>
                          Try again
                        </button>
                      </div>
                    )}
                    key={journey?.id}
                  >
                    <div onClick={() => router.push(`/journey/${journey?.id}`)}>
                      <JourneyCard journey={journey} key={journey?.id} />
                    </div>
                  </ErrorBoundary>
                )) || (
                  <React.Fragment>
                    <Skeleton count={5} /> <Skeleton count={5} />{' '}
                    <Skeleton count={5} />
                  </React.Fragment>
                )}
              </div>
            ) : (
              <div className="w-full bg-gray-50 flex justify-center items-center flex-col height-410 text-gray-300">
                <ViewBoardsIcon className="height-53" />
                <p>Journeys are not available at this time</p>
              </div>
            )}
          </div>
        )}

        {permission['view_rewards'] && (
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between">
              <p className="med-24 text-gray-900">Rewards</p>
              {rewards?.length > 2 && (
                <p
                  className="text-base-700 cursor-pointer hover:underline"
                  onClick={() => router.push(`/profile?tab=rewards`)}
                >
                  see more
                </p>
              )}
            </div>
            {rewards?.length !== 0 ? (
              <div className="grid grid-cols-auto-fit-reward gap-6">
                {rewards?.slice(0, 2)?.map((reward) => (
                  <div
                    key={reward.id}
                    className="flex flex-col p-6 w-full max-width-627 sm:min-width-627 bg-white rounded-8 shadow hover:shadow-lg"
                  >
                    <div className="flex flex-col space-y-12">
                      <div className="flex flex-col space-y-3">
                        <div className="flex flex-col space-y-2">
                          <p className="med-20 text-gray-800">{reward.name}</p>
                          <p className="reg-12 text-gray-400">
                            Available until {reward.availableDate}
                          </p>
                        </div>
                        <p className="reg-14 text-gray-500 line-clamp-2">
                          {reward.description}
                        </p>
                      </div>

                      <div className="flex justify-between">
                        <div className="flex items-center gap-1">
                          <DatabaseIcon
                            className="h-5 w-5 text-base-600"
                            aria-hidden="true"
                          />
                          <p className="med-16 text-base-600">
                            {reward.points}{' '}
                            {reward.currency === 'coin' ? 'Coins' : 'Gems'}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="inline-flex items-center px-7 py-2.5 border border-transparent text-sm leading-5 font-medium rounded-md shadow-sm text-white bg-base-600 hover:bg-base-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500 disabled:text-gray-300 disabled:bg-gray-100 cursor-pointer"
                          disabled={
                            reward.currency === 'coin'
                              ? userPoints < reward.points
                              : userGems < reward.points
                          }
                          onClick={() => {
                            setShow(true);
                            setCurrentReward(reward);
                          }}
                        >
                          Redeem
                        </button>
                      </div>
                    </div>
                  </div>
                )) || (
                  <React.Fragment>
                    {' '}
                    <Skeleton count={5} /> <Skeleton count={5} />{' '}
                    <Skeleton count={5} />{' '}
                  </React.Fragment>
                )}
              </div>
            ) : (
              <div className="w-full min-height-240 h-max text-gray-400 flex flex-col  justify-center items-center bg-gray-50 shadow rounded mt-4 p-4 mobile:px-2">
                {/* <TicketIcon className="mobile:h-6  h-12 mr-4" /> */}
                <NextImage src={GiftCard} alt="" width={118} height={90} />
                <h1 className="mt-6 text-center">
                Rewards is not available at this time
                </h1>{' '}
                {/* <a
                  target="_blank"
                  href="https://unitedoverseasbankgroup.sharepoint.com/sites/BetterFestival/SitePages/Game.aspx"
                  className="text-base-700 cursor-pointer mobile:max-width-320 break-words text-center hover:underline"
                >
                  https://unitedoverseasbankgroup.sharepoint.com/sites/BetterFestival/SitePages/Game.aspx
                </a> */}
              </div>
            )}
          </div>
        )}

        {permission['view_resources'] && (
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between">
              <p className="med-24 text-gray-900">Resources</p>
              {resources?.length > 3 && (
                <p
                  className="text-base-700 cursor-pointer hover:underline"
                  onClick={() => router.push(`/resources`)}
                >
                  see more
                </p>
              )}
            </div>
            {resources?.length !== 0 ? (
              <div className={'grid grid-cols-auto-fit gap-5'}>
                {resources
                  ?.slice(0, 3)
                  ?.map((resource) => <ResourceCard resource={resource} />) || (
                  <React.Fragment>
                    {' '}
                    <Skeleton count={5} /> <Skeleton count={5} />{' '}
                    <Skeleton count={5} />{' '}
                  </React.Fragment>
                )}
              </div>
            ) : (
              <div className="w-full bg-gray-50 flex justify-center items-center flex-col height-410 text-gray-300">
                <ExternalLinkIcon className="height-53" />
                <p>Resources are not available at this time</p>
              </div>
            )}
          </div>
        )}
      </section>

      {Show && (
        <RewardsModal
          setisSuccess={setisSuccess}
          data={currentReward}
          Show={Show}
          setShow={setShowInstruction}
          handleClose={handleClose}
          dataUser={rewardsData}
        />
      )}

      {ShowInstruction && (
        <RewardsInstruction
          rewardId={currentReward?.id}
          isSuccess={isSuccess}
          Show={ShowInstruction}
          handleClose={handleCloseInstruction}
        />
      )}
    </div>
  );
}
