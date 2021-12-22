import React, { useState } from 'react';
import Image from 'next/dist/client/image';
import confetti from 'public/abc/confetti.svg';
import copy from 'public/abc/copy.svg';
import calendar from 'public/abc/calendar.svg';
import xClose from 'public/abc/xClose.svg';
import { queryClient } from 'pages/_app';
import { DocumentDuplicateIcon } from '@heroicons/react/outline';

export default function RewardsInstruction({ Show, handleClose, rewardId }) {
  let data = queryClient.getQueryData(['user_reward', rewardId]);

  const [showCopied, setShowCopied] = useState(false);

  const copyToClipboard = () => {
    const body = document.querySelector('body');
    const paragraph = document.querySelector('#clipboard');
    const area = document.createElement('textarea');
    body.appendChild(area);

    area.value = paragraph.innerText;
    area.select();
    document.execCommand('copy');

    body.removeChild(area);
    setShowCopied(true);

    setTimeout(() => {
      setShowCopied(false);
    }, 1000);
  };

  if (!data) return null;

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
      <div className="bg-white mobile:w-full items-center z-40 p-8 flex w-max h-max fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-8 ">
        <div
          onClick={handleClose}
          className="absolute right-6 top-4 cursor-pointer w-max h-max"
        >
          <Image src={xClose} alt="" width={16} height={16} layout="fixed" />
        </div>
        <div className="mobile:hidden">
          <Image
            src={confetti}
            alt=""
            width={180}
            height={180}
            layout="fixed"
          />
        </div>
        <div className="ml-8 width-488">
          <h1 className="text-lilac font-semibold text-xl my-4">
            Redemption Instructions:
          </h1>
          <pre className="text-gray-600 reg-14 mb-12 break-words whitespace-pre-line">
            {data?.termsAndConditions}
          </pre>
          <h1 className="text-sm mb-4 text-gray-400">Your Code:</h1>
          <div className="bg-yellow-200 p-4 justify-between flex bg-opacity-50 rounded-6 text-base-800">
            <p className="w-full overflow-hidden" id="clipboard">
              {data?.code ?? 'No Voucher Code'}
            </p>
            {data?.code && (
              <div className="relative">
                <DocumentDuplicateIcon
                  className="h- w-6 cursor-pointer"
                  onClick={copyToClipboard}
                />
                {showCopied && (
                  <div className={`absolute z-10 bottom-10 -left-5`}>
                    Copied!
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex justify-between mt-16 ">
            <div className="flex items-center">
              <Image src={calendar} alt="" className="text-gray-600" />
              <h1 className="text-gray-600 text-xs font-light ml-1">
                {data?.expirationDate
                  ? `Expiration date ${data?.expirationDate}`
                  : 'Non Expiring'}
              </h1>
            </div>
            <button
              type="button"
              className="inline-flex items-center px-7 py-2.5 border border-transparent text-sm leading-5 font-medium rounded-md shadow-sm text-white bg-base-600 hover:bg-base-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-base-500 disabled:text-gray-300 disabled:bg-gray-100 cursor-pointer"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
