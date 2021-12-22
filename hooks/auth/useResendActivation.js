import { useMutation } from 'react-query'
import { client } from "utils/client"

const resendActivationUser = async (data = {}) => {
    return client('/membership_invites/request_invitation', { method: "POST", data }).then(data => {
        return data?.data
    })
}

const useResendActivation = () => {
    return useMutation(updates => resendActivationUser(updates))
}

export { useResendActivation, resendActivationUser } 

