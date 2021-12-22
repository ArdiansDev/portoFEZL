import React from "react";
import { QuizOptions } from "components/public-survey/QuizOptions";
import { WordCloud } from "./WordCloud";

export const Question = ({ question, section, onAnswer }) => {
  const onAnswerWordCloud = (answers) => {
    onAnswer ({
      "questionId": question.id,
      "optionIds": answers,
    })
  }

  const onAnswerEssay = (e) => {
    onAnswer ({
      "questionId": question.id,
      "answer": e.target.value,
    })
  }
  const onAnswerMCQ = (answer) => {
    onAnswer({
      "questionId": question.id,
      "optionIds": [answer.id],
    })
  }

  return (
    <>
      <div className="sm:width-588 mx-auto text-center space-y-2">
        <p className="med-30 text-base-600">
          {section?.name}
        </p>
    
        <p className="reg-20 text-gray-600">
          {section?.description}
        </p>
        
        <p className="med-24 text-gray-600">
          {question?.question}
        </p>

      </div>
      
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
    </>
  );
};
