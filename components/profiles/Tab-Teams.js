import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Table } from './Table';
import { useTeams, useTeamsSelect, useMeTeams } from 'hooks/teams/useTeams';
import { useQueryErrorResetBoundary } from 'react-query';
import {
  ClipboardCheckIcon,
  HashtagIcon,
  StarIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';
import TeamDropdown from './TeamDropdown';
import Pagination from 'components/Pagination';
import usePagination from '@lucasmogari/react-pagination';
import { useAuth } from 'context/AuthContext';
import { locale } from 'utils/locale';

export const TeamsTab = ({ userData }) => {
  const { permission } = useAuth();
  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
      : Math.sign(num) * Math.abs(num);
  };
  const [teamId, setTeamid] = useState(data?.data?.[0]?.id);
  const [selectedTeam, setSelectedTeam] = useState('Select Team');
  const { data, isLoading, isSuccess } = useTeams();
  const { data: TeamSelect } = useTeamsSelect({ id: userData?.user.id });
  const { data: meTeam } = useMeTeams({ teamId });

  const [totalItems, setTotalItems] = useState(21);

  const pagination = usePagination({
    page: 1,
    totalItems,
    itemsPerPage: 5,
    maxPageItems: 7,
    numbers: true,
    arrows: true,
  });

  const page = pagination?.page;

  useEffect(() => {
    if (data?.data) {
      setTotalItems(data?.data?.length);
    }
  }, [data]);

  // const router = useRouter();
  if (isLoading) {
    return (
      <React.Fragment>
        <Skeleton count={5} /> <Skeleton count={5} /> <Skeleton count={5} />{' '}
      </React.Fragment>
    );
  } else {
    const paginate = data?.data?.slice(5 * (page - 1), 5 * page) || [];

    return (
      <div className="mt-4">
        {TeamSelect?.length > 5 && (
          <div className="w-full justify-end flex mb-4">
            <TeamDropdown
              setTeamid={setTeamid}
              data={TeamSelect?.data}
              selectedTeam={selectedTeam}
              setSelectedTeam={setSelectedTeam}
            />
          </div>
        )}

        {permission['view_teams_leaderboards_buble'] &&
          <div className="grid grid-rows-1 grid-flow-col gap-2 mobile:grid-flow-row">
            <div className="bg-white width-screen-20 w-full shadow  height-140 rounded-lg mobile:mt-2 items-center justify-center p-4  flex  mobile:h-max mobile:w-full">
              <ClipboardCheckIcon className="mobile:h-6 text-base-700 h-12 mr-4" />
              <div className="mobile:flex mobile:text-left items-center mobile:justify-between mobile:w-full">
               <h1 className="text-gray-500"> {locale('Completed Items')}</h1>
                <h2 className="text-xl text text-base-800">
                  {meTeam?.data?.itemCompleted || 0}
                </h2>
              </div>
            </div>
            <div className="bg-white width-screen-20 w-full shadow  height-140 rounded-lg  mobile:mt-2 items-center p-8 mobile:p-4 flex  mobile:h-max mobile:w-full">
              <StarIcon className="mobile:h-6 text-base-700 h-12 mr-4" />
              <div className="mobile:flex mobile:text-left items-center mobile:justify-between mobile:w-full">
                <h1 className="text-gray-500">{locale('Team Score')}</h1>
                <h2 className="text-xl text text-base-800">
                  {kFormatter(meTeam?.data?.score) || 0}
                </h2>
              </div>
            </div>
            <div className="bg-white width-screen-20 w-full shadow  height-140 rounded-lg mobile:mt-2 items-center p-8 mobile:p-4 flex  mobile:h-max mobile:w-full">
              <UserGroupIcon className="mobile:h-6 text-base-700 h-12 mr-4" />

              <div className="mobile:flex mobile:text-left items-center mobile:justify-between mobile:w-full">
                <h1 className="text-gray-500">{locale('No. of Teams')}</h1>
                <h2 className="text-xl text text-base-800">
                  {kFormatter(meTeam?.data?.totalUserGroups) || 0}
                </h2>
              </div>
            </div>
          </div>
        }

        {permission['view_teams_leaderboards'] &&
          <>
            <Table
              data={paginate}
              selectedTeam={selectedTeam}
              userTitle="Group Name"
              isPagination={data?.data?.length > 5}
              page={page}
              dataAvailable={data?.data?.length > 0}
            />
            {data?.data?.length > 5 && (
              <Pagination
                pagination={pagination}
                className={
                  'border-gray-200  px-4 py-3 bg-white justify-end border-t rounded-bl-lg rounded-br-lg shadow'
                }
              />
            )}
          </>
        }
      </div>
    );
  }
};
