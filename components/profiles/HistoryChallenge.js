import { useUserChallengesHistory } from 'hooks/challenges/useUserChallanges';
import React, { useState } from 'react';
import HistoryModal from './HistoryModalChallenge';
import Games from '../Games';
import emptyBox from 'public/abc/emptyBox.svg';
import NextImage from 'components/NextImage';

const HistoryChallenge = () => {
  const [gameId, setGameId] = useState();
  const [Show, setShow] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const { data, isLoading } = useUserChallengesHistory();
  const [visible, setVisible] = React.useState(false);

  const toggleGame = () => {
    if (screen.width < 640) {
      setShow(!Show);
      setMobileView(true);
    } else {
      setShow(!Show);
    }
  };
  if (isLoading) return null;

  const History = data?.data?.slice(0, 5);
  return (
    <div className="mt-6 rounded-8 p-5 shadow overflow-hidden width-326 space-y-6 bg-white">
      <div className="flex justify-between items-center w-full">
        <h3
          className={
            data?.data?.length > 5
              ? 'med-16 text-gray-600'
              : 'med-16 text-gray-600 text-center w-full'
          }
        >
          Challenge History
        </h3>
        {data?.data?.length > 5 ? (
          <p
            className="cursor-pointer reg-16 hover:underline text-base-600"
            onClick={() => {
              setVisible(true);
            }}
          >
            view all
          </p>
        ) : (
          <></>
        )}
      </div>

      <div className="space-y-3">
        {History?.length > 0 ? (
          History?.map((data) => (
            <div
              className="flex justify-between  items-center mt-2"
              key={data.id}
            >
              <div className="flex h-max items-center">
                <svg
                  className="h-11 mr-2 width-3"
                  // viewBox="0 0 10 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <rect width="3px" height="100%" fill="#E5E7EB" />
                </svg>
                <div
                  className="cursor-pointer flex h-full items-start pt-2"
                  onClick={async () => {
                    if (data.state === 'declined') {
                    } else {
                      await setGameId(data.challenge.id);
                      setVisible(false);
                      setShow(true);
                    }
                  }}
                >
                  {/* <div className="bg-gray-300 width-3 justify-center  h-11 mr-2 " /> */}

                  <div className="flex flex-col gap-0.5">
                    <h1 className="font-extraLight text-gray-600 capitalize">
                      {data.challenge.title}
                    </h1>
                    <h1 className="font-extraLight text-gray-500 text-sm">
                      Invitation Challenge
                    </h1>
                  </div>
                </div>
              </div>
              <div
                className={`${
                  data.state === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                } text-sm  px-1 rounded  w-20 text-center  capitalize`}
              >
                {data.state}
              </div>
            </div>
          ))
        ) : (
          <div className="justify-items-center flex flex-col">
            <NextImage src={emptyBox} alt="" />
            <p className="text-xs text-gray-300 text-center">
              No Rewards History
            </p>
          </div>
        )}
      </div>

      <HistoryModal
        Show={visible}
        data={data}
        setVisible={setVisible}
        setGameId={setGameId}
        setShow={setShow}
      />

      {gameId === undefined || null || !Show ? (
        <></>
      ) : (
        <Games
          toggleGame={toggleGame}
          gameId={gameId}
          mobileView={mobileView}
          setMobileView={setMobileView}
        />
      )}
    </div>
  );
};

export default HistoryChallenge;
