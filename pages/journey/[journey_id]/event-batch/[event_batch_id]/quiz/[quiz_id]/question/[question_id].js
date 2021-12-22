import NextImage from 'components/NextImage';
import { Question } from 'components/public-survey/Question';
import { useRouter } from 'next/router';
import { useSubmitQuiz } from 'hooks/journeys/quiz/useQuiz';
import {
  useQuizQuestions,
  prefetchQuizQuestions,
} from 'hooks/journeys/quiz/useQuizQuestions';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import ModalCompleteItem from 'components/ModalCompleteItem';
import { locale } from 'utils/locale';
import { useAuth } from 'context/AuthContext';

export default function QuizQuestion() {
  const router = useRouter();
  if (!router.isReady) return null;
  const { quiz_id, journey_id, event_batch_id } = router.query;

  const { permission } = useAuth();
  if (!permission['view_quiz'])
    return <div>You are not allowed to enter this page</div>;

  const { data: quiz, refetch } = useQuizQuestions({
    quiz_id,
  });

  const [answer, setAnswer] = useState();
  const [completeItem, setCompleteItem] = useState(false);
  const [confirmedItem, setConfirmedItem] = useState(false);

  const { mutate, data: answerResponse } = useSubmitQuiz();

  const { exam } = quiz || {};
  const { userProgress } = exam || {};
  let question = quiz?.currentQuestion;

  const progressPercentage =
    ((userProgress?.completedQuestions < userProgress?.totalQuestions
      ? userProgress?.completedQuestions + 1
      : userProgress?.totalQuestions) /
      userProgress?.totalQuestions) *
    100;

  let { nextQuestionId: nextPage, state } = quiz || {};

  const myRedirectFunction = function (type) {
    if (type === 'next') {
      if (nextPage) {
        setAnswer();
        setConfirmedItem(false);
        prefetchQuizQuestions({ quiz_id, question_id: nextPage });
      } else {
        setCompleteItem(true);
      }
    }
  };

  const onAnswer = (answer) => {
    setAnswer(answer);
  };

  const confirm = () => {
    let payload = {
      optionId: answer.optionIds[0],
      memberExamId: quiz.memberExamId,
      questionId: quiz?.currentQuestion?.id,
    };
    mutate(payload);
    setConfirmedItem(true);
  };

  const primaryAction = () => {
    if (!confirmedItem) {
      confirm();
    } else {
      onSubmit(nextPage);
    }
  };

  const onRetakeQuiz = () => {
    global.window.location.assign(global.window.location);
  };

  const primaryButton = () => {
    if (!confirmedItem) {
      return 'Confirm';
    } else if (nextPage) {
      return 'Next';
    } else {
      return 'Finish';
    }
  };

  const onSubmit = (nextPage) => {
    if (nextPage) {
      myRedirectFunction('next', nextPage);
    } else {
      setTimeout(() => {
        refetch();
      }, 1000);

      setTimeout(() => {
        setCompleteItem(true);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 min-h-screen space-y-7">
        {/* <div className="height-38 flex justify-between">
          <div className="cursor-pointer p-2 shadow-sm border rounded-6 border-gray-300 bg-white">
            <ArrowLeftIcon className="h-5 w-5 text-gray-400" />
          </div>
          <p className="med-20 text-gray-900">Quiz</p>
          <div className="cursor-pointer p-2 border rounded-6 border-gray-300 bg-white">
            <ArrowRightIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div> */}
        <div className="flex md:flex-row flex-col gap-5">
          <div className="w-full sm:max-width-302 p-6 bg-white rounded-12 self-start shadow">
            <div className="space-y-5">
              <p className="med-20 text-gray-900">
                {exam?.title || <Skeleton />}
              </p>
              {/* <NextImage
                className="rounded-8"
                src={exam?.imageSecureUrl}
                width={254}
                height={217}
                alt="survey-image"
                layout="fixed"
              /> */}
              {userProgress?.totalQuestions && (
                <div className="flex flex-col gap-2 ">
                  <p className="med-14 text-gray-900">
                    {locale('Quiz Progress')}
                  </p>
                  <div className="flex justify-between items-center">
                    <svg
                      width="154"
                      height="8"
                      viewBox="0 0 154 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current text-base-600"
                    >
                      <rect width="154" height="8" rx="4" fill="#F5F5F5" />
                      <rect
                        width={(progressPercentage * 154) / 100}
                        height="8"
                        rx="4"
                      />
                    </svg>

                    <p className="med-12 text-base-700">
                      {userProgress.completedQuestions <
                      userProgress.totalQuestions
                        ? userProgress.completedQuestions + 1
                        : userProgress.totalQuestions}{' '}
                      of {userProgress.totalQuestions} {locale('Questions')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="sm:min-width-954 bg-white p-6 rounded-12 relative shadow">
            <div className="flex flex-col gap-5 ">
              <div className="bg-white py-5 border-b pt-0 border-gray-200 sm:px-2.5 flex justify-between items-center">
                <button className="invisible"></button>
                <button
                  className="reg-14 width-140 height-40 bg-base-600 border-0 text-white rounded-6 disabled:bg-gray-100 disabled:text-gray-300"
                  onClick={primaryAction}
                  disabled={!answer}
                >
                  {primaryButton()}
                </button>
              </div>
              <div className="flex flex-col gap-5">
                {question ? (
                  <Question
                    question={question}
                    key={question.id}
                    onAnswer={onAnswer}
                    answer={answer}
                    type={'quiz'}
                    answerResponse={
                      answerResponse?.data?.question?.id ===
                      quiz?.currentQuestion?.id
                        ? answerResponse?.data
                        : null
                    }
                  />
                ) : (
                  <Skeleton count={5} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalCompleteItem
        open={completeItem}
        setOpen={setCompleteItem}
        type={'Quiz'}
        journeyId={journey_id}
        userProgress={userProgress}
        state={state}
        quizRetakeable={permission['retake_quiz']}
        onRetakeQuiz={onRetakeQuiz}
      />
    </div>
  );
}
