import { client } from "utils/client"
import { useMutation } from 'react-query'

const updatePassword = async ({data = {}}) => {
    return client('/password', { method: "POST", data })
}

const useUpdatePassword = () => {
    return useMutation(updates => updatePassword(updates))
}

export { useUpdatePassword, updatePassword } 

