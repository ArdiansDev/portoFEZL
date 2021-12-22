import { useMutation } from 'react-query'
import { client } from "utils/client"

const changePasswordUser = async (data = {}) => {
    return client('/password/update_password', { method: "PUT", data }).then(data => {
        return data?.data
    })
}

const useChangePassword = () => {
    return useMutation(updates => changePasswordUser(updates))
}

export { useChangePassword, changePasswordUser } 

