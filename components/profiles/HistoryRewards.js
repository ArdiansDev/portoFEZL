import React from 'react';
import HistoryModalRewards from './HistoryModalRewards';
import { useUserRewards } from 'hooks/rewards/useUserRewards';
import Skeleton from 'react-loading-skeleton';
import RewardsInstructionRedeemed from './RewardsInstructionRedeemed';
import emptyBox from 'public/abc/emptyBox.svg';
import moment from 'moment';
import NextImage from 'components/NextImage';
import { locale } from 'utils/locale';

const HistoryRewards = ({ setGameId }) => {
  const { data, isLoading } = useUserRewards();
  const [ShowInstruction, setShowInstruction] = React.useState(false);
  const [InstructionData, setInstructionData] = React.useState();
  const [visible, setVisible] = React.useState(false);
  const History = data?.data?.slice(0, 5);

  if (isLoading) {
    return (
      <React.Fragment>
        <Skeleton count={5} /> <Skeleton count={5} /> <Skeleton count={5} />{' '}
      </React.Fragment>
    );
  } else {
    return (
      <div className="mt-6 rounded-8 p-5 shadow overflow-hidden width-326 bg-white space-y-6">
        <div className="flex justify-between">
          <h3 className="med-16 text-gray-600"> {locale('Rewards History')}</h3>
          {History?.length > 0 && (
            <h4
              className="cursor-pointer reg-16 hover:underline text-base-500"
              onClick={() => {
                setVisible(true);
              }}
            >
              {locale('view all')}
            </h4>
          )}
        </div>

        <div className="space-y-3">
          {History?.length > 0 ? (
            History?.map((data) => (
              <div
                className="flex justify-between items-center mt-2 cursor-pointer"
                key={data.id}
                onClick={() => {
                  setInstructionData(data);
                  setShowInstruction(true);
                }}
              >
                <div className="flex items-start pt-2">
                  <div className="mr-2 justify-center flex flex-col items-center ">
                    <div className="bg-gray-300 width-3 justify-center  h-10 "></div>
                  </div>
                  <div>
                    <h1 className="med-12 text-gray-600">
                      {data.reward.title}
                    </h1>
                    <h1 className="reg-12 text-gray-500 text-sm">
                      {data.expirationDate || 'No Expiration Date'}
                    </h1>
                  </div>
                </div>
                <h1 className="px-4 rounded reg-12 bg-blue-100 text-blue-800">
                  {locale('Available')}
                </h1>
              </div>
            ))
          ) : (
            <div className="justify-items-center flex flex-col">
              <NextImage src={emptyBox} alt="" />
              <p className="text-xs text-gray-300 text-center">
                {locale('No Rewards History')}
              </p>
            </div>
          )}
        </div>

        <HistoryModalRewards
          Show={visible}
          data={data}
          setVisible={setVisible}
          setGameId={setGameId}
          handleCloseInstruction={() => setShowInstruction(false)}
        />
        {ShowInstruction && (
          <RewardsInstructionRedeemed
            Show={ShowInstruction}
            data={InstructionData}
            setShow={setShowInstruction}
            handleClose={() => setShowInstruction(false)}
          />
        )}
      </div>
    );
  }
};

export default HistoryRewards;
