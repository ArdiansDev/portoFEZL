import React from "react";
import { QuizOptions } from "components/public-survey/QuizOptions";
import { WordCloud } from "./WordCloud";

export const Question = ({ question, onAnswer, eventBatchId }) => {
  const onAnswerWordCloud = (answers) => {
    onAnswer ({
      "questionId": question.id,
      "optionIds": answers,
      "eventBatchId": eventBatchId
    })
  }

  const onAnswerEssay = (e) => {
    onAnswer ({
      "questionId": question.id,
      "answer": e.target.value,
      "eventBatchId": eventBatchId
    })
  }
  const onAnswerMCQ = (answer) => {
    onAnswer({
      "questionId": question.id,
      "optionIds": [answer.id],
      "eventBatchId": eventBatchId
    })
  }

  return (
    <div className="py-2.5 px-2.5 flex flex-col space-y-3">
    <p className="med-16 text-gray-800">{question?.question}</p>
      
      {question.questionType  === "mcq" ?
        <QuizOptions 
          options={question?.options || []} 
          onChange={onAnswerMCQ}
          />
      : question.questionType  === "text" ?

      <textarea
          id="essay"
          rows={5}
          className="shadow-sm focus:ring-base-500 focus:border-base-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
          placeholder="Write your answer here"
          defaultValue={""}
          onBlur={onAnswerEssay}
        />

        : 

        <WordCloud 
          options={question?.options || []} 
          onChange={onAnswerWordCloud}
        />
      }
    </div>
  );
};
