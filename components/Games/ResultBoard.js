import React, { useState } from 'react';
import Times from 'public/abc/Times.svg';
import StarResult from 'public/abc/StarResult.svg';
import Crown from 'public/abc/Crown.svg';
import ProgressBoard from './Progress';
import NextImage from 'components/NextImage';
import { useChallengeResult } from 'hooks/challenges/useChallengeResult';

export default function ResultBoard({ gameId }) {
  const { data: resultData, isLoading } = useChallengeResult({
    id: gameId,
  });

  const [progressBtn, setProgressBtn] = useState(false);
  const handleBtn = () => {
    setProgressBtn(!progressBtn);
  };
  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
      : Math.sign(num) * Math.abs(num);
  };
  if (isLoading) {
    return <h1 style={{ margin: '100px', color: 'white' }}>Loading Data...</h1>;
  } else {
    const realtime = resultData.data.completionTime;
    const unfMinutes = Math.floor(realtime / 60);
    const unfSeconds = realtime - unfMinutes * 60;
    const minutes = ('0' + unfMinutes).slice(-2);
    const seconds = ('0' + unfSeconds).slice(-2);
    return (
      <div>
        {progressBtn ? (
          <ProgressBoard
            handleBtn={handleBtn}
            gameId={gameId}
            title="Results"
          />
        ) : (
          <div className="items-center justify-center flex flex-col w-full text-center p-4">
            <h1 className="text-orange-500 text-stroke-3 mt-7 font-bold text-6xl mobile:text-4xl">
              RESULTS
            </h1>
            <div className="flex items-center w-full mt-10 flex-col">
              <div className="bg-white width-760 height-305 items-center flex flex-col  p-6 rounded-xl mobile:w-full ">
                <div className=" flex items-center justify-between med-24 text-gray-800 mobile:w-full h-max mobile:flex-col">
                  <div className="flex mr-3 bg-yellow-100 rounded-xl mb-6 mobile:mb-4 width-334 height-86 items-center mobile:mr-0 mobile:w-full mobile:height-74 mobile:text-xs">
                    <div className="flex items-center px-4 mobile:w-full">
                      <div className="mr-4 ">
                        <NextImage
                          width="45"
                          height="45"
                          src={StarResult}
                          layout="fixed"
                          alt=""
                        />
                      </div>
                      <p className="text-yellow-700 w-max reg-24 mobile:reg-12">
                        Result %
                      </p>
                    </div>
                    <div className=" flex justify-end  w-full ml-5 p-4">
                      <p className="text-yellow-700 reg-24 mobile:reg-12">
                        {resultData.data.resultPercentage} %
                      </p>
                    </div>
                  </div>
                  <div className="flex px-4 bg-red-100 rounded-xl mb-6 mobile:mb-4 width-334 height-86 items-center mobile:height-74 mobile:w-full mobile:text-xs">
                    <div className="mr-4">
                      <NextImage
                        width="45"
                        height="45"
                        layout="fixed"
                        src={Times}
                        alt=""
                      />
                    </div>
                    <p className="text-red-800">Time</p>
                    <div className=" flex text-right justify-center mobile:mr-0 flex-col w-full mr-5 text-red-800">
                      {minutes}:{seconds}
                    </div>
                  </div>
                </div>
                <div className="flex bg-blue-100 width-680 height-86 items-center rounded-xl px-4 mobile:w-full">
                  <div className="mobile:w-12 mr-4">
                    <NextImage
                      src={Crown}
                      alt="crown"
                      width="45"
                      height="45"
                      layout="fixed"
                    />
                  </div>
                  <div className="flex justify-between w-full">
                    <h1 className="text-blue-800 med-24 mobile:med-12">
                      Your Rank
                    </h1>
                    <h1 className=" text-blue-800 med-24 font-extrabold mobile:med-20">
                      {kFormatter(resultData.data.currentRank)}
                    </h1>
                  </div>
                </div>
              </div>
              <button
                className="bg-orange-400  text-white text-2xl p-2 rounded-3xl width-304 height-80 border-4 -mt-6 border-white "
                onClick={() => {
                  handleBtn();
                }}
              >
                View Progress
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
