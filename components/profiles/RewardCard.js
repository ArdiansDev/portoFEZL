import React, { useState } from 'react';
import RewardsInstruction from './RewardsInstruction';
import RewardsModal from './RewardsModal';
import { DatabaseIcon } from '@heroicons/react/outline';
import Gems from 'public/Gems.svg';

export default function RewardCard({ data, dataUser, filter }) {
  const [Show, setShow] = useState(false);
  const [ShowInstruction, setShowInstruction] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleCloseInstruction = () => {
    setShowInstruction(false);
  };

  return (
    <>
      <div
        className={
          'flex justify-between items-start flex-col bg-white shadow rounded-6 p-6  mobile:min-w-full  height-267 mt-3 text-black ' +
          (filter
            ? 'md:width-360 defaultUOB:width-310'
            : 'ultraWide:width-460 mobile:width-310 defaultUOB:width-400  ')
        }
        key={data.id}
      >
        <div className="font-light text-gray-500 space-y-2">
          <h1 className="med-20 text-gray-800">{data.name}</h1>
          <p className="reg-12 text-gray-400">
            Available until {data.availableDate}
          </p>
          <p className="reg-14 text-gray-500 line-clamp-2">
            {data.description}
          </p>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex w-max items-center font-bold text-base-800">
            {data.currency == 'coin' ? (
              <DatabaseIcon
                className="h-5 w-5 text-base-600 mr-1"
                aria-hidden="true"
              />
            ) : (
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
            )}
            <h2 className=" w-max mx-1  med-16 text-base-600">{data.points}</h2>
            <h2 className=" w-max mr-1 med-16 text-base-600 capitalize">
              {data.currency}s
            </h2>
          </div>

          <button
            type="button"
            className="inline-flex items-center px-7 py-2.5 border border-transparent text-sm leading-5 font-medium rounded-md shadow-sm text-white bg-base-600 hover:bg-base-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500 disabled:text-gray-300 disabled:bg-gray-100 cursor-pointer"
            disabled={
              data?.currency == 'gem'
                ? dataUser?.userGems < data?.points
                : dataUser?.userPoints < data?.points
            }
            onClick={() => setShow(true)}
          >
            Redeem
          </button>
        </div>
        {Show && (
          <RewardsModal
            setisSuccess={setisSuccess}
            data={data}
            Show={Show}
            setShow={setShowInstruction}
            handleClose={handleClose}
            dataUser={dataUser}
          />
        )}

        {ShowInstruction && (
          <RewardsInstruction
            rewardId={data?.id}
            isSuccess={isSuccess}
            Show={ShowInstruction}
            handleClose={handleCloseInstruction}
          />
        )}
      </div>
    </>
  );
}
