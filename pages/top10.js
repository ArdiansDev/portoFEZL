import { Table } from 'components/profiles/Table';
import HeaderTop10 from 'components/HeaderTop10';
import { useIndividualRanking } from 'hooks/individual_ranking/useIndividualRanking';
import { useRouter } from 'next/router';
import {
  ClipboardCheckIcon,
  StarIcon,
  UserIcon,
} from '@heroicons/react/outline';
import CsvDownload from 'react-json-to-csv';
import { IndividualTab } from 'components/profiles/Tab-Individual';
import { DownloadIcon } from '@heroicons/react/solid';

export default function Top10Leaderboard() {
  const router = useRouter();
  if (!router.isReady) return null;

  let { data: individualRanking, isLoading } = useIndividualRanking({
    query: { page: 1, perPage: 50 },
    options: {
      refetchIntervalInBackground: true,
      refetchInterval: 1000 * 10,
    },
  });

  if (isLoading) return null;
  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
      : Math.sign(num) * Math.abs(num);
  };
  let data = individualRanking?.data;
  const firstTable = data.slice(0, 10);

  let dataDownload = data.map((data, index) => ({
    Rank: index + 1,
    Name: data.user.name,
    'Completed Items': data.itemCompleted || '0',
    'Completion Percentage': data.completionPercentage + '%' || 0 + '%',
    Score: data.score || '0',
  }));
  // console.log(dataDownload);
  return (
    <div className="bg-gray-50 h-screen w-full">
      <HeaderTop10 />
      <div className=" flex items-center flex-col p-2">
        <div className="flex flex-col gap-2 mt-0 w-full  max-width-931">
          <div className="grid grid-rows-1 grid-flow-col gap-4 mobile:grid-flow-row my-4 ">
            <div className="bg-white width-screen-20 w-full shadow height-140 rounded-lg mobile:mt-2  items-center justify-center p-4 flex  mobile:h-max mobile:w-full">
              <ClipboardCheckIcon className="mobile:h-6 text-base-700 h-12 mr-4" />
              <div className="mobile:flex mobile:text-left items-center mobile:justify-between mobile:w-full">
                <h1 className="text-gray-500">Total Items Completed </h1>
                <h2 className="text-xl text text-base-800">
                  {individualRanking?.totalCompletedItems || 0}
                </h2>
              </div>
            </div>
            <div className="bg-white width-screen-20 w-full shadow height-140 rounded-lg  mobile:mt-2  items-center p-8 mobile:p-4 flex  mobile:h-max mobile:w-full">
              <StarIcon className="mobile:h-6 text-base-700 h-12 mr-4" />
              <div className="mobile:flex mobile:text-left items-center mobile:justify-between mobile:w-full">
                <h1 className="text-gray-500">Total Score Earned</h1>
                <h2 className="text-xl text text-base-800">
                  {kFormatter(individualRanking?.totalScores) || 0}
                </h2>
              </div>
            </div>
            <div className="bg-white width-screen-20 w-full shadow height-140 rounded-lg mobile:mt-2  items-center p-8 mobile:p-4 flex  mobile:h-max mobile:w-full">
              <UserIcon className="mobile:h-6 text-base-700 h-12 mr-4" />
              <div className="mobile:flex mobile:text-left items-center mobile:justify-between mobile:w-full">
                <h1 className="text-gray-500">Total Learners</h1>
                <h2 className="text-xl text text-base-800">
                  {/* {individualRanking?.activeUsers || 0}/{' '} */}

                  {individualRanking?.totalUsers || 0}
                </h2>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <CsvDownload
              className="bg-base-500 w-max text-white p-2 rounded-lg reg-14 flex items-center "
              data={dataDownload}
              filename="UOB_Top50Users_Leaderboard.csv"
            >
              <DownloadIcon className="width-16 mr-4" />
              Download Top 50 users
            </CsvDownload>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Table
              data={firstTable}
              userTitle="Username"
              page={1}
              dataAvailable={true}
              mt={'mt-0'}
              progressWidth={'130'}
            />
          </div>
          <p className="med-16 self-end pr-2 pt-2 text-gray-800">
            Powered By Zalents
          </p>
        </div>
      </div>
    </div>
  );
}

Top10Leaderboard.getLayout = (page) => page;
Top10Leaderboard.getHeader = () => <> </>;
