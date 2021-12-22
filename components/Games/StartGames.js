import React from 'react';
import Bell from 'public/abc/bell.svg';
import NextImage from 'components/NextImage';
import { useSubmitInvite } from 'hooks/challenges/useUserChallange';

export default function StartGames({ setType, data }) {
  const payload1 = {
    state: 'ongoing',
  };
  const { mutate } = useSubmitInvite({ id: data?.id });
  let challengeData = data?.challenge;

  const handleStart = () => {
    setType('quiz');
    mutate(payload1);
  };

  return (
    <div className="flex flex-col justify-center text-white font-bold">
      <div className="flex justify-center items-start ">
        <h1 className="med-38 mt-6 mb-8 mobile:text-center">
          INVITATIONAL CHALLENGE
        </h1>
      </div>

      <div className="flex justify-center justify-self-center ">
        <div className="bg-black bg-opacity-20 w-4/5 h-max min-height-384 rounded-xl pb-4 items-center px-4">
          {/* <h1 className="med-38 text-center mt-10 break-all max-h-24 overflow-y-hidden line-clamp-3">
            {challengeData?.title}
          </h1> */}
          <div className="mobile:flex-col  font-medium flex items-center min-height-384 h-full">
            <NextImage width="234px" height="236px" src={Bell} alt="" />
            <div className="w-full">
              <h1 className="med-38  w-full text-center items-center mb-4">
                {challengeData?.title}
              </h1>
              <p className="reg-14  w-full text-center items-center">
                {challengeData?.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center -mt-6">
        <button
          className="border-white bg-green-500 text-5xl font-extrabold border-8 rounded-full w-72 h-24"
          onClick={handleStart}
        >
          start
        </button>
      </div>
    </div>
  );
}
