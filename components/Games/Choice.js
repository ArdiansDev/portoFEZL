import React, { useEffect, useState } from 'react';
import TrueCheck from 'public/abc/TrueCheck.svg';
import { useSubmitAnswers } from 'hooks/challenges/useChallengeAnswers';
import NextImage from 'components/NextImage';
import { XCircleIcon } from '@heroicons/react/solid';

// const Answer = true;
const Choice = ({
  content,
  setRealAnswer,
  id,
  questionId,
  setJigsaw,
  setAnswer,
  answer,
}) => {
  const [Color, setColor] = useState();
  const RevealAnswer = async () => {
    setAnswer(true);
    CallAnswer();
  };

  const payload = {
    challengeQuestionId: questionId,
    challengeQuestionOptionId: id,
  };

  const { mutate, data, isSuccess } = useSubmitAnswers({});

  const AnswerKey = async () => {
    if (isSuccess) {
      setJigsaw(data?.data.question.rewardJigsaws);
      setColor(data?.data.correctAnswer);
      await setRealAnswer(data?.data.correctAnswer);
    }
  };

  useEffect(() => {
    AnswerKey();
  }, [isSuccess]);

  const CallAnswer = () => {
    mutate(payload);
  };

  return (
    <div> 
      <form>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px',
            gap: '8px',
          }}
        >
          <button
            className={
              (Color === false ? 'bg-red-500 text-white' : '') +
              (Color === true ? 'bg-green-400 text-white' : '') +
              ' text-left border border-gray-200 w-4/5 mobile:w-full cursor-pointer rounded-xl h-max p-4 bg-white  px-4'
            }
            onClick={RevealAnswer}
            type="button"
            disabled={answer}
          >
            {content}
          </button>
          <div className={Color === true ? '' : 'hidden items-center'}>
            <NextImage src={TrueCheck} alt="" />
          </div>
          <XCircleIcon
            className={Color === false ? 'text-red-500 height-50' : 'hidden'}
          />
        </div>

        {data?.data.question.explanation && 
          <div className="px-5 py-3 my-4.5 bg-yellow-50">
            <p className="reg-16 text-gray-500">Explanation:</p>
            <p className="reg-16 text-gray-500">
              {data?.data.question.explanation}
            </p>
          </div>
        }
      </form>
    </div>
  );
};
export default Choice;
