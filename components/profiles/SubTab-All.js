import React from 'react';
import { AllChallengeCard } from './AllChallengeCard';
import { useChallengesAll } from 'hooks/challenges/useChallenges';
export const AllTab = ({ setSubTab, setSelectedChallenge }) => {
  const { data, isLoading } = useChallengesAll();
  if (isLoading) return null;
  const dataSliced = data?.data;
  return (
    <div className="flex flex-wrap text-white w-full mobile:justify-start gap-5 gap-y-0.5 mobile:gap-2 font-bold text-xl height-662 hideScroll overflow-scroll">
      {dataSliced &&
        dataSliced?.map((data) => (
          <AllChallengeCard
            setSelectedChallenge={setSelectedChallenge}
            setSubTab={setSubTab}
            data={data}
            type={data.contextType}
          />
        ))}
    </div>
  );
};
