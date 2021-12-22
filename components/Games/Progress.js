import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import React, { useState, useEffect } from 'react';
import { useChallengeProgress } from 'hooks/challenges/useChallengeProgress';
import { useLeaderboards } from 'hooks/leaderboards/useLeaderboards';
import Pagination from 'components/Pagination';
import usePagination from '@lucasmogari/react-pagination';

export default function ProgressBoard({ handleBtn, title, gameId }) {
  const [Tab, setTab] = useState(false);
  const id = gameId;
  let { data: progressData, isLoading: gameLoading } = useChallengeProgress({
    id: gameId,
  });

  const handleTab = () => {
    setTab(!Tab);
  };

  // leaderBoardData = leaderBoardData?.data ?? leaderBoardData;
  progressData = progressData?.data ?? progressData;

  const pagination = usePagination({
    page: 1,
    itemsPerPage: 4,
    maxPageItems: 7,
    numbers: true,
    arrows: true,
  });

  const page = pagination?.page;
  let { data: leaderBoardData, isLoading } = useLeaderboards({
    id,
    query: { page: page, perPage: pagination.itemsPerPage },
  });
  useEffect(() => {
    if (leaderBoardData?.data) {
      let totalPages =
        leaderBoardData?.pagination?.totalPages > 10
          ? 10
          : leaderBoardData?.pagination?.totalPages;
      pagination.setTotalItems(totalPages * pagination?.itemsPerPage);
    }
  }, [leaderBoardData]);

  const TabContent = () => {
    if (Tab === true) {
      if (gameLoading) {
        return (
          <h1 className="width-400 mt-6  mobile:w-full mobile:h-full items-center flex flex-wrap justify-center">
            loading data
          </h1>
        );
      } else {
        return (
          <div className="flex mobile:w-full mt-8 mobile:h-full mb-6 items-center mobile:flex-col  ">
            <div>
              <div className="width-400 mt-6  mobile:w-full mobile:h-full items-center flex flex-wrap justify-center">
                {progressData.puzzleImages &&
                  progressData.puzzleImages?.map((data) => (
                    <div>
                      <img
                        src={data.secureUrl}
                        alt=""
                        className="height-80 mobile:h-14 m-2"
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className="width-311 mobile:height-246 mr-8 mt-8 mobile:m-0 bg-white rounded-16 p-4 mobile:mx-14 text-center">
              <h1 className="font-bold text-base-800 text-center">SCORECARD</h1>
              <div className="bg-base-300 p-3 text-white rounded-2xl text-left mb-2">
                {progressData.accuiredItems} Pieces Acquired
              </div>
              <div className="bg-base-500 p-3 text-white rounded-2xl text-left">
                {progressData.missedItems} Pieces Missed
              </div>
              <div className="flex mt-2 text-white mobile:text-xs">
                <div className="bg-green-500 rounded-2xl w-full h-full justify-center items-center flex flex-col p-2 mr-2">
                  <div className="w-6 ">
                    <CheckCircleIcon fill="white" />
                  </div>
                  <p>Correct</p>
                  <p>Answer</p>
                  <h1>{progressData.correctAnswers}</h1>
                </div>
                <div className="bg-red-500 rounded-2xl w-full justify-center items-center flex flex-col p-2 mr-2">
                  <div className="w-6 ">
                    <XCircleIcon fill="white" />
                  </div>
                  <p>Wrong</p>
                  <p>Answer</p>
                  <h1>{progressData.wrongAnswers}</h1>
                </div>
              </div>
            </div>
          </div>
        );
      }
    } else {
      if (isLoading) {
        return (
          <h1 className="text-white width-600 mt-6  mobile:w-full mobile:h-full items-center flex flex-wrap justify-center">
            loading data
          </h1>
        );
      } else {
        return (
          <div className="mt-10 mx-4 mobile:mt-10">
            <div className="flex bg-white rounded-xl h-14 items-center px-2 text-orange-500 font-bold mobile:text-xs mobile:w-full ">
              <div className="width-100 mobile:width-80 justify-center flex mobile:mx-2">
                Rank
              </div>
              <div className="width-300 mobile:w-full ml-4">Username</div>
              <div className="width-150 sm:block hidden mobile:w-full text-center mx-2">
                Pieces Unlocked
              </div>
              <div className="width-115 mobile:width-50 text-center mx-2">
                Result %
              </div>
              <div className="width-150 mobile:width-50 text-center mx-2">
                Progress
              </div>
            </div>

            {leaderBoardData.data &&
              leaderBoardData.data.map((data) => (
                <div
                  key={data.id}
                  className="flex bg-gray-300 bg-opacity-60  mobile:reg-12  rounded-xl h-12 items-center text-white font-bold my-2 "
                >
                  <div className="width-100 mobile:m-0 mobile:width-80 height-38  items-center mx-2 justify-center flex">
                    {data.rank}
                  </div>
                  <div className="width-300 mobile:m-0 -mt-1.5 mobile:-mt-0 mobile:width-150 mx-2 max-height-40 whitespace-wrap mobile:mr-0">
                    {data.user.name}
                  </div>
                  <div className="width-150 sm:block hidden text-center  mobile:w-full mx-2">
                    {data.accuiredItems}
                  </div>
                  <div className="width-115 mobile:width-50 text-center mr-3">
                    {data.resultPercentage}%
                  </div>
                  <div className="width-150 text-center mobile:width-50 mx-2">
                    <p>
                      {data.score} of {data.maxScore}
                    </p>
                  </div>
                </div>
              ))}
            <Pagination
              pagination={pagination}
              className={
                'rounded-lg bg-none justify-end mobile:justify-center'
              }
            />
          </div>
        );
      }
    }
  };

  return (
    <div className="p-2">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <h1 className="text-white font-bold text-5xl mt-12 mb-4 mobile:text-3xl mobile:mt-8">
          PROGRESS
        </h1>
      </div>
      <div className="justify-center flex -mb-16 ">
        <div className="flex text-xl font-bold z-20 text-orange-500 border-2 bg-gray-50 border-white w-max height-60 rounded-3xl cursor-pointer justify-center items-center mobile:w-full">
          <div
            onClick={handleTab}
            className={
              Tab
                ? 'text-white border-4 border-white bg-orange-500 rounded-3xl width-304 h-full mobile:full  items-center text-center flex justify-center'
                : 'width-304 h-full mobile:full  items-center text-center flex justify-center'
            }
          >
            Pieces Unlocked
          </div>
          <div
            onClick={handleTab}
            className={
              Tab
                ? 'width-304 h-full mobile:full items-center text-center flex justify-center '
                : 'text-white border-4 border-white bg-orange-500 rounded-3xl width-304 h-full mobile:full items-center text-center flex justify-center'
            }
          >
            Leaderboard
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div
          className="w-max height-400 rounded-24 mobile:w-full mobile:h-full justify-center flex py-8 "
          style={{
            background: 'rgba(40, 54, 134, 0.44)',
          }}
        >
          <TabContent />
        </div>
      </div>
      <div className="justify-center flex mt-1">
        <button
          className="bg-green-500 p-4 absolute rounded-full border-white border-4 text-white text-2xl font-bold"
          onClick={handleBtn}
        >
          Back to {title}
        </button>
      </div>
    </div>
  );
  // }
}
