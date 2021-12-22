import React, { useState } from 'react';
import { DatabaseIcon } from '@heroicons/react/outline';
import { useRewards } from 'hooks/rewards/useRewards';
import Skeleton from 'react-loading-skeleton';
import { locale } from 'utils/locale';
import { useAuth } from 'context/AuthContext';
import { TicketIcon } from '@heroicons/react/solid';
import RewardsModal from 'components/profiles/RewardsModal';
import RewardsInstruction from 'components/profiles/RewardsInstruction';
import GiftCard from 'public/GiftCard.png';
import NextImage from 'components/NextImage';
export default function Rewards() {
  const { data } = useRewards();
  const { rewards, userPoints, userGems } = data || {};

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

  const { permission } = useAuth();
  if (!permission['view_rewards'])
    return <div>You are not allowed to enter this page</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <section className="pb-16 flex flex-col space-y-12 pt-8">
        <div className="flex flex-col space-y-3">
          <p className="med-24 text-gray-900">{locale('Rewards')}</p>
          {rewards?.length > 0 ? (
            <div className="grid grid-cols-auto-fit-reward gap-5">
              {(rewards &&
                rewards?.map((reward) => (
                  <div className="flex flex-col p-6 w-full max-width-627 sm:min-width-627 bg-white rounded-8 shadow hover:shadow-lg">
                    <div className="flex flex-col space-y-12">
                      <div className="flex flex-col space-y-3">
                        <div className="flex flex-col space-y-2">
                          <p className="med-20 text-gray-800">{reward.name}</p>
                          <p className="reg-12 text-gray-400">
                            {locale('Available until')} {reward.availableDate}
                          </p>
                        </div>
                        <p className="reg-14 text-gray-500 line-clamp-2">
                          {reward.description}
                        </p>
                      </div>

                      <div className="flex justify-between">
                        <div className="flex items-center gap-1">
                          {reward.currency === 'gem' ? (
                            <svg
                              className="stroke-current"
                              width="15"
                              height="15"
                              viewBox="0 0 35 31"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M33.2091 8.73L28.8063 0.75H17.2491H5.69182L1.28906 8.73L17.7994 29.25L33.2091 8.73ZM33.2091 8.73H2.38975"
                                stroke="currentColor"
                                stroke-width="2"
                              />
                              <path
                                d="M11.1914 8.72852L17.7955 26.9685L23.299 8.72852"
                                stroke="currentColor"
                                stroke-width="2"
                              />
                              <path
                                d="M23.299 8.73L17.7955 0.75M11.1914 8.73L15.5942 0.75"
                                stroke="currentColor"
                                stroke-width="2"
                              />
                            </svg>
                          ) : (
                            <DatabaseIcon
                              className="h-5 w-5 text-base-600"
                              aria-hidden="true"
                            />
                          )}
                          <p className="med-16 text-base-600">
                            {reward.points}{' '}
                            {reward.currency === 'gem' ? 'Gems' : 'Coins'}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="inline-flex items-center px-7 py-2.5 border border-transparent text-sm leading-5 font-medium rounded-md shadow-sm text-white bg-base-600 hover:bg-base-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500 disabled:text-gray-300 disabled:bg-gray-100"
                          disabled={
                            reward?.currency == 'gem'
                              ? userGems < reward?.points
                              : userPoints < reward?.points
                          }
                          onClick={() => {
                            setShow(true);
                            setCurrentReward(reward);
                          }}
                        >
                          {locale('Redeem')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))) || (
                <React.Fragment>
                  {' '}
                  <Skeleton count={5} /> <Skeleton count={5} />{' '}
                  <Skeleton count={5} /> <Skeleton count={5} />{' '}
                  <Skeleton count={5} /> <Skeleton count={5} />{' '}
                </React.Fragment>
              )}
            </div>
          ) : (
            <div className="w-full height-240 text-gray-400 flex flex-col justify-center items-center bg-gray-50 shadow rounded mt-4">
              {/* <TicketIcon className="mobile:h-6  h-12 mr-4" /> */}
              <NextImage src={GiftCard} alt="" width={118} height={90} />
              <h1 className="mt-6">
                To view the list of upcoming rewards, visit:
              </h1>{' '}
              <a
                target="_blank"
                href="https://tinyurl.com/unprmf9f"
                className="text-base-700 cursor-pointer hover:underline"
              >
                https://tinyurl.com/unprmf9f
              </a>
            </div>
          )}
        </div>
      </section>

      {Show && (
        <RewardsModal
          setisSuccess={setisSuccess}
          data={currentReward}
          Show={Show}
          setShow={setShowInstruction}
          handleClose={handleClose}
          dataUser={data}
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
