import React, { useEffect, useRef, useState } from 'react';
import Bro from 'public/abc/bro.svg';
import Times from 'public/abc/Times.svg';
import TrophyFilled from 'public/abc/TrophyFilled.svg';
import Choice from './Choice';
import NextImage from 'components/NextImage';
import useCountDown from 'react-countdown-hook';
import { useSubmitInvite } from 'hooks/challenges/useUserChallange';
import { Duration } from 'luxon';

export default function QuizBoard({
  setType,
  handleNextQuest,
  totalPage,
  currentPage,
  setJigsaw,
  dataChallenge,
  data,
  jigsaw,
  refetch,
}) {
  let timeRemaining = dataChallenge?.userChallenge?.timeRemaining;
  let userChallengeId = dataChallenge?.userChallenge?.id;

  const timesfromAPI = timeRemaining * 1000;
  const [timeLeft, actions] = useCountDown(timesfromAPI, 1000);
  const realtime = timeLeft / 1000;
  let durationInFormat = Duration.fromObject({ seconds: realtime }).toFormat(
    'mm:ss'
  );

  const payload2 = {
    state: 'completed',
  };

  const { mutate } = useSubmitInvite({ id: userChallengeId });

  const valueRef = useRef();
  const firstRender = useRef();

  useEffect(() => {
    if (!firstRender.current) {
      firstRender.current = true;
    } else if (realtime == 0) {
      handleFinish();
    }
    valueRef.current = realtime;
  }, [realtime]);

  useEffect(() => {
    if (totalPage === currentPage) {
      handleFinish();
    } else {
      actions.start();
      refetch();
    }

    return () => {
      let payload = {
        timeDeduction: timeRemaining - valueRef.current,
      };

      actions.pause();
      mutate(payload);
    };
  }, []);

  const [RealAnswer, setRealAnswer] = useState();
  const [answer, setAnswer] = useState(false);

  const handleNext = () => {
    if (totalPage === currentPage + 1) {
      mutate(payload2);
    }

    if (RealAnswer && jigsaw?.length > 0) {
      setType('items-unlock');
    } else if (totalPage === currentPage + 1) {
      setType('result');
    } else {
      handleNextQuest();
    }
    setAnswer(false);
    setRealAnswer(false);
  };

  const handleFinish = () => {
    setType('result');
    mutate(payload2);
  };

  return (
    <div>
      <div className="p-6 mobile:py-14">
        <div className="flex justify-start">
          <div className="text-white p-4 font-bold text-2xl width-180 height-50 rounded-full my-4 mr-4 flex justify-start items-center bg-green-500 border-4 border-white mobile:med-20 ">
            <NextImage src={Times} alt="" width="34" />
            <h1 className="ml-4">{durationInFormat}</h1>
          </div>
          <button
            className="text-white p-4 font-bold text-2xl width-220 height-50 rounded-full my-4 flex justify-start items-center bg-red-400 border-4 border-white mobile:med-20"
            onClick={() => {
              setType('progress');
            }}
          >
            <NextImage src={TrophyFilled} alt="" />
            <h1 className="ml-4 mobile:text-md">Progress</h1>
          </button>
        </div>
        <div className="flex w-full pr-4 mobile:pr-0">
          <div className="bg-base-900 bg-opacity-90 rounded-xl width-282 height-455 mobile:hidden">
            <NextImage src={Bro} alt="" />
          </div>
          <div className="ml-4 mobile:ml-0 mobile:w-full w-full">
            <div className="flex justify-between">
              <div className="bg-base-400 font-bold p-2 pl-4 text-white rounded-xl flex-grow mobile:text-xs mobile:text-center">
                <h1>Question Progress </h1>
                <div>
                  <h2>
                    {currentPage + 1} of {totalPage}
                  </h2>
                </div>
              </div>
              <div className="bg-green-400 font-bold p-2 pl-4 ml-4 text-white rounded-xl flex-grow mobile:text-xs mobile:text-center">
                <h1>Pieces Unlocked</h1>
                <div>
                  <h2>
                    {dataChallenge?.progress?.unlockedItems} of{' '}
                    {dataChallenge?.progress?.totalItems}
                  </h2>
                </div>
              </div>
            </div>
            <div className="bg-white max-height-375 overflow-x-scroll hideScroll hideScrollChrome  rounded-xl my-4 space-y-4 p-4">
              <div className=" mobile:height-500 ">
                <h3 className="text-base-400 font-bold text-xl">
                  {data?.title}:{' '}
                </h3>
                <p className="break-words whitespace-pre-line">
                  {data?.question}
                </p>
                <div className="space-y-2 mobile:w-full mobile:h-full">
                  {data?.options &&
                    data?.options?.map((dataChoice) => (
                      <Choice
                        key={dataChoice.id}
                        content={dataChoice.content}
                        setRealAnswer={setRealAnswer}
                        questionId={data.id}
                        id={dataChoice.id}
                        setJigsaw={setJigsaw}
                        setAnswer={setAnswer}
                        answer={answer}
                      />
                    ))}
                  <button
                    onClick={handleNext}
                    disabled={!answer}
                    className={
                      ' bg-base-400 rounded-lg p-2 mt-2 text-white disabled:bg-gray-100 disabled:text-gray-300 '
                    }
                  >
                    {totalPage === currentPage + 1 ? 'Finish' : 'Continue'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
