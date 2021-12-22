import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Table } from './Table';
import Stamps from '../Stamps';
import {
  useIndividualRanking,
  useMeRanking,
} from 'hooks/individual_ranking/useIndividualRanking';
import { useStamps } from 'hooks/stamps/useStamps';
import { useQueryErrorResetBoundary } from 'react-query';
import {
  ClipboardCheckIcon,
  CalendarIcon,
  StarIcon,
  UserIcon,
} from '@heroicons/react/outline';
import router from 'next/router';
import Pagination from 'components/Pagination';
import usePagination from '@lucasmogari/react-pagination';
import { ViewGridIcon } from '@heroicons/react/solid';
import CalendarWeekly from '../Calendar';
import { useAuth } from 'context/AuthContext';
import { locale } from 'utils/locale';

export const IndividualTab = ({ selectedTeam }) => {
  const { permission } = useAuth();
  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
      : Math.sign(num) * Math.abs(num);
  };
  const [stampsSliced, setStampsSliced] = useState([]);
  const [selectedWeeks, setSelectedWeeks] = useState();
  const [selectedYear, setSelectedYear] = useState();
  const [context, setContext] = useState();
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateName, setDateName] = useState('all time');
  const {
    data: stamspsData,
    isLoading: StampsLoading,
    isSuccess: stampSuccess,
  } = useStamps();
  const { reset } = useQueryErrorResetBoundary();
  // const router = useRouter();
  const stampsSliced1 = stamspsData?.slice(0, 4);
  const stampsSliced2 = stamspsData?.slice(0, 2);

  useEffect(() => {
    if (screen.width > 640) {
      setStampsSliced(stampsSliced1);
    } else {
      setStampsSliced(stampsSliced2);
    }
  }, [screen.width, stamspsData]);
  const Learner = data?.data.length;

  const pagination = usePagination({
    page: 1,
    itemsPerPage: 5,
    maxPageItems: 7,
    numbers: true,
    arrows: true,
  });

  const page = pagination?.page;

  const { data: me, refetch: refecthMeRanking } = useMeRanking({
    query: {
      page: page,
      perPage: pagination?.itemsPerPage,
      context: context ? context : 'all_time',
      week: selectedWeeks,
      year: selectedYear,
    },
  });

  const { data, isLoading, refetch, isRefetching } = useIndividualRanking({
    query: {
      page: page,
      perPage: pagination.itemsPerPage,
      context: selectedWeeks ? 'weekly' : 'all_time',
      week: selectedWeeks,
      year: selectedWeeks ? selectedYear : null,
    },
  });

  useEffect(() => {
    if (data?.data) {
      let totalPages =
        data?.pagination?.totalPages > 10
          ? 10
          : data?.pagination?.totalPages === 0
          ? 1
          : data?.pagination?.totalPages;
      pagination.setTotalItems(totalPages * pagination?.itemsPerPage);
    }
  }, [data, isRefetching]);

  useEffect(() => {
    refetch();
    refecthMeRanking();
    pagination.goTo(1);
  }, [selectedYear, selectedWeeks, context]);
  if (isLoading) {
    return (
      <React.Fragment>
        {' '}
        <Skeleton count={5} /> <Skeleton count={5} /> <Skeleton count={5} />{' '}
      </React.Fragment>
    );
  } else {
    const paginate = data?.data;
    return (
      <div className="mt-4">
        
        {permission['view_weekly_leaderboard'] &&
          <div className="w-full flex  justify-end ">
            <button
              className="flex reg-14 width-284 mobile:w-full height-35 justify-between items-center border bg-white border-gray-200 rounded text-gray-500 px-2"
              onClick={() => {
                setShowCalendar(!showCalendar);
              }}
            >
              <h1 className="flex capitalize">{dateName}</h1>
              <CalendarIcon className="h-6" />
            </button>
          </div>
        }

        <CalendarWeekly
          showCalendar={showCalendar}
          setShowCalendar={setShowCalendar}
          setSelectedWeeks={setSelectedWeeks}
          setSelectedYear={setSelectedYear}
          setContext={setContext}
          refetch={refetch}
          setDateName={setDateName}
        />
        {permission['view_individual_leaderboards_buble']  && 
          <div className="grid grid-rows-1 grid-flow-col gap-2 mobile:grid-flow-row mt-4">
            <div className="bg-white width-screen-20 w-full shadow height-140 rounded-lg mobile:mt-2  items-center justify-center p-4 flex  mobile:h-max mobile:w-full">
              <ClipboardCheckIcon className="mobile:h-6 text-base-700 h-12 mr-4" />
              <div className="mobile:flex mobile:text-left items-center mobile:justify-between mobile:w-full">
                <h1 className="text-gray-500"> {locale('Completed Items')}</h1>
                <h2 className="text-xl text text-base-800">
                  {me?.data?.itemCompleted || 0}
                </h2>
              </div>
            </div>
            <div className="bg-white width-screen-20 w-full shadow height-140 rounded-lg  mobile:mt-2  items-center p-8 mobile:p-4 flex  mobile:h-max mobile:w-full">
              <StarIcon className="mobile:h-6 text-base-700 h-12 mr-4" />
              <div className="mobile:flex mobile:text-left items-center mobile:justify-between mobile:w-full">
                <h1 className="text-gray-500">{locale('My Score')}</h1>
                <h2 className="text-xl text text-base-800">
                  {kFormatter(me?.data?.score) || 0}
                </h2>
              </div>
            </div>
            <div className="bg-white width-screen-20 w-full shadow height-140 rounded-lg mobile:mt-2  items-center p-8 mobile:p-4 flex  mobile:h-max mobile:w-full">
              <UserIcon className="mobile:h-6 text-base-700 h-12 mr-4" />
              <div className="mobile:flex mobile:text-left items-center mobile:justify-between mobile:w-full">
                <h1 className="text-gray-500">{locale('Total Learners')}</h1>
                <h2 className="text-xl text text-base-800">
                  {me?.data?.totalUsers || 400}
                </h2>
              </div>
            </div>
          </div>
        }
      
      {permission['view_individual_leaderboards'] && (
        <>
          <Table
            data={paginate}
            userTitle="Username"
            selectedTeam={selectedTeam}
            isPagination={data?.data?.length > 5}
            page={page}
            dataAvailable={data?.data?.length > 0}
            withProgressBar={dateName === 'all time'}
          />
          
          {pagination.totalItems > 1 && (
            <Pagination
              pagination={pagination}
              className={
                'border-gray-200  px-4 py-3 bg-white justify-end border-t rounded-bl-lg rounded-br-lg shadow'
              }
            />
          )}
        </>
      )}

      {permission['view_stamps'] && 
        <>
          {!stampsSliced?.length > 0 ? (
            <div className="w-full h-36 text-gray-400 flex flex-col justify-center items-center bg-gray-50 shadow rounded mt-4">
              <ViewGridIcon className="mobile:h-6  h-12 mr-4" />
              <h1 className="text-center">
                {locale(
                  'No Badges earned. Complete learning items to earn your first Badge!'
                )}
              </h1>
            </div>
          ) : (
            <div className="flex mt-4 mobile:w-full mobile:overflow-scroll space-x-4">
              {stampsSliced &&
                stampsSliced?.map((data) => <Stamps data={data} />)}

              {stampsSliced?.length > 4 && (
                <span
                  className="rounded-lg items-center flex p-4 mobile:p-2 mobile:w-full text-white cursor-pointer text-center shadow-xl bg-base-600"
                  onClick={() => router.push('/badge')}
                >
                  {locale('see More')}
                </span>
              )}
            </div>
          )}
        </>
      }
      </div>
    );
  }
};
