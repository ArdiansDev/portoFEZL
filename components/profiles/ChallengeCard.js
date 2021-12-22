import NextImage from 'components/NextImage';
import React, { useEffect, useState } from 'react';
import Rocket from 'public/abc/Rocket.svg';
import { CheckCircleIcon } from '@heroicons/react/solid';

const ChallengeCard = ({
  Title,
  Percentage,
  Coins,
  CompletedItems,
  TotalItems,
  SelectedChallenge,
  key,
  Image,
  id,
  description,
}) => {
  const isCompleted = Percentage === 100;

  return (
    <div
      className={`justify-between mobile:min-height-174 p-4 rounded-lg flex border border-base-700 items-end mobile:flex-col mobile:p-4 mobile:justify-between mobile:text-xs 
        ${SelectedChallenge === id ? 'bg-blue-100' : 'bg-white'}`}
    >
      {Image && (
        <div className="mobile:hidden bg-gray-400 height-85 min-width-85 mr-5">
          <NextImage
            src={Image}
            width={85}
            height={85}
            alt=""
            objectFit="contain"
          />
        </div>
      )}
      <div className="mobile:ml-0 w-full  mobile:w-full ">
        <div className="flex items-center">
          <div className="hidden mobile:flex bg-gray-400 height-50 min-width-50 mr-4">
            <NextImage src={Image} width={50} height={50} alt="" />
          </div>
          <h1 className="max-w-lg med-14 text-gray-700 mobile:max-w-xs mobile:reg-14 mobile:overflow-hidden">
            {Title}
          </h1>
        </div>
        <p className="reg-12 text-gray-500  ">{description}</p>
        <div className="flex items-center text-sm">
          <svg
            className="width-screen-36 ultraWide:width-558 w-full mobile:w-full mr-2"
            height="6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="100%" height="6" rx="4" fill="#F5F5F5" />
            <rect
              width={`${Percentage}%`}
              height="6"
              rx="4"
              fill={isCompleted ? '#52C41A' : '#FAAD14'}
            />
          </svg>
          {isCompleted ? (
            <CheckCircleIcon className="h-4 w-4 text-green-600" />
          ) : (
            <p className="reg-12 text-gray-500">{Percentage}%</p>
          )}
        </div>
      </div>
      <div className="ml-4 flex flex-col items-end mobile:flex-row lg:max-width-120 w-full mobile:w-full mobile:justify-between mobile:items-start mobile:ml-0">
        <span className="flex text-yellow-500 mobile:flex-col">
          <h1 className="med-12 mobile:ml-0">{Coins} Coins</h1>
        </span>
        {isCompleted ? (
          <h1 className="med-14 text-green-600">Completed</h1>
        ) : (
          <h1 className="text-gray-500 reg-12">
            {CompletedItems} of {TotalItems} items
          </h1>
        )}
      </div>
    </div>
  );
};
export default ChallengeCard;
