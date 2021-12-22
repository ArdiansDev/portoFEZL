import React, { useRef, useEffect, useState } from 'react';
import NextImage from 'components/NextImage';
import {
  StarIcon,
  TicketIcon,
  DatabaseIcon,
  CheckCircleIcon,
} from '@heroicons/react/outline';

export const JourneyCard = ({ journey }) => {
  const { userProgress } = journey;
  let title = journey.title;
  let hasToolTips = title.length > 35 ? 'has-tooltip' : '';

  return (
    <div className="min-width-320 max-width-412 shadow hover:shadow-lg flex flex-col space-y-6 rounded-8 bg-white cursor-pointer">
      <div className="w-full relative height-200">
        <NextImage
          className="w-full rounded-tr-8 rounded-tl-8"
          src={journey?.imageSecureUrl}
          alt="journey card"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="p-6 space-y-6">
        <div class={hasToolTips}>
          <p className="med-20 text-gray-800 capitalize line-clamp-1">
            {title}
          </p>
          <span class="tooltip rounded max-width-320 shadow-lg py-1.5 px-2.5 ml-20 bg-gray-500 text-white -mb-12  reg-12 ">
            {title}
          </span>
        </div>
        <p className="reg-14 text-gray-500 line-clamp-2 height-66">
          {journey.description}
        </p>
        <div className className="w-full height-1 bg-gray-200"></div>
        <div className="flex justify-between">
          <div
            className={`${
              userProgress?.completedItemCount > 0
                ? 'text-base-500'
                : 'text-gray-500'
            } flex items-center gap-1 sm:mr-0 mr-4`}
          >
            <p className={`reg-12 `}>
              {userProgress?.completedItemCount} of {userProgress?.totalItem}{' '}
              Items Completed
            </p>
            <CheckCircleIcon
              className="h-4 w-4 sm:block hidden"
              aria-hidden="true"
            />
          </div>

          {/* <div className={`${userProgress?.completedChallengeCount > 0 ? "text-base-500" : "text-gray-500"} flex items-center gap-1`}>
                  <p className="reg-12">
                      {userProgress?.completedChallengeCount} of{" "}
                      {userProgress?.totalChallenge} Challenges Completed
                  </p>
                  <CheckCircleIcon
                      className="h-4 w-4 sm:block hidden"
                      aria-hidden="true"
                  />
              </div> */}
        </div>
      </div>
    </div>
  );
};
