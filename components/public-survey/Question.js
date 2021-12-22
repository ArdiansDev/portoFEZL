import React, { useEffect } from 'react';
import { QuizOptions } from 'components/public-survey/QuizOptions';
import autosize from 'autosize';
import { QuizOptions3 } from 'components/QuizOptions3';
import NextImage from 'components/NextImage';
import { WordCloud } from './../WordCloud';

export const Question = ({
  question,
  onAnswer,
  answer,
  type,
  answerResponse,
}) => {
  useEffect(() => {
    autosize(document.querySelectorAll('textarea'));
  }, []);

  const onAnswerEssay = (e) => {
    onAnswer({
      questionSequence: question.sequence,
      questionId: question.id,
      answer: e.target.value,
    });
  };

  const onAnswerMCQ = (answer) => {
    onAnswer({
      questionSequence: question.sequence,
      questionId: question.id,
      optionIds: [answer.id],
      optionAnswerSequence: answer.sequence,
    });
  };
  const onAnswerWordCloud = (answer) => {
    console.log(answer);
    onAnswer({
      questionSequence: question.sequence,
      questionId: question.id,
      optionIds: [answer],
      optionAnswerSequence: answer.sequence,
    });
  };
  return (
    <div className="py-2.5 px-2.5 flex flex-col space-y-3">
      {/* {type === "quiz" && 
        <NextImage
          className="rounded-8"
          src={question?.imageSecureUrl}
          width={254}
          height={217}
          alt="survey-image"
          layout="fixed"
      /> */}

      <p className="med-16 text-gray-800 pr-8">{question?.question}</p>

      {type !== 'quiz' ? (
        question.questionType === 'mcq' ? (
          <QuizOptions
            options={question?.options || []}
            question={question}
            questionSequence={answer?.questionSequence}
            onChange={onAnswerMCQ}
            answer={answer?.optionIds?.[0]}
            optionAnswerSequence={answer?.optionAnswerSequence}
          />
        ) : question.questionType === 'wordcloud' ? (
          <WordCloud
            options={question?.options || []}
            onChange={onAnswerWordCloud}
          />
        ) : (
          <textarea
            id="essay"
            rows={5}
            className="shadow-sm focus:ring-base-500 focus:border-base-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
            placeholder="Write your answer here"
            defaultValue={answer?.answer ?? ''}
            onChange={onAnswerEssay}
          />
        )
      ) : (
        <QuizOptions3
          options={question?.options || []}
          question={question}
          questionSequence={answer?.questionSequence}
          onChange={onAnswerMCQ}
          answer={answer?.optionIds?.[0]}
          optionAnswerSequence={answer?.optionAnswerSequence}
          answerResponse={answerResponse}
          isNotAbleRecheck={true}
        />
      )}
    </div>
  );
};
