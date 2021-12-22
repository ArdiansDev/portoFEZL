import { client } from "utils/client"
import { useMutation } from 'react-query'
import useUser from "hooks/auth/useUser";

const updateChallengeAnswers = async ({data = {}}) => {
    //   "challenge_question_id": 65,
    //   "challenge_question_option_id": 196
    return client('/challenge_answers', { method: "POST", data })
}

const useUpdateChallengeAnswers = () => {
    return useMutation(data => updateChallengeAnswers({data}))
}

export { useUpdateChallengeAnswers, updateChallengeAnswers } 


