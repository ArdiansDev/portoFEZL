import React from 'react';
import NextImage from 'components/NextImage';
import { UserGroupIcon } from '@heroicons/react/solid';
import { locale } from 'utils/locale';
export const Table = ({
  data,
  selectedTeam,
  userTitle,
  isPagination,
  dataAvailable,
  page,
  mt,
  progressWidth,
  withProgressBar=true
}) => {
  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
      : Math.sign(num) * Math.abs(num);
  };

  return (
    <div
      className={`bg-white pb-4 ${mt ? mt : "mt-4"} rounded-lg ${
        isPagination && 'rounded-bl-none rounded-br-none'
      } mobile:text-xs shadow`}
    >
      <table className="w-full">
        <tr className="text-gray-500 font-light text-xs border-b-2 bg-gray-50">
          <th className="p-4 mobile:p-2 rounded-lg">Rank</th>
          <th className="p-6 mobile:p-2"> </th>
          <th className="p-6 mobile:p-2 w-20  mobile:max-width-68 text-left">
            {userTitle}
          </th>
          <th className="p-6 mobile:p-2 text-center">
            {' '}
            {locale('Completed Items')}
          </th>
          {withProgressBar && <th className="p-6 mobile:p-2 text-left">Completion Progress</th> }
          <th className="p-6 mobile:p-2 text-center rounded-lg">Score</th>
        </tr>
        {data &&
          data?.map((data, index) => (
            <tr
              className={
                selectedTeam === data?.user?.name
                  ? 'bg-blue-100'
                  : '' + selectedTeam === data.name
                  ? 'bg-blue-100'
                  : ''
              }
            >
              <td className="p-2 text-center">
                <h3>{index + 1 + 5 * (page - 1)}</h3>
              </td>
              <td className="p-2 text-center">
                <div className="rounded  width-50 height-50 mobile:hidden">
                  <NextImage
                    src={data?.user?.img || data.img}
                    alt=""
                    width="50"
                    height="50"
                  />
                </div>
              </td>
              <td className="p-2 overflow-ellipsis w-64">
                <h3>{data?.user?.name || data.name}</h3>
                <p className="text-sm text-gray-500 hidden">
                  {data?.user?.positionName}
                </p>
              </td>

              <td className="p-2 text-center">
                <h3>{kFormatter(data.itemCompleted)} items</h3>
              </td>
              {withProgressBar && 
                <td className="p-2  ">
                  <div className="grid grid-rows-1 grid-flow-col gap-0.5 items-center text-gray-500">
                    <svg
                      className="mobile:hidden fill-current text-base-600"
                      width={progressWidth ? progressWidth : "154"}
                      height="8"
                      viewBox="0 0 154 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width={progressWidth ? progressWidth : "154"} height="8" rx="4" fill="#F5F5F5" />
                      <rect
                        width={(data.completionPercentage / 100) * 154}
                        height="8"
                        rx="4"
                        fill="#FBBF24"
                      />
                    </svg>
                    <p>{data.completionPercentage}%</p>
                  </div>
                </td>
              }
              <td className="p-2 text-center">
                <h3>{kFormatter(data.score)}</h3>
              </td>
            </tr>
          ))}
      </table>
      {!dataAvailable ? (
        <div className="h-72 flex flex-col justify-center text-gray-400 items-center w-full">
          <UserGroupIcon className="mobile:h-6  h-12 mr-4" />
          <h1 className="text-center">
            Leaderboard data is not available at this time
          </h1>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
