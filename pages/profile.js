import NextImage from 'components/NextImage';
import Equalizer from 'public/abc/Equalizer.svg';
import Globe from 'public/abc/Globe.svg';
import User from 'public/abc/User.svg';
import Star from 'public/abc/Star.svg';
import useUser from 'hooks/auth/useUser';
import { useState } from 'react';
import { GiftIcon, PuzzleIcon, UserGroupIcon } from '@heroicons/react/solid';
import { IndividualTab } from 'components/profiles/Tab-Individual';
import { TeamsTab } from 'components/profiles/Tab-Teams';
import { RewardsTab } from 'components/profiles/Tab-Rewards';
import { ChallengeTab } from 'components/profiles/Tab-Challenge';
import HistoryComponent from 'components/profiles/HistoryComponent';
import { ViewBoardsIcon } from '@heroicons/react/solid';
import { kFormatter } from 'utils/kFormatter';
import { locale } from 'utils/locale';
import { useRouter } from 'next/router';
import { useAuth } from 'context/AuthContext';

export default function Profile() {
  const router = useRouter();
  if (!router.isReady) return null;
  const { query } = router || {};

  const {
    user,
    isLoading,
    data: userData,
  } = useUser({
    redirectTo: '/login',
    redirectIfFound: false,
  });

  const [tab, setTab] = useState(query.tab ?? 'profile');
  const [SubTab, setSubTab] = useState(query.subtab || 'weekly');

  const { permission } = useAuth();
  if (!permission['view_profile'])
    return <div>You are not allowed to enter this page</div>;

  if (isLoading) return null;
  return (
    <div className="min-h-screen flex justify-center py-10 md:overflow-auto  sm:justify-start  ">
      <div className="flex mobile:flex-col ">
        <div className="mobile:p-4 ">
          <aside className="bg-white shadow rounded-xl flex items-center  width-scren-23 width-326 h-max flex-col p-4 mobile:w-full  ">
            <div className="rounded-full width-64 height-64 mb-4">
              {user?.img ? (
                <NextImage src={user?.img} alt="" width="64" height="64" />
              ) : (
                <div className="text-center bg-base-700 rounded-full  justify-center flex items-center height-64 text-white text-3xl capitalize">
                  {user?.name.slice(0, 1)}
                </div>
              )}
            </div>
            <h1>{user?.name}</h1>
            {permission['view_position'] && (
              <p className="mb-4 text-gray-400">
                {user?.positionName ?? 'No Position'}
              </p>
            )}
             <div className="w-full text-sm grid gap-4 mt-4">
              {permission['view_completed_items'] && 
                <div className="flex justify-between ">
                  <div className="flex ">
                    <div className="width-44 height-44 bg-gray-50 flex items-center justify-center rounded-xl">
                      <NextImage src={Equalizer} alt="" width="25" height="25" />
                    </div>
                    <div className="mx-10">
                      <h1>{locale('Items')}</h1>
                      <p className="text-gray-400 text-xs">
                        {locale('Completed Items')}
                      </p>
                    </div>
                  </div>
                  <div className="width-52 height-44 bg-gray-50 flex items-center justify-center rounded-lg text-gray-600">
                    {user?.itemCompleted ? kFormatter(user?.itemCompleted) : 0}
                  </div>
                </div>
              }
              {permission['view_individual_score'] &&
                <div className="flex justify-between">
                  <div className="flex">
                    <div className="width-44 height-44 bg-gray-50 flex items-center justify-center rounded-xl">
                      <NextImage src={Globe} alt="" width="25" height="25" />
                    </div>
                    <div className="mx-10">
                      <h1>{locale('Individual Score')}</h1>
                      <p className="text-gray-400 text-xs">
                        {locale('Your Progress')}
                      </p>
                    </div>
                  </div>

                  <div className="width-52 height-44 bg-gray-50 flex items-center justify-center rounded-lg text-gray-600">
                    {user?.individualScore
                      ? kFormatter(user?.individualScore)
                      : 0}
                  </div>
                </div>
              }
              <div className="flex justify-between">
                <div className="flex">
                  <div className="width-44 height-44 bg-gray-50 flex items-center justify-center rounded-xl">
                    <NextImage src={User} alt="" width="25" height="25" />
                  </div>
                  <div className="mx-10">
                    <h1>{locale('Team Score')}</h1>
                    <p className="text-gray-400 text-xs">
                      {locale('Team Progress')}
                    </p>
                  </div>
                </div>
                <div className="width-52 height-44 bg-gray-50 flex items-center justify-center rounded-lg text-gray-600">
                  {user?.teamScore ? kFormatter(user?.teamScore) : 0}
                </div>
              </div>
              {permission['view_rewards_coins']  && 
                <div className="flex justify-between">
                  <div className="flex">
                    <div className="width-44 height-44 bg-gray-50 flex items-center justify-center rounded-xl">
                      <NextImage src={Star} alt="" width="25" height="25" />
                    </div>
                    <div className="mx-10">
                      <h1>{locale('Rewards')}</h1>
                      <p className="text-gray-400 text-xs">
                        {locale('Rewards Coins')}
                      </p>
                    </div>
                  </div>
                  <div className="width-52 height-44 bg-gray-50 flex items-center justify-center rounded-lg text-gray-600">
                    {user?.rewardPoints ? kFormatter(user?.rewardPoints) : 0}
                  </div>
                </div>
              }
            </div>
          </aside>
          <div className="mobile:hidden">
            <HistoryComponent active={tab} SubTab={SubTab} />
          </div>
        </div>
        <section className="ml-6 mobile:ml-0 mobile:mt-4 defaultUOB:max-width-820 ">
          {/* TabProfile */}
          <div className="flex space-x-4 mobile:space-x-2  mobile:px-4 ">
            <button
              onClick={() => {
                setTab('profile');
              }}
              disabled={!permission['view_individual_leaderboards']}
              className={
                ' height-160 width-screen-15  md:width-200   ultraWide:width-220 shadow mobile:w-20 mobile:h-24 mobile:text-xs flex items-center justify-center rounded-xl cursor-pointer ' +
                (!permission['view_individual_leaderboards']
                ? 'bg-gray-200  '
                : `${tab === 'profile' ? 'bg-secondary' : 'bg-white '}`)
              }
            >
              {!permission['view_individual_leaderboards'] ? (
                <div className="absolute  hover:opacity-100 hover:bg-opacity-70 opacity-0 capitalize items-center justify-center hover:bg-gray-100 height-160 width-screen-15 rounded-xl  ultraWide:width-220 shadow mobile:w-20 mobile:h-24">
                  <h1 className="justify-center self-center h-full text-gray-400 items-center flex ">
                    coming soon
                  </h1>
                </div>
              ) : (
                <></>
              )}
              <div
                className={
                  tab === 'profile'
                    ? 'filter brightness-200 justify-center h-full p-6  flex flex-col '
                    : 'justify-center h-full p-6 flex flex-col'
                }
              >
                <ViewBoardsIcon className="text-gray-300 h-8 mb-4" />
                <h1 className="text-gray-400 text-center">
                  {locale('Profile')}
                </h1>
              </div>
            </button>
            {/* Tab Team */}
            <button
              onClick={() => {
                setTab('teams');
              }}
              disabled={!permission['view_teams']}
              className={
                ' height-160 width-screen-15  md:width-200    ultraWide:width-220 shadow  mobile:w-20 mobile:h-24 mobile:text-xs flex items-center justify-center rounded-xl cursor-pointer ' +
                (!permission['view_teams']
                  ? 'bg-gray-200  '
                  : `${tab === 'teams' ? 'bg-secondary' : 'bg-white '}`)
              }
            >
              {!permission['view_teams'] ? (
                <div className="absolute  hover:opacity-100 hover:bg-opacity-70 opacity-0 capitalize items-center justify-center hover:bg-gray-100 height-160 width-screen-15 rounded-xl  ultraWide:width-220 shadow mobile:w-20 mobile:h-24">
                  <h1 className="justify-center self-center h-full text-gray-400 items-center flex ">
                    coming soon
                  </h1>
                </div>
              ) : (
                <></>
              )}

              <div
                className={
                  tab === 'teams'
                    ? 'filter brightness-200 justify-center h-full p-6  flex flex-col '
                    : 'justify-center h-full p-6  flex flex-col'
                }
              >
                <UserGroupIcon className="text-gray-300 h-8 mb-4" />
                <h1 className="text-gray-400 text-center">{locale('Teams')}</h1>
              </div>
            </button>
            {/* Tab Rewards */}
            <button
              disabled={!permission['view_rewards']}
              onClick={() => {
                setTab('rewards');
              }}
              className={
                ' height-160 width-screen-15  md:width-200    ultraWide:width-220 shadow mobile:w-20 mobile:h-24 mobile:text-xs flex items-center justify-center rounded-xl cursor-pointer ' +
                (!permission['view_rewards']
                  ? 'bg-gray-200  '
                  : `${tab === 'rewards' ? 'bg-secondary' : 'bg-white '}`)
              }
            >
              {!permission['view_rewards'] ? (
                <div className="absolute  hover:opacity-100 hover:bg-opacity-70 opacity-0 capitalize items-center justify-center hover:bg-gray-100 height-160 width-screen-15 rounded-xl  ultraWide:width-220 shadow mobile:w-20 mobile:h-24">
                  <h1 className="justify-center self-center h-full text-gray-400 items-center flex ">
                    coming soon
                  </h1>
                </div>
              ) : (
                <></>
              )}

              <div
                className={
                  tab === 'rewards'
                    ? 'filter brightness-200 justify-center h-full p-6  flex flex-col '
                    : 'justify-center h-full p-6  flex flex-col'
                }
              >
                <GiftIcon className="text-gray-300 h-8 mb-4" />
                <h1 className="text-gray-400 text-center">
                  {locale('Rewards')}
                </h1>
              </div>
            </button>
            {/* Tab Challenge */}
            <button
              disabled={!permission['view_challenges']}
              onClick={() => {
                setTab('challenge');
              }}
              className={
                ' height-160 width-screen-15 md:width-200  ultraWide:width-220 shadow mobile:w-20 mobile:h-24 mobile:text-xs flex items-center justify-center rounded-xl cursor-pointer ' +
                (!permission['view_challenges']
                  ? 'bg-gray-200  '
                  : `${tab === 'challenge' ? 'bg-secondary' : 'bg-white '}`)
              }
            >
              {!permission['view_challenges'] ? (
                <div className="absolute  hover:opacity-100 hover:bg-opacity-70 opacity-0 capitalize items-center justify-center hover:bg-gray-100 height-160 width-screen-15 rounded-xl  ultraWide:width-220 shadow mobile:w-20 mobile:h-24">
                  <h1 className="justify-center self-center h-full text-gray-400 items-center flex ">
                    coming soon
                  </h1>
                </div>
              ) : (
                <></>
              )}

              <div
                className={
                  tab === 'challenge'
                    ? 'filter brightness-200 justify-center h-full p-6  flex flex-col '
                    : 'justify-center h-full p-6  flex flex-col'
                }
              >
                <PuzzleIcon className="text-gray-300 h-8 mb-4" />
                <h1 className="text-gray-400 text-center">Challenges</h1>
              </div>
            </button>
          </div>
          <div className="mobile:p-4 ">
            {tab === 'profile' ? (
              <IndividualTab selectedTeam={user?.name} />
            ) : tab === 'teams' ? (
              <TeamsTab userData={userData} />
            ) : tab === 'rewards' ? (
              <RewardsTab />
            ) : (
              <ChallengeTab changeSubTab={setSubTab} SubTab={SubTab} />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
