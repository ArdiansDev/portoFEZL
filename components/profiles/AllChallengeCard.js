import React from 'react';
import { useAuth } from "context/AuthContext";

export const AllChallengeCard = ({
  type,
  data,
  setSubTab,
  setSelectedChallenge,
}) => {
  const { permission } = useAuth();
  return (
    <div>
      {type === 'weekly' && permission['view_weekly_challenge'] ? (
        <div className="rounded-xl width-301 mobile:w-24 mobile:h-32  mt-4 mobile:text-xs py-6 mobile:py-3 px-4 height-331 bg-cyan-700 flex flex-col justify-between">
          <h1 className="mobile:max-h-8 mobile:overflow-hidden">
            {data.title}
          </h1>
          <button
            onClick={() => {
              setSubTab('Weekly');
              setSelectedChallenge(data.id);
            }}
            className="bg-yellow-500 mobile:h-max rounded-3xl height-40 width-163 mobile:w-full self-center"
          >
            Weekly
          </button>
        </div>
      ) : type === 'journey' && permission['view_journey_challenge'] ? (
        <div className="rounded-xl width-301 mobile:w-24 mobile:h-32 mt-4 mobile:text-xs py-6 mobile:py-3 px-4 height-331 bg-blue-700 flex flex-col justify-between">
          <h1 className="mobile:max-h-8 mobile:overflow-hidden">
            {data.title}
          </h1>
          <button
            onClick={() => {
              setSubTab('Weekly');
              setSelectedChallenge(data.id);
            }}
            className="bg-yellow-500 mobile:h-max rounded-3xl height-40 width-163 mobile:w-full self-center"
          >
            Journey
          </button>
        </div>
      ) : type === 'journey' && permission['view_journey_challenge'] ? (
        <div className="rounded-xl width-301 mobile:w-24 mobile:h-32 mt-4 mobile:text-xs py-6 mobile:py-3 px-4 height-331 bg-blue-900 flex flex-col justify-between">
          <h1 className="mobile:max-h-8 mobile:overflow-hidden">
            {data.title}
          </h1>
          <button
            onClick={() => {
              setSubTab('Weekly');
              setSelectedChallenge(ata.id);
            }}
            className="bg-yellow-500 mobile:h-max rounded-3xl height-40 width-163 mobile:w-full self-center"
          >
            Invitational
          </button>
        </div>
      ) : <div></div>
    }
    </div>
  );
};
