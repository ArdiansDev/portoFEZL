import NextImage from "components/NextImage";
import React, { useEffect, useState } from 'react';
import Rocket from 'public/abc/Rocket.svg';
import starPoints from 'public/abc/starPoints.svg';
import { CheckCircleIcon } from '@heroicons/react/solid';

const ChallengeCardMini = ({
  Title,
  Percentage,
  Coins,
  CompletedItems,
  TotalItems,
}) => {
  const [Completed, setCompleted] = useState(false);
  useEffect(() => {
    if (Percentage === '100%') {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  }, [Percentage]);
  return (
    <div className="bg-white space-x-2 shadow-md height-92 my-2 rounded-lg flex px-5 items-center mobile:p-2 mobile:justify-between mobile:text-xs">
      <div className="mobile:hidden">
        <NextImage src={Rocket} alt="" />
      </div>
      <div className="ml-5 mobile:ml-0">
        <h1 className="line-clamp-2 max-w-lg text-left mobile:max-w-xs mobile:max-h-8 mobile:overflow-hidden">
          {Title}
        </h1>
        <div className="flex items-center text-sm">
          <svg
            className="width-full mobile:w-44 mr-2"
            // width="520"
            height="8"
            // viewBox="0 0 520 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="100%" height="8" rx="4" fill="#F5F5F5" />
            <rect
              width={Percentage}
              height="8"
              rx="4"
              fill={Completed ? '#52C41A' : '#FAAD14'}
            />
          </svg>
          {Completed ? (
            <CheckCircleIcon className="h-4 w-4 text-green-600" />
          ) : (
            <p>{Percentage}</p>
          )}
        </div>
      </div>
      <div className="ml-4 flex flex-col items-end mobile:items-start mobile:ml-0">
        <span className="flex text-yellow-500 mobile:flex-col">
          {/* <div className="mobile:hidden">
            <NextImage src={starPoints} alt="" />
          </div> */}
          <h1 className="ml-4 mobile:ml-0">{Coins}Coins</h1>
        </span>
        {Completed ? (
          <h1 className="text-xs text-green-600">Completed</h1>
        ) : (
          <h1 className="text-gray-700 text-xs">
            {CompletedItems} of {TotalItems} items
          </h1>
        )}
      </div>
    </div>
  );
};
export default ChallengeCardMini;
