import React, { useEffect, useState } from 'react';
import NextImage from 'components/NextImage';
import rewardsBanner from 'public/abc/rewardsBanner.png';
import RewardCard from './RewardCard';
import { useRewards } from 'hooks/rewards/useRewards';
import { TicketIcon } from '@heroicons/react/solid';
import { DatabaseIcon, GiftIcon } from '@heroicons/react/outline';
import Gems from 'public/Gems.svg';
import { useAuth } from 'context/AuthContext';
import GiftCard from 'public/GiftCard.png';
import { locale } from 'utils/locale';

export const RewardsTab = () => {
  const [SelectedRewards, setSelectedRewards] = useState('All');
  const { data, isLoading } = useRewards();
  if (isLoading) return null;
  const dataSliced = data?.rewards;
  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(3)
      : Math.sign(num) * Math.abs(num);
  };
  function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  const { permission, user } = useAuth();

  let gemReward = dataSliced?.filter((data) => data.currency === 'gem');
  let coinReward = dataSliced?.filter((data) => data.currency === 'coin');
  let allReward =
    SelectedRewards === 'Gems'
      ? gemReward
      : SelectedRewards === 'All'
      ? dataSliced
      : coinReward;
  // let showFilter = gemReward.length > 0 && coinReward.length > 0;
  let showFilter = user?.departmentName == 'Contact Centre';
  return (
    <div className="max-width-928">
      <div className="bg-yellow-500 rounded-lg my-4 height-100 mobile:h-20 items-center flex justify-between p-4 mobile:p-2 text-white mobile:w-full">
        <div className="min-width-89 mobile:min-width-48">
          <NextImage
            layout="responsive"
            objectFit="contain"
            src={rewardsBanner}
            alt=""
          />
        </div>
        <h1 className="med-24 ml-6 mobile:med-12 flex w-full items-center">
          {locale('Rewards Currency')}
        </h1>

        <div className="flex w-max mobile:flex-col mobile:mt-2 ">
          {permission['view_rewards_coins']  && <div className="self-center px-4 flex ml-16 mobile:height-28 mobile:w-max mobile:min-width-116 mobile:ml-4 height-60 border-2  w-full max-width-240 mobile:  border-white rounded-full items-center justify-center ">
            <DatabaseIcon className="height-30 mr-4 mobile:w-5" />
            <h2 className="reg-20 mobile:reg-12 flex w-max">
              {numberWithCommas(data?.userPoints)} {locale('Coins')}
            </h2>
          </div>}
          {permission['view_rewards_gems'] && data?.userGems != null ? (
            <div className="self-center flex ml-4 w-max px-4 mobile:height-28 mobile:min-width-116 mobile:mt-2  mobile:ml-4 height-60 border-2  max-width-240  border-white rounded-full items-center justify-center ">
              <div className="width-30 mobile:w-5">
                <NextImage src={Gems} layout="responsive" objectFit="contain" />
              </div>
              <h2 className="reg-20 ml-4 w-max mobile:reg-12 flex">
                {numberWithCommas(data?.userGems)}
                {locale('Gems')}
              </h2>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="flex w-full ">
        <div className="flex w-full max-width-944 flex-wrap mobile:flex-col justify-between">
          <div className="flex mobile:flex-col w-full">
            {permission['view_rewards_gems'] && showFilter ? (
              <div className="mr-4 mobile:mr-0">
                <button
                  onClick={() => setSelectedRewards('All')}
                  className={
                    'width-178 mt-4 rounded-xl flex justify-between items-center p-4 h-10 mobile:w-full ' +
                    (SelectedRewards === 'All'
                      ? 'bg-blue-800   text-white'
                      : 'bg-blue-100 text-blue-800')
                  }
                >
                  <h1>All Rewards </h1>
                  <GiftIcon className="width-20" />
                </button>
                <button
                  onClick={() => setSelectedRewards('Gems')}
                  className={
                    'width-178 mt-4 rounded-xl flex justify-between items-center p-4 h-10 mobile:w-full ' +
                    (SelectedRewards === 'Gems'
                      ? 'bg-blue-800   text-white'
                      : 'bg-blue-100 text-blue-800')
                  }
                >
                  <h1>{locale('Gems Rewards')}</h1>
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
                </button>
                <button
                  onClick={() => setSelectedRewards('Coins')}
                  className={
                    'width-178 mt-4 rounded-xl flex justify-between items-center p-4 h-10 mobile:w-full ' +
                    (SelectedRewards === 'Coins'
                      ? 'bg-blue-800   text-white'
                      : 'bg-blue-100 text-blue-800')
                  }
                >
                  <h1>{locale('Coins Rewards')} </h1>
                  <DatabaseIcon className="w-4" />
                </button>
              </div>
            ) : (
              <></>
            )}

            {allReward?.length !== 0 ? (
              <div className="gap-2 grid grid-cols-2  max-width-928 flex-wrap mobile:grid-cols-1">
                {allReward?.map((dataCard) => (
                  <RewardCard
                    filter={showFilter}
                    data={dataCard}
                    dataUser={data}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full min-height-240 h-max text-gray-400 flex flex-col  justify-center items-center bg-gray-50 shadow rounded mt-4 p-4 mobile:px-2">
                {/* <TicketIcon className="mobile:h-6  h-12 mr-4" /> */}
                <NextImage src={GiftCard} alt="" width={118} height={90} />
                <h1 className="mt-6 text-center">
                  {locale('Rewards is not available at this time')}
                </h1>
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
        </div>
      </div>
    </div>
  );
};
