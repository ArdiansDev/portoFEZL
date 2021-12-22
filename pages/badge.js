import Banner from 'components/Banner';
import { useStamps } from 'hooks/stamps/useStamps';
import React from 'react';
import StampsPass from 'components/StampsPass';
import Skeleton from 'react-loading-skeleton';
import { locale } from 'utils/locale';
import { useAuth } from 'context/AuthContext';
import { ViewGridIcon } from '@heroicons/react/solid';

export default function Passport() {
  const {
    data: stamspsData,
    isLoading: StampsLoading,
    isSuccess: stampSuccess,
  } = useStamps();

  const { permission } = useAuth();
  if (!permission['view_stamps'])
    return <div>You are not allowed to enter this page</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <section className="pt-4 pb-16 px-20 flex flex-col space-y-7">
        {/* <Banner 
          title={"Passport"}
          description={"View your achievements via badges and gain insights to your leaderboard ranking within your organization."}
          image={"/abc/Banner_Leaderboard.png"}
          background={"bg-base-500"}
        /> */}

        <div className="flex flex-col space-y-3">
          <p className="med-24 text-gray-900">{locale('Passport')}</p>
          <div className="">
            {!stamspsData?.length > 0 ? (
              <div className="w-full h-36 text-gray-400 flex flex-col justify-center items-center bg-gray-50 shadow rounded mt-4">
                <ViewGridIcon className="mobile:h-6  h-12 mr-4" />
                <h1>
                  No Badges earned. Complete learning items to earn your first
                  Badge!
                </h1>
              </div>
            ) : (
              <div className="flex mt-4 mobile:w-full mobile:overflow-scroll space-x-4">
                {stamspsData &&
                  stamspsData?.map((data) => <Stamps name={data.name} />)}

                {stamspsData?.length > 4 && (
                  <span
                    className="rounded-lg items-center flex p-4 mobile:p-2 mobile:w-full text-white cursor-pointer text-center shadow-xl bg-base-600"
                    onClick={() => router.push('/passport')}
                  >
                    see More
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
