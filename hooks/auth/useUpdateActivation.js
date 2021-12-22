import { client } from "utils/client"
import { useMutation } from 'react-query'

const updateActivation = async ({data = {}}) => {
    return client('/membership_invites/request_invitation', { method: "POST", data })
}

const useUpdateActivation = () => {
    return useMutation(updates => updateActivation(updates))
}

export { useUpdateActivation, updateActivation } 

