import React from 'react';
import ChallengeCard from './ChallengeCard';
import { useChallengesJourney } from 'hooks/challenges/useChallenges';
import { PuzzleIcon } from '@heroicons/react/solid';
import { locale } from 'utils/locale';

export const JourneyTab = () => {
  const { data, isLoading } = useChallengesJourney();
  if (isLoading) return null;
  const dataSliced = data?.data;

  return (
    <div className="shadow-md w-full bg-white rounded-xl  ">
      <div className="bg-base-600 text-white text-lg  font-bold py-4 w-full text-center rounded-t-xl">
        {locale('Leadership Journey Challenge')}
      </div>
      <div className="p-4 max-height-540 hideScroll overflow-y-scroll">
        {dataSliced[0] ? (
          dataSliced?.map((data) => (
            <ChallengeCard
              SelectedChallenge={SelectedChallenge}
              Percentage={data.completionPercentage}
              Title={data.title}
              Coins={data.totalPoint}
              CompletedItems={data.completedItemCount}
              TotalItems={data.totalItems}
              key={data.id}
            />
          ))
        ) : (
          <div className="flex justify-center items-center height-240 w-full bg-gray-50 text-gray-300 flex-col">
            <PuzzleIcon className="h-12 text-gray-300" />
            <p className="mobile:text-xs">
              {locale('Journey Challenge not available at this time')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
