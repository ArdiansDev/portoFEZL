import React, { useState } from 'react';
import NextImage from 'components/NextImage';
import { EnterChallenge } from './EnterChallenge';
import emptyBox from 'public/abc/emptyBox.svg';
import InviteCard from './InviteCard';
import Games from '../Games';
import { useUserChallengesInvited } from 'hooks/challenges/useUserChallanges';
import { useUserChallengesOngoing } from 'hooks/challenges/useUserChallanges';
import { locale } from 'utils/locale';

export const InvitationTab = () => {
  const [gameId, setGameId] = useState();
  const [gameData, setGameData] = useState();

  const [show, setShow] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const toggleGame = () => {
    if (screen.width < 640) {
      setShow(!show);
      setMobileView(true);
    } else {
      setShow(!show);
    }
  };

  const { data, isLoading } = useUserChallengesInvited();
  let { data: ongoingData, isLoading: isLoadingInvitation } =
    useUserChallengesOngoing();
  if (isLoading || isLoadingInvitation) return null;

  return (
    <div className="flex mobile:flex-col">
      {gameId === undefined || null || !show ? (
        <></>
      ) : (
        <Games
          show={show}
          toggleGame={toggleGame}
          gameId={gameId}
          gameData={gameData}
          mobileView={mobileView}
          setMobileView={setMobileView}
        />
      )}

      {ongoingData?.data?.length > 0 ? (
        <div className="w-full max-height-655 overflow-auto">
          {ongoingData.data &&
            ongoingData.data?.map((data) => (
              <EnterChallenge
                data={data}
                gameId={data?.challenge?.id}
                toggleGame={toggleGame}
                key={data?.id}
                setGameId={setGameId}
                setGameData={setGameData}
              />
            ))}
        </div>
      ) : (
        <EnterChallenge gameId={gameId} toggleGame={toggleGame} />
      )}

      <div className="flex items-center flex-col text-center shadow width-328 h-max bg-white ml-4 rounded-xl p-4 text-gray-500 text-md mobile:ml-0 mobile:mt-4 mobile:w-full">
        <h1>Challenge Invites</h1>
        {data?.data?.length === 0 ? (
          <div>
            <NextImage src={emptyBox} alt="" />
            <p className="text-xs text-gray-300">
              {locale('No Challenge Invites')}
            </p>
          </div>
        ) : (
          <div className="overflow-auto max-height-600">
            {data?.data &&
              data?.data?.map((data) => {
                return (
                  <InviteCard
                    key={data.challenge.id}
                    title={data.challenge.title}
                    description={data.challenge.description}
                    duration={data.challenge.duration}
                    points={data.challenge.totalPoint}
                    gem={data.challenge.totalGem}
                    currency={data.challenge.currency}
                    id={data.challenge.id}
                    userChallengeId={data.id}
                  />
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};
