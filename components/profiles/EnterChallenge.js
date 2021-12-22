import React from 'react';
import NextImage from 'components/NextImage';
import JoystickBig from 'public/abc/JoyStickBig.svg';
import moment from 'moment';
import {
  ArrowCircleRightIcon,
  ClockIcon,
  GiftIcon,
} from '@heroicons/react/solid';
import { DateTime, Duration } from 'luxon';
import GiftCard from 'public/GiftCard.png';

export const EnterChallenge = ({
  toggleGame,
  setGameId,
  setGameData,
  data,
}) => {
  const handleEnter = () => {
    setGameId(data?.challenge.id);
    setGameData(data);
    toggleGame();
  };
  const dateCreated = moment(data?.challenge?.createdAt)
    .local()
    .format('DD MMMM YYYY')
    .toString();

  let timeRemaining = data?.timeRemaining;

  const titlecase = (sentence) => {
    sentence = sentence?.toLowerCase().split('_');
    for (let i = 0; i < sentence?.length; i++) {
      sentence[i] = sentence[i][0]?.toUpperCase() + sentence[i]?.slice(1);
    }
    return sentence.join(' ');
  };

  let timeRemainingInFormat = Duration.fromObject({
    seconds: timeRemaining,
  }).toFormat("mm 'min' ss 'sec'");

  return (
    <div className="w-full h-max bg-white rounded-lg shadow flex justify-center mobile:w-full mb-4">
      {data === undefined ? (
        <div className="flex flex-col items-center height-250 justify-center text-base-600">
          <NextImage src={JoystickBig} alt="" />
          <h1 className="mt-4 text-gray-500">
            Accept a challenge invite to play!
          </h1>
        </div>
      ) : (
        <div className="w-full ">
          <div className="bg-base-700 w-full rounded-t-lg text-white p-4 justify-between flex  items-center">
            <div>
              <h1 className="capitalize">{data?.challenge.title}</h1>
              <h1>Created at {dateCreated}</h1>
            </div>
            <div className="bg-base-100 capitalize text-base-700 px-2 ml-2 w-max rounded-lg self-start justify-self-start">
              {data?.state}
            </div>
          </div>
          <div className="w-full  flex flex-col  p-6 ">
            <div className="flex justify-between">
              <h1>Complete this Quiz to win</h1>
              {data?.challenge?.challengeType && (
                <h1 className="capitalize bg-yellow-100 text-yellow-800 px-3 rounded">
                  {titlecase(data?.challenge.challengeType)}
                </h1>
              )}
            </div>
            <div className="flex bg-gray-50 text-gray-700 text-md mb-4 justify-between p-2 mt-4 rounded-lg">
              <div className="flex ">
                <ClockIcon fill="gray-700" width="18" />
                <h1 className="ml-2">Time Remaining</h1>
              </div>
              <h1>{timeRemainingInFormat}</h1>
            </div>
            <div>
              <div className="flex bg-gray-50 text-gray-700 text-md p-2 justify-between rounded-lg">
                <div className="flex ">
                  <GiftIcon fill="gray-700" width="18" />
                  <h1 className="ml-2">Rewards </h1>
                </div>
                {data.challenge.currency == 'gem' ? (
                  <h1>{data.challenge.totalGem ?? 0} Gems</h1>
                ) : (
                  <h1>{data.challenge.totalPoint ?? 0} Coins</h1>
                )}
              </div>
            </div>

            <button
              onClick={handleEnter}
              className="bg-base-600 w-max h-9 items-center self-center mt-4 p-4 flex text-white text-sm rounded-lg cursor-pointer disabled:bg-gray-100 disabled:text-gray-300"
            >
              <ArrowCircleRightIcon fill="white" width="24" />
              <h1 className="ml-3">{`${
                data.state === 'ongoing' ? 'Continue' : 'Enter'
              } Challenge`}</h1>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
