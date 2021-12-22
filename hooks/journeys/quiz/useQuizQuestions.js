import { useQuery } from "react-query";
import { client } from "utils/client";
import { queryClient } from "pages/_app";

const fetchQuizQuestions = async ({ query = {}, quiz_id }) => {
  return client(`/journey_exams/${quiz_id}`, { params: query }).then(data => data?.data);
};

const useQuizQuestions = ({ query = {}, quiz_id, question_id } = {}) => {
  return useQuery(["quiz-questions", quiz_id, query], () =>
    fetchQuizQuestions({
      query: { ...query, questionId: question_id },
      quiz_id,
    })
  );
};

const prefetchQuizQuestions = async ({
  quiz_id,
  query = {},
  question_id,
}) => {
  return queryClient.prefetchQuery(
    ["quiz-questions", quiz_id, query],
    () =>
      fetchQuizQuestions({
        query: { ...query, questionId: question_id },
        quiz_id,
      })
  );
};

export {
  useQuizQuestions,
  fetchQuizQuestions,
  prefetchQuizQuestions,
};
