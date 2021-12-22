import { client } from "utils/client"
import { useMutation } from 'react-query'
import useUser from "hooks/auth/useUser";

const updateUserChallenge = async ({id, data = {}}) => {
    return client(`/user_challenges/${id}`, { method: "PUT", data })
}

const useUpdateUserChallenge = () => {
    return useMutation(data => updateUserChallenge({data}))
}

export { useUpdateUserChallenge, updateUserChallenge } 

