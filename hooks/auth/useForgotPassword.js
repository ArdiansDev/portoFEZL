import { useMutation } from 'react-query'
import { client } from "utils/client"

const forgotPasswordUser = async (data = {}) => {
    return client('/password/update_password', { method: "PUT", data }).then(data => {
        return data?.data
    })
}

const useForgotPassword = () => {
    return useMutation(updates => forgotPasswordUser(updates))
}

const requestForgotPassword = async (data = {}) => {
    return client('/password/reset', { method: "POST", data }).then(data => {
        return data?.data
    })
}

const useRequestForgotPassword = () => {
    return useMutation(updates => requestForgotPassword(updates))
}

export { useForgotPassword, forgotPasswordUser, useRequestForgotPassword } 

