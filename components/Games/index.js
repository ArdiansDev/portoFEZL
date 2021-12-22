import React, { useState, useEffect } from 'react';
import NextImage from 'components/NextImage';
import FullscreeBtn from 'public/abc/FullscreenBtn.svg';
import CloseBtn from 'public/abc/CloseBtn.svg';
import StartGames from './StartGames';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import QuizBoard from './QuizBoard';
import ItemsUnlock from './ItemsUnlock';
import ResultBoard from './ResultBoard';
import { useChallenge } from 'hooks/challenges/useChallenge';
import ProgressBoard from './Progress';
import bgGame from 'public/abc/bgGame.png';

export default function Games({
  toggleGame,
  gameId,
  mobileView,
  setMobileView,
  gameData,
}) {
  const { data, isLoading, refetch } = useChallenge({
    id: gameId,
  });

  const [full, setFull] = useState(false);
  const [jigsaw, setJigsaw] = useState();

  const [type, setType] = useState();

  const handlefullscreen = () => {
    if (full === false) {
      handle.enter();
      setFull(true);
    } else {
      handle.exit();
      setFull(false);
    }
  };
  const handle = useFullScreenHandle();

  const handleClose = () => {
    toggleGame();
    handle.exit();
    setFull(false);
    setMobileView(false);
  };

  useEffect(() => {
    if (mobileView) {
      handlefullscreen();
    }
  }, [mobileView]);

  const handleNextQuest = () => {
    refetch();
  };

  let currentPage = data?.data?.progress?.completedQuestions;
  let totalPage = data?.data?.progress?.totalQuestions;
  const dataQuestion = data?.data?.questions[currentPage];

  useEffect(() => {
    let type = data?.data?.state;
    let state = 'quiz';

    if (type === 'ongoing') {
      state = 'quiz';
    } else if (type === 'accepted') {
      state = 'start';
    } else if (type === 'completed') {
      state = 'result';
    }

    if (type) {
      setType(state);
    }
  }, [isLoading]);

  if (isLoading) return null;

  return (
    <div className="h-max">
      <div className="z-20 fixed  top-0 left-0 bg-black opacity-30 h-full w-full"></div>
      <FullScreen handle={handle}>
        <div
          className={
            full
              ? ' z-30 w-screen h-screen fixed left-0 top-0  '
              : 'mobile:w-screen mobile:h-screen mobile:top-0 mobile:rounded-0 overflow-hidden z-30  fixed  lg:width-1044 md:width-768 h-max  min-height-600 top-16 left-1/2 transform -translate-x-1/2 -translate-y-0.5 rounded-3xl  mobile:fixed'
          }
        >
          <div className="absolute w-full mobile:w-screen mobile:h-screen h-max over z-30  rounded-3xl lg:width-1044 md:width-768   min-height-600">
            <NextImage src={bgGame} alt="" layout="fill" objectFit="cover" />
          </div>
          <div className="absolute z-40 w-full mobile:h-screen">
            <div className="flex absolute right-7 z-40">
              <div className="cursor-pointer mobile:hidden">
                <NextImage
                  onClick={handlefullscreen}
                  src={FullscreeBtn}
                  alt=""
                />
              </div>
              <div className="cursor-pointer mobile:w-10 mobile:mt-4">
                <NextImage
                  onClick={() => {
                    handleClose();
                  }}
                  src={CloseBtn}
                  alt=""
                />
              </div>
            </div>
            {type === 'start' ? (
              <StartGames setType={setType} data={gameData} />
            ) : type === 'quiz' ? (
              <QuizBoard
                gameId={gameId}
                setType={setType}
                data={dataQuestion}
                dataChallenge={data?.data}
                handleNextQuest={handleNextQuest}
                totalPage={totalPage}
                currentPage={currentPage}
                setJigsaw={setJigsaw}
                jigsaw={jigsaw}
                refetch={refetch}
              />
            ) : type === 'progress' ? (
              <ProgressBoard
                handleBtn={() => setType('quiz')}
                gameId={gameId}
                title="Game"
              />
            ) : type === 'result' ? (
              <ResultBoard gameId={gameId} />
            ) : (
              <ItemsUnlock
                setType={setType}
                type={totalPage === currentPage + 1 ? 'finish' : 'next'}
                handleNextQuest={handleNextQuest}
                jigsaw={jigsaw}
              />
            )}
          </div>
        </div>
      </FullScreen>
    </div>
  );
  // }
}
