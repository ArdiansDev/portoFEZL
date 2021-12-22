import React, { useEffect } from 'react';
import NextImage from 'components/NextImage';
import surprise from 'public/abc/surprise.png';
import { useRedeems } from 'hooks/rewards/useUserRewards';

import xClose from 'public/abc/xClose.svg';
import { DatabaseIcon } from '@heroicons/react/outline';

export default function RewardsModal({
  data,
  Show,
  handleClose,
  setShow,
  setdataInstruction,
  setisSuccess,
  dataUser,
}) {
  function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const handleRedeem = () => {
    setShow(true);
    handleClose();
    handleRedeemPost();
  };

  const handleRedeemPost = () => {
    mutate(Redeempayload);
  };
  const Redeempayload = {
    userReward: {
      rewardId: data?.id,
      rewardPublishedDtlId: data?.rewardPublishedDtlId,
    },
  };
  const { mutate, data: dataInstruction, isSuccess } = useRedeems({});
  useEffect(() => {
    if (isSuccess) {
      setdataInstruction(dataInstruction);
      setisSuccess(true);
    }
  }, [isSuccess]);

  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(3)
      : Math.sign(num) * Math.abs(num);
  };

  return (
    <div style={Show ? { display: 'block' } : { display: 'none' }}>
      <div
        onClick={handleClose}
        className="z-20 fixed top-0 h-screen left-0 bg-black opacity-30"
        style={{
          width: '100vw',
          height: '100vh',
        }}
      ></div>
      <div className="bg-orange-700 mobile:w-full items-center z-40 flex md:max-width-700 lg:width-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg ">
        <div
          onClick={handleClose}
          className="absolute right-6 top-4 cursor-pointer w-max"
        >
          <NextImage
            src={xClose}
            alt=""
            width={16}
            height={16}
            layout="fixed"
          />
        </div>
        <div className="md:flex hidden bg-orange-700 h-full w-64 justify-center items-center rounded-l-lg">
          <NextImage src={surprise} alt="" layout="fixed" objectFit="cover" />
        </div>
        <div className="p-8 bg-white rounded-r-lg width-564 h-full flex flex-col justify-between space-y-6">
          <h1 className=" font-semibold text-gray-700 text-xl">{data?.name}</h1>

          <div className="flex justify-between">
            <div className="text-base-700 flex flex-row items-start">
              <DatabaseIcon className="w-5 mr-1" />
              <p>
                {' '}
                {numberWithCommas(data?.points)}{' '}
                {data?.currency === 'gem' ? 'Gems' : 'Coins'}
              </p>
            </div>
            <h1 className="text-gray-600 text-xs mt-0 font-light ml-1">
              {data?.expirationDate
                ? `Expiration date ${data?.expirationDate}`
                : 'Non Expiring'}
            </h1>
          </div>
          <pre className="text-gray-600 reg-14 break-words whitespace-pre-line">
            {data?.description}
          </pre>

          <div>
            <div className="flex mobile:flex-col mobile:items-start justify-between mt-10 items-center">
              <h1 className=" text-lg font-light text-base-800">
                My {data?.currency === 'gem' ? 'Gems' : 'Coins'}{' '}
                {numberWithCommas(
                  data?.currency === 'gem'
                    ? dataUser?.userGems
                    : dataUser?.userPoints
                )}
              </h1>

              <div className="mobile:mt-4 flex">
                <button
                  onClick={handleClose}
                  className="bg-white p-2 mr-3 rounded-6 border border-gray-600 width-134 height-40 items-center text-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRedeem}
                  className="bg-base-600 p-2 rounded-6 border border-base-500 width-134 height-40 items-center text-white"
                >
                  Redeem Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
