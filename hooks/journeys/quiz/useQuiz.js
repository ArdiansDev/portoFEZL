import { useQuery, useMutation } from 'react-query';
import { client } from 'utils/client';

const fetchQuiz = async ({ query = {}, quiz_id }) => {
  return client(`/journey_exams/${quiz_id}`, { params: query }).then(
    (data) => data
  );
};

const useQuiz = ({ query = {}, quiz_id }) => {
  return useQuery(['quiz', quiz_id], () => fetchQuiz({ query, quiz_id }));
};

function useSubmitQuiz() {
  return useMutation((updates) => {
    let questionId = updates.questionId;
    delete updates['questionId'];
    return client(`/quiz_questions/${questionId}/answers`, {
      method: 'POST',
      data: updates,
    });
  });
}

const fetchQuizAdmin = async ({ query = {} }) => {
  return client(`/exams`, { params: query }).then((data) => data);
};

const useQuizAdmin = ({ query } = {}) => {
  return useQuery(['quiz-admin', query], () => fetchQuizAdmin({ query }), {
    keepPreviousData: true,
  });
};

export { useQuiz, fetchQuiz, useSubmitQuiz, useQuizAdmin };
